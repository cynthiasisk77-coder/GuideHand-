import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { secureGetItem, secureSetItem } from '@/lib/secureData';
import { CameraView, useCameraPermissions } from 'expo-camera';

import { Icon } from '@/components/icon';
import { Calm, Fonts } from '@/constants/calm';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import type { SharedPlace } from '@/lib/geo';
import { formatCoords, parsePlaceCode } from '@/lib/geo';

const STORAGE_KEY = 'guidehand.family-meetup.v1';
const ACTIVE_KEY = 'guidehand.family-meetup.active.v1';

interface MeetupPoint {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  note: string;
}

function generatePointId(): string {
  return `meet-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function MeetupScanScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<SharedPlace | null>(null);
  const [rejected, setRejected] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cameraFailed, setCameraFailed] = useState(false);

  // Ask once on arrival, so the camera is live by the time they point it. The
  // ref matters: without it, a decline re-renders with a still-askable
  // permission and the effect would ask again, forever.
  const askedRef = useRef(false);
  useEffect(() => {
    if (askedRef.current) return;
    if (permission && !permission.granted && permission.canAskAgain) {
      askedRef.current = true;
      requestPermission().catch(() => {});
    }
  }, [permission, requestPermission]);

  const handleScan = useCallback(
    ({ data }: { data: string }) => {
      if (scanned) return;
      const place = parsePlaceCode(data);
      if (place) {
        setScanned(place);
        setRejected(false);
      } else {
        setRejected(true);
      }
    },
    [scanned]
  );

  const savePlace = async () => {
    if (!scanned) return;
    const point: MeetupPoint = {
      id: generatePointId(),
      label: scanned.label?.trim() || 'Scanned meeting place',
      latitude: scanned.latitude,
      longitude: scanned.longitude,
      note: '',
    };
    try {
      const raw = await secureGetItem(STORAGE_KEY);
      const existing: MeetupPoint[] = raw ? JSON.parse(raw) : [];
      await secureSetItem(STORAGE_KEY, JSON.stringify([...existing, point]));
      await secureSetItem(ACTIVE_KEY, point.id);
      setSaved(true);
    } catch {
      setSaved(false);
    }
  };

  const scanAgain = () => {
    setScanned(null);
    setRejected(false);
    setSaved(false);
  };

  const cameraReady = permission?.granted && !cameraFailed;

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <Stack.Screen options={{ title: 'Scan a Code' }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={[styles.headerBlock, { backgroundColor: c.headerBg, borderWidth: 1, borderColor: c.cardBorder, borderLeftWidth: 5, borderLeftColor: c.plum }]}>
            <Text style={[styles.eyebrow, { color: c.textSecondary }]}>Family Meetup</Text>
            <Text style={[styles.title, { color: c.text }]}>Scan a meeting place</Text>
            <Text style={[styles.subhead, { color: c.textSecondary }]}>
              Hold this phone up to the code on someone else&apos;s screen. Nothing is sent over a network — the
              coordinates travel in the pattern itself, so this works with both phones in airplane mode.
            </Text>
          </View>

          {saved && scanned ? (
            <View style={[styles.resultCard, { backgroundColor: c.card, borderColor: c.sage }]}>
              <View style={[styles.resultIcon, { backgroundColor: c.sageSoft }]}>
                <Icon name="check" size={22} color={c.sage} strokeWidth={2.4} />
              </View>
              <Text style={[styles.resultTitle, { color: c.text }]}>Saved</Text>
              <Text style={[styles.resultLabel, { color: c.text }]}>
                {scanned.label?.trim() || 'Scanned meeting place'}
              </Text>
              <Text style={[styles.resultCoords, { color: c.textSecondary }]}>{formatCoords(scanned)}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace({ pathname: '/family-meetup' })}
                style={({ pressed }) => [
                  styles.primaryButton,
                  { backgroundColor: c.plumSoft, opacity: pressed ? 0.7 : 1 },
                ]}>
                <Icon name="pin" size={16} color={c.plum} />
                <Text style={[styles.primaryButtonText, { color: c.plum }]}>See how far away it is</Text>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={scanAgain}>
                <Text style={[styles.secondaryLink, { color: c.blue }]}>Scan another code</Text>
              </Pressable>
            </View>
          ) : scanned ? (
            <View style={[styles.resultCard, { backgroundColor: c.card, borderColor: c.plum }]}>
              <View style={[styles.resultIcon, { backgroundColor: c.plumSoft }]}>
                <Icon name="pin" size={20} color={c.plum} />
              </View>
              <Text style={[styles.resultTitle, { color: c.text }]}>Code read</Text>
              <Text style={[styles.resultLabel, { color: c.text }]}>
                {scanned.label?.trim() || 'Scanned meeting place'}
              </Text>
              <Text style={[styles.resultCoords, { color: c.textSecondary }]}>{formatCoords(scanned)}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={savePlace}
                style={({ pressed }) => [
                  styles.primaryButton,
                  { backgroundColor: c.sageSoft, opacity: pressed ? 0.7 : 1 },
                ]}>
                <Icon name="plus" size={16} color={c.sage} />
                <Text style={[styles.primaryButtonText, { color: c.sage }]}>Save this meeting place</Text>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={scanAgain}>
                <Text style={[styles.secondaryLink, { color: c.blue }]}>That&apos;s not it — scan again</Text>
              </Pressable>
            </View>
          ) : (
            <View style={[styles.viewfinder, { borderColor: c.cardBorder, backgroundColor: c.card }]}>
              {cameraReady ? (
                <CameraView
                  style={StyleSheet.absoluteFill}
                  facing="back"
                  barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                  onBarcodeScanned={handleScan}
                  onMountError={() => setCameraFailed(true)}
                />
              ) : (
                <View style={styles.viewfinderFallback}>
                  <Icon name="camera" size={30} color={c.textSecondary} />
                  <Text style={[styles.fallbackText, { color: c.textSecondary }]}>
                    {permission === null
                      ? 'Starting the camera…'
                      : cameraFailed
                        ? 'This device would not start its camera. You can still type the coordinates in by hand on the Family Meetup screen.'
                        : permission.granted
                          ? 'Starting the camera…'
                          : permission.canAskAgain
                            ? 'GuideHand needs your camera to read the code.'
                            : 'Camera access is off for GuideHand. Turn it on in your phone settings under GuideHand → Camera, or type the coordinates in by hand instead.'}
                  </Text>
                  {permission && !permission.granted && permission.canAskAgain ? (
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => requestPermission()}
                      style={({ pressed }) => [
                        styles.primaryButton,
                        styles.fallbackButton,
                        { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 },
                      ]}>
                      <Icon name="camera" size={16} color={c.blue} />
                      <Text style={[styles.primaryButtonText, { color: c.blue }]}>Allow camera</Text>
                    </Pressable>
                  ) : null}
                </View>
              )}
            </View>
          )}

          {rejected && !scanned ? (
            <Text style={[styles.rejected, { color: c.danger }]}>
              That code isn&apos;t a location. Make sure the other phone is showing its Family Meetup code, not a
              Wi-Fi or payment code.
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace({ pathname: '/family-meetup' })}
            style={({ pressed }) => [
              styles.typeInstead,
              { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.8 : 1 },
            ]}>
            <Text style={[styles.typeInsteadText, { color: c.text }]}>Type the coordinates in instead</Text>
            <Icon name="chevron" size={16} color={c.textSecondary} />
          </Pressable>

          <Text style={[styles.footer, { color: c.textSecondary }]}>
            Saved on this device only. Nothing about the scan is sent anywhere.
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

  viewfinder: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 18,
    borderWidth: 1.5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinderFallback: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 28,
  },
  fallbackText: {
    fontSize: 13.5,
    lineHeight: 19,
    textAlign: 'center',
    fontFamily: Fonts.body,
  },
  fallbackButton: { paddingHorizontal: 20, alignSelf: 'center' },

  resultCard: {
    borderWidth: 1.8,
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    gap: 7,
  },
  resultIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  resultTitle: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  resultLabel: { fontSize: 19, fontFamily: Fonts.display, textAlign: 'center' },
  resultCoords: { fontSize: 15, fontFamily: Fonts.monoMedium, marginBottom: 6 },

  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 11,
    paddingVertical: 12,
    alignSelf: 'stretch',
  },
  primaryButtonText: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
  secondaryLink: {
    fontSize: 13.5,
    fontFamily: Fonts.bodySemibold,
    marginTop: 4,
    paddingVertical: 4,
  },

  rejected: {
    fontSize: 13,
    lineHeight: 19,
    fontFamily: Fonts.body,
    marginTop: 12,
    textAlign: 'center',
  },

  typeInstead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    marginTop: 16,
  },
  typeInsteadText: { flex: 1, fontSize: 14, fontFamily: Fonts.bodySemibold },

  footer: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: Fonts.body,
  },
});
