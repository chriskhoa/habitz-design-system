/**
 * Theme Configuration
 * Semantic theme with light and dark mode variants
 */

import { colors, spacing, typography, borderRadius, shadows, animation } from './tokens';

export const lightTheme = {
  colors: {
    ...colors,
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
      tertiary: '#E5E5E5',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    // Surface colors (from tokens)
    surface: colors.surface,
    // Text colors
    text: {
      primary: colors.text.primary,
      secondary: '#525252',
      tertiary: '#737373',
      disabled: '#A3A3A3',
      inverse: colors.text.inverse,
    },
    // Border colors
    border: {
      default: '#E5E5E5',
      primary: colors.border.primary,
      focus: colors.primary.focused,
      disabled: '#D4D4D4',
    },
    // Button-specific colors
    button: {
      primary: {
        background: colors.primary.base,
        backgroundHover: colors.primary.hover,
        backgroundFocused: colors.primary.focused,
        backgroundPressed: colors.primary.pressed,
        backgroundDisabled: colors.disabled.all,
        text: colors.text.inverse,
        textDisabled: '#737373',
        border: colors.border.primary,
        borderDisabled: '#D4D4D4',
      },
      secondary: {
        background: colors.secondary.base,
        backgroundHover: colors.secondary.hover,
        backgroundFocused: colors.secondary.focused,
        backgroundPressed: colors.secondary.pressed,
        backgroundDisabled: '#F5F5F5',
        text: colors.text.primary,
        textDisabled: '#A3A3A3',
        border: colors.border.primary,
        borderDisabled: '#D4D4D4',
      },
      tertiary: {
        background: 'transparent',
        backgroundHover: '#F5F5F5',
        backgroundPressed: '#E5E5E5',
        backgroundDisabled: 'transparent',
        text: colors.text.primary,
        textDisabled: '#A3A3A3',
        border: 'transparent',
        borderDisabled: 'transparent',
      },
    },
  },
  spacing,
  typography,
  borderRadius,
  shadows,
  animation,
  // Component-specific tokens
  components: {
    button: {
      minHeight: {
        compact: 32,
        small: 40,
        medium: 48,
        large: 56,
      },
      paddingHorizontal: {
        compact: spacing[4],  // 12px
        small: spacing[5],    // 16px
        medium: spacing[7],   // 32px (from Figma)
        large: spacing[8],    // 40px
      },
      paddingVertical: {
        compact: spacing[2],  // 6px
        small: spacing[3],    // 8px
        medium: spacing[4],   // 12px (from Figma)
        large: spacing[5],    // 16px
      },
      borderWidth: 2,  // 2px solid border from Figma
      borderRadius: borderRadius.normal,  // 8px from Figma
      shadow: {
        primary: shadows.elevation4,  // Hard shadow from Figma
        secondary: shadows.elevation4,  // Hard shadow from Figma
        tertiary: undefined,  // No shadow for tertiary
      },
      fontSize: {
        compact: typography.fontSize.sm,
        small: typography.fontSize.base,
        medium: typography.fontSize.md,   // 18px from Figma
        large: typography.fontSize.lg,
      },
      fontWeight: typography.fontWeight.medium,  // 500 from Figma
      lineHeight: {
        compact: typography.lineHeight.tight,
        small: typography.lineHeight.sm,
        medium: typography.lineHeight.sm,  // 24px from Figma
        large: typography.lineHeight.base,
      },
      iconSize: {
        compact: 16,
        small: 18,
        medium: 20,
        large: 24,
      },
      iconSpacing: spacing[3],  // 8px
    },
    input: {
      minHeight: {
        small: 40,
        medium: 48,
        large: 56,
      },
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      borderWidth: 1,
      borderRadius: borderRadius.normal,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.regular,
    },
    card: {
      borderRadius: borderRadius.lg,
      padding: spacing[4],
      shadow: shadows.md,
    },
  },
};

