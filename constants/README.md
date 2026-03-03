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
    button: {
      minHeight, paddingHorizontal, paddingVertical,
      borderWidth, borderRadius, fontSize, fontWeight, lineHeight,
      shadow: {
        primary: shadows.elevation4,    // Can be undefined
        secondary: shadows.elevation4,  // Can be undefined
        tertiary: undefined             // No shadow
      },
      iconSize, iconSpacing
    },
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

## Customizing Themes and Component Styles

### Changing Colors, Spacing, or Typography

**1. Modify Primitive Tokens** (Recommended for design system changes)

Edit `tokens.ts` to change fundamental design values:

```ts
// tokens.ts
export const colors = {
  primary: {
    base: '#ff0000',    // Change primary color
    hover: '#cc0000',
    // ...
  },
};

export const spacing = {
  4: 16,  // Change base spacing unit
  // ...
};
```

**2. Override Semantic Theme Values** (For theme-specific adjustments)

Edit `theme.ts` to change how tokens are applied semantically:

```ts
// theme.ts - lightTheme
export const lightTheme = {
  colors: {
    background: {
      primary: '#FFFFFF',      // Override background color
      secondary: '#F0F0F0',    // Custom color not from tokens
    },
    button: {
      primary: {
        background: colors.primary.base,
        backgroundHover: '#custom-hover-color',  // Custom override
      },
    },
  },
};
```

### Dark Mode Customization

Override specific values in `darkTheme` while keeping `lightTheme` unchanged:

```ts
// theme.ts
export const darkTheme: Theme = {
  ...lightTheme,  // Inherit all light theme values
  colors: {
    ...lightTheme.colors,  // Inherit light colors
    // Override only what's different in dark mode
    background: {
      primary: '#000000',
      secondary: '#1a1a1a',
      // ...
    },
  },
  // Override component-specific values for dark mode
  components: {
    ...lightTheme.components,
    button: {
      ...lightTheme.components.button,
      shadow: {
        primary: shadows.elevation4,  // Keep shadow
        secondary: undefined,          // Remove shadow in dark mode
        tertiary: undefined,
      },
    },
  },
};
```

### Adding Variant-Specific Styles

**Example: Different shadows for button variants**

```ts
// theme.ts - lightTheme
components: {
  button: {
    shadow: {
      primary: shadows.elevation4,    // Strong shadow
      secondary: shadows.md,          // Subtle shadow
      tertiary: undefined,            // No shadow
    },
  },
}

// darkTheme override
components: {
  ...lightTheme.components,
  button: {
    ...lightTheme.components.button,
    shadow: {
      primary: shadows.elevation4,
      secondary: undefined,  // Remove for secondary in dark mode
      tertiary: undefined,
    },
  },
}
```

### Adding New Component Styles

Add configuration for new components in `lightTheme.components`:

```ts
// theme.ts
export const lightTheme = {
  // ... existing config
  components: {
    button: { ... },
    input: { ... },
    card: { ... },
    // Add new component
    badge: {
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[1],
      borderRadius: borderRadius.full,
      fontSize: typography.fontSize.sm,
      colors: {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },
    },
  },
};

// Update TypeScript type
export type Theme = {
  // ... existing types
  components: {
    button: { ... };
    input: { ... };
    card: { ... };
    badge: {
      paddingHorizontal: number;
      paddingVertical: number;
      borderRadius: number;
      fontSize: number;
      colors: {
        success: string;
        error: string;
        warning: string;
      };
    };
  };
};
```

### Using Variant-Specific Styles in Components

Components can access variant-specific configuration from the theme:

```tsx
// components/ui/button.tsx
export const Button: React.FC<ButtonProps> = ({ variant = 'primary' }) => {
  const { theme } = useTheme();

  // Get variant-specific shadow (may be undefined)
  const variantShadow = theme.components.button.shadow[variant];

  const buttonStyle = {
    // Apply shadow only if defined
    ...(variantShadow && variantShadow),
  };
};
```

### Common Customization Scenarios

**Scenario 1: Change button size across the app**
```ts
// theme.ts
components: {
  button: {
    minHeight: { medium: 52 },  // Change from 48 to 52
    paddingHorizontal: { medium: spacing[8] },  // More padding
  },
}
```

**Scenario 2: Remove all shadows in dark mode**
```ts
// theme.ts - darkTheme
shadows: {
  ...lightTheme.shadows,
  elevation4: undefined,  // Or set all to transparent values
}
```

**Scenario 3: Custom button color for dark mode only**
```ts
// theme.ts - darkTheme
colors: {
  ...lightTheme.colors,
  button: {
    ...lightTheme.colors.button,
    primary: {
      ...lightTheme.colors.button.primary,
      background: '#8b5cf6',  // Custom purple
    },
  },
}
```

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

