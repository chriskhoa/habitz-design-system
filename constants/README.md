# Theme System Documentation

This directory contains the design system implementation based on Figma Variables.

## File Structure

```
constants/
├── tokens.ts         # Primitive design tokens from Figma
├── theme.ts          # Semantic theme configuration (light/dark)
├── ThemeContext.tsx  # React Context for theme management
└── README.md         # This file
```

## Design Token Layers

### 1. Tokens (tokens.ts)

**Source:** Figma Variables

Primitive design tokens that map directly to Figma variables:

- **Colors:** Primary, secondary, text, border, disabled states
- **Typography:** Font family (DM Sans), sizes, weights, line heights
- **Spacing:** 1-12 scale (4px to 64px)
- **Border Radius:** none, sm, normal, md, lg, xl, 2xl, full
- **Shadows:** Elevation levels from Figma
- **Animation:** Durations and easing functions

**Example:**
```ts
import { colors, spacing, typography } from '@/constants/tokens';

const myColor = colors.primary.base; // #fca4d0
const mySpacing = spacing[4]; // 16
const myFontSize = typography.fontSize.md; // 18
```

### 2. Theme (theme.ts)

**Purpose:** Organize primitive tokens into semantic, component-ready structures

Exports two complete themes:
- `lightTheme` - Light mode configuration
- `darkTheme` - Dark mode configuration

**Structure:**
```ts
{
  colors: {
    background: { primary, secondary, tertiary, overlay },
    text: { primary, secondary, tertiary, disabled, inverse },
    border: { default, primary, focus, disabled },
    button: {
      primary: { background, backgroundHover, backgroundPressed, ... },
      secondary: { ... },
      tertiary: { ... }
    }
  },
  spacing: { ... },
  typography: { ... },
  borderRadius: { ... },
  shadows: { ... },
  animation: { ... },
  components: {
    button: { minHeight, padding, borderRadius, fontSize, ... },
    input: { ... },
    card: { ... }
  }
}
```

**Example:**
```ts
import { lightTheme, darkTheme } from '@/constants/theme';

const buttonColor = lightTheme.colors.button.primary.background;
const buttonHeight = lightTheme.components.button.minHeight.medium;
```

### 3. Theme Context (ThemeContext.tsx)

**Purpose:** Provide runtime theme management with React Context

**Exports:**
- `ThemeProvider` - Wrap your app to provide theme
- `useTheme()` - Hook to access theme in any component

**Setup in app/_layout.tsx:**
```tsx
import { ThemeProvider } from '@/constants/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

**Usage in components:**
```tsx
import { useTheme } from '@/constants/ThemeContext';

function MyComponent() {
  const { theme, mode, toggleTheme, setTheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background.primary }}>
      <Text style={{ color: theme.colors.text.primary }}>
        Current mode: {mode}
      </Text>
      <Button onPress={toggleTheme}>Toggle Theme</Button>
    </View>
  );
}
```

## Updating Design Tokens from Figma

When Figma design variables are updated:

1. **Select any node** in Figma Desktop
2. **Extract variables** using Claude Code:
   ```
   "Update design tokens from my Figma variables"
   ```
3. **Verify changes** in `tokens.ts`
4. **Update theme.ts** if semantic mappings need adjustment
5. **Components automatically inherit** the new design system

## Creating New Components

Follow this pattern (see `/components/ui/button.tsx` for complete example):

```tsx
import { useTheme } from '@/constants/ThemeContext';

interface MyComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export const MyComponent: React.FC<MyComponentProps> = ({
  variant = 'primary',
  size = 'medium',
}) => {
  const { theme } = useTheme();

  // Get values from theme
  const backgroundColor = theme.colors.button[variant].background;
  const padding = theme.spacing[4];
  const fontSize = theme.typography.fontSize[size];

  return (
    <View style={{ backgroundColor, padding }}>
      <Text style={{ fontSize }}>Hello</Text>
    </View>
  );
};
```

## Best Practices

✅ **DO:**
- Use `useTheme()` hook in all components
- Reference design tokens from theme object
- Support light/dark mode automatically
- Define component-specific tokens in `theme.components`
- Follow Figma design system as source of truth

❌ **DON'T:**
- Hardcode colors, spacing, or typography values
- Use inline styles for values that should be tokens
- Bypass the theme system for "quick fixes"
- Modify tokens.ts manually (sync from Figma instead)

## Type Safety

All theme values are fully typed:

```ts
import { Theme, ThemeColors, ThemeMode } from '@/constants/theme';

// Theme object type
const myTheme: Theme = lightTheme;

// Color-specific type
const colors: ThemeColors = lightTheme.colors;

// Mode type
const mode: ThemeMode = 'light'; // or 'dark'
```

## Migration from Old Theme

The old theme system (`Colors` export) is deprecated. Migrate to the new system:

**Before:**
```tsx
import { Colors } from '@/constants/theme';
const color = Colors.light.text;
```

**After:**
```tsx
import { useTheme } from '@/constants/ThemeContext';
const { theme } = useTheme();
const color = theme.colors.text.primary;
```

Legacy `<ThemedText>` and `<ThemedView>` components still work but are updated internally to use the new theme system.
