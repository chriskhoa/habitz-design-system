import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { useTheme } from '@/constants/ThemeContext';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { theme } = useTheme();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text.primary');

  // Build styles from theme tokens
  const getTypeStyle = () => {
    switch (type) {
      case 'title':
        return {
          fontSize: theme.typography.fontSize['4xl'],
          fontWeight: theme.typography.fontWeight.bold,
          lineHeight: theme.typography.lineHeight.tight,
        };
      case 'subtitle':
        return {
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.bold,
        };
      case 'defaultSemiBold':
        return {
          fontSize: theme.typography.fontSize.base,
          lineHeight: theme.typography.lineHeight.sm,
          fontWeight: theme.typography.fontWeight.semibold,
        };
      case 'link':
        return {
          fontSize: theme.typography.fontSize.base,
          lineHeight: theme.typography.lineHeight.relaxed,
          color: theme.colors.primary.base,
        };
      case 'default':
      default:
        return {
          fontSize: theme.typography.fontSize.base,
          lineHeight: theme.typography.lineHeight.sm,
        };
    }
  };

  return (
    <Text
      style={[
        { color },
        getTypeStyle(),
        style,
      ]}
      {...rest}
    />
  );
}
