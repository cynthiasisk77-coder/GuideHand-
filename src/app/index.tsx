import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { TopoLines } from '@/components/topo-lines';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { CATEGORY_GROUPS, slugifyGroup } from '@/content/groups';
import { getCategorySummaries, getP0TopicsForCategories } from '@/lib/content';
import { search } from '@/lib/search';

const EMERGENCY_NAME = 'What To Do In An Emergency';
const FIRST_AID_CATEGORY = 'Medical & First Aid';
// Colour carries meaning here, so it is looked up rather than cycled. The old
// version rotated three accents by position, which made a category's colour an
// accident of where it happened to sit in the list.
const BAND_ACCENT = { critical: 'danger', severe: 'orange', recovery: 'blue' } as const;

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const [query, setQuery] = useState('');

  const categories = useMemo(() => getCategorySummaries(), []);
  const emergency = categories.find((cat) => cat.name === EMERGENCY_NAME);
  const firstAid = categories.find((cat) => cat.name === FIRST_AID_CATEGORY);
  const p0Count = useMemo(
    () => getP0TopicsForCategories(categories.map((cat) => cat.name)).length,
    [categories]
  );
  const results = useMemo(() => search(query), [query]);
  const searching = query.trim().length > 0;
  const resultCount = results.articles.length;

  return (
    <LinearGradient
      colors={[c.bgFadeTop, c.bg, c.bgFadeBottom]}
      locations={[0, 0.42, 1]}
      style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.pinnedTop}>
        <View style={styles.content}>
          {/* Everything a person reaches for first — the name, the search, and
              the two routes out of an emergency — sits inside one raised panel
              rather than floating loose on the page. */}
          <View style={[styles.pinnedPanel, { borderColor: c.panelEdge, backgroundColor: c.panelFill }]}>
          {/* The header fades from a lighter slate at the top down into very
              nearly the page colour at the bottom, so it resolves into the
              ground instead of ending on a hard line. No border either — the
              fade is what separates it. */}
          <LinearGradient
            colors={[c.headerFadeTop, c.headerBg, c.headerFadeBottom]}
            locations={[0, 0.55, 1]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={[styles.headerBlock, { borderLeftWidth: 6, borderLeftColor: c.blue }]}>
            {/* Texture, layered under everything: contour lines for the ground
                and the compass sitting on top of them, both faint. A header
                with nothing in it is just a coloured rectangle. */}
            <View style={styles.headerTopo} pointerEvents="none">
              <TopoLines width={420} height={200} color={c.text} opacity={0.16} />
            </View>
            <Text style={[styles.eyebrow, { color: c.onBlueSoft }]}>Field Guide</Text>
            <Text style={[styles.title, { color: c.onBlue }]}>GuideHand</Text>
            <Text style={[styles.subtitle, { color: c.onBlueSoft }]}>Emergency Preparedness Guide</Text>
            <View style={[styles.search, { backgroundColor: 'rgba(255,255,255,0.55)', borderWidth: 1, borderColor: 'rgba(0,0,0,0.12)' }]}>
              <Icon name="search" size={16} color={c.onBlueSoft} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search, or just say what's wrong"
                placeholderTextColor={c.onBlueSoft}
                style={[styles.searchInput, { color: c.onBlue }]}
                autoCorrect={false}
              />
              {/* clearButtonMode is iOS-only and renders nothing on Android,
                  which left people searching with no way back to the home
                  screen short of deleting every character. This is a real
                  button, on every platform, sized to be hit in a hurry. */}
              {searching ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Clear the search"
                  onPress={() => setQuery('')}
                  hitSlop={12}
                  style={({ pressed }) => [
                    styles.clearButton,
                    { backgroundColor: 'rgba(0,0,0,0.12)', opacity: pressed ? 0.6 : 1 },
                  ]}>
                  <Icon name="x" size={14} color={c.onBlue} strokeWidth={2.4} />
                </Pressable>
              ) : null}
            </View>
          </LinearGradient>

          <Text style={[styles.sectionLabel, styles.pinnedLabel, { color: c.onBgSoft }]}>NEED THIS FAST</Text>
          {emergency ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/emergency' })}
              style={({ pressed }) => [
                styles.row,
                styles.rowEmergency,
                {
                  backgroundColor: c.card,
                  borderColor: c.cardBorder,
                  borderLeftWidth: 7,
                  borderLeftColor: c.danger,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}>
              <View style={[styles.icon, styles.iconLarge, { borderWidth: 1.5, borderColor: c.danger }]}>
                <Icon name="siren" size={24} color={c.danger} />
              </View>
              <View style={styles.rowText}>
                <Text style={[styles.rowNameBold, { color: c.text }]}>What To Do In An Emergency</Text>
                <Text style={[styles.rowSub, { color: c.textSecondary }]}>{p0Count} life-threatening situations, step by step</Text>
              </View>
              <Icon name="chevron" size={18} color={c.textSecondary} />
            </Pressable>
          ) : null}

          {firstAid ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push({ pathname: '/category/[category]', params: { category: 'medical-and-first-aid' } })}
              style={({ pressed }) => [
                styles.row,
                styles.rowEmergency,
                {
                  backgroundColor: c.card,
                  borderColor: c.cardBorder,
                  borderLeftWidth: 7,
                  borderLeftColor: c.blue,
                  opacity: pressed ? 0.85 : 1,
                  marginBottom: 0,
                },
              ]}>
              <View style={[styles.icon, styles.iconLarge, { borderWidth: 1.5, borderColor: c.blue }]}>
                <Icon name="medical" size={24} color={c.blue} />
              </View>
              <View style={styles.rowText}>
                <Text style={[styles.rowNameBold, { color: c.text }]}>First Aid</Text>
                <Text style={[styles.rowSub, { color: c.textSecondary }]}>Medical care and first aid steps</Text>
              </View>
              <Icon name="chevron" size={18} color={c.textSecondary} />
            </Pressable>
          ) : null}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {searching ? (
            <View style={styles.section}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setQuery('')}
                style={({ pressed }) => [
                  styles.backRow,
                  { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.7 : 1 },
                ]}>
                <Icon name="back" size={16} color={c.text} />
                <Text style={[styles.backText, { color: c.text }]}>Back to everything</Text>
              </Pressable>
              {results.tools.length > 0 ? (
                <>
                  <Text style={[styles.sectionLabel, { color: c.onBgSoft }]}>JUMP TO</Text>
                  {results.tools.map((hit) => (
                    <Pressable
                      key={hit.tool.pathname}
                      accessibilityRole="button"
                      onPress={() => router.push(hit.tool.pathname as never)}
                      style={({ pressed }) => [
                        styles.row,
                        styles.rowAccented,
                        { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue, opacity: pressed ? 0.7 : 1 },
                      ]}>
                      <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.blue }]}>
                        <Icon name={hit.tool.icon} color={c.blue} />
                      </View>
                      <View style={styles.rowText}>
                        <Text style={[styles.rowName, { color: c.text }]}>{hit.tool.label}</Text>
                        <Text style={[styles.rowSub, { color: c.textSecondary }]}>{hit.tool.sub}</Text>
                      </View>
                      <Icon name="chevron" size={18} color={c.textSecondary} />
                    </Pressable>
                  ))}
                </>
              ) : null}

              <Text
                style={[
                  styles.sectionLabel,
                  results.tools.length > 0 ? styles.sectionLabelSpaced : null,
                  { color: c.blue },
                ]}>
                {resultCount === 0
                  ? `Nothing found for "${query.trim()}"`
                  : `${resultCount} result${resultCount === 1 ? '' : 's'}`}
              </Text>

              {resultCount === 0 && results.tools.length === 0 ? (
                <View style={[styles.noResults, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                  <Text style={[styles.noResultsText, { color: c.textSecondary }]}>
                    Try fewer words, or say it plainly — &quot;can&apos;t breathe&quot;, &quot;drank bleach&quot;,
                    &quot;power is out&quot;.
                  </Text>
                </View>
              ) : null}

              {/* The moment a search comes up short is exactly when someone
                  needs to ask in their own words, so the offer belongs here
                  rather than buried in a list further down the page. */}
              {resultCount < 3 ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/ask', params: { q: query.trim() } })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.blue }]}>
                    <Icon name="speak" color={c.blue} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Ask GuideHand instead</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>
                      Ask it in your own words and it answers from your own articles — and reads the
                      answer out loud
                    </Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              ) : null}

              {results.articles.map((hit) => (
                <Pressable
                  key={`${hit.doc.categorySlug}-${hit.doc.topicSlug}`}
                  accessibilityRole="button"
                  onPress={() =>
                    router.push({
                      pathname: '/article/[category]/[topic]',
                      params: { category: hit.doc.categorySlug, topic: hit.doc.topicSlug },
                    })
                  }
                  style={({ pressed }) => [
                    styles.row,
                    {
                      backgroundColor: c.card,
                      borderColor: hit.doc.priority === 'P0' ? c.danger : c.cardBorder,
                      borderWidth: hit.doc.priority === 'P0' ? 1.5 : 1,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>{hit.doc.title}</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>
                      {hit.doc.categoryName}
                      {hit.doc.fromPack ? ` · ${hit.doc.fromPack}` : ''}
                    </Text>
                  </View>
                  {hit.doc.priority === 'P0' ? (
                    <View style={[styles.urgentPill, { backgroundColor: c.dangerSoft }]}>
                      <Text style={[styles.urgentPillText, { color: c.dangerText }]}>URGENT</Text>
                    </View>
                  ) : null}
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              ))}
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.onBgSoft }]}>ASK IT</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: "/ask" })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.blue }]}>
                    <Icon name="speak" color={c.blue} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Ask GuideHand</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Ask in your own words, answered from your own articles — offline</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.onBgSoft }]}>FAMILY PLAN</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: "/family-plan" })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.plum, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.plum }]}>
                    <Icon name="family" color={c.plum} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Family Plan</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Who does what, and the number everyone calls</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              </View>

              
              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.onBgSoft }]}>LOOK SOMETHING UP</Text>
                {CATEGORY_GROUPS.map((group, i) => {
                  const accent = BAND_ACCENT[group.band];
                  return (
                    <Pressable
                      key={group.name}
                      accessibilityRole="button"
                      onPress={() => router.push({ pathname: '/group/[group]', params: { group: slugifyGroup(group.name) } })}
                      style={({ pressed }) => [
                        styles.row,
                        styles.rowAccented,
                        {
                          backgroundColor: c.card,
                          borderColor: c.cardBorder,
                          borderLeftWidth: 5,
                          borderLeftColor: c[accent],
                          opacity: pressed ? 0.7 : 1,
                        },
                      ]}>
                      <View style={[styles.icon, { borderWidth: 1.5, borderColor: c[accent] }]}>
                        <Icon name={group.icon} color={c[accent]} />
                      </View>
                      <View style={styles.rowText}>
                        <Text style={[styles.rowName, { color: c.text }]}>{group.name}</Text>
                        <Text style={[styles.rowSub, { color: c.textSecondary }]}>{group.sub}</Text>
                      </View>
                      <Icon name="chevron" size={18} color={c.textSecondary} />
                    </Pressable>
                  );
                })}
              </View>

