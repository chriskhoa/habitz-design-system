/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from '@/constants/ThemeContext';

/**
 * Hook to get theme-aware colors
 * @param props - Optional light and dark color overrides
 * @param colorPath - Dot-notation path to color in theme (e.g., 'text.primary', 'button.primary.background')
 * @returns The color value based on current theme
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorPath?: string
): string {
  const { theme, mode } = useTheme();
  const colorFromProps = props[mode];

  if (colorFromProps) {
    return colorFromProps;
  }

  // If colorPath is provided, traverse the theme object to get the color
  if (colorPath) {
    const pathParts = colorPath.split('.');
    let value: any = theme.colors;

    for (const part of pathParts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        // Fallback to primary text color if path not found
        return theme.colors.text.primary;
      }
    }

    return typeof value === 'string' ? value : theme.colors.text.primary;
  }

  // Default fallback
  return theme.colors.text.primary;
}
