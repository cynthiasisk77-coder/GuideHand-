// The map itself, drawn from tiles already on the phone.
//
// Native-only — see offline-map.web.tsx for what the browser gets.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Camera, Map, Marker, UserLocation } from '@maplibre/maplibre-react-native';

import { Icon } from '@/components/icon';
import { Fonts } from '@/constants/calm';
import { Coords, distanceMiles, formatDistance } from '@/lib/geo';
import { MAP_ATTRIBUTION, MAP_STYLE_URL, MapRegion, toLngLat } from '@/lib/offlineMaps';

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
}

export function OfflineMap({ region, here, markers = [], c, onClose }: OfflineMapProps) {
  const [selected, setSelected] = useState<MapMarker | undefined>(undefined);

  return (
    <View style={styles.fill}>
      <Map style={styles.fill} mapStyle={MAP_STYLE_URL} logo={false} attribution={false} compass>
        <Camera initialViewState={{ center: toLngLat(region.center), zoom: 12 }} />
        {here ? <UserLocation /> : null}
        {markers.map((marker) => (
          <Marker key={marker.id} id={marker.id} lngLat={toLngLat(marker)} onPress={() => setSelected(marker)}>
            <View style={[styles.pin, { backgroundColor: c.plum, borderColor: c.card }]} />
          </Marker>
        ))}
      </Map>

      {/* Attribution is a licence condition on OpenStreetMap data, not decoration. */}
      <View style={[styles.attribution, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        <Text style={[styles.attributionText, { color: c.textSecondary }]}>{MAP_ATTRIBUTION}</Text>
      </View>

      {selected ? (
        <View style={[styles.callout, { backgroundColor: c.card, borderColor: c.plum }]}>
          <View style={styles.calloutText}>
            <Text style={[styles.calloutTitle, { color: c.text }]}>{selected.label}</Text>
            {here ? (
              <Text style={[styles.calloutMeta, { color: c.textSecondary }]}>
                {formatDistance(distanceMiles(here, selected))} from you
              </Text>
            ) : null}
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => setSelected(undefined)} hitSlop={10}>
            <Icon name="chevron" size={18} color={c.textSecondary} />
          </Pressable>
        </View>
      ) : null}

      <Pressable
        accessibilityRole="button"
        onPress={onClose}
        style={({ pressed }) => [
          styles.back,
          { backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.7 : 1 },
        ]}>
        <Icon name="chevron" size={17} color={c.text} />
        <Text style={[styles.backText, { color: c.text }]}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  pin: { width: 18, height: 18, borderRadius: 9, borderWidth: 3 },
  attribution: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  attributionText: { fontSize: 9.5, fontFamily: Fonts.body },
  callout: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderRadius: 13,
    paddingVertical: 12,
    paddingHorizontal: 13,
  },
  calloutText: { flex: 1, gap: 2 },
  calloutTitle: { fontSize: 15, fontFamily: Fonts.displaySemibold },
  calloutMeta: { fontSize: 12.5, fontFamily: Fonts.body },
  back: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  backText: { fontSize: 13.5, fontFamily: Fonts.bodySemibold },
});
