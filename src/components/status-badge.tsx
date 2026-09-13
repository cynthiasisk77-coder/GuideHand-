import { StyleSheet, Text, View } from "react-native";

import { ArticleStatus, Priority } from "@/content/categories";
import { PRIORITY_COLOR, STATUS_COLOR, STATUS_LABEL } from "@/constants/status";

export function StatusBadge({ status }: { status: ArticleStatus }) {
  return (
    <View style={[styles.badge, { backgroundColor: STATUS_COLOR[status] }]}>
      <Text style={styles.text}>{STATUS_LABEL[status]}</Text>
    </View>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <View style={[styles.badge, { backgroundColor: PRIORITY_COLOR[priority] }]}>
      <Text style={styles.text}>{priority}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  text: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
});
