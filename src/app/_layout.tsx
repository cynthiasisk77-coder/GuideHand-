import { IBMPlexMono_500Medium, IBMPlexMono_600SemiBold } from '@expo-google-fonts/ibm-plex-mono';
import { Karla_400Regular, Karla_500Medium, Karla_600SemiBold, Karla_700Bold } from '@expo-google-fonts/karla';
import { Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Calm, Fonts } from '@/constants/calm';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const c = Calm[colorScheme === 'dark' ? 'dark' : 'light'];
  const [fontsLoaded] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          headerTintColor: c.text,
          headerStyle: { backgroundColor: c.bg },
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '700', color: c.text, fontFamily: Fonts.displaySemibold },
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="group/[group]" options={{ title: 'Category' }} />
        <Stack.Screen name="category/[category]" options={{ title: 'Category' }} />
        <Stack.Screen name="article/[category]/[topic]" options={{ title: 'Article' }} />
        <Stack.Screen name="supply-cache" options={{ title: 'Supply Cache' }} />
      </Stack>
    </ThemeProvider>
  );
}
