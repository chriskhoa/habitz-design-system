/**
 * Design Tokens
 * Primitive design tokens extracted from Figma variables
 */

import { Platform } from 'react-native';

// Spacing scale (from Figma variables)
export const spacing = {
  1: 4,
  2: 6,
  3: 8,   // spacing/3 from Figma
  4: 12,  // spacing/4 from Figma
  5: 16,
  6: 24,
  7: 32,  // spacing/7 from Figma
  8: 40,
  9: 48,
  10: 56,
  12: 64,
} as const;

// Color primitives
export const colors = {
  // Primary palette
  primary: {
    base: '#fca4d0',
    hover: '#fdcae4',
    focused: '#fdcae4',
    pressed: '#f55daf',
  },

  // Neutral/Secondary palette
  secondary: {
    base: '#ffffff',
    hover: '#e3e4eb',
    focused: '#e3e4eb',
    pressed: '#a8a9b2',
  },

  // Text colors
  text: {
    primary: '#000000',
    inverse: '#ffffff',
  },

  // Border colors
  border: {
    primary: '#000000',
  },

  // Component states
  disabled: {
    all: '#323241',
  },
} as const;

// Typography
export const typography = {
  fontFamily: {
    body: Platform.select({
      ios: 'DM Sans',
      android: 'DM Sans',
      web: 'DM Sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      default: 'DM Sans',
    }),
    // Fallback to system fonts
    system: Platform.select({
      ios: 'System',
      android: 'Roboto',
      web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      default: 'System',
    }),
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 32,
    '4xl': 36,
  },
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeight: {
    tight: 20,
    sm: 24,
    base: 28,
    relaxed: 32,
    loose: 36,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
} as const;

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  normal: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

// Shadows/Elevation
export const shadows = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  // Elevation 4 from Figma - Hard shadow (no blur) for button effect
  elevation4: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1, // Fully opaque for hard shadow
    shadowRadius: 0,  // No blur radius = hard shadow
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// Animation
export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;
