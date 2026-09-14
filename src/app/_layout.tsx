import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Calm } from '@/constants/calm';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const c = Calm[colorScheme === 'dark' ? 'dark' : 'light'];
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          headerTintColor: c.text,
          headerStyle: { backgroundColor: c.bg },
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '700', color: c.text },
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="group/[group]" options={{ title: 'Category' }} />
        <Stack.Screen name="category/[category]" options={{ title: 'Category' }} />
        <Stack.Screen name="article/[category]/[topic]" options={{ title: 'Article' }} />
      </Stack>
    </ThemeProvider>
  );
}
