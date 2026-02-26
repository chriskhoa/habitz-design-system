/**
 * Button Component
 * Built using design tokens from Figma
 */

import { useTheme } from "@/constants/ThemeContext";
import React from "react";
import { Pressable, Text, TextStyle, ViewStyle } from "react-native";

export interface ButtonProps {
  /** Button text label */
  label: string;
  /** Button variant - Primary: main action, Secondary: non-critical, Tertiary: always visible actions */
  variant?: "primary" | "secondary" | "tertiary";
  /** Disabled state */
  disabled?: boolean;
  /** Press handler */
  onPress: () => void;
  /** Optional custom styles */
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  disabled = false,
  onPress,
  style,
}) => {
  const { theme } = useTheme();
  const colorScheme = theme.colors.button[variant];

  // Use spacing tokens directly from Figma
  const paddingHorizontal = theme.spacing[7]; // 32px from Figma
  const paddingVertical = theme.spacing[4]; // 12px from Figma
  const fontSize = theme.typography.fontSize.md; // 18px from Figma
  const lineHeight = theme.typography.lineHeight.sm; // 24px from Figma
  const borderRadius = theme.borderRadius.normal; // 8px from Figma
  const borderWidth = 2; // 2px from Figma

  // Build button styles from theme (without shadow - shadow is added conditionally)
  const getButtonStyle = (pressed: boolean): ViewStyle => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start", // Size to content, don't stretch to fill container
    paddingHorizontal,
    paddingVertical,
    borderRadius,
    backgroundColor: disabled
      ? colorScheme.backgroundDisabled
      : pressed
        ? colorScheme.backgroundPressed
        : colorScheme.background,
    // Apply border for primary and secondary buttons
    ...(variant !== "tertiary" && {
      borderWidth,
      borderColor: disabled ? colorScheme.borderDisabled : colorScheme.border,
      // Only apply shadow when NOT pressed and NOT disabled (elevated state)
      ...(!pressed && !disabled && theme.shadows.elevation4),
    }),
  });

  const textStyleObj: TextStyle = {
    fontSize,
    lineHeight,
    fontWeight: theme.typography.fontWeight.medium, // 500 from Figma
    color: disabled ? colorScheme.textDisabled : colorScheme.text,
  };

  return (
    <Pressable
      style={({ pressed }) => [getButtonStyle(pressed), style]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
    >
      <Text style={textStyleObj}>{label}</Text>
    </Pressable>
  );
};