## Troubleshooting

### TypeScript Errors After Theme Changes

**Error: Type mismatch in darkTheme**

If you add new properties to `lightTheme.components`, update the `Theme` type:

```ts
// theme.ts - Add your new component type
export type Theme = {
  // ... existing types
  components: {
    button: { ... };
    input: { ... };
    card: { ... };
    // Add your new component type here
    yourNewComponent: {
      // Define the structure
    };
  };
};
```

**Error: Property 'X' does not exist on type 'Y'**

Make sure `darkTheme` properly spreads `lightTheme`:

```ts
export const darkTheme: Theme = {
  ...lightTheme,  // Must inherit base structure
  colors: {
    ...lightTheme.colors,  // Must spread to inherit
    // Your overrides
  },
  components: {
    ...lightTheme.components,  // Must spread to inherit
    // Your overrides
  },
};
```

**Error: Type 'undefined' is not assignable**

When adding optional values (like shadows), update the type definition:

```ts
// Before (strict type)
shadow: typeof shadows.elevation4;

// After (allows undefined)
shadow: typeof shadows.elevation4 | undefined;

// Or for variant-specific
shadow: {
  primary: typeof shadows.elevation4 | undefined;
  secondary: typeof shadows.elevation4 | undefined;
  tertiary: typeof shadows.elevation4 | undefined;
};
```

### Verifying Changes

After making theme changes:

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Run linter
npm run lint

# Start development server
npm start
```

## Best Practices

✅ **DO:**
- Use `useTheme()` hook in all components
- Reference design tokens from theme object
- Support light/dark mode automatically
- Define component-specific tokens in `theme.components`
- Follow Figma design system as source of truth
- Spread parent theme objects when creating overrides (`...lightTheme`)
- Update TypeScript types when adding new theme properties
- Allow `undefined` for optional style properties (shadows, borders, etc.)

❌ **DON'T:**
- Hardcode colors, spacing, or typography values
- Use inline styles for values that should be tokens
- Bypass the theme system for "quick fixes"
- Modify tokens.ts manually (sync from Figma instead)
- Forget to spread `...lightTheme` in `darkTheme` overrides
- Ignore TypeScript errors (fix type definitions instead)

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

## Quick Reference

### Common Tasks

| Task | File to Edit | Example |
|------|-------------|---------|
| Change primary brand color | `tokens.ts` | `colors.primary.base = '#ff0000'` |
| Update button size | `theme.ts` → `lightTheme.components.button` | `minHeight.medium = 52` |
| Remove shadow in dark mode | `theme.ts` → `darkTheme.components` | `button.shadow.secondary = undefined` |
| Add dark mode background | `theme.ts` → `darkTheme.colors` | `background.primary = '#000000'` |
| Create new component config | `theme.ts` → `lightTheme.components` | Add new object + update `Theme` type |
| Change spacing scale | `tokens.ts` | `spacing[4] = 16` |
| Update font size | `tokens.ts` | `typography.fontSize.md = 18` |
| Override button color | `theme.ts` → `lightTheme.colors.button` | `primary.background = '#custom'` |

### File Decision Tree

```
Need to change styles?
├─ Affects entire design system (all components)?
│  └─ Edit tokens.ts (colors, spacing, typography)
│
├─ Affects one specific component?
│  ├─ Same in light and dark mode?
│  │  └─ Edit theme.ts → lightTheme.components
│  │
│  └─ Different in dark mode?
│     └─ Edit theme.ts → darkTheme.components (with spread)
│
└─ Affects semantic meaning (button variants, backgrounds)?
   ├─ Same in light and dark mode?
   │  └─ Edit theme.ts → lightTheme.colors
   │
   └─ Different in dark mode?
      └─ Edit theme.ts → darkTheme.colors (with spread)
```

### Theme Override Pattern

```ts
// Always use this pattern for darkTheme overrides
export const darkTheme: Theme = {
  ...lightTheme,                    // 1. Spread base theme
  colors: {
    ...lightTheme.colors,           // 2. Spread colors
    button: {
      ...lightTheme.colors.button,  // 3. Spread nested object
      primary: {
        ...lightTheme.colors.button.primary,  // 4. Spread deepest level
        background: '#custom',      // 5. Override specific value
      },
    },
  },
  components: {
    ...lightTheme.components,       // 2. Spread components
    button: {
      ...lightTheme.components.button,  // 3. Spread nested
      shadow: {
        primary: shadows.elevation4,
        secondary: undefined,       // 5. Override specific value
        tertiary: undefined,
      },
    },
  },
};
```
