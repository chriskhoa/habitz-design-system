/**
 * Action Card Component
 * A card component with an icon, title, and description
 * Built from Figma design system
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@/constants/ThemeContext';
import { Text } from './text';

export interface ActionCardProps {
  /** Icon name from FontAwesome */
  icon: keyof typeof FontAwesome.glyphMap;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Optional custom style */
  style?: ViewStyle;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  style,
}) => {
  const { theme } = useTheme();

  const cardStyles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface.brand,
      borderWidth: 2,
      borderColor: theme.colors.border.primary,
      borderStyle: 'solid',
      borderRadius: theme.borderRadius.normal,
      paddingLeft: theme.spacing[5],
      paddingRight: theme.spacing[6],
      paddingVertical: theme.spacing[5],
      gap: theme.spacing[5],
      ...theme.shadows.elevation4,
    } as ViewStyle,
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 100,
      backgroundColor: theme.colors.surface.invert,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    content: {
      gap: 8,
    } as ViewStyle,
  });

  return (
    <View style={[cardStyles.container, style]}>
      <View style={cardStyles.iconContainer}>
        <FontAwesome
          name={icon}
          size={24}
          color={theme.colors.text.inverse}
        />
      </View>
      <View style={cardStyles.content}>
        <Text variant="title-medium" color={theme.colors.text.primary}>
          {title}
        </Text>
        <Text variant="body-base" color={theme.colors.text.primary}>
          {description}
        </Text>
      </View>
    </View>
  );
};
