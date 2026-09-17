import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import {
  buildPackRows,
  CatalogResult,
  findOrphanedPacks,
  getFreeSpace,
  getInstalledPacks,
  installPack,
  loadCatalog,
  PackRow,
  removePack,
} from '@/lib/packs';
import { formatBytes, InstalledPack, PackListing } from '@/lib/packTypes';

interface PackScreenData {
  rows: PackRow[];
  orphans: InstalledPack[];
  source: CatalogResult['source'];
  usedBytes: number;
  freeBytes: number | undefined;
}

const EMPTY_SCREEN_DATA: PackScreenData = {
  rows: [],
  orphans: [],
  source: 'bundled',
  usedBytes: 0,
  freeBytes: undefined,
};

async function loadPackScreenData(): Promise<PackScreenData> {
  const [result, installed, free] = await Promise.all([
    loadCatalog(),
    getInstalledPacks(),
    getFreeSpace(),
  ]);
  return {
    rows: buildPackRows(result.catalog, installed),
    orphans: findOrphanedPacks(result.catalog, installed),
    source: result.source,
    usedBytes: installed.reduce((total, p) => total + (p.bytes || 0), 0),
    freeBytes: free,
  };
}

export default function ContentPacksScreen() {
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const [data, setData] = useState<PackScreenData | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ kind: 'ok' | 'bad'; text: string } | null>(null);

  const refresh = useCallback(async () => {
    setData(await loadPackScreenData());
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadPackScreenData()
      .then((next) => {
        if (!cancelled) setData(next);
      })
      .catch(() => {
        // Never leave the screen spinning: show an empty list rather than nothing.
        if (!cancelled) setData(EMPTY_SCREEN_DATA);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = data?.rows ?? [];
  const orphans = data?.orphans ?? [];
  const catalogSource = data?.source ?? null;
  const usedBytes = data?.usedBytes ?? 0;
  const freeBytes = data?.freeBytes;
  const loading = data === null;

  const onInstall = async (listing: PackListing) => {
    setBusyId(listing.id);
    setMessage(null);
    const result = await installPack(listing);
    if (result.ok) {
      setMessage({
        kind: 'ok',
        text: `${result.pack.name} is on this device — ${result.pack.articleCount} articles, ready with no signal.`,
      });
    } else {
      setMessage({ kind: 'bad', text: result.reason });
    }
    await refresh();
    setBusyId(null);
  };

  const onRemove = async (id: string, name: string) => {
    setBusyId(id);
    setMessage(null);
    await removePack(id);
    setMessage({ kind: 'ok', text: `${name} removed. You can download it again any time.` });
    await refresh();
    setBusyId(null);
  };

  const installedCount = rows.filter((r) => r.state !== 'available').length + orphans.length;

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Content Packs' }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue }]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Extra Reference</Text>
            <Text style={[styles.title, { color: c.text }]}>Content Packs</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              Download these while you have Wi-Fi and they stay on your phone for good. Everything GuideHand
              already shows you works without them — packs are extra depth, not the basics.
            </Text>
          </View>

          {/* ---- Storage ---- */}
          <View style={[styles.storageCard, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            <View style={styles.storageRow}>
              <View style={styles.storageItem}>
                <Text style={[styles.storageValue, { color: c.text }]}>{installedCount}</Text>
                <Text style={[styles.storageLabel, { color: c.textSecondary }]}>
                  {installedCount === 1 ? 'PACK' : 'PACKS'}
                </Text>
              </View>
              <View style={[styles.storageDivider, { backgroundColor: c.cardBorder }]} />
              <View style={styles.storageItem}>
                <Text style={[styles.storageValue, { color: c.text }]}>{formatBytes(usedBytes)}</Text>
                <Text style={[styles.storageLabel, { color: c.textSecondary }]}>ON THIS PHONE</Text>
              </View>
              {freeBytes !== undefined ? (
                <>
                  <View style={[styles.storageDivider, { backgroundColor: c.cardBorder }]} />
                  <View style={styles.storageItem}>
                    <Text style={[styles.storageValue, { color: c.text }]}>{formatBytes(freeBytes)}</Text>
                    <Text style={[styles.storageLabel, { color: c.textSecondary }]}>FREE</Text>
                  </View>
                </>
              ) : null}
            </View>
          </View>

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

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator color={c.blue} />
              <Text style={[styles.loadingText, { color: c.textSecondary }]}>Checking what&apos;s available…</Text>
            </View>
          ) : (
            <>
              <Text style={[styles.sectionLabel, { color: c.blue }]}>AVAILABLE</Text>

              {rows.map((row) => {
                const { listing, state, installed } = row;
                const busy = busyId === listing.id;
                const isInstalled = state !== 'available';
                return (
                  <View
                    key={listing.id}
                    style={[
                      styles.packCard,
                      {
                        backgroundColor: c.card,
                        borderColor: isInstalled ? c.sage : c.cardBorder,
                        borderWidth: isInstalled ? 1.6 : 1,
                        opacity: listing.published ? 1 : 0.62,
                      },
                    ]}>
                    <View style={styles.packHead}>
                      <View
                        style={[
                          styles.packIcon,
                          { backgroundColor: isInstalled ? c.sageSoft : c.blueSoft },
                        ]}>
                        <Icon name={listing.icon} size={19} color={isInstalled ? c.sage : c.blue} />
                      </View>
                      <View style={styles.packHeadText}>
                        <Text style={[styles.packName, { color: c.text }]}>{listing.name}</Text>
                        <Text style={[styles.packMeta, { color: c.textSecondary }]}>
                          {listing.published
                            ? [
                                listing.articleCount > 0 ? `${listing.articleCount} articles` : null,
                                listing.bytes > 0 ? formatBytes(listing.bytes) : null,
                              ]
                                .filter(Boolean)
                                .join(' · ') || 'Size unknown'
                            : 'Not published yet'}
                        </Text>
                      </View>
                      {isInstalled ? (
                        <View style={[styles.installedPill, { backgroundColor: c.sageSoft }]}>
                          <Icon name="check" size={12} color={c.sage} strokeWidth={2.6} />
                          <Text style={[styles.installedPillText, { color: c.sage }]}>
                            {state === 'update-available' ? 'UPDATE' : 'SAVED'}
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    {listing.summary ? (
                      <Text style={[styles.packSummary, { color: c.textSecondary }]}>{listing.summary}</Text>
                    ) : null}

                    <View style={[styles.licenseRow, { borderColor: c.cardBorder }]}>
                      <Text style={[styles.licenseLabel, { color: c.textSecondary }]}>SOURCE</Text>
                      <Text style={[styles.licenseText, { color: c.textSecondary }]}>{listing.license}</Text>
                    </View>

                    {!listing.published ? (
                      <Text style={[styles.notYet, { color: c.textSecondary }]}>
                        This one isn&apos;t ready to download yet. It&apos;ll appear here when it is.
                      </Text>
                    ) : (
                      <View style={styles.packActions}>
                        {state !== 'installed' ? (
                          <Pressable
                            accessibilityRole="button"
                            disabled={busy}
                            onPress={() => onInstall(listing)}
                            style={({ pressed }) => [
                              styles.actionButton,
                              { backgroundColor: c.blueSoft, opacity: pressed || busy ? 0.6 : 1 },
                            ]}>
                            {busy ? (
                              <ActivityIndicator size="small" color={c.blue} />
                            ) : (
                              <Icon name="download" size={15} color={c.blue} />
                            )}
                            <Text style={[styles.actionText, { color: c.blue }]}>
                              {busy
                                ? 'Downloading…'
                                : state === 'update-available'
                                  ? 'Update'
                                  : 'Download'}
                            </Text>
                          </Pressable>
                        ) : null}
                        {installed ? (
                          <Pressable
                            accessibilityRole="button"
                            disabled={busy}
                            onPress={() => onRemove(listing.id, listing.name)}
                            style={({ pressed }) => [
                              styles.actionButton,
                              styles.removeButton,
                              { borderColor: c.cardBorder, opacity: pressed || busy ? 0.6 : 1 },
                            ]}>
                            <Icon name="trash" size={15} color={c.textSecondary} />
                            <Text style={[styles.actionText, { color: c.textSecondary }]}>Remove</Text>
                          </Pressable>
                        ) : null}
                      </View>
                    )}
                  </View>
                );
              })}

              {orphans.length > 0 ? (
                <>
                  <Text style={[styles.sectionLabel, styles.sectionSpaced, { color: c.blue }]}>
                    ALSO ON THIS PHONE
                  </Text>
                  {orphans.map((pack) => (
                    <View
                      key={pack.id}
                      style={[styles.packCard, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
                      <View style={styles.packHead}>
                        <View style={[styles.packIcon, { backgroundColor: c.sageSoft }]}>
                          <Icon name="plan" size={19} color={c.sage} />
                        </View>
                        <View style={styles.packHeadText}>
                          <Text style={[styles.packName, { color: c.text }]}>{pack.name}</Text>
                          <Text style={[styles.packMeta, { color: c.textSecondary }]}>
                            {pack.articleCount} articles · {formatBytes(pack.bytes)}
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.packSummary, { color: c.textSecondary }]}>
                        Downloaded, but no longer in the catalog. It still works — it just won&apos;t get updates.
                      </Text>
                      <View style={styles.packActions}>
                        <Pressable
                          accessibilityRole="button"
                          disabled={busyId === pack.id}
                          onPress={() => onRemove(pack.id, pack.name)}
                          style={({ pressed }) => [
                            styles.actionButton,
                            styles.removeButton,
                            { borderColor: c.cardBorder, opacity: pressed ? 0.6 : 1 },
                          ]}>
                          <Icon name="trash" size={15} color={c.textSecondary} />
                          <Text style={[styles.actionText, { color: c.textSecondary }]}>Remove</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))}
                </>
              ) : null}

              {catalogSource && catalogSource !== 'network' ? (
                <Text style={[styles.offlineNote, { color: c.textSecondary }]}>
                  Couldn&apos;t reach the internet to check for new packs, so this is the list GuideHand already
                  had. Anything already downloaded still works.
                </Text>
              ) : null}
            </>
          )}

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            Packs are stored on this device. Downloading one needs internet; using it never does.
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
  eyebrow: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },

  storageCard: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 14 },
  storageRow: { flexDirection: 'row', alignItems: 'center' },
  storageItem: { flex: 1, alignItems: 'center', gap: 2 },
  storageDivider: { width: 1, height: 30 },
  storageValue: { fontSize: 17, fontFamily: Fonts.display },
  storageLabel: { fontSize: 9, fontFamily: Fonts.mono, letterSpacing: 1 },

  messageBox: { borderWidth: 1.4, borderRadius: 12, padding: 12, marginBottom: 14 },
  messageText: { fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.bodyMedium },

  loading: { alignItems: 'center', gap: 10, paddingVertical: 34 },
  loadingText: { fontSize: 13, fontFamily: Fonts.body },

  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 2,
  },
  sectionSpaced: { marginTop: 20 },

  packCard: { borderRadius: 14, padding: 14, marginBottom: 10, gap: 9 },
  packHead: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  packIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  packHeadText: { flex: 1, minWidth: 0, gap: 1 },
  packName: { fontSize: 15.5, fontFamily: Fonts.displaySemibold },
  packMeta: { fontSize: 12, fontFamily: Fonts.monoMedium },
  installedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  installedPillText: { fontSize: 9.5, fontFamily: Fonts.mono, letterSpacing: 0.8 },

  packSummary: { fontSize: 13, lineHeight: 18.5, fontFamily: Fonts.body },

  licenseRow: { borderTopWidth: 1, paddingTop: 9, gap: 2 },
  licenseLabel: { fontSize: 9, fontFamily: Fonts.mono, letterSpacing: 1 },
  licenseText: { fontSize: 12, lineHeight: 16.5, fontFamily: Fonts.body },

  notYet: { fontSize: 12.5, lineHeight: 17.5, fontFamily: Fonts.body, fontStyle: 'italic' },

  packActions: { flexDirection: 'row', gap: 8 },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
    paddingVertical: 10,
  },
  removeButton: { borderWidth: 1, backgroundColor: 'transparent' },
  actionText: { fontSize: 13.5, fontFamily: Fonts.bodyBold },

  offlineNote: {
    fontSize: 12.5,
    lineHeight: 18,
    fontFamily: Fonts.body,
    marginTop: 8,
    textAlign: 'center',
  },

  footer: {
    marginTop: 22,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
