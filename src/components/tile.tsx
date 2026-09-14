import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import * as Linking from "expo-linking";

import { RED_DARK } from "@/constants/categoryStyle";

interface TileProps {
  emoji: string;
  label: string;
  sub?: string;
  color: string;
  fg?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  size?: "small" | "large";
}

export function Tile({ emoji, label, sub, color, fg = "#FFFFFF", onPress, style, size = "large" }: TileProps) {
  const small = size === "small";
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      android_ripple={{ color: "rgba(255,255,255,0.25)" }}
      style={({ pressed }) => [
        styles.tile,
        small ? styles.tileSmall : styles.tileLarge,
        { backgroundColor: color, opacity: pressed ? 0.85 : 1 },
        style,
      ]}>
      <Text style={small ? styles.emojiSmall : styles.emojiLarge}>{emoji}</Text>
      <Text style={[small ? styles.labelSmall : styles.labelLarge, { color: fg }]} numberOfLines={2}>
        {label}
      </Text>
      {sub ? (
        <Text style={[styles.sub, { color: fg }]} numberOfLines={1}>
          {sub}
        </Text>
      ) : null}
    </Pressable>
  );
}

export function CallButton({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Call 911"
      onPress={() => {
        Linking.openURL("tel:911").catch(() => {});
      }}
      android_ripple={{ color: "rgba(255,255,255,0.25)" }}
      style={({ pressed }) => [styles.call, { opacity: pressed ? 0.85 : 1 }, style]}>
      <Text style={styles.callIcon}>📞</Text>
      <View style={styles.callTextWrap}>
        <Text style={styles.callTitle}>Call 911</Text>
        <Text style={styles.callSub}>Life-threatening? Call first, then follow the steps.</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 16,
    justifyContent: "flex-end",
  },
  tileLarge: {
    minHeight: 112,
    padding: 14,
  },
  tileSmall: {
    minHeight: 96,
    padding: 10,
  },
  emojiLarge: {
    fontSize: 32,
    marginBottom: 6,
  },
  emojiSmall: {
    fontSize: 26,
    marginBottom: 4,
  },
  labelLarge: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  labelSmall: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 17,
  },
  sub: {
    fontSize: 12,
    opacity: 0.85,
    marginTop: 2,
  },
  call: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: RED_DARK,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.7)",
  },
  callIcon: {
    fontSize: 28,
  },
  callTextWrap: {
    flex: 1,
  },
  callTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  callSub: {
    color: "#FFFFFF",
    opacity: 0.9,
    fontSize: 13,
    marginTop: 2,
  },
});