// Dark theme variant
export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: {
      primary: '#151718',
      secondary: '#262626',
      tertiary: '#404040',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
    surface: {
      brand: '#db049a',       // Bright magenta from Figma (idle state)
      brandSecondary: '#e55db8', // Lighter magenta (hover state - derived)
      brandContrast: '#b8037d',  // Darker magenta (pressed state - derived)
      invert: '#FFFFFF',      // White background from Figma
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D4D4D4',
      tertiary: '#A3A3A3',
      disabled: '#737373',
      inverse: '#000000',
    },
    border: {
      default: '#404040',
      primary: '#a700a3',     // Purple border from Figma dark mode
      focus: colors.primary.hover,
      disabled: '#525252',
    },
    button: {
      primary: {
        background: '#a700a3',      // Purple from Figma dark mode
        backgroundHover: '#c400bf',  // Lighter purple (hover - derived)
        backgroundFocused: '#c400bf', // Lighter purple (focused - derived)
        backgroundPressed: '#EB279D', // Bright pink from Figma dark mode
        backgroundDisabled: colors.disabled.all,
        text: '#FFFFFF',            // White text from Figma
        textDisabled: '#737373',
        border: '#000000',          // Black border for visibility
        borderDisabled: '#525252',
      },
      secondary: {
        background: 'transparent',
        backgroundHover: '#262626',
        backgroundFocused: '#262626',
        backgroundPressed: '#404040',
        backgroundDisabled: 'transparent',
        text: '#FFFFFF',
        textDisabled: '#737373',
        border: '#a700a3',          // Purple border from Figma dark mode
        borderDisabled: '#525252',
      },
      tertiary: {
        background: 'transparent',
        backgroundHover: '#262626',
        backgroundPressed: '#404040',
        backgroundDisabled: 'transparent',
        text: '#FFFFFF',
        textDisabled: '#737373',
        border: 'transparent',
        borderDisabled: 'transparent',
      },
    },
  },
  components: {
    ...lightTheme.components,
    button: {
      ...lightTheme.components.button,
      shadow: {
        primary: shadows.elevation4,  // Keep shadow for primary
        secondary: undefined,  // Remove shadow for secondary in dark mode
        tertiary: undefined,  // No shadow for tertiary
      },
    },
  },
};

// Define flexible Theme type that allows different color values in light/dark modes
type ButtonColorScheme = {
  background: string;
  backgroundHover: string;
  backgroundFocused: string;
  backgroundPressed: string;
  backgroundDisabled: string;
  text: string;
  textDisabled: string;
  border: string;
  borderDisabled: string;
};

export type Theme = {
  colors: {
    primary: { base: string; hover: string; focused: string; pressed: string };
    secondary: { base: string; hover: string; focused: string; pressed: string };
    text: { primary: string; inverse: string; secondary: string; tertiary: string; disabled: string };
    border: { primary: string; default: string; focus: string; disabled: string };
    disabled: { all: string };
    background: { primary: string; secondary: string; tertiary: string; overlay: string };
    surface: { brand: string; brandSecondary: string; brandContrast: string; invert: string };
    button: {
      primary: ButtonColorScheme;
      secondary: ButtonColorScheme;
      tertiary: Omit<ButtonColorScheme, 'backgroundFocused'>;
    };
  };
  spacing: typeof spacing;
  typography: typeof typography;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  animation: typeof animation;
  components: {
    button: {
      minHeight: typeof lightTheme.components.button.minHeight;
      paddingHorizontal: typeof lightTheme.components.button.paddingHorizontal;
      paddingVertical: typeof lightTheme.components.button.paddingVertical;
      borderWidth: number;
      borderRadius: number;
      shadow: {
        primary: typeof shadows.elevation4 | undefined;
        secondary: typeof shadows.elevation4 | undefined;
        tertiary: typeof shadows.elevation4 | undefined;
      };
      fontSize: typeof lightTheme.components.button.fontSize;
      fontWeight: typeof lightTheme.components.button.fontWeight;
      lineHeight: typeof lightTheme.components.button.lineHeight;
      iconSize: typeof lightTheme.components.button.iconSize;
      iconSpacing: number;
    };
    input: typeof lightTheme.components.input;
    card: typeof lightTheme.components.card;
  };
};

export type ThemeColors = Theme['colors'];
export type ThemeMode = 'light' | 'dark';
