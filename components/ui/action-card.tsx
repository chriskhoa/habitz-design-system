/**
 * Action Card Component
 * A card component with an icon, title, and description
 * Built from Figma design system
 */

import React, { useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@/constants/ThemeContext";
import { Text } from "./text";

export interface ActionCardProps {
  /** Icon name from FontAwesome */
  icon: keyof typeof FontAwesome.glyphMap;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Press handler */
  onPress: () => void;
  /** Optional custom style */
  style?: ViewStyle;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  onPress,
  style,
}) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = (pressed: boolean): ViewStyle => {
    // Determine background color based on state
    let backgroundColor = theme.colors.surface.brand; // idle
    if (pressed) {
      backgroundColor = theme.colors.surface.brandContrast; // pressed
    } else if (isHovered) {
      backgroundColor = theme.colors.surface.brandSecondary; // hover
    }

    // Determine border width (4px on focused, 2px otherwise)
    const borderWidth = isFocused ? 4 : 2;

    return {
      backgroundColor,
      borderWidth,
      borderColor: theme.colors.border.primary,
      borderRadius: theme.borderRadius.normal,
      paddingLeft: theme.spacing[5],
      paddingRight: theme.spacing[6],
      paddingVertical: theme.spacing[5],
      gap: theme.spacing[5],
      // Only apply shadow when NOT pressed
      ...(!pressed && theme.shadows.elevation4),
    };
  };

  const iconContainerStyle: ViewStyle = {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: theme.colors.surface.invert,
    justifyContent: "center",
    alignItems: "center",
  };

  const contentStyle: ViewStyle = {
    gap: 8,
  };

  return (
    <Pressable
      style={({ pressed }) => [getContainerStyle(pressed), style]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={iconContainerStyle}>
        <FontAwesome
          name={icon}
          size={24}
          color={theme.colors.text.inverse}
        />
      </View>
      <View style={contentStyle}>
        <Text variant="title-medium">
          {title}
        </Text>
        <Text variant="body-base">
          {description}
        </Text>
      </View>
    </Pressable>
  );
};
