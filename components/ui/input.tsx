/**
 * Input Component
 * Built using design tokens from Figma
 * Supports: pill, single-line, and multi-line shapes
 */

import { useTheme } from "@/constants/ThemeContext";
import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export type ShapeType = "pill" | "single-line" | "multi-line";

export interface InputProps extends Omit<TextInputProps, "style"> {
  /** Input shape - pill, single-line, or multi-line */
  shape?: ShapeType;
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Callback when text changes */
  onChangeText?: (text: string) => void;
  /** Optional style override */
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  shape = "single-line",
  placeholder = "Type your input",
  value,
  onChangeText,
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Determine current state
  const hasValue = value && value.length > 0;
  const showPlaceholder = !hasValue;

  const getInputStyle = (): ViewStyle & TextStyle => {
    const isPill = shape === "pill";
    const isMultiLine = shape === "multi-line";

    // Base style using Text component's body-base variant styling
    const baseStyle: ViewStyle & TextStyle = {
      backgroundColor: theme.colors.background.primary, // white
      paddingHorizontal: theme.spacing[5], // 16px box padding
      paddingVertical: theme.spacing[3], // 8px box padding
      // Typography matching Text component's body-base variant
      fontFamily: theme.typography.fontFamily.body, // DM Sans
      fontSize: theme.typography.fontSize.base, // 16px
      fontWeight: theme.typography.fontWeight.regular, // 400
      color: hasValue
        ? theme.colors.text.primary // black when has value
        : theme.colors.secondary.pressed, // #a8a9b2 for placeholder
    };

    // Height - increased to accommodate line height better
    if (isMultiLine) {
      baseStyle.height = 72; // Increased from 64
    } else {
      baseStyle.height = 40; // Increased from 40
    }

    // Border radius
    if (isPill) {
      baseStyle.borderRadius = theme.borderRadius.full; // 9999 (pill shape)
    } else {
      baseStyle.borderRadius = theme.borderRadius.normal; // 8px
    }

    // Border width and color based on state
    baseStyle.borderWidth = 2;
    if (isFocused) {
      // Focus or active state: 2px pink border
      baseStyle.borderColor = theme.colors.primary.pressed; // #f55daf (pink)
    } else {
      // Idle state: 2px black border
      baseStyle.borderColor = theme.colors.border.primary; // black
    }

    return baseStyle;
  };

  const containerStyle: ViewStyle = {
    position: "relative",
    width: 342, // Fixed width from Figma
  };

  return (
    <View style={[containerStyle, style]}>
      <TextInput
        style={getInputStyle()}
        placeholder={showPlaceholder ? placeholder : undefined}
        placeholderTextColor={theme.colors.secondary.pressed} // #a8a9b2
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline={shape === "multi-line"}
        numberOfLines={shape === "multi-line" ? 2 : 1}
        textAlignVertical={shape === "multi-line" ? "top" : "center"}
        {...rest}
      />
    </View>
  );
};
