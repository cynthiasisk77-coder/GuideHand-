// Asking out loud instead of typing.
//
// The read-aloud button already answers the case where someone cannot look at
// the screen. This is the other half of it, and the more important half: if
// your hands are busy holding pressure on a wound, or it is dark, or you are
// shaking, typing a question is the part you cannot do. Speaking it is not.
//
// It prefers on-device recognition, which matters for two separate reasons.
// This app has to work with the towers down, and a question spoken into a
// first-aid app is nobody else's business — on-device means the audio never
// leaves the phone. Where the phone cannot do it on-device the button says so
// rather than quietly sending the recording somewhere.

import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

import { Icon } from '@/components/icon';
import { Fonts } from '@/constants/calm';

interface VoiceInputProps {
  /** Called with the finished transcript. */
  onTranscript: (text: string) => void;
  /** Called with each partial result, so the box fills in as you speak. */
  onPartial?: (text: string) => void;
  color: string;
  background: string;
  mutedColor: string;
}

type State =
  | { kind: 'checking' }
  | { kind: 'unavailable'; why: string }
  | { kind: 'idle' }
  | { kind: 'listening' };

export function VoiceInput({ onTranscript, onPartial, color, background, mutedColor }: VoiceInputProps) {
  const [state, setState] = useState<State>({ kind: 'checking' });
  const [onDevice, setOnDevice] = useState(false);
  // Held in a ref as well as reported upward: the end event arrives after the
  // last result, and that is where a transcript gets committed.
  const latest = useRef('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const services = ExpoSpeechRecognitionModule.getSpeechRecognitionServices();
        if (!services || services.length === 0) {
          if (alive) setState({ kind: 'unavailable', why: 'This phone has no speech recognition installed.' });
          return;
        }
        const device = ExpoSpeechRecognitionModule.supportsOnDeviceRecognition();
        if (alive) {
          setOnDevice(device);
          setState({ kind: 'idle' });
        }
      } catch {
        if (alive) setState({ kind: 'unavailable', why: 'Speech recognition would not start on this phone.' });
      }
    })();
    return () => {
      alive = false;
      try {
        ExpoSpeechRecognitionModule.abort();
      } catch {
        // Nothing was listening. Normal.
      }
    };
  }, []);

  useSpeechRecognitionEvent('result', (event) => {
    const said = event.results?.[0]?.transcript ?? '';
    if (!said) return;
    latest.current = said;
    if (event.isFinal) onTranscript(said);
    else onPartial?.(said);
  });

  useSpeechRecognitionEvent('end', () => {
    setState((prev) => (prev.kind === 'listening' ? { kind: 'idle' } : prev));
    // Android often ends without ever flagging a result as final. Without this
    // the words appear while you speak and vanish when you stop.
    if (latest.current) {
      onTranscript(latest.current);
      latest.current = '';
    }
  });

  useSpeechRecognitionEvent('error', (event) => {
    const spoken =
      event.error === 'no-speech'
        ? 'Did not catch that. Try again, a little closer.'
        : event.error === 'not-allowed'
          ? 'GuideHand needs permission to use the microphone.'
          : 'The microphone would not start.';
    setState({ kind: 'unavailable', why: spoken });
  });

  const start = async () => {
    latest.current = '';
    const granted = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!granted.granted) {
      setState({ kind: 'unavailable', why: 'GuideHand needs permission to use the microphone.' });
      return;
    }
    setState({ kind: 'listening' });
    ExpoSpeechRecognitionModule.start({
      lang: 'en-US',
      interimResults: true,
      // On-device where the phone can do it: works with the towers down, and
      // the audio never leaves the phone.
      requiresOnDeviceRecognition: onDevice,
      androidIntentOptions: { EXTRA_PREFER_OFFLINE: onDevice },
    });
  };

  const stop = () => {
    try {
      ExpoSpeechRecognitionModule.stop();
    } catch {
      // Already stopped.
    }
    setState({ kind: 'idle' });
  };

  if (state.kind === 'checking') return null;

  if (state.kind === 'unavailable') {
    return (
      <View style={styles.wrap}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Try the microphone again"
          onPress={() => setState({ kind: 'idle' })}
          style={({ pressed }) => [styles.button, { backgroundColor: background, opacity: pressed ? 0.7 : 1 }]}>
          <Icon name="speak" size={16} color={color} />
          <Text style={[styles.label, { color }]}>Try speaking again</Text>
        </Pressable>
        <Text style={[styles.note, { color: mutedColor }]}>{state.why}</Text>
      </View>
    );
  }

  const listening = state.kind === 'listening';
  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={listening ? 'Stop listening' : 'Ask by speaking'}
        onPress={listening ? stop : start}
        style={({ pressed }) => [styles.button, { backgroundColor: background, opacity: pressed ? 0.7 : 1 }]}>
        <Icon name={listening ? 'stop' : 'speak'} size={16} color={color} />
        <Text style={[styles.label, { color }]}>{listening ? 'Listening — tap to stop' : 'Ask by speaking'}</Text>
      </Pressable>
      {!onDevice ? (
        <Text style={[styles.note, { color: mutedColor }]}>
          This phone sends speech away to be understood, so it needs signal. Turn on offline speech in
          Settings to make it work with no service.
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 5 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 11,
    paddingVertical: 12,
  },
  label: { fontSize: 14, fontFamily: Fonts.bodyBold },
  note: { fontSize: 11.5, lineHeight: 16, textAlign: 'center', fontFamily: Fonts.body },
});
