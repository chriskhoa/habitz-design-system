/**
 * Text Component
 * Built using typography tokens from Figma
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useTheme } from '@/constants/ThemeContext';

type TitleVariant =
  | 'title-3xlarge'
  | 'title-2xlarge'
  | 'title-xlarge'
  | 'title-large'
  | 'title-medium'
  | 'title-base';

type BodyVariant =
  | 'body-large'
  | 'body-medium'
  | 'body-base'
  | 'body-caption';

export interface TextProps extends RNTextProps {
  /** Text variant from Figma design system */
  variant?: TitleVariant | BodyVariant;
  /** Optional color override */
  color?: string;
  /** Children content */
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body-base',
  color,
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      // Title variants (Space Grotesk, Bold)
      case 'title-3xlarge':
        return {
          fontFamily: theme.typography.fontFamily.title,
          fontSize: theme.typography.fontSize['4xl'], // 48px
          fontWeight: theme.typography.fontWeight.bold, // 700
          lineHeight: theme.typography.lineHeight.xl,  // 48px
        };
      case 'title-2xlarge':
        return {
          fontFamily: theme.typography.fontFamily.title,
          fontSize: theme.typography.fontSize['3xl'], // 40px
          fontWeight: theme.typography.fontWeight.bold, // 700
          lineHeight: theme.typography.lineHeight.xl,  // 48px
        };
      case 'title-xlarge':
        return {
          fontFamily: theme.typography.fontFamily.title,
          fontSize: theme.typography.fontSize['2xl'], // 32px
          fontWeight: theme.typography.fontWeight.bold, // 700
          lineHeight: theme.typography.lineHeight.lg,  // 40px
        };
      case 'title-large':
        return {
          fontFamily: theme.typography.fontFamily.title,
          fontSize: theme.typography.fontSize.xl,    // 24px
          fontWeight: theme.typography.fontWeight.bold, // 700
          lineHeight: theme.typography.lineHeight.md, // 32px
        };
      case 'title-medium':
        return {
          fontFamily: theme.typography.fontFamily.title,
          fontSize: theme.typography.fontSize.md,    // 18px
          fontWeight: theme.typography.fontWeight.bold, // 700
          lineHeight: theme.typography.lineHeight.sm, // 24px
        };
      case 'title-base':
        return {
          fontFamily: theme.typography.fontFamily.title,
          fontSize: theme.typography.fontSize.sm,    // 16px
          fontWeight: theme.typography.fontWeight.bold, // 700
          lineHeight: theme.typography.lineHeight.sm, // 24px
        };

      // Body variants (DM Sans)
      case 'body-large':
        return {
          fontFamily: theme.typography.fontFamily.bodyMedium,
          fontSize: theme.typography.fontSize.lg,     // 20px
          lineHeight: theme.typography.lineHeight.sm, // 24px
        };
      case 'body-medium':
        return {
          fontFamily: theme.typography.fontFamily.bodyMedium,
          fontSize: theme.typography.fontSize.md,     // 18px
          lineHeight: theme.typography.lineHeight.sm, // 24px
        };
      case 'body-base':
        return {
          fontFamily: theme.typography.fontFamily.body,
          fontSize: theme.typography.fontSize.base,   // 16px
          fontWeight: theme.typography.fontWeight.regular, // 400
          lineHeight: theme.typography.lineHeight.sm, // 24px
        };
      case 'body-caption':
        return {
          fontFamily: theme.typography.fontFamily.body,
          fontSize: theme.typography.fontSize.xs,     // 12px
          fontWeight: theme.typography.fontWeight.regular, // 400
          lineHeight: theme.typography.lineHeight.xs, // 16px
        };

      default:
        return {
          fontFamily: theme.typography.fontFamily.body,
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.regular,
          lineHeight: theme.typography.lineHeight.sm,
        };
    }
  };

  return (
    <RNText
      style={[
        getVariantStyle(),
        { color: color || theme.colors.text.primary },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};
