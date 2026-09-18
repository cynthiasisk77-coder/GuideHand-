// A scroll view that keeps the box you are typing in above the keyboard.
//
// Two hand-written attempts at this did nothing on a real phone, and the APK
// says why. The app targets Android SDK 36, and from SDK 35 onwards Android
// enforces edge-to-edge and ignores windowSoftInputMode entirely — the manifest
// still asks for adjustResize, and Android no longer honours it. The window
// never resizes when the keyboard opens. React Native's own keyboard events
// hang off a layout pass that the resize used to cause, so with no resize there
// is nothing to hang off, and anything written on top of those events is a
// no-op no matter how carefully it measures.
//
// react-native-keyboard-controller reads the IME inset from the platform
// directly, which is the one thing that still works edge to edge. It handles
// scrolling the focused field clear of the keyboard itself.

import { forwardRef } from 'react';
import type { ScrollViewProps } from 'react-native';
import { KeyboardAwareScrollView as ControllerScrollView } from 'react-native-keyboard-controller';

// Breathing room between the bottom of the field and the top of the keyboard.
const BOTTOM_OFFSET = 16;

export const KeyboardAwareScrollView = forwardRef<unknown, ScrollViewProps>(
  function KeyboardAwareScrollView({ children, keyboardShouldPersistTaps = 'handled', ...rest }, ref) {
    return (
      <ControllerScrollView
        ref={ref as never}
        bottomOffset={BOTTOM_OFFSET}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        {...rest}>
        {children}
      </ControllerScrollView>
    );
  }
);
