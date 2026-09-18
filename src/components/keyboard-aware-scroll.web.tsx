// The browser has no software keyboard to get out of the way of, and the
// library behind the native file is native-only — importing it here would take
// down every route, which is a mistake this project has already made three
// times. A plain scroll view is the whole of what the web needs.

import { forwardRef } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export const KeyboardAwareScrollView = forwardRef<ScrollView, ScrollViewProps>(
  function KeyboardAwareScrollView({ children, keyboardShouldPersistTaps = 'handled', ...rest }, ref) {
    return (
      <ScrollView ref={ref} keyboardShouldPersistTaps={keyboardShouldPersistTaps} {...rest}>
        {children}
      </ScrollView>
    );
  }
);
