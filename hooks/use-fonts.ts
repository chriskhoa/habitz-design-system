import { useFonts } from 'expo-font';

export function useCustomFonts() {
  const [loaded, error] = useFonts({
    'DM Sans': require('@/assets/fonts/DMSans-Regular.ttf'),
    'DM Sans Medium': require('@/assets/fonts/DMSans-Medium.ttf'),
    'Space Grotesk': require('@/assets/fonts/SpaceGrotesk-Bold.ttf'),
  });

  return { loaded, error };
}
