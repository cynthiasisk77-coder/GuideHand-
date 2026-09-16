import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import { Icon } from '@/components/icon';
import { MeetupCompass } from '@/components/meetup-compass';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { findTopicByTitle } from '@/lib/content';
import type { Coords } from '@/lib/geo';
import {
  bearingDegrees,
  compassLong,
  compassShort,
  distanceMiles,
  formatCoords,
  formatDistance,
  formatWalkingTime,
  parseCoords,
} from '@/lib/geo';

const STORAGE_KEY = 'guidehand.family-meetup.v1';
const ACTIVE_KEY = 'guidehand.family-meetup.active.v1';
const GUIDANCE_TOPIC = 'Family communication plan and rendezvous points';

interface MeetupPoint {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  note: string;
}

type LocationState =
  | { kind: 'idle' }
  | { kind: 'locating' }
  | { kind: 'denied' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; latitude: number; longitude: number; accuracy: number | null; takenAt: number };

// Date.now()/Math.random() can't be called straight from a component body —
// the React Compiler's purity rule flags it. Module scope keeps it legal.
function generatePointId(): string {
  return `meet-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function currentTimestamp(): number {
  return Date.now();
}

function formatClockTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function FamilyMeetupScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const [points, setPoints] = useState<MeetupPoint[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [location, setLocation] = useState<LocationState>({ kind: 'idle' });
  const [heading, setHeading] = useState<number | null>(null);

  const [labelDraft, setLabelDraft] = useState('');
  const [coordsDraft, setCoordsDraft] = useState('');
  const [noteDraft, setNoteDraft] = useState('');
  const [addError, setAddError] = useState('');

  useEffect(() => {
    Promise.all([AsyncStorage.getItem(STORAGE_KEY), AsyncStorage.getItem(ACTIVE_KEY)])
      .then(([rawPoints, rawActive]) => {
        if (rawPoints) setPoints(JSON.parse(rawPoints));
        if (rawActive) setActiveId(rawActive);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(points)).catch(() => {});
  }, [points, loaded]);

  useEffect(() => {
    if (!loaded) return;
    if (activeId) AsyncStorage.setItem(ACTIVE_KEY, activeId).catch(() => {});
    else AsyncStorage.removeItem(ACTIVE_KEY).catch(() => {});
  }, [activeId, loaded]);

  const refreshLocation = useCallback(async (): Promise<Coords | undefined> => {
    setLocation({ kind: 'locating' });
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        setLocation({ kind: 'denied' });
        return undefined;
      }
      const fix = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation({
        kind: 'ready',
        latitude: fix.coords.latitude,
        longitude: fix.coords.longitude,
        accuracy: fix.coords.accuracy ?? null,
        takenAt: currentTimestamp(),
      });
      return { latitude: fix.coords.latitude, longitude: fix.coords.longitude };
    } catch (err) {
      setLocation({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Could not get a GPS fix.',
      });
      return undefined;
    }
  }, []);

  // The phone's compass, when it has one. Without it the needle still works —
  // it just points relative to true north instead of to the top of the phone.
  useEffect(() => {
    if (location.kind !== 'ready') return;
    let subscription: Location.LocationSubscription | undefined;
    let cancelled = false;

    Location.watchHeadingAsync((reading) => {
      const degrees = reading.trueHeading >= 0 ? reading.trueHeading : reading.magHeading;
      if (typeof degrees === 'number' && degrees >= 0) setHeading(degrees);
    })
      .then((sub) => {
        if (cancelled) sub.remove();
        else subscription = sub;
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [location.kind]);

  const guidance = useMemo(() => findTopicByTitle(GUIDANCE_TOPIC), []);
  const active = points.find((p) => p.id === activeId) ?? points[0];
  const here = location.kind === 'ready' ? location : undefined;

  const leg = useMemo(() => {
    if (!here || !active) return undefined;
    const from = { latitude: here.latitude, longitude: here.longitude };
    const to = { latitude: active.latitude, longitude: active.longitude };
    const miles = distanceMiles(from, to);
    const bearing = bearingDegrees(from, to);
    return { miles, bearing };
  }, [here, active]);

  const addPoint = (coords: { latitude: number; longitude: number }, fallbackLabel: string) => {
    const point: MeetupPoint = {
      id: generatePointId(),
      label: labelDraft.trim() || fallbackLabel,
      latitude: coords.latitude,
      longitude: coords.longitude,
      note: noteDraft.trim(),
    };
    setPoints((prev) => [...prev, point]);
    setActiveId(point.id);
    setLabelDraft('');
    setCoordsDraft('');
    setNoteDraft('');
    setAddError('');
  };

  const addTypedPoint = () => {
    const parsed = parseCoords(coordsDraft);
    if (!parsed) {
      setAddError('Enter coordinates as latitude, longitude — for example 34.05224, -118.24368');
      return;
    }
    addPoint(parsed, `Meeting place ${points.length + 1}`);
  };

  const addCurrentPosition = async () => {
    setAddError('');
    const fix = await refreshLocation();
    if (fix) {
      addPoint(fix, 'Where I saved it');
      return;
    }
    setAddError(
      'Could not read your location, so nothing was saved. Check that location is turned on for GuideHand, ' +
        'step outside if you can, and try again — or type the coordinates in below.'
    );
  };

  const removePoint = (id: string) => {
    setPoints((prev) => prev.filter((p) => p.id !== id));
    if (activeId === id) setActiveId(null);
  };

  // With a working compass the needle points where you actually walk. Without
  // one it shows the true bearing, to be lined up against a map or compass.
  const needleRotation = leg ? (heading === null ? leg.bearing : (leg.bearing - heading + 360) % 360) : 0;

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Family Meetup' }} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.blueDeep }]}>
            <Text style={[styles.eyebrow, { color: c.onBlueSoft }]}>Family</Text>
            <Text style={[styles.title, { color: c.onBlue }]}>Family Meetup Point</Text>
            <Text style={[styles.subhead, { color: c.onBlueSoft }]}>
              Save where your family agreed to meet. Your phone&apos;s GPS chip talks to satellites, not to a cell
              tower — so this keeps telling you how far away you are with no signal, no Wi-Fi, and no data.
            </Text>
          </View>

          {/* ---- The distance readout ---- */}
          {active ? (
            <View style={[styles.distanceCard, { backgroundColor: c.card, borderColor: c.plum }]}>
              <Text style={[styles.cardEyebrow, { color: c.plum }]}>HEADING FOR</Text>
              <Text style={[styles.destination, { color: c.text }]}>{active.label}</Text>
              {active.note ? (
                <Text style={[styles.destinationNote, { color: c.textSecondary }]}>{active.note}</Text>
              ) : null}

              {leg ? (
                <View style={styles.readout}>
                  <MeetupCompass
                    rotation={needleRotation}
                    headingKnown={heading !== null}
                    ring={c.cardBorder}
                    tick={c.textSecondary}
                    needle={c.plum}
                    label={heading !== null ? 'WALK THIS WAY' : `${Math.round(leg.bearing)}° FROM NORTH`}
                  />
                  <View style={styles.readoutText}>
                    <Text style={[styles.distanceValue, { color: c.text }]}>{formatDistance(leg.miles)}</Text>
                    <Text style={[styles.directionValue, { color: c.plum }]}>
                      {compassLong(leg.bearing)} · {compassShort(leg.bearing)} {Math.round(leg.bearing)}°
                    </Text>
                    {formatWalkingTime(leg.miles) ? (
                      <Text style={[styles.walkTime, { color: c.textSecondary }]}>
                        {formatWalkingTime(leg.miles)}
                      </Text>
                    ) : null}
                  </View>
                </View>
              ) : (
                <View style={[styles.waiting, { borderColor: c.cardBorder }]}>
                  <Text style={[styles.waitingText, { color: c.textSecondary }]}>
                    {location.kind === 'locating'
                      ? 'Getting a GPS fix. Outdoors with a view of the sky is fastest — it can take a minute the first time.'
                      : location.kind === 'denied'
                        ? 'GuideHand needs permission to read your location. Turn it on in your phone settings under GuideHand → Location, then tap below.'
                        : location.kind === 'error'
                          ? location.message
                          : 'Tap below to read your position and see how far away you are.'}
                  </Text>
                </View>
              )}

              <Pressable
                accessibilityRole="button"
                onPress={refreshLocation}
                style={({ pressed }) => [
                  styles.primaryButton,
                  { backgroundColor: c.plumSoft, opacity: pressed ? 0.7 : 1 },
                ]}>
                <Icon name="compass" size={16} color={c.plum} />
                <Text style={[styles.primaryButtonText, { color: c.plum }]}>
                  {location.kind === 'locating' ? 'Reading GPS…' : leg ? 'Update my position' : 'Find my position'}
                </Text>
              </Pressable>

              <View style={[styles.coordBlock, { borderColor: c.cardBorder }]}>
                <View style={styles.coordRow}>
                  <Text style={[styles.coordLabel, { color: c.textSecondary }]}>MEETING PLACE</Text>
                  <Text style={[styles.coordValue, { color: c.text }]}>{formatCoords(active)}</Text>
                </View>
                <View style={styles.coordRow}>
                  <Text style={[styles.coordLabel, { color: c.textSecondary }]}>YOU ARE HERE</Text>
                  <Text style={[styles.coordValue, { color: here ? c.text : c.textSecondary }]}>
                    {here ? formatCoords(here) : 'no fix yet'}
                  </Text>
                </View>
                {here ? (
                  <Text style={[styles.fixMeta, { color: c.textSecondary }]}>
                    Fix taken {formatClockTime(here.takenAt)}
                    {here.accuracy ? ` · accurate to about ${Math.round(here.accuracy)} m` : ''}
                  </Text>
                ) : null}
              </View>

              <Text style={[styles.shareHint, { color: c.textSecondary }]}>
                Write those numbers on paper and hand them to anyone who isn&apos;t with you. Read them over a radio
                the same way. Coordinates work without a network — a dropped pin in a messaging app does not.
              </Text>
            </View>
          ) : (
            <View style={[styles.emptyState, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
              <Text style={[styles.emptyText, { color: c.textSecondary }]}>
                No meeting place saved yet. Decide with your family where you&apos;d gather if you got separated —
                somewhere everyone knows, that isn&apos;t your house — then save it below while you&apos;re standing
                there, or type its coordinates in.
              </Text>
              <View style={[styles.coordBlock, { borderColor: c.cardBorder }]}>
                <View style={styles.coordRow}>
                  <Text style={[styles.coordLabel, { color: c.textSecondary }]}>YOU ARE HERE</Text>
                  <Text style={[styles.coordValue, { color: here ? c.text : c.textSecondary }]}>
                    {here
                      ? formatCoords(here)
                      : location.kind === 'locating'
                        ? 'reading GPS…'
                        : 'no fix yet'}
                  </Text>
                </View>
                {here ? (
                  <Text style={[styles.fixMeta, { color: c.textSecondary }]}>
                    Fix taken {formatClockTime(here.takenAt)}
                    {here.accuracy ? ` · accurate to about ${Math.round(here.accuracy)} m` : ''}
                  </Text>
                ) : null}
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={refreshLocation}
                style={({ pressed }) => [
                  styles.primaryButton,
                  { backgroundColor: c.plumSoft, opacity: pressed ? 0.7 : 1 },
                ]}>
                <Icon name="compass" size={16} color={c.plum} />
                <Text style={[styles.primaryButtonText, { color: c.plum }]}>
                  {location.kind === 'locating' ? 'Reading GPS…' : 'Show me where I am'}
                </Text>
              </Pressable>
            </View>
          )}

          {/* ---- Saved points ---- */}
          {points.length > 0 ? (
            <View style={styles.section}>
              <Text style={[styles.sectionLabel, { color: c.blue }]}>SAVED MEETING PLACES</Text>
              {points.map((point) => {
                const isActive = active?.id === point.id;
                const milesAway = here
                  ? distanceMiles({ latitude: here.latitude, longitude: here.longitude }, point)
                  : undefined;
                return (
                  <View
                    key={point.id}
                    style={[
                      styles.pointRow,
                      {
                        backgroundColor: c.card,
                        borderColor: isActive ? c.plum : c.cardBorder,
                        borderWidth: isActive ? 1.8 : 1,
                      },
                    ]}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityState={{ selected: isActive }}
                      onPress={() => setActiveId(point.id)}
                      style={styles.pointPressable}>
                      <View style={[styles.pointIcon, { backgroundColor: isActive ? c.plumSoft : c.bg }]}>
                        <Icon name="pin" size={17} color={isActive ? c.plum : c.textSecondary} />
                      </View>
                      <View style={styles.pointBody}>
                        <Text style={[styles.pointLabel, { color: c.text }]}>{point.label}</Text>
                        <Text style={[styles.pointCoords, { color: c.textSecondary }]}>{formatCoords(point)}</Text>
                        {point.note ? (
                          <Text style={[styles.pointNote, { color: c.textSecondary }]}>{point.note}</Text>
                        ) : null}
                      </View>
                      {milesAway !== undefined ? (
                        <Text style={[styles.pointDistance, { color: isActive ? c.plum : c.textSecondary }]}>
                          {formatDistance(milesAway)}
                        </Text>
                      ) : null}
                    </Pressable>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Remove ${point.label}`}
                      onPress={() => removePoint(point.id)}
                      hitSlop={8}
                      style={styles.pointDelete}>
                      <Icon name="trash" size={16} color={c.textSecondary} />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          ) : null}

          {/* ---- Add a point ---- */}
          <View style={[styles.addCard, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            <Text style={[styles.addLabel, { color: c.text }]}>Add a meeting place</Text>
            <TextInput
              value={labelDraft}
              onChangeText={setLabelDraft}
              placeholder="Name it (e.g. Grandma's house, the water tower)"
              placeholderTextColor={c.textSecondary}
              style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
            />
            <TextInput
              value={noteDraft}
              onChangeText={setNoteDraft}
              placeholder="Note (optional) — how to find it, who has a key"
              placeholderTextColor={c.textSecondary}
              style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
            />

            <Pressable
              accessibilityRole="button"
              onPress={addCurrentPosition}
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: c.sageSoft, opacity: pressed ? 0.7 : 1 },
              ]}>
              <Icon name="pin" size={16} color={c.sage} />
              <Text style={[styles.primaryButtonText, { color: c.sage }]}>Save where I am standing</Text>
            </Pressable>

            <Text style={[styles.orDivider, { color: c.textSecondary }]}>OR TYPE THE COORDINATES</Text>

            <TextInput
              value={coordsDraft}
              onChangeText={(text) => {
                setCoordsDraft(text);
                if (addError) setAddError('');
              }}
              placeholder="34.05224, -118.24368"
              placeholderTextColor={c.textSecondary}
              autoCorrect={false}
              autoCapitalize="none"
              onSubmitEditing={addTypedPoint}
              returnKeyType="done"
              style={[styles.input, styles.coordInput, { color: c.text, borderColor: c.cardBorder }]}
            />
            <Pressable
              accessibilityRole="button"
              onPress={addTypedPoint}
              style={({ pressed }) => [styles.addButton, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
              <Icon name="plus" size={16} color={c.blue} />
              <Text style={[styles.addButtonText, { color: c.blue }]}>Add this place</Text>
            </Pressable>

            {addError ? <Text style={[styles.addError, { color: c.danger }]}>{addError}</Text> : null}
          </View>

          {guidance ? (
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: '/article/[category]/[topic]',
                  params: { category: guidance.categorySlug, topic: guidance.topic.slug },
                })
              }
              style={({ pressed }) => [
                styles.guidanceRow,
                { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
              ]}>
              <Text style={[styles.guidanceText, { color: c.text }]}>
                How to choose meeting places with your family
              </Text>
              <Icon name="chevron" size={16} color={c.textSecondary} />
            </Pressable>
          ) : null}

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            Saved on this device only. GuideHand never sends your location anywhere.
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
  headerBlock: {
    borderRadius: 20,
    padding: 16,
    gap: 6,
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: { fontSize: 22, fontFamily: Fonts.display },
  subhead: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },

  distanceCard: {
    borderWidth: 1.8,
    borderRadius: 18,
    padding: 16,
    gap: 10,
  },
  cardEyebrow: {
    fontSize: 10.5,
    fontFamily: Fonts.mono,
    letterSpacing: 1.4,
  },
  destination: { fontSize: 19, fontFamily: Fonts.display, marginTop: -4 },
  destinationNote: { fontSize: 13, lineHeight: 18, fontFamily: Fonts.body, marginTop: -6 },
  readout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 2,
  },
  readoutText: { flex: 1, minWidth: 0 },
  distanceValue: { fontSize: 38, fontFamily: Fonts.display, lineHeight: 44 },
  directionValue: { fontSize: 14, fontFamily: Fonts.bodyBold, marginTop: 1 },
  walkTime: { fontSize: 12.5, fontFamily: Fonts.body, marginTop: 3 },
  waiting: {
    borderWidth: 1,
    borderRadius: 12,
    borderStyle: 'dashed',
    padding: 13,
  },
  waitingText: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 11,
    paddingVertical: 12,
  },
  primaryButtonText: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
  coordBlock: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 7,
  },
  coordRow: { gap: 1 },
  coordLabel: {
    fontSize: 9.5,
    fontFamily: Fonts.mono,
    letterSpacing: 1.1,
  },
  coordValue: { fontSize: 16, fontFamily: Fonts.monoMedium },
  fixMeta: { fontSize: 11, fontFamily: Fonts.body, marginTop: 1 },
  shareHint: { fontSize: 12, lineHeight: 17.5, fontFamily: Fonts.body },

  emptyState: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  emptyText: { fontSize: 14, lineHeight: 20, fontFamily: Fonts.body },

  section: { marginTop: 20 },
  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 2,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingRight: 12,
    marginBottom: 8,
  },
  pointPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingVertical: 11,
    paddingLeft: 11,
  },
  pointIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointBody: { flex: 1, minWidth: 0, gap: 1 },
  pointLabel: { fontSize: 14.5, fontFamily: Fonts.displaySemibold },
  pointCoords: { fontSize: 11.5, fontFamily: Fonts.monoMedium },
  pointNote: { fontSize: 12, fontFamily: Fonts.body, marginTop: 1 },
  pointDistance: { fontSize: 14, fontFamily: Fonts.bodyBold },
  pointDelete: { paddingLeft: 10, paddingVertical: 12 },

  addCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginTop: 18,
    gap: 9,
  },
  addLabel: { fontSize: 13, fontFamily: Fonts.bodyBold, marginBottom: 2 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    fontFamily: Fonts.body,
  },
  coordInput: { fontFamily: Fonts.monoMedium, fontSize: 15 },
  orDivider: {
    fontSize: 9.5,
    fontFamily: Fonts.mono,
    letterSpacing: 1.2,
    textAlign: 'center',
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
    paddingVertical: 10,
  },
  addButtonText: { fontSize: 14, fontFamily: Fonts.bodyBold },
  addError: { fontSize: 12.5, lineHeight: 18, fontFamily: Fonts.body },

  guidanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    marginTop: 18,
  },
  guidanceText: { flex: 1, fontSize: 14, fontFamily: Fonts.bodySemibold },

  footer: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
