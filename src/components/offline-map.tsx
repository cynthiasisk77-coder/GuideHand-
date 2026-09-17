// The map itself, drawn from tiles already on the phone.
//
// Native-only — see offline-map.web.tsx for what the browser gets.
//
// The map can be in one of two modes. Normally it just shows where your saved
// meeting places are. In picking mode it is how you make one: you tap the spot
// and name it. Typing latitude and longitude was the only way to add a place
// before, and asking somebody to read "34.05224, -118.24368" off a screen and
// type it correctly into another phone is not a plan anybody will carry out in
// an emergency. Pointing at a map is.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  /**
   * When given, tapping the map offers to save that spot as a meeting place.
   * Leave it out and the map is read-only.
   */
  onPickPlace?: (coords: Coords, label: string) => void;
  /** Suggested name for the next place, so the field is never empty. */
  suggestedLabel?: string;
}

export function OfflineMap({
  region,
  here,
  markers = [],
  c,
  onClose,
  onPickPlace,
  suggestedLabel = 'Meeting place',
}: OfflineMapProps) {
  // The map runs full-bleed with no navigation header above it, so the Back
  // pill has to clear the status bar and the notch itself.
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<MapMarker | undefined>(undefined);
  const [picked, setPicked] = useState<Coords | undefined>(undefined);
  const [label, setLabel] = useState('');
  const [justSaved, setJustSaved] = useState('');

  const picking = !!onPickPlace;

  const handleMapPress = (event: { nativeEvent?: { lngLat?: [number, number] } }) => {
    if (!picking) return;
    const lngLat = event?.nativeEvent?.lngLat;
    if (!lngLat) return;
    // MapLibre hands back [longitude, latitude]; everything else here is the
    // other way round, and getting that backwards puts the pin in the ocean.
    setPicked({ longitude: lngLat[0], latitude: lngLat[1] });
    setLabel('');
    setSelected(undefined);
    setJustSaved('');
  };

  const save = () => {
    if (!picked || !onPickPlace) return;
    const name = label.trim() || suggestedLabel;
    onPickPlace(picked, name);
    setPicked(undefined);
    setLabel('');
    setJustSaved(name);
  };

  return (
    <View style={styles.fill}>
      <Map
        style={styles.fill}
        mapStyle={MAP_STYLE_URL}
        logo={false}
        attribution={false}
        compass
        onPress={handleMapPress}>
        <Camera initialViewState={{ center: toLngLat(region.center), zoom: 12 }} />
        {here ? <UserLocation /> : null}
        {markers.map((marker) => (
          <Marker key={marker.id} id={marker.id} lngLat={toLngLat(marker)} onPress={() => setSelected(marker)}>
            <View style={[styles.pin, { backgroundColor: c.plum, borderColor: c.card }]} />
          </Marker>
        ))}
        {picked ? (
          <Marker id="picked" lngLat={toLngLat(picked)}>
            <View style={[styles.pinNew, { backgroundColor: c.sage, borderColor: c.card }]} />
          </Marker>
        ) : null}
      </Map>

      {/* Attribution is a licence condition on OpenStreetMap data, not decoration. */}
      <View style={[styles.attribution, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
        <Text style={[styles.attributionText, { color: c.textSecondary }]}>{MAP_ATTRIBUTION}</Text>
      </View>

      {/* --- naming the spot you just tapped --------------------------------- */}
      {picked ? (
        <View style={[styles.panel, { backgroundColor: c.card, borderColor: c.sage }]}>
          <Text style={[styles.panelTitle, { color: c.text }]}>Name this spot</Text>
          <TextInput
            value={label}
            onChangeText={setLabel}
            placeholder={suggestedLabel}
            placeholderTextColor={c.textSecondary}
            autoFocus
            style={[styles.input, { color: c.text, borderColor: c.cardBorder }]}
          />
          <View style={styles.panelRow}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setPicked(undefined)}
              style={({ pressed }) => [styles.ghost, { borderColor: c.cardBorder, opacity: pressed ? 0.6 : 1 }]}>
              <Text style={[styles.ghostText, { color: c.textSecondary }]}>Cancel</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={save}
              style={({ pressed }) => [styles.save, { backgroundColor: c.sageSoft, opacity: pressed ? 0.7 : 1 }]}>
              <Icon name="pin" size={15} color={c.sageText} />
              <Text style={[styles.saveText, { color: c.sageText }]}>Save this spot</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {/* --- the standing invitation, so nobody has to guess it is tappable -- */}
      {picking && !picked && !selected ? (
        <View style={[styles.hint, { backgroundColor: c.card, borderColor: c.sage }]}>
          <Icon name="pin" size={15} color={c.sageText} />
          <Text style={[styles.hintText, { color: c.text }]}>
            {justSaved ? `Saved "${justSaved}". Tap again to add another.` : 'Tap the map where you want to meet.'}
          </Text>
        </View>
      ) : null}

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
          { top: insets.top + 12, backgroundColor: c.card, borderColor: c.cardBorder, opacity: pressed ? 0.7 : 1 },
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
  // The one you are placing is bigger than the ones already saved, so you can
  // see where it landed without hunting for it.
  pinNew: { width: 24, height: 24, borderRadius: 12, borderWidth: 4 },
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
  hint: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 13,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  hintText: { flex: 1, fontSize: 13.5, fontFamily: Fonts.bodySemibold },
  panel: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 42,
    gap: 9,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 13,
  },
  panelTitle: { fontSize: 15, fontFamily: Fonts.displaySemibold },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 10,
    fontSize: 14.5,
    fontFamily: Fonts.body,
  },
  panelRow: { flexDirection: 'row', gap: 9 },
  ghost: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostText: { fontSize: 14, fontFamily: Fonts.bodySemibold },
  save: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 10,
    paddingVertical: 11,
  },
  saveText: { fontSize: 14, fontFamily: Fonts.bodyBold },
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
    borderRadius: 999,
    borderWidth: 1.5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  backText: { fontSize: 14.5, fontFamily: Fonts.bodyBold },
});
