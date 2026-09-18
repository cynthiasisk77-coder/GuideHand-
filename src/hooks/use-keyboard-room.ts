// How much of the screen the keyboard is currently covering.
//
// "It covers where your words are going so you can't see if everything is
// correct. You just have to keep clicking back." On Android the keyboard is an
// inset drawn over the app, not something that shrinks it, so a scroll view
// ends underneath it and the field you are typing into can sit in the hidden
// part. Nothing on screen tells you — the text is going in, you just cannot
// read it.
//
// This reports the keyboard's height so a screen can add that much room at the
// bottom and scroll the field back into the open. It is driven by the keyboard
// events rather than by the window resizing, which is why it works the same
// whichever way Android decides to lay the window out. On the web build the
// Keyboard module is a no-op, so this stays at zero and nothing changes.

import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboardRoom(): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // "DidShow" rather than "WillShow": Android only ever fires the Did events,
    // and by then the height is the real one rather than an animation target.
    const shown = Keyboard.addListener('keyboardDidShow', (event) => {
      setHeight(event.endCoordinates?.height ?? 0);
    });
    const hidden = Keyboard.addListener('keyboardDidHide', () => setHeight(0));
    return () => {
      shown.remove();
      hidden.remove();
    };
  }, []);

  return height;
}
