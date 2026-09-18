// The keyboard controller needs one provider above everything that uses it.

import { KeyboardProvider as ControllerProvider } from 'react-native-keyboard-controller';

export function KeyboardProvider({ children }: { children: React.ReactNode }) {
  return <ControllerProvider>{children}</ControllerProvider>;
}