<View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.onBgSoft }]}>FAMILY</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/category/[category]', params: { category: 'family-and-caregiving' } })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.plum, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.plum }]}>
                    <Icon name="family" color={c.plum} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Family & Caregiving</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Caregiving, family plans, and support</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: "/maps" })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.blue }]}>
                    <Icon name="compass" color={c.blue} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Offline Maps</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Download the streets around you now — the map then works with no signal at all</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: "/family-meetup" })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.plum, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.plum }]}>
                    <Icon name="pin" color={c.plum} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Family Meetup Point</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>How far you are from where you agreed to meet — works with no signal</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.onBgSoft }]}>SAVE FOR OFFLINE</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: "/content-packs" })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.blue }]}>
                    <Icon name="download" color={c.blue} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Content Packs</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Download extra reference now, so it&apos;s there when the signal isn&apos;t</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: "/backup" })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.blue }]}>
                    <Icon name="upload" color={c.blue} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Back Up &amp; Restore</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Save your lists and documents to a file, so a lost phone isn&apos;t a lost everything</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: c.onBgSoft }]}>YOUR SUPPLIES</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/supply-cache' })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.sage, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.sage }]}>
                    <Icon name="checklist" color={c.sage} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Home Supplies</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Check off what you have, add what&apos;s missing</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/inventory' })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.sage, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.sage }]}>
                    <Icon name="checklist" color={c.sage} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Supply Inventory</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Put numbers to it: how many days of water and food you actually have, and what expires next</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/medicine-tracker' })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.sage, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.sage }]}>
                    <Icon name="medical" color={c.sage} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Medicine & Prescriptions</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>Track what you have, dosages, and expiration dates</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push({ pathname: '/document-photos' })}
                  style={({ pressed }) => [
                    styles.row,
                    styles.rowAccented,
                    { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.sage, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <View style={[styles.icon, { borderWidth: 1.5, borderColor: c.sage }]}>
                    <Icon name="camera" color={c.sage} />
                  </View>
                  <View style={styles.rowText}>
                    <Text style={[styles.rowName, { color: c.text }]}>Document Photos</Text>
                    <Text style={[styles.rowSub, { color: c.textSecondary }]}>IDs, insurance, deeds — saved for offline access</Text>
                  </View>
                  <Icon name="chevron" size={18} color={c.textSecondary} />
                </Pressable>
              </View>

              <Text style={[styles.footer, { color: c.onBgSoft }]}>
                GuideHand is a reference, not a substitute for emergency services or medical care.
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const SIDE = Spacing.three;

const styles = StyleSheet.create({
  container: { flex: 1 },
  pinnedTop: { paddingTop: 26 },
  pinnedPanel: {
    borderWidth: 1.5,
    borderRadius: 22,
    padding: 11,
    // A lit top edge and a dark bottom one is the oldest trick for making a
    // surface read as raised: light comes from above, so the top catches it.
    borderTopWidth: 2.2,
    // On a dark ground a drop shadow barely registers, so the light edge
    // carries the lift and the shadow only deepens it.
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
  scroll: { paddingTop: 12, paddingBottom: 40 },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: SIDE,
  },
  headerBlock: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 11,
    paddingBottom: 12,
    gap: 8,
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  headerTopo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  eyebrow: {
    fontSize: 10,
    fontFamily: Fonts.mono,
    letterSpacing: 2.6,
    textTransform: 'uppercase',
  },
  title: { fontSize: 27, fontFamily: Fonts.display, letterSpacing: -0.4 },
  subtitle: { fontSize: 12.5, marginTop: -5, fontFamily: Fonts.bodyMedium },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  searchInput: { flex: 1, paddingVertical: 9, fontSize: 14.5, fontFamily: Fonts.body },
  clearButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  backText: { fontSize: 13.5, fontFamily: Fonts.bodySemibold },
  pinnedLabel: { marginBottom: 8, marginTop: 0 },
  section: { marginTop: 22 },
  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 2,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    // A pale card on a dark ground casts a real shadow. Without one it looks
    // printed onto the page rather than sitting on it.
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.38,
    shadowRadius: 9,
    elevation: 6,
  },
  rowEmergency: {
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  rowAccented: { borderWidth: 1.5 },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLarge: { width: 46, height: 46, borderRadius: 13 },
  rowText: { flex: 1, minWidth: 0 },
  rowName: { fontSize: 15, fontFamily: Fonts.displaySemibold },
  rowNameBold: { fontSize: 16.5, fontFamily: Fonts.display },
  rowSub: { fontSize: 12, marginTop: 1, fontFamily: Fonts.body },
  sectionLabelSpaced: { marginTop: 18 },
  urgentPill: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 999 },
  urgentPillText: { fontSize: 9, fontFamily: Fonts.mono, letterSpacing: 0.8 },
  noResults: { borderWidth: 1, borderRadius: 14, padding: 14 },
  noResultsText: { fontSize: 13.5, lineHeight: 19.5, fontFamily: Fonts.body },
  footer: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
