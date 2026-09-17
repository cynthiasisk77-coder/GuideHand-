import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import {
  backupFileName,
  BackupFile,
  BackupInfo,
  buildBackup,
  inspectBackup,
  restoreBackup,
  summarizeCurrentData,
} from '@/lib/backup';
import { pickBackupFile, saveBackupFile } from '@/lib/backupFile';
import {
  deleteSnapshot,
  describeExportAge,
  ExportAge,
  getLastExport,
  getSnapshots,
  recordExport,
  restoreSnapshot,
  SnapshotMeta,
} from '@/lib/autoBackup';
import { formatBytes } from '@/lib/packTypes';

type Choice = 'everything' | 'no-photos';

// Date.now() can't be called straight from a component body under the React
// Compiler's purity rule.
function rightNow(): number {
  return Date.now();
}

function formatTakenAt(at: number): string {
  const date = new Date(at);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
    ', ' +
    date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

interface PendingRestore {
  file: BackupFile;
  info: BackupInfo;
  name: string;
}

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'an unknown date';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BackupScreen() {
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const [summary, setSummary] = useState<{ label: string; count: number }[] | null>(null);
  const [choice, setChoice] = useState<Choice>('everything');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'bad'; text: string } | null>(null);

  const [pending, setPending] = useState<PendingRestore | null>(null);
  const [restorePassword, setRestorePassword] = useState('');
  const [snapshots, setSnapshots] = useState<SnapshotMeta[]>([]);
  const [exportAge, setExportAge] = useState<ExportAge | null>(null);

  const refreshSummary = useCallback(async () => {
    const [next, saved, lastExport] = await Promise.all([
      summarizeCurrentData(),
      getSnapshots(),
      getLastExport(),
    ]);
    setSummary(next);
    setSnapshots(saved);
    setExportAge(describeExportAge(lastExport, rightNow()));
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([summarizeCurrentData(), getSnapshots(), getLastExport()])
      .then(([next, saved, lastExport]) => {
        if (cancelled) return;
        setSummary(next);
        setSnapshots(saved);
        setExportAge(describeExportAge(lastExport, rightNow()));
      })
      .catch(() => {
        if (!cancelled) setSummary([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const hasData = (summary?.length ?? 0) > 0;

  const onBackUp = async () => {
    setBusy(true);
    setMessage(null);
    const includeDocuments = choice === 'everything';
    const built = await buildBackup({ includeDocuments, password: includeDocuments ? password : undefined });
    if (!built.ok) {
      setMessage({ kind: 'bad', text: built.reason });
      setBusy(false);
      return;
    }
    const saved = await saveBackupFile(backupFileName(), built.text);
    if (saved.ok) {
      await recordExport(rightNow());
      setMessage({
        kind: 'ok',
        text: `Backup made — ${formatBytes(built.bytes)}, ${built.sections} ${
          built.sections === 1 ? 'thing' : 'things'
        } saved.${
          includeDocuments
            ? ' Keep the password somewhere safe: without it this file cannot be opened, by you or anyone else.'
            : ''
        }`,
      });
      setPassword('');
      await refreshSummary();
    } else {
      setMessage({ kind: 'bad', text: saved.reason });
    }
    setBusy(false);
  };

  const onRestoreSnapshot = async (snap: SnapshotMeta) => {
    setBusy(true);
    setMessage(null);
    const result = await restoreSnapshot(snap.id);
    setMessage(
      result.ok
        ? { kind: 'ok', text: `Put back the copy from ${formatTakenAt(snap.takenAt)}: ${result.restored.join(', ')}.` }
        : { kind: 'bad', text: result.reason }
    );
    await refreshSummary();
    setBusy(false);
  };

  const onDeleteSnapshot = async (snap: SnapshotMeta) => {
    setBusy(true);
    await deleteSnapshot(snap.id);
    await refreshSummary();
    setBusy(false);
  };

  const onPickFile = async () => {
    setBusy(true);
    setMessage(null);
    const picked = await pickBackupFile();
    if (!picked.ok) {
      if (!picked.cancelled) setMessage({ kind: 'bad', text: picked.reason });
      setBusy(false);
      return;
    }
    const inspected = inspectBackup(picked.contents);
    if (!inspected.ok) {
      setMessage({ kind: 'bad', text: inspected.reason });
      setBusy(false);
      return;
    }
    setPending({ file: inspected.file, info: inspected.info, name: picked.name });
    setRestorePassword('');
    setBusy(false);
  };

  const onConfirmRestore = async () => {
    if (!pending) return;
    setBusy(true);
    setMessage(null);
    const result = await restoreBackup(pending.file, pending.info.encrypted ? restorePassword : undefined);
    if (result.ok) {
      setMessage({ kind: 'ok', text: `Restored: ${result.restored.join(', ')}.` });
      setPending(null);
      setRestorePassword('');
      await refreshSummary();
    } else {
      setMessage({ kind: 'bad', text: result.reason });
    }
    setBusy(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Back Up & Restore' }} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue }]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Your Data</Text>
            <Text style={[styles.title, { color: c.text }]}>Back Up &amp; Restore</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              Everything you save in GuideHand lives on this phone and nowhere else. Lose the phone and it goes with
              it. A backup makes one file you keep yourself — no account, nothing sent to us.
            </Text>
          </View>

          {exportAge && exportAge.stale ? (
            <View style={[styles.staleBanner, { backgroundColor: c.dangerSoft, borderColor: c.danger }]}>
              <Icon name="siren" size={17} color={c.danger} />
              <Text style={[styles.staleText, { color: c.dangerText }]}>{exportAge.text}</Text>
            </View>
          ) : exportAge ? (
            <View style={[styles.freshBanner, { backgroundColor: c.sageSoft, borderColor: c.sage }]}>
              <Icon name="check" size={15} color={c.sage} strokeWidth={2.4} />
              <Text style={[styles.freshText, { color: c.sageText }]}>{exportAge.text}</Text>
            </View>
          ) : null}

          {message ? (
            <View
              style={[
                styles.messageBox,
                {
                  backgroundColor: message.kind === 'ok' ? c.sageSoft : c.dangerSoft,
                  borderColor: message.kind === 'ok' ? c.sage : c.danger,
                },
              ]}>
              <Text style={[styles.messageText, { color: message.kind === 'ok' ? c.sage : c.danger }]}>
                {message.text}
              </Text>
            </View>
          ) : null}

          {/* ---- What's on the phone ---- */}
          <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            <Text style={[styles.cardLabel, { color: c.text }]}>On this phone right now</Text>
            {summary === null ? (
              <ActivityIndicator color={c.blue} style={styles.inlineSpinner} />
            ) : hasData ? (
              summary.map((item) => (
                <View key={item.label} style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: c.textSecondary }]}>{item.label}</Text>
                  <Text style={[styles.summaryCount, { color: c.text }]}>{item.count}</Text>
                </View>
              ))
            ) : (
              <Text style={[styles.emptyText, { color: c.textSecondary }]}>
                Nothing saved yet. Once you add medicines, a meeting place, or document photos, back them up here.
              </Text>
            )}
          </View>

          {/* ---- Make a backup ---- */}
          <Text style={[styles.sectionLabel, { color: c.blue }]}>MAKE A BACKUP</Text>

          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ selected: choice === 'everything' }}
            onPress={() => setChoice('everything')}
            style={({ pressed }) => [
              styles.optionCard,
              {
                backgroundColor: c.card,
                borderColor: choice === 'everything' ? c.blue : c.cardBorder,
                borderWidth: choice === 'everything' ? 1.8 : 1,
                opacity: pressed ? 0.8 : 1,
              },
            ]}>
            <View style={styles.optionHead}>
              <View
                style={[
                  styles.radio,
                  { borderColor: choice === 'everything' ? c.blue : c.cardBorder },
                ]}>
                {choice === 'everything' ? <View style={[styles.radioDot, { backgroundColor: c.blue }]} /> : null}
              </View>
              <Text style={[styles.optionTitle, { color: c.text }]}>Everything, including document photos</Text>
            </View>
            <Text style={[styles.optionBody, { color: c.textSecondary }]}>
              Needs a password, because this file will hold your passport and ID photos and it is going somewhere
              less protected than your phone.
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ selected: choice === 'no-photos' }}
            onPress={() => setChoice('no-photos')}
            style={({ pressed }) => [
              styles.optionCard,
              {
                backgroundColor: c.card,
                borderColor: choice === 'no-photos' ? c.blue : c.cardBorder,
                borderWidth: choice === 'no-photos' ? 1.8 : 1,
                opacity: pressed ? 0.8 : 1,
              },
            ]}>
            <View style={styles.optionHead}>
              <View
                style={[styles.radio, { borderColor: choice === 'no-photos' ? c.blue : c.cardBorder }]}>
                {choice === 'no-photos' ? <View style={[styles.radioDot, { backgroundColor: c.blue }]} /> : null}
              </View>
              <Text style={[styles.optionTitle, { color: c.text }]}>Everything except document photos</Text>
            </View>
            <Text style={[styles.optionBody, { color: c.textSecondary }]}>
              Your supply list, medicines and meeting places. No password needed, and no password to forget.
            </Text>
          </Pressable>

          {choice === 'everything' ? (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: c.text }]}>Password for this backup</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="At least 8 characters"
                placeholderTextColor={c.textSecondary}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
              />
              <Text style={[styles.warning, { color: c.textSecondary }]}>
                Write this down somewhere that isn&apos;t your phone. If you forget it, nobody can open the backup —
                not us, not anyone. That is what makes it safe.
              </Text>
            </View>
          ) : null}

          <Pressable
            accessibilityRole="button"
            disabled={busy || !hasData}
            onPress={onBackUp}
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: c.blueSoft, opacity: pressed || busy || !hasData ? 0.5 : 1 },
            ]}>
            {busy ? <ActivityIndicator size="small" color={c.blue} /> : <Icon name="download" size={16} color={c.blue} />}
            <Text style={[styles.primaryButtonText, { color: c.blue }]}>
              {busy ? 'Working…' : 'Make my backup file'}
            </Text>
          </Pressable>

          {/* ---- Automatic copies kept on the phone ---- */}
          <Text style={[styles.sectionLabel, styles.sectionSpaced, { color: c.blue }]}>
            SAVED AUTOMATICALLY ON THIS PHONE
          </Text>
          <Text style={[styles.sectionNote, { color: c.textSecondary }]}>
            GuideHand keeps its own copies as you go, without being asked. These undo an accidental delete or a bad
            edit. They do not survive losing the phone — that is what the file above is for.
          </Text>

          {snapshots.length === 0 ? (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={[styles.emptyText, { color: c.textSecondary }]}>
                No copies yet. One is kept the next time you change something.
              </Text>
            </View>
          ) : (
            snapshots.map((snap) => (
              <View key={snap.id} style={[styles.snapRow, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                <View style={styles.snapBody}>
                  <Text style={[styles.snapWhen, { color: c.text }]}>{formatTakenAt(snap.takenAt)}</Text>
                  <Text style={[styles.snapWhat, { color: c.textSecondary }]}>
                    {Object.entries(snap.contents)
                      .map(([label, count]) => `${count} ${label.toLowerCase()}`)
                      .join(' · ') || snap.trigger}
                  </Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  disabled={busy}
                  onPress={() => onRestoreSnapshot(snap)}
                  style={({ pressed }) => [
                    styles.snapButton,
                    { backgroundColor: c.blueSoft, opacity: pressed || busy ? 0.6 : 1 },
                  ]}>
                  <Text style={[styles.snapButtonText, { color: c.blue }]}>Put back</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Delete this saved copy"
                  disabled={busy}
                  onPress={() => onDeleteSnapshot(snap)}
                  hitSlop={8}
                  style={styles.snapDelete}>
                  <Icon name="trash" size={15} color={c.textSecondary} />
                </Pressable>
              </View>
            ))
          )}

          {/* ---- Restore ---- */}
          <Text style={[styles.sectionLabel, styles.sectionSpaced, { color: c.blue }]}>RESTORE FROM A FILE</Text>

          {pending ? (
            <View style={[styles.card, { backgroundColor: c.card, borderColor: c.danger, borderWidth: 1.8 }]}>
              <Text style={[styles.cardLabel, { color: c.text }]}>{pending.name}</Text>
              <Text style={[styles.optionBody, { color: c.textSecondary }]}>
                Made on {formatWhen(pending.info.createdAt)}.{' '}
                {pending.info.includesDocuments ? 'Includes document photos.' : 'Does not include document photos.'}
              </Text>
              <View style={[styles.replaceWarning, { backgroundColor: c.dangerSoft, borderColor: c.danger }]}>
                <Text style={[styles.replaceWarningText, { color: c.dangerText }]}>
                  Restoring replaces what is on this phone now with what is in this file. Anything you have added
                  since the backup was made will be gone.
                </Text>
              </View>

              {pending.info.encrypted ? (
                <TextInput
                  value={restorePassword}
                  onChangeText={setRestorePassword}
                  placeholder="The password for this backup"
                  placeholderTextColor={c.textSecondary}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
                />
              ) : null}

              <View style={styles.confirmRow}>
                <Pressable
                  accessibilityRole="button"
                  disabled={busy}
                  onPress={onConfirmRestore}
                  style={({ pressed }) => [
                    styles.confirmButton,
                    { backgroundColor: c.dangerSoft, opacity: pressed || busy ? 0.6 : 1 },
                  ]}>
                  <Text style={[styles.confirmText, { color: c.dangerText }]}>
                    {busy ? 'Restoring…' : 'Yes, replace what is on this phone'}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  disabled={busy}
                  onPress={() => {
                    setPending(null);
                    setRestorePassword('');
                  }}
                  style={({ pressed }) => [
                    styles.confirmButton,
                    styles.cancelButton,
                    { borderColor: c.cardBorder, opacity: pressed ? 0.6 : 1 },
                  ]}>
                  <Text style={[styles.confirmText, { color: c.textSecondary }]}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <Pressable
              accessibilityRole="button"
              disabled={busy}
              onPress={onPickFile}
              style={({ pressed }) => [
                styles.primaryButton,
                styles.outlineButton,
                { borderColor: c.cardBorder, opacity: pressed || busy ? 0.6 : 1 },
              ]}>
              <Icon name="upload" size={16} color={c.text} />
              <Text style={[styles.primaryButtonText, { color: c.text }]}>Choose a backup file</Text>
            </Pressable>
          )}

          {Platform.OS === 'web' ? (
            <Text style={[styles.platformNote, { color: c.textSecondary }]}>
              Choosing a file to restore only works in the phone app.
            </Text>
          ) : null}

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            The backup file is yours. GuideHand has no account, no server, and never sees it.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingTop: 18, paddingBottom: 40 },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: SIDE,
  },
  headerBlock: { borderRadius: 20, padding: 16, gap: 6, marginBottom: 14 },
  eyebrow: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },

  messageBox: { borderWidth: 1.4, borderRadius: 12, padding: 12, marginBottom: 14 },
  messageText: { fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.bodyMedium },

  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 10, gap: 9 },
  cardLabel: { fontSize: 13.5, fontFamily: Fonts.bodyBold },
  inlineSpinner: { alignSelf: 'flex-start' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 13.5, fontFamily: Fonts.body },
  summaryCount: { fontSize: 15, fontFamily: Fonts.displaySemibold },
  emptyText: { fontSize: 13.5, lineHeight: 19, fontFamily: Fonts.body },

  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 10,
    marginLeft: 2,
  },
  sectionSpaced: { marginTop: 26 },
  sectionNote: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body, marginBottom: 10, marginLeft: 2 },

  staleBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1.6,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  staleText: { flex: 1, fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.bodyMedium },
  freshBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  freshText: { flex: 1, fontSize: 12.5, fontFamily: Fonts.bodyMedium },

  snapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  snapBody: { flex: 1, minWidth: 0, gap: 1 },
  snapWhen: { fontSize: 14, fontFamily: Fonts.displaySemibold },
  snapWhat: { fontSize: 12, fontFamily: Fonts.body },
  snapButton: { borderRadius: 9, paddingVertical: 8, paddingHorizontal: 14 },
  snapButtonText: { fontSize: 13, fontFamily: Fonts.bodyBold },
  snapDelete: { paddingVertical: 8, paddingLeft: 2 },

  optionCard: { borderRadius: 14, padding: 14, marginBottom: 8, gap: 7 },
  optionHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  optionTitle: { flex: 1, fontSize: 14.5, fontFamily: Fonts.displaySemibold },
  optionBody: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: Fonts.body,
  },
  warning: { fontSize: 12, lineHeight: 17.5, fontFamily: Fonts.body },

  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 11,
    paddingVertical: 13,
    marginTop: 4,
  },
  outlineButton: { borderWidth: 1.4, backgroundColor: 'transparent' },
  primaryButtonText: { fontSize: 14.5, fontFamily: Fonts.bodyBold },

  replaceWarning: { borderWidth: 1.2, borderRadius: 11, padding: 11 },
  replaceWarningText: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.bodyMedium },
  confirmRow: { gap: 8, marginTop: 2 },
  confirmButton: { borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  cancelButton: { borderWidth: 1, backgroundColor: 'transparent' },
  confirmText: { fontSize: 13.5, fontFamily: Fonts.bodyBold },

  platformNote: { fontSize: 12, lineHeight: 17, fontFamily: Fonts.body, marginTop: 8, textAlign: 'center' },

  footer: {
    marginTop: 22,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
