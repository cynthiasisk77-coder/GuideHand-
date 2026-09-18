import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Switch, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { KeyboardAwareScrollView } from '@/components/keyboard-aware-scroll';

import QRCode from 'react-native-qrcode-svg';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { notePersonalDataChanged } from '@/lib/autoBackup';
import { pickBackupFile, saveBackupFile } from '@/lib/backupFile';
import {
  buildPlanCode,
  buildShareFile,
  planCodeFits,
  emptyMember,
  EMPTY_PLAN,
  FamilyMember,
  FamilyPlan,
  FAMILY_PLAN_KEY,
  mergePlans,
  planFileName,
  planGaps,
  readShareFile,
} from '@/lib/familyPlan';
import { isEncryptionAvailable, secureGetItem, secureSetItem } from '@/lib/secureData';

type Notice = { kind: 'good' | 'bad'; text: string } | undefined;

export default function FamilyPlanScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const [plan, setPlan] = useState<FamilyPlan>(EMPTY_PLAN);
  const [loaded, setLoaded] = useState(false);
  const [openMember, setOpenMember] = useState<string | undefined>(undefined);
  const [showCode, setShowCode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(undefined);
  // Asked rather than assumed. There is no keychain in a browser, so the web
  // build stores in the clear — and a screen holding someone's child's
  // allergies should not tell them it is encrypted when it is not.
  const [encrypted, setEncrypted] = useState(true);

  useEffect(() => {
    let cancelled = false;
    secureGetItem(FAMILY_PLAN_KEY)
      .then((raw) => {
        if (cancelled || !raw) return;
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.members)) {
          // Earlier builds let the Add button stack blank "Someone new" cards,
          // and those are still sitting in plans saved back then. Keep one and
          // drop the rest — a blank member has nothing in it to lose.
          let keptBlank = false;
          const members = parsed.members.filter((m: FamilyMember) => {
            const blank = !m.name?.trim() && !m.phone?.trim() && !m.job?.trim() && !m.usuallyAt?.trim();
            if (!blank) return true;
            if (keptBlank) return false;
            keptBlank = true;
            return true;
          });
          setPlan({ ...parsed, members });
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    isEncryptionAvailable()
      .then((available) => {
        if (!cancelled) setEncrypted(available);
      })
      .catch(() => {
        if (!cancelled) setEncrypted(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const save = useCallback((next: FamilyPlan) => {
    setPlan(next);
    secureSetItem(FAMILY_PLAN_KEY, JSON.stringify({ ...next, updatedAt: Date.now() }))
      // Chained, never called beside the save — a snapshot taken before the
      // write lands captures the value being replaced.
      .then(() => notePersonalDataChanged('Family plan changed'))
      .catch(() => {});
  }, []);

  const patch = (updates: Partial<FamilyPlan>) => save({ ...plan, ...updates });

  const patchMember = (id: string, updates: Partial<FamilyMember>) => {
    save({ ...plan, members: plan.members.map((m) => (m.id === id ? { ...m, ...updates } : m)) });
  };

  const addMember = () => {
    // Pressing it twice used to leave two blank "Someone new" cards, and a
    // third press a third. If there is already a blank one waiting, open that
    // instead of stacking another on top of it.
    const blank = plan.members.find(
      (m) => !m.name?.trim() && !m.phone?.trim() && !m.job?.trim() && !m.usuallyAt?.trim()
    );
    if (blank) {
      setOpenMember(blank.id);
      return;
    }
    const member = emptyMember();
    save({ ...plan, members: [...plan.members, member] });
    setOpenMember(member.id);
  };

  const removeMember = (id: string) => {
    save({ ...plan, members: plan.members.filter((m) => m.id !== id) });
    setOpenMember((current) => (current === id ? undefined : current));
  };

  const sharePlan = async () => {
    setBusy(true);
    setNotice(undefined);
    try {
      const result = await saveBackupFile(planFileName(plan), buildShareFile(plan));
      setNotice(
        result.ok
          ? { kind: 'good', text: 'Plan sent. Whoever opens it taps "Open a plan someone sent" in their own GuideHand.' }
          : { kind: 'bad', text: result.reason ?? 'Could not share the plan.' }
      );
    } catch {
      setNotice({ kind: 'bad', text: 'Could not share the plan.' });
    } finally {
      setBusy(false);
    }
  };

  const openPlan = async () => {
    setBusy(true);
    setNotice(undefined);
    try {
      const picked = await pickBackupFile();
      if (!picked.ok) {
        if (picked.reason) setNotice({ kind: 'bad', text: picked.reason });
        return;
      }
      const read = readShareFile(picked.contents);
      if (!read.ok) {
        setNotice({ kind: 'bad', text: read.reason });
        return;
      }
      const merged = mergePlans(plan, read.plan);
      save(merged.plan);
      setNotice({
        kind: 'good',
        text: `Plan opened — ${merged.added} added, ${merged.updated} updated. Nobody already on this phone was removed.`,
      });
    } catch {
      setNotice({ kind: 'bad', text: 'Could not read that file.' });
    } finally {
      setBusy(false);
    }
  };

  const gaps = planGaps(plan);
  const sharedMedical = plan.members.filter((m) => m.medical?.share).length;

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Family Plan' }} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View
            style={[
              styles.headerBlock,
              { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.plum },
            ]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Family</Text>
            <Text style={[styles.title, { color: c.text }]}>Family Plan</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              Write it once, send it to everyone. It lands on their phone and stays there — no
              account, no signal needed after that.
            </Text>
          </View>

          {!loaded ? <ActivityIndicator color={c.plum} style={styles.loading} /> : null}

          {notice ? (
            <View
              style={[
                styles.notice,
                { backgroundColor: c.card, borderColor: notice.kind === 'good' ? c.sage : c.danger },
              ]}>
              <Text style={[styles.noticeText, { color: notice.kind === 'good' ? c.sage : c.danger }]}>
                {notice.text}
              </Text>
            </View>
          ) : null}

          {/* --- household ------------------------------------------------ */}
          <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>WHAT TO CALL THIS HOUSEHOLD</Text>
          <TextInput
            defaultValue={plan.householdName}
            onChangeText={(text) => patch({ householdName: text })}
            placeholder="The Sisk house"
            placeholderTextColor={c.textSecondary}
            style={[styles.field, { color: c.text, borderColor: c.cardBorder, backgroundColor: c.card }]}
          />

          {/* --- the out-of-area number ----------------------------------- */}
          <View style={[styles.card, { backgroundColor: c.card, borderColor: c.plum, borderLeftWidth: 5 }]}>
            <Text style={[styles.cardLabel, { color: c.text }]}>One person far away</Text>
            <Text style={[styles.hint, { color: c.textSecondary }]}>
              Local lines and towers jam first while long distance often still goes through. Pick
              somebody in another state, and everybody calls them instead of each other. This is the
              field people skip and the one that saves the day.
            </Text>
            <TextInput
              defaultValue={plan.outOfArea?.name}
              onChangeText={(text) =>
                patch({ outOfArea: { ...(plan.outOfArea ?? { phone: '', where: '' }), name: text } })
              }
              placeholder="Their name"
              placeholderTextColor={c.textSecondary}
              style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
            />
            <TextInput
              defaultValue={plan.outOfArea?.phone}
              onChangeText={(text) =>
                patch({ outOfArea: { ...(plan.outOfArea ?? { name: '', where: '' }), phone: text } })
              }
              placeholder="Their phone number"
              placeholderTextColor={c.textSecondary}
              keyboardType="phone-pad"
              style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
            />
            <TextInput
              defaultValue={plan.outOfArea?.where}
              onChangeText={(text) =>
                patch({ outOfArea: { ...(plan.outOfArea ?? { name: '', phone: '' }), where: text } })
              }
              placeholder="What town or state they're in"
              placeholderTextColor={c.textSecondary}
              style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
            />
          </View>

          {/* --- people --------------------------------------------------- */}
          <Text style={[styles.sectionLabel, { color: c.plum }]}>WHO IS IN THIS PLAN</Text>

          {plan.members.map((member) => {
            const open = openMember === member.id;
            return (
              <View
                key={member.id}
                style={[
                  styles.member,
                  { backgroundColor: c.card, borderColor: open ? c.plum : c.cardBorder },
                ]}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: open }}
                  onPress={() => setOpenMember(open ? undefined : member.id)}
                  style={({ pressed }) => [styles.memberHead, { opacity: pressed ? 0.75 : 1 }]}>
                  <Icon name="family" size={17} color={c.plum} />
                  <View style={styles.memberText}>
                    <Text style={[styles.memberName, { color: member.name ? c.text : c.textSecondary }]}>
                      {member.name || 'Someone new — tap to fill in'}
                    </Text>
                    {member.job ? (
                      <Text style={[styles.memberMeta, { color: c.textSecondary }]}>{member.job}</Text>
                    ) : null}
                  </View>
                  {member.medical?.share ? (
                    <View style={[styles.pill, { backgroundColor: c.dangerSoft }]}>
                      <Text style={[styles.pillText, { color: c.dangerText }]}>MEDICAL</Text>
                    </View>
                  ) : null}
                  <Icon name="chevron" size={16} color={c.textSecondary} />
                </Pressable>

                {open ? (
                  <View style={[styles.memberBody, { borderTopColor: c.cardBorder }]}>
                    <TextInput
                      defaultValue={member.name}
                      onChangeText={(text) => patchMember(member.id, { name: text })}
                      placeholder="Their name"
                      placeholderTextColor={c.textSecondary}
                      style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
                    />
                    <TextInput
                      defaultValue={member.phone}
                      onChangeText={(text) => patchMember(member.id, { phone: text })}
                      placeholder="Phone number"
                      placeholderTextColor={c.textSecondary}
                      keyboardType="phone-pad"
                      style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
                    />
                    <TextInput
                      defaultValue={member.job}
                      onChangeText={(text) => patchMember(member.id, { job: text })}
                      placeholder="What they do — gets the kids, shuts off the gas"
                      placeholderTextColor={c.textSecondary}
                      style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
                    />
                    <TextInput
                      defaultValue={member.usuallyAt}
                      onChangeText={(text) => patchMember(member.id, { usuallyAt: text })}
                      placeholder="Where they usually are — school, work, a job site"
                      placeholderTextColor={c.textSecondary}
                      style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
                    />

                    <View style={[styles.medicalToggle, { borderColor: c.cardBorder }]}>
                      <View style={styles.memberText}>
                        <Text style={[styles.toggleLabel, { color: c.text }]}>Include their medical info</Text>
                        <Text style={[styles.hint, { color: c.textSecondary }]}>
                          Off by default. Turned on, it travels with the plan to everyone you send it
                          to — which is the point when somebody else has your kid.
                        </Text>
                      </View>
                      <Switch
                        value={Boolean(member.medical?.share)}
                        onValueChange={(on) =>
                          patchMember(member.id, {
                            medical: { ...(member.medical ?? {}), share: on },
                          })
                        }
                        trackColor={{ true: c.plum, false: c.cardBorder }}
                      />
                    </View>

                    {member.medical?.share ? (
                      <>
                        <TextInput
                          defaultValue={member.medical?.allergies}
                          onChangeText={(text) =>
                            patchMember(member.id, { medical: { ...(member.medical ?? { share: true }), allergies: text } })
                          }
                          placeholder="Allergies"
                          placeholderTextColor={c.textSecondary}
                          style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
                        />
                        <TextInput
                          defaultValue={member.medical?.medications}
                          onChangeText={(text) =>
                            patchMember(member.id, { medical: { ...(member.medical ?? { share: true }), medications: text } })
                          }
                          placeholder="Medications they take"
                          placeholderTextColor={c.textSecondary}
                          style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
                        />
                        <TextInput
                          defaultValue={member.medical?.conditions}
                          onChangeText={(text) =>
                            patchMember(member.id, { medical: { ...(member.medical ?? { share: true }), conditions: text } })
                          }
                          placeholder="Conditions — asthma, diabetes, epilepsy"
                          placeholderTextColor={c.textSecondary}
                          style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
                        />
                        <TextInput
                          defaultValue={member.medical?.bloodType}
                          onChangeText={(text) =>
                            patchMember(member.id, { medical: { ...(member.medical ?? { share: true }), bloodType: text } })
                          }
                          placeholder="Blood type, if known"
                          placeholderTextColor={c.textSecondary}
                          style={[styles.field, { color: c.text, borderColor: c.cardBorder }]}
                        />
                      </>
                    ) : null}

                    <Pressable
                      accessibilityRole="button"
                      onPress={() => removeMember(member.id)}
                      style={({ pressed }) => [styles.removeRow, { opacity: pressed ? 0.6 : 1 }]}>
                      <Icon name="trash" size={15} color={c.danger} />
                      <Text style={[styles.removeText, { color: c.dangerText }]}>Take them out of the plan</Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            );
          })}

          <Pressable
            accessibilityRole="button"
            onPress={addMember}
            style={({ pressed }) => [styles.addRow, { backgroundColor: c.plumSoft, opacity: pressed ? 0.7 : 1 }]}>
            <Icon name="plus" size={16} color={c.plum} />
            {/*
              * "Add somebody" is an invitation and it reads as one — right up
              * until somebody is in the list, at which point the same words
              * start to look like the button that saves what you just typed.
              * Once there is anyone there it is simply Add.
              */}
            <Text style={[styles.addText, { color: c.plum }]}>
              {plan.members.length === 0 ? 'Add somebody' : 'Add'}
            </Text>
          </Pressable>

          {/* --- supplies and notes --------------------------------------- */}
          <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>WHERE THE SUPPLIES ARE</Text>
          <TextInput
            defaultValue={plan.suppliesAt}
            onChangeText={(text) => patch({ suppliesAt: text })}
            placeholder="Garage shelf, blue bins. Spare key under the step."
            placeholderTextColor={c.textSecondary}
            multiline
            style={[styles.field, styles.tall, { color: c.text, borderColor: c.cardBorder, backgroundColor: c.card }]}
          />

          <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>ANYTHING ELSE</Text>
          <TextInput
            defaultValue={plan.notes}
            onChangeText={(text) => patch({ notes: text })}
            placeholder="Anything the household needs written down"
            placeholderTextColor={c.textSecondary}
            multiline
            style={[styles.field, styles.tall, { color: c.text, borderColor: c.cardBorder, backgroundColor: c.card }]}
          />

          {/* --- what's still missing ------------------------------------- */}
          {gaps.length > 0 ? (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: c.text }]}>Still missing</Text>
              {gaps.map((gap) => (
                <Text key={gap} style={[styles.gap, { color: c.textSecondary }]}>
                  · {gap}
                </Text>
              ))}
            </View>
          ) : null}

          {/* --- sharing -------------------------------------------------- */}
          <Text style={[styles.sectionLabel, { color: c.plum, marginTop: 6 }]}>GET IT ONTO EVERY PHONE</Text>

          {/*
            * Holding one phone up to another is the way this actually happens
            * in a kitchen, and it needs no signal, no account and no app store.
            * Sending a file is the fallback, not the first move.
            */}
          <Pressable
            accessibilityRole="button"
            disabled={plan.members.length === 0}
            onPress={() => setShowCode((prev) => !prev)}
            style={({ pressed }) => [
              styles.primary,
              { backgroundColor: c.plumSoft, opacity: pressed || plan.members.length === 0 ? 0.5 : 1 },
            ]}>
            <Icon name="scan" size={17} color={c.plum} />
            <Text style={[styles.primaryText, { color: c.plum }]}>
              {showCode ? 'Hide the code' : 'Show a code for them to scan'}
            </Text>
          </Pressable>

          {showCode ? (
            planCodeFits(plan) ? (
              <View style={[styles.codeCard, { backgroundColor: '#FFFFFF', borderColor: c.cardBorder }]}>
                {/* True white behind it on purpose — some scanners will not
                    lock onto a code on a tinted ground. */}
                <QRCode value={buildPlanCode(plan)} size={228} backgroundColor="#FFFFFF" color="#000000" />
              </View>
            ) : (
              <View style={[styles.codeNote, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                <Text style={[styles.codeNoteText, { color: c.text }]}>
                  This plan has outgrown a scannable code.
                </Text>
                <Text style={[styles.codeNoteText, { color: c.textSecondary }]}>
                  A code this dense will not read reliably off a screen, and least of all in bad
                  light. Send it as a file instead — the button below does it.
                </Text>
              </View>
            )
          ) : null}

          {showCode && planCodeFits(plan) ? (
            <Text style={[styles.codeHint, { color: c.textSecondary }]}>
              On their phone: Family Plan, then &quot;Scan a code someone is showing me&quot;. No signal needed on either phone.
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            disabled={busy || plan.members.length === 0}
            onPress={sharePlan}
            style={({ pressed }) => [
              styles.primary,
              { backgroundColor: c.plumSoft, opacity: pressed || busy || plan.members.length === 0 ? 0.5 : 1 },
            ]}>
            {busy ? <ActivityIndicator size="small" color={c.plum} /> : <Icon name="upload" size={17} color={c.plum} />}
            <Text style={[styles.primaryText, { color: c.plum }]}>Send this plan to my family</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push({ pathname: '/meetup-scan' })}
            style={({ pressed }) => [
              styles.secondary,
              { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.6 : 1 },
            ]}>
            <Icon name="scan" size={17} color={c.text} />
            <Text style={[styles.secondaryText, { color: c.text }]}>Scan a code someone is showing me</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            disabled={busy}
            onPress={openPlan}
            style={({ pressed }) => [
              styles.secondary,
              { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed || busy ? 0.6 : 1 },
            ]}>
            <Icon name="download" size={17} color={c.text} />
            <Text style={[styles.secondaryText, { color: c.text }]}>Open a plan someone sent me</Text>
          </Pressable>

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            {sharedMedical > 0
              ? `${sharedMedical} ${sharedMedical === 1 ? 'person has' : 'people have'} medical info set to travel with the plan. Everyone else's stays on this phone.`
              : "Nobody's medical info is set to travel. The plan is names, numbers and jobs only."}
            {'\n'}
            {encrypted
              ? 'Stored encrypted on this device, and included in your backups.'
              : 'This browser has no secure keychain, so the plan is stored in the clear here. On the phone app it is encrypted.'}
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 18, paddingBottom: 44 },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: SIDE },

  headerBlock: { borderRadius: 20, padding: 16, gap: 6, marginBottom: 14 },
  eyebrow: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },

  loading: { marginVertical: 16 },

  notice: { borderWidth: 1.5, borderRadius: 12, padding: 12, marginBottom: 12 },
  noticeText: { fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.bodyMedium },

  card: { borderWidth: 1, borderRadius: 14, padding: 14, gap: 9, marginBottom: 12 },
  cardLabel: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
  hint: { fontSize: 12, lineHeight: 17.5, fontFamily: Fonts.body },
  gap: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body },

  sectionLabel: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, marginTop: 6, marginBottom: 8, marginLeft: 2 },
  fieldLabel: { fontSize: 10, fontFamily: Fonts.mono, letterSpacing: 1, marginTop: 10, marginBottom: 6, marginLeft: 2 },
  field: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: Fonts.body,
  },
  tall: { minHeight: 64, textAlignVertical: 'top' },

  member: { borderWidth: 1, borderRadius: 12, marginBottom: 7, overflow: 'hidden' },
  memberHead: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, paddingHorizontal: 12 },
  memberText: { flex: 1, gap: 2 },
  memberName: { fontSize: 14.5, fontFamily: Fonts.displaySemibold },
  memberMeta: { fontSize: 12, fontFamily: Fonts.body },
  memberBody: { borderTopWidth: 1, padding: 12, gap: 8 },
  pill: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 999 },
  pillText: { fontSize: 9, fontFamily: Fonts.mono, letterSpacing: 0.8 },

  medicalToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 11,
    padding: 11,
    marginTop: 4,
  },
  toggleLabel: { fontSize: 13.5, fontFamily: Fonts.bodySemibold },

  removeRow: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingTop: 6 },
  removeText: { fontSize: 13, fontFamily: Fonts.bodyMedium },

  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 3,
  },
  addText: { fontSize: 14, fontFamily: Fonts.bodyBold },

  codeCard: { alignItems: 'center', borderWidth: 1, borderRadius: 14, padding: 16, marginTop: 4 },
  codeNote: { gap: 6, borderWidth: 1, borderRadius: 14, padding: 14, marginTop: 4 },
  codeNoteText: { fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.body },
  codeHint: { fontSize: 12, lineHeight: 17, textAlign: 'center', marginTop: 2, fontFamily: Fonts.body },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 8,
  },
  primaryText: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
  secondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 13,
  },
  secondaryText: { fontSize: 14, fontFamily: Fonts.bodySemibold },

  footer: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
