// Web stand-in for the map view. The tiles live in a native database that a
// browser tab has no access to, and importing the native module here would
// throw during server rendering and break every route.

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Fonts } from '@/constants/calm';
import { Coords, formatCoords } from '@/lib/geo';
import { MapRegion } from '@/lib/offlineMaps';

interface Palette {
  bg: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  blue: string;
  blueText: string;
  blueSoft: string;
  sage: string;
  sageText: string;
  sageSoft: string;
  danger: string;
  dangerText: string;
  dangerSoft: string;
  plum: string;
  plumText: string;
  plumSoft: string;
}

export interface MapMarker extends Coords {
  id: string;
  label: string;
}

interface OfflineMapProps {
  region: MapRegion;
  here?: Coords;
  markers?: MapMarker[];
  c: Palette;
  onClose: () => void;
  // Accepted so the two files share one signature; the browser never calls it.
  onPickPlace?: (coords: Coords, label: string) => void;
  suggestedLabel?: string;
}

export function OfflineMap({ region, c, onClose }: OfflineMapProps) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.card, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        <Text style={[styles.title, { color: c.text }]}>Maps need the phone app</Text>
        <Text style={[styles.body, { color: c.textSecondary }]}>
          The tiles are stored on the phone itself, which is what lets the map work with no signal.
          A browser tab has nowhere to keep them.
        </Text>
        <Text style={[styles.body, { color: c.textSecondary }]}>
          {region.name} · {formatCoords(region.center)} · {region.radiusMiles} miles out
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onClose}
          style={({ pressed }) => [styles.button, { backgroundColor: c.blueSoft, opacity: pressed ? 0.7 : 1 }]}>
          <Icon name="chevron" size={16} color={c.blue} />
          <Text style={[styles.buttonText, { color: c.blue }]}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 420, borderWidth: 1, borderRadius: 14, padding: 16, gap: 10 },
  title: { fontSize: 16, fontFamily: Fonts.display },
  body: { fontSize: 13, lineHeight: 19, fontFamily: Fonts.body },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 11,
    paddingVertical: 12,
  },
  buttonText: { fontSize: 14, fontFamily: Fonts.bodyBold },
});
