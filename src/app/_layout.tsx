import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { RED } from '@/constants/categoryStyle';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          headerTintColor: '#FFFFFF',
          headerStyle: { backgroundColor: RED },
          headerTitleStyle: { fontWeight: '700' },
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="category/[category]" options={{ title: 'Category' }} />
        <Stack.Screen name="article/[category]/[topic]" options={{ title: 'Article' }} />
      </Stack>
    </ThemeProvider>
  );
}
