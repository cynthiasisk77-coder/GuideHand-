import { Pressable, StyleSheet, Text, useColorScheme, View, type StyleProp, type ViewStyle } from 'react-native';
import * as Linking from 'expo-linking';

import { Icon } from '@/components/icon';
import { Calm, RED } from '@/constants/calm';

export function CallButton({ style }: { style?: StyleProp<ViewStyle> }) {
  const scheme = useColorScheme();
  const c = Calm[scheme === 'dark' ? 'dark' : 'light'];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Call 911"
      onPress={() => Linking.openURL('tel:911').catch(() => {})}
      style={({ pressed }) => [
        styles.btn,
        { borderColor: RED, backgroundColor: c.card, opacity: pressed ? 0.8 : 1 },
        style,
      ]}>
      <Icon name="phone" size={20} color={RED} />
      <View style={styles.text}>
        <Text style={[styles.title, { color: RED }]}>Call 911</Text>
        <Text style={[styles.sub, { color: c.textSecondary }]}>If you have signal, call first</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  text: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700' },
  sub: { fontSize: 12, marginTop: 1 },
});
