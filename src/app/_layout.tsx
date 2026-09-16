import { IBMPlexMono_500Medium, IBMPlexMono_600SemiBold } from '@expo-google-fonts/ibm-plex-mono';
import { Karla_400Regular, Karla_500Medium, Karla_600SemiBold, Karla_700Bold } from '@expo-google-fonts/karla';
import { Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Calm, Fonts } from '@/constants/calm';
import { loadInstalledPacksIntoRegistry } from '@/lib/packs';
import { encryptLegacyData } from '@/lib/secureData';
import { ENCRYPTED_KEYS } from '@/lib/personalData';

SplashScreen.preventAutoHideAsync();

// Read any downloaded packs off local storage once, at startup. Content lookups
// across the app are synchronous, so packs have to be in memory before screens
// ask for them. A failure here is not fatal: the app's own articles are compiled
// in and do not depend on this call succeeding.
let packsRequested = false;
function loadPacksOnce() {
  if (packsRequested) return;
  packsRequested = true;
  loadInstalledPacksIntoRegistry().catch(() => {});
}

// Anything saved before encryption existed is still sitting in the clear. Read
// it once at startup and write it back encrypted, so it doesn't stay exposed
// until the person happens to edit that screen. Reading and writing go through
// the same code either way, so a failure here leaves the data usable.
let migrationRequested = false;
function encryptExistingDataOnce() {
  if (migrationRequested) return;
  migrationRequested = true;
  encryptLegacyData(ENCRYPTED_KEYS).catch(() => {});
}

export default function RootLayout() {
  loadPacksOnce();
  encryptExistingDataOnce();
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
        <Stack.Screen name="medicine-tracker" options={{ title: 'Medicine Tracker' }} />
        <Stack.Screen name="document-photos" options={{ title: 'Document Photos' }} />
        <Stack.Screen name="family-meetup" options={{ title: 'Family Meetup' }} />
        <Stack.Screen name="meetup-scan" options={{ title: 'Scan a Code' }} />
        <Stack.Screen name="content-packs" options={{ title: 'Content Packs' }} />
        <Stack.Screen name="backup" options={{ title: 'Back Up & Restore' }} />
      </Stack>
    </ThemeProvider>
  );
}
