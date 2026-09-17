import { StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Fonts } from '@/constants/calm';
import { Spacing } from '@/constants/theme';
import { QuickCard as QuickCardData } from '@/content/quickCards';

interface Palette {
  text: string;
  textSecondary: string;
  card: string;
  cardBorder: string;
  blue: string;
  blueText: string;
  blueSoft: string;
  danger: string;
  dangerText: string;
  dangerSoft: string;
  plum: string;
  plumText: string;
  plumSoft: string;
}

export function QuickCardView({ data, c }: { data: QuickCardData; c: Palette }) {
  return (
    <View>
      <Text style={[styles.subtitle, { color: c.textSecondary }]}>{data.subtitle}</Text>

      <View style={[styles.callNow, { backgroundColor: c.dangerSoft, borderColor: c.danger }]}>
        <Icon name="siren" size={18} color={c.danger} />
        <Text style={[styles.callNowText, { color: c.dangerText }]}>{data.callNow}</Text>
      </View>

      {data.steps.map((step, i) => (
        <View key={i} style={[styles.step, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
          <View style={[styles.stepNumber, { backgroundColor: c.blueSoft }]}>
            <Text style={[styles.stepNumberText, { color: c.blue }]}>{i + 1}</Text>
          </View>
          <View style={styles.stepBody}>
            <Text style={[styles.stepHeadline, { color: c.text }]}>{step.headline}</Text>
            <Text style={[styles.stepDetail, { color: c.textSecondary }]}>{step.detail}</Text>
          </View>
        </View>
      ))}

      <View style={[styles.caution, { backgroundColor: c.plumSoft, borderColor: c.plum }]}>
        <Text style={[styles.cautionLabel, { color: c.plum }]}>{data.cautionLabel.toUpperCase()}</Text>
        <Text style={[styles.cautionText, { color: c.text }]}>{data.caution}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.body,
    marginBottom: Spacing.three,
  },
  callNow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
    marginBottom: Spacing.three,
  },
  callNowText: {
    flex: 1,
    fontSize: 14.5,
    lineHeight: 20,
    fontFamily: Fonts.bodyBold,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: Spacing.two,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: 13,
    fontFamily: Fonts.monoMedium,
  },
  stepBody: { flex: 1, gap: 3 },
  stepHeadline: {
    fontSize: 15.5,
    fontFamily: Fonts.displaySemibold,
  },
  stepDetail: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.body,
  },
  caution: {
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
    marginTop: Spacing.two,
    gap: 4,
  },
  cautionLabel: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    letterSpacing: 1.1,
  },
  cautionText: {
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: Fonts.body,
  },
});
