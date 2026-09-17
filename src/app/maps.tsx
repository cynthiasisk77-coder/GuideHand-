import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import { OfflineMap } from '@/components/offline-map';
import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { Coords } from '@/lib/geo';
import {
  boundsAround,
  contains,
  estimateBytes,
  formatBytes,
  MAP_ATTRIBUTION,
  MapRegion,
  OFFLINE_MAPS_KEY,
  REGION_SIZES,
  RegionSize,
  regionId,
} from '@/lib/offlineMaps';
import { downloadRegion, listPackIds, removeRegion } from '@/lib/offlineMapPacks';
import type { MapMarker } from '@/components/offline-map';
import { appendMeetupPoint, loadMeetupPoints, newMeetupPointId } from '@/lib/meetupPoints';

// A GPS fix indoors, in a basement, or in airplane mode can simply never
// arrive — the call does not fail, it waits. Without a ceiling on it the
// person taps Download, watches a spinner forever, and is told nothing.
const LOCATION_TIMEOUT_MS = 20_000;

function withTimeout<T>(work: Promise<T>, ms: number): Promise<T | undefined> {
  return Promise.race([
    work,
    new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), ms)),
  ]);
}

type Download =
  | { kind: 'idle' }
  | { kind: 'working'; percent: number; label: string }
  | { kind: 'failed'; message: string };

/**
 * The name without the coordinates trailing off the end of it.
 *
 * Areas downloaded by earlier builds were named "The wider area — 30.78733,
 * -95.45621", because the default name was built out of the centre. Those rows
 * are still on people's phones. Nothing is lost by hiding the numbers: the row
 * underneath already says how big the area is, and a name somebody typed
 * themselves is left exactly as they typed it.
 */
function displayName(region: MapRegion): string {
  const withoutCoords = region.name.replace(/\s*[—-]\s*-?\d+\.\d+\s*,\s*-?\d+\.\d+\s*$/, "").trim();
  return withoutCoords || region.name;
}

