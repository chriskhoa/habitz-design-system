# Habitz Design System - Component Template

A React Native UI component library built with Expo, designed to create reusable components with integrated design tokens and theming based on Figma designs.

**Tech Stack:** Expo React Native, Expo Router, TypeScript

**Goal:** Build a UI component library (with design tokens and color theme) based on Figma design system.

---

## Component Structure Guide

All components in `/components/ui` follow a consistent structure to ensure maintainability and ease of customization. This section explains the standard patterns used across the component library.

### Standard Component Anatomy

Every UI component follows this structure:

```tsx
/**
 * Component Name
 * Brief description of what the component does
 * Built using design tokens from Figma
 */

// 1. IMPORTS
import { useTheme } from "@/constants/ThemeContext";
import React, { useState } from "react";
import { Pressable, View, ViewStyle, TextStyle } from "react-native";

// 2. PROPS INTERFACE
export interface ComponentNameProps {
  /** JSDoc comment explaining this prop */
  propName: string;
  /** Optional props should have '?' */
  variant?: "primary" | "secondary";
  /** Callback handlers */
  onPress?: () => void;
  /** Always include optional style override */
  style?: ViewStyle;
}

// 3. COMPONENT FUNCTION
export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  variant = "primary",
  onPress,
  style,
}) => {
  // 4. THEME HOOK (always first)
  const { theme } = useTheme();

  // 5. LOCAL STATE (if needed)
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 6. STYLE FUNCTIONS/OBJECTS
  // Use functions for dynamic styles, constants for static styles
  const getContainerStyle = (pressed: boolean): ViewStyle => ({
    backgroundColor: pressed
      ? theme.colors.surface.brandContrast
      : theme.colors.surface.brand,
    borderRadius: theme.borderRadius.normal,
    paddingHorizontal: theme.spacing[5],
    // Reference theme tokens, not hardcoded values
  });

  const staticStyle: ViewStyle = {
    gap: theme.spacing[4],
  };

  // 7. RETURN JSX
  return (
    <Pressable
      style={({ pressed }) => [getContainerStyle(pressed), style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={propName}
    >
      {/* Component content */}
    </Pressable>
  );
};
```

### Key Patterns & When to Use Them

#### 1. **Style Functions vs Constants**

**Use style functions** when styles depend on:
- Component state (pressed, focused, hovered)
- Props (variant, disabled)
- Conditional logic

```tsx
// ✅ Good: Dynamic styles based on state
const getButtonStyle = (pressed: boolean): ViewStyle => ({
  backgroundColor: pressed
    ? theme.colors.button.primary.backgroundPressed
    : theme.colors.button.primary.background,
});
```

**Use style constants** when:
- Styles are static and don't change
- Extracting repeated values for reusability

```tsx
// ✅ Good: Static styles
const iconContainerStyle: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 100,
};
```

**Extracting theme tokens into local constants** (optional pattern):
Use this when you reference the same token multiple times for clarity:

```tsx
// ✅ Good for repeated values
const paddingHorizontal = theme.spacing[7];
const paddingVertical = theme.spacing[4];
const fontSize = theme.typography.fontSize.md;
```

#### 2. **State Management**

**No local state needed:**
- Simple stateless components (like basic Button)
- Use Pressable's `({ pressed })` render prop for press states

```tsx
// ✅ Button example - no state needed
<Pressable style={({ pressed }) => getButtonStyle(pressed)}>
```

**Local state for focus:**
- Track focus state for custom focus styling
- Useful when focus styling differs from Figma's default focus indicators

```tsx
// ✅ Input example - focus state
const [isFocused, setIsFocused] = useState(false);

<TextInput
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
/>
```

**Local state for hover + focus:**
- Interactive cards or complex components
- Web/desktop platforms with hover support

```tsx
// ✅ ActionCard example - hover + focus
const [isHovered, setIsHovered] = useState(false);
const [isFocused, setIsFocused] = useState(false);

<Pressable
  onHoverIn={() => setIsHovered(true)}
  onHoverOut={() => setIsHovered(false)}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
/>
```

#### 3. **Style Type Annotations**

**Separate types** for clarity:
```tsx
// ✅ Good: When styles are used separately
const containerStyle: ViewStyle = { /* ... */ };
const textStyle: TextStyle = { /* ... */ };
```

**Intersection types** when combined:
```tsx
// ✅ Good: TextInput combines view and text styling
const getInputStyle = (): ViewStyle & TextStyle => ({
  backgroundColor: theme.colors.background.primary,
  fontSize: theme.typography.fontSize.base,
  // Both ViewStyle and TextStyle properties
});
```

#### 4. **Always Use Theme Tokens**

**Never use hardcoded values:**
```tsx
// ❌ Bad
paddingHorizontal: 32,
fontSize: 18,
color: "#000000",

// ✅ Good
paddingHorizontal: theme.spacing[7], // 32px
fontSize: theme.typography.fontSize.md, // 18px
color: theme.colors.text.primary, // semantic black
```

#### 5. **Accessibility Requirements**

All interactive components must include:
```tsx
<Pressable
  accessibilityRole="button"      // Required: "button", "link", etc.
  accessibilityLabel={label}       // Required: Descriptive label
  accessibilityState={{ disabled }} // When applicable
/>
```

For inputs:
```tsx
<TextInput
  accessibilityLabel="Email input"
  accessibilityHint="Enter your email address"
/>
```

### Component Customization Guide

#### For Users of This Template:

**To modify existing components:**

1. **Change spacing/sizing:**
   - Update the theme token references, not the component
   - Edit `/constants/tokens.ts` or `/constants/theme.ts`

2. **Add new variants:**
   ```tsx
   // Add to props interface
   variant?: "primary" | "secondary" | "tertiary" | "custom";

   // Add to theme.ts
   button: {
     custom: {
       background: tokens.colors.customColor,
       // ... other states
     }
   }

   // Use in component
   const colorScheme = theme.colors.button[variant];
   ```

3. **Modify component behavior:**
   - Edit the component file directly
   - Keep the same structure for consistency
   - Always use theme tokens for styling

4. **Override styles for specific usage:**
   ```tsx
   // All components accept style prop
   <Button
     label="Custom"
     style={{ marginTop: 20 }}
   />
   ```

**To add new components:**

1. Create new file in `/components/ui/component-name.tsx`
2. Follow the structure outlined above
3. Use existing components as reference:
   - `button.tsx` - Simple stateless component
   - `input.tsx` - Form control with focus state
   - `action-card.tsx` - Complex component with hover/focus
4. Always export props interface
5. Always use theme tokens via `useTheme()`
6. Include JSDoc comments for all props

### Design Token Workflow

```
Figma Variables → tokens.ts → theme.ts → Components
     ↓              ↓            ↓           ↓
  Source of     Primitive   Semantic    Final
   Truth         Tokens      Tokens      Usage
```

**When updating from Figma:**
1. Extract variables from Figma using design system tools
2. Update `/constants/tokens.ts` with new primitive values
3. Update `/constants/theme.ts` to map semantic tokens
4. Components automatically inherit changes (no component code changes needed)

---

## Quick Start

```bash
npm install        # Install dependencies
npm start          # Start development server
npm run ios        # iOS preview
npm run android    # Android preview
npm run web        # Web preview
```

See `CLAUDE.md` for full development documentation.
