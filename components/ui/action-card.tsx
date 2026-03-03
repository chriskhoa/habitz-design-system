/**
 * Action Card Component
 * A flexible card component with optional helper subcomponents
 * Built from Figma design system
 */

import React, { useState, ReactNode } from "react";
import { Pressable, View, ViewStyle, TextStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@/constants/ThemeContext";
import { Text } from "./text";

export interface ActionCardProps {
  /** Card content - can be any React components */
  children: ReactNode;
  /** Optional press handler - if not provided, card will not be pressable */
  onPress?: () => void;
  /** Optional custom style */
  style?: ViewStyle;
  /** Optional accessibility label */
  accessibilityLabel?: string;
}

export interface ActionCardIconContainerProps {
  /** Icon container content */
  children: ReactNode;
  /** Optional custom style */
  style?: ViewStyle;
}

export interface ActionCardIconProps {
  /** Icon name from FontAwesome */
  name: keyof typeof FontAwesome.glyphMap;
  /** Optional icon size */
  size?: number;
  /** Optional icon color */
  color?: string;
}

export interface ActionCardContentProps {
  /** Content area for title and description */
  children: ReactNode;
  /** Optional custom style */
  style?: ViewStyle;
}

export interface ActionCardTitleProps {
  /** Title text */
  children: ReactNode;
  /** Optional custom style */
  style?: TextStyle;
}

export interface ActionCardDescriptionProps {
  /** Description text */
  children: ReactNode;
  /** Optional custom style */
  style?: TextStyle;
}

const ActionCardRoot: React.FC<ActionCardProps> = ({
  children,
  onPress,
  style,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = (pressed: boolean = false): ViewStyle => {
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

  // If no onPress is provided, render as a non-pressable View
  if (!onPress) {
    return (
      <View
        style={[getContainerStyle(), style]}
        accessibilityLabel={accessibilityLabel}
      >
        {children}
      </View>
    );
  }

  // Otherwise, render as a Pressable
  return (
    <Pressable
      style={({ pressed }) => [getContainerStyle(pressed), style]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Pressable>
  );
};

const ActionCardIconContainer: React.FC<ActionCardIconContainerProps> = ({
  children,
  style,
}) => {
  const { theme } = useTheme();

  const iconContainerStyle: ViewStyle = {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: theme.colors.surface.invert,
    justifyContent: "center",
    alignItems: "center",
  };

  return <View style={[iconContainerStyle, style]}>{children}</View>;
};

const ActionCardIcon: React.FC<ActionCardIconProps> = ({
  name,
  size = 24,
  color,
}) => {
  const { theme } = useTheme();
  const iconColor = color || theme.colors.text.inverse;

  return <FontAwesome name={name} size={size} color={iconColor} />;
};

const ActionCardContent: React.FC<ActionCardContentProps> = ({
  children,
  style,
}) => {
  const contentStyle: ViewStyle = {
    gap: 8,
  };

  return <View style={[contentStyle, style]}>{children}</View>;
};

const ActionCardTitle: React.FC<ActionCardTitleProps> = ({
  children,
  style,
}) => {
  return (
    <Text variant="title-medium" style={style}>
      {children}
    </Text>
  );
};

const ActionCardDescription: React.FC<ActionCardDescriptionProps> = ({
  children,
  style,
}) => {
  return (
    <Text variant="body-base" style={style}>
      {children}
    </Text>
  );
};

export const ActionCard = Object.assign(ActionCardRoot, {
  IconContainer: ActionCardIconContainer,
  Icon: ActionCardIcon,
  Content: ActionCardContent,
  Title: ActionCardTitle,
  Description: ActionCardDescription,
});