export default function MapsScreen() {
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  const insets = useSafeAreaInsets();

  const [regions, setRegions] = useState<MapRegion[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [here, setHere] = useState<Coords | undefined>(undefined);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<RegionSize>(REGION_SIZES[1]);
  const [name, setName] = useState('');
  const [download, setDownload] = useState<Download>({ kind: 'idle' });
  const [viewing, setViewing] = useState<MapRegion | undefined>(undefined);
  // Once you hold maps, this screen is a list of them. The whole download
  // apparatus — find me, how big, name it — only comes out when you ask for
  // another one. "Why are they still there once downloaded? Shouldn't it just
  // be a list?" It should, and now it is.
  const [adding, setAdding] = useState(false);
  // The places you already agreed to meet, drawn on the map. Without these the
  // map is just a map; with them it is the thing you are actually navigating to.
  const [meetupPoints, setMeetupPoints] = useState<MapMarker[]>([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(OFFLINE_MAPS_KEY)
      .then(async (raw) => {
        const stored: MapRegion[] = raw ? JSON.parse(raw) : [];
        // The tiles are the truth, not our list. If a pack was cleared by the
        // OS or a reinstall, the row for it is a lie and gets dropped.
        const alive = await listPackIds();
        if (!mounted.current) return;
        setRegions(alive.length > 0 ? stored.filter((r) => alive.includes(r.id)) : stored);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted.current) setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(OFFLINE_MAPS_KEY, JSON.stringify(regions)).catch(() => {});
  }, [regions, loaded]);

  useEffect(() => {
    loadMeetupPoints()
      .then((saved) => {
        if (!mounted.current) return;
        setMeetupPoints(saved.map((p) => ({ id: p.id, label: p.label, latitude: p.latitude, longitude: p.longitude })));
      })
      .catch(() => {});
  }, []);

  // Tapping the map is now the ordinary way to set a meeting place. Typing
  // "34.05224, -118.24368" into a phone is not something anybody does under
  // pressure, and it was the only way in before this.
  const savePickedPlace = (coords: Coords, label: string) => {
    const point = {
      id: newMeetupPointId(),
      label,
      latitude: coords.latitude,
      longitude: coords.longitude,
      note: '',
    };
    // Shown straight away; the write is what makes it survive the screen closing.
    setMeetupPoints((prev) => [...prev, { id: point.id, label, latitude: point.latitude, longitude: point.longitude }]);
    appendMeetupPoint(point).catch(() => {});
  };

  const findMe = useCallback(async (): Promise<Coords | undefined> => {
    setLocating(true);
    setLocationError(undefined);
    try {
      // The permission prompt can hang too, not just the fix — a dialog nobody
      // answers never resolves. The ceiling covers the whole flow, so there is
      // no path through here that leaves a spinner turning forever.
      const permission = await withTimeout(Location.requestForegroundPermissionsAsync(), LOCATION_TIMEOUT_MS);
      if (!permission) {
        setLocationError('Location is not responding on this device. Try again, or check GuideHand\u2019s permissions in Settings.');
        return undefined;
      }
      if (permission.status !== 'granted') {
        setLocationError('GuideHand needs location permission to know which area to download.');
        return undefined;
      }
      const fix = await withTimeout(
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
        LOCATION_TIMEOUT_MS
      );
      if (!fix) {
        setLocationError(
          'No GPS fix yet. Step outside or near a window and try again \u2014 the chip needs a clear view of the sky, and it can take a minute the first time.'
        );
        return undefined;
      }
      const coords = { latitude: fix.coords.latitude, longitude: fix.coords.longitude };
      if (mounted.current) setHere(coords);
      return coords;
    } catch {
      setLocationError('Could not get a position. Step outside or near a window and try again.');
      return undefined;
    } finally {
      if (mounted.current) setLocating(false);
    }
  }, []);

  const start = async () => {
    // One tap should work from cold, so find the position first if we have to.
    const center = here ?? (await findMe());
    if (!center) return;

    const id = regionId();
    const label = name.trim() || `${size.label} — saved ${new Date().toLocaleDateString()}`;
    setDownload({ kind: 'working', percent: 0, label });

    try {
      // The pack id comes back from the tile store, which generates it. Storing
      // our own would give a row that cannot delete or verify the real thing.
      const packId = await downloadRegion(
        { id, center, radiusMiles: size.radiusMiles, minZoom: size.minZoom, maxZoom: size.maxZoom },
        (percent) => {
          if (mounted.current) setDownload({ kind: 'working', percent, label });
        }
      );
      if (!mounted.current) return;
      const sameSpot = (a: MapRegion) =>
        a.radiusMiles === size.radiusMiles &&
        Math.abs(a.center.latitude - center.latitude) < 0.01 &&
        Math.abs(a.center.longitude - center.longitude) < 0.01;

      const saved: MapRegion = {
        id: packId,
        name: label,
        center,
        radiusMiles: size.radiusMiles,
        minZoom: size.minZoom,
        maxZoom: size.maxZoom,
        downloadedAt: Date.now(),
      };
      // Any earlier copy of this same area is dropped, and its tiles with it.
      setRegions((prev) => {
        const replaced = prev.filter(sameSpot);
        replaced.forEach((old) => {
          if (old.id !== packId) removeRegion(old.id).catch(() => {});
        });
        return [saved, ...prev.filter((r) => !sameSpot(r))];
      });
      setName('');
      setDownload({ kind: 'idle' });
      setAdding(false);
      // "Where did my map go?" was a fair question: it went into a list row
      // with a chevron. Now it opens, so the answer is that you are looking
      // at it.
      setViewing(saved);
    } catch (error) {
      if (!mounted.current) return;
      setDownload({ kind: 'failed', message: error instanceof Error ? error.message : 'The download stopped.' });
    }
  };

  const forget = async (region: MapRegion) => {
    await removeRegion(region.id).catch(() => {});
    setRegions((prev) => prev.filter((r) => r.id !== region.id));
    setViewing((current) => (current?.id === region.id ? undefined : current));
  };

  const bounds = here ? boundsAround(here, size.radiusMiles) : undefined;
  const estimate = bounds ? estimateBytes(bounds, size.minZoom, size.maxZoom) : undefined;
  const busy = download.kind === 'working';
  const hasMaps = regions.length > 0;
  // With no maps yet there is nothing to hide behind, so the download controls
  // are the screen. With maps, they wait behind one button.
  const showDownload = !hasMaps || adding;

  if (viewing) {
    return (
      <View style={[styles.container, { backgroundColor: c.bg }]}>
        {/*
          * The header is hidden while a map is open, on purpose. With it
          * showing there were two back controls fighting: the header arrow,
          * which leaves the Maps screen altogether and lands you on the home
          * screen, and the map's own Back pill sitting just under it. The
          * header arrow was the bigger, more obvious one and it was the wrong
          * one — there was no way back to the list of downloaded maps.
          */}
        <Stack.Screen options={{ title: viewing.name, headerShown: false }} />
        <OfflineMap
          region={viewing}
          here={here}
          markers={meetupPoints.filter((point) => contains(viewing, point))}
          c={c}
          onClose={() => setViewing(undefined)}
          onPickPlace={savePickedPlace}
          suggestedLabel={`Meeting place ${meetupPoints.length + 1}`}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Offline Maps' }} />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View
            style={[
              styles.headerBlock,
              { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.blue },
            ]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Navigation</Text>
            <Text style={[styles.title, { color: c.text }]}>Offline Maps</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              Download the streets around you now, while you have signal. Once they are on the phone
              the map opens with no service at all — no data, no Wi-Fi, airplane mode, towers down.
            </Text>
          </View>

          {/* --- what you already hold ------------------------------------ */}
          {regions.length > 0 ? (
            <>
              <Text style={[styles.sectionLabel, { color: c.blue }]}>YOUR MAPS — TAP ONE TO OPEN IT</Text>
              {regions.map((region) => (
                <View
                  key={region.id}
                  style={[styles.regionRow, { backgroundColor: c.card, borderColor: c.cardBorder, borderLeftWidth: 4, borderLeftColor: c.sage }]}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => setViewing(region)}
                    style={({ pressed }) => [styles.regionMain, { opacity: pressed ? 0.7 : 1 }]}>
                    <Icon name="pin" size={17} color={c.sage} />
                    <View style={styles.regionText}>
                      <Text style={[styles.regionName, { color: c.text }]} numberOfLines={1}>
                        {displayName(region)}
                      </Text>
                      <Text style={[styles.regionMeta, { color: c.textSecondary }]}>
                        {region.radiusMiles} miles across · tap to open the map
                      </Text>
                    </View>
                    <Icon name="chevron" size={16} color={c.textSecondary} />
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${region.name}`}
                    onPress={() => forget(region)}
                    hitSlop={8}
                    style={({ pressed }) => [styles.regionDelete, { opacity: pressed ? 0.6 : 1 }]}>
                    <Icon name="trash" size={16} color={c.textSecondary} />
                  </Pressable>
                </View>
              ))}
            </>
          ) : null}

          {/* --- download a new one --------------------------------------- */}
          {hasMaps && !adding ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => setAdding(true)}
              style={({ pressed }) => [
                styles.primary,
                { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1, marginTop: 4 },
              ]}>
              <Icon name="plus" size={17} color={c.blue} />
              <Text style={[styles.primaryText, { color: c.blue }]}>Download another area</Text>
            </Pressable>
          ) : null}

          {showDownload ? (
            <>
            <Text style={[styles.sectionLabel, { color: c.blue, marginTop: hasMaps ? 20 : 0 }]}>
              DOWNLOAD AN AREA
            </Text>

            <Pressable
              accessibilityRole="button"
              disabled={locating || busy}
              onPress={findMe}
              style={({ pressed }) => [
                styles.locateRow,
                { backgroundColor: c.card, borderColor: here ? c.sage : c.cardBorder, opacity: pressed || locating ? 0.7 : 1 },
              ]}>
              {locating ? <ActivityIndicator size="small" color={c.blue} /> : <Icon name="compass" size={17} color={here ? c.sage : c.blue} />}
              <View style={styles.regionText}>
                <Text style={[styles.locateTitle, { color: c.text }]}>
                  {here ? 'Centred on where you are' : 'Use where I am now'}
                </Text>
                <Text style={[styles.regionMeta, { color: c.textSecondary }]}>
                  {here ? 'Got it — this is the area that will download' : 'Tap to get a position from the GPS chip'}
                </Text>
              </View>
            </Pressable>

            {locationError ? (
              <Text style={[styles.error, { color: c.dangerText }]}>{locationError}</Text>
            ) : null}

            <View style={styles.sizeWrap}>
              {REGION_SIZES.map((option) => {
                const active = size.id === option.id;
                const optionBounds = here ? boundsAround(here, option.radiusMiles) : undefined;
                const optionSize = optionBounds ? estimateBytes(optionBounds, option.minZoom, option.maxZoom) : undefined;
                return (
                  <Pressable
                    key={option.id}
                    // A radio, not a button: it is one choice out of a set, and
                    // "button" throws the selected state away — a screen reader
                    // was never told which size was picked.
                    accessibilityRole="radio"
                    aria-checked={active}
                    disabled={busy}
                    onPress={() => setSize(option)}
                    style={({ pressed }) => [
                      styles.sizeCard,
                      {
                        backgroundColor: active ? c.blueSoft : c.card,
                        borderColor: active ? c.blue : c.cardBorder,
                        borderWidth: active ? 2 : 1,
                        opacity: pressed ? 0.75 : 1,
                      },
                    ]}>
                    <View style={styles.sizeHead}>
                      {active ? <Icon name="check" size={15} color={c.blue} /> : null}
                      <Text style={[styles.sizeName, { color: c.text }]}>{option.label}</Text>
                      {optionSize !== undefined ? (
                        <Text style={[styles.sizeBytes, { color: active ? c.blue : c.textSecondary }]}>
                          ~{formatBytes(optionSize)}
                        </Text>
                      ) : null}
                    </View>
                    <Text style={[styles.sizeNote, { color: c.textSecondary }]}>{option.note}</Text>
                  </Pressable>
                );
              })}
            </View>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Call it something — Home, Mom's, the cabin"
              placeholderTextColor={c.textSecondary}
              editable={!busy}
              style={[styles.field, { color: c.text, borderColor: c.cardBorder, backgroundColor: c.card }]}
              returnKeyType="done"
            />

            {download.kind === 'working' ? (
              <View style={[styles.progressCard, { backgroundColor: c.card, borderColor: c.blue }]}>
                <View style={styles.progressHead}>
                  <ActivityIndicator size="small" color={c.blue} />
                  <Text style={[styles.progressText, { color: c.text }]}>
                    Downloading — {Math.round(download.percent)}%
                  </Text>
                </View>
                <View style={[styles.track, { backgroundColor: c.cardBorder }]}>
                  <View style={[styles.fill, { backgroundColor: c.blue, width: `${Math.max(2, download.percent)}%` }]} />
                </View>
                <Text style={[styles.progressNote, { color: c.textSecondary }]}>
                  Keep this screen open until it finishes. Stay on Wi-Fi if you can.
                </Text>
              </View>
            ) : (
              <Pressable
                accessibilityRole="button"
                disabled={busy}
                onPress={start}
                style={({ pressed }) => [
                  styles.primary,
                  { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 },
                ]}>
                <Icon name="download" size={17} color={c.blue} />
                <Text style={[styles.primaryText, { color: c.blue }]}>
                  {estimate !== undefined ? `Download this area (~${formatBytes(estimate)})` : 'Download this area'}
                </Text>
              </Pressable>
            )}

            {download.kind === 'failed' ? (
              <Text style={[styles.error, { color: c.dangerText }]}>{download.message}</Text>
            ) : null}

            {hasMaps && !busy ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  setAdding(false);
                  setDownload({ kind: 'idle' });
                }}
                style={({ pressed }) => [styles.quiet, { opacity: pressed ? 0.6 : 1 }]}>
                <Text style={[styles.quietText, { color: c.textSecondary }]}>Never mind — back to my maps</Text>
              </Pressable>
            ) : null}
            </>
          ) : null}

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            {MAP_ATTRIBUTION}. Map data is free and openly licensed — no account, no key, nothing
            that can expire out from under you.
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
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: SIDE },

  headerBlock: { borderRadius: 20, padding: 16, gap: 6, marginBottom: 14 },
  eyebrow: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },

  sectionLabel: { fontSize: 11, fontFamily: Fonts.mono, letterSpacing: 1.2, marginBottom: 8, marginLeft: 2 },

  regionRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, marginBottom: 7 },
  regionMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, paddingHorizontal: 12 },
  regionText: { flex: 1, gap: 2 },
  regionName: { fontSize: 14.5, fontFamily: Fonts.displaySemibold },
  regionMeta: { fontSize: 12, fontFamily: Fonts.body },
  regionDelete: { paddingHorizontal: 12, paddingVertical: 14 },

  locateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  locateTitle: { fontSize: 14, fontFamily: Fonts.bodySemibold },

  sizeWrap: { gap: 7, marginBottom: 10 },
  sizeCard: { borderRadius: 13, padding: 12, gap: 4 },
  sizeHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sizeName: { flex: 1, fontSize: 14.5, fontFamily: Fonts.displaySemibold },
  sizeBytes: { fontSize: 12, fontFamily: Fonts.monoMedium },
  sizeNote: { fontSize: 12.5, lineHeight: 17.5, fontFamily: Fonts.body },

  field: {
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    fontFamily: Fonts.body,
    marginBottom: 10,
  },

  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 14,
  },
  primaryText: { fontSize: 14.5, fontFamily: Fonts.bodyBold },

  progressCard: { borderWidth: 1.5, borderRadius: 13, padding: 13, gap: 9 },
  progressHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressText: { fontSize: 14, fontFamily: Fonts.bodyBold },
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill: { height: 6, borderRadius: 3 },
  progressNote: { fontSize: 12, lineHeight: 17, fontFamily: Fonts.body },

  quiet: { alignItems: 'center', paddingVertical: 13, marginTop: 2 },
  quietText: { fontSize: 13, fontFamily: Fonts.bodySemibold },

  error: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body, marginTop: 8, marginBottom: 4 },

  footer: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
