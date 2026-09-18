// A scroll view that keeps the box you are typing in where you can see it.
//
// The first attempt at this only scrolled a note up when you opened it. That
// misses the case that actually happens: the note is already open, you tap into
// the writing box, and the keyboard comes up over it. Nothing moves, because
// nothing opened. This watches for the keyboard instead of for a tap, so it
// does not matter what you were doing when it appeared.
//
// On Android the keyboard is drawn over the app rather than shrinking it, so
// two things are needed and neither works alone: room at the bottom of the list
// to scroll into, and then the scroll itself.

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions, Keyboard, ScrollView, StyleProp, TextInput, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Roughly the app's header: whatever we scroll to has to clear it.
const HEADER = 56;
// Breathing room between the field and the top of the keyboard.
const GAP = 14;

interface Props {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
}

export const KeyboardAwareScrollView = forwardRef<ScrollView, Props>(function KeyboardAwareScrollView(
  { children, contentContainerStyle, keyboardShouldPersistTaps = 'handled' },
  ref
) {
  const insets = useSafeAreaInsets();
  const scroller = useRef<ScrollView>(null);
  // Where the list is scrolled to right now. scrollTo takes an absolute
  // position, and what we work out below is a distance to move.
  const offset = useRef(0);
  const [keyboard, setKeyboard] = useState(0);

  useImperativeHandle(ref, () => scroller.current as ScrollView, []);

  useEffect(() => {
    const top = insets.top + HEADER;

    const reveal = (height: number) => {
      // Guarded rather than called straight: the web build of TextInput.State
      // has no currentlyFocusedInput, and this file is shared. Nothing here
      // runs in a browser anyway, because the keyboard events never fire there
      // — but "should never run" is how the last three of these started.
      const focused = TextInput.State?.currentlyFocusedInput;
      const input = typeof focused === 'function' ? focused() : undefined;
      if (!input || typeof input.measureInWindow !== 'function') return;
      // The extra room below is added in the same render as this fires. Measure
      // a beat later or we measure the layout that is about to be replaced.
      setTimeout(() => {
        input.measureInWindow((_x, y, _w, h) => {
          if (typeof y !== 'number' || typeof h !== 'number') return;
          const lid = Dimensions.get('window').height - height - GAP;
          const room = lid - top;
          // A box taller than the space left is lined up with the top instead,
          // otherwise scrolling its last line into view pushes its first line
          // off the top of the screen — which is the same problem again.
          const move = h > room ? y - top : y + h - lid;
          if (move > 1) {
            scroller.current?.scrollTo({ y: Math.max(0, offset.current + move), animated: true });
          }
        });
      }, 90);
    };

    const shown = Keyboard.addListener('keyboardDidShow', (event) => {
      const height = event.endCoordinates?.height ?? 0;
      setKeyboard(height);
      reveal(height);
    });
    const hidden = Keyboard.addListener('keyboardDidHide', () => setKeyboard(0));
    return () => {
      shown.remove();
      hidden.remove();
    };
  }, [insets.top]);

  return (
    <ScrollView
      ref={scroller}
      onScroll={(event) => {
        offset.current = event.nativeEvent.contentOffset.y;
      }}
      scrollEventThrottle={16}
      contentContainerStyle={[contentContainerStyle, keyboard > 0 ? { paddingBottom: keyboard + 24 } : null]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
      {children}
    </ScrollView>
  );
});
