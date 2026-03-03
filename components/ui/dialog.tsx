/**
 * Dialog Component
 * A modal dialog component built from the design system
 * Follows the same visual language as Card and Button components
 */

import React, { ReactNode } from "react";
import {
  Modal,
  View,
  ViewStyle,
  TextStyle,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@/constants/ThemeContext";
import { Text } from "./text";

export interface DialogProps {
  /** Whether the dialog is visible */
  open: boolean;
  /** Handler called when the dialog should close */
  onClose: () => void;
  /** Dialog content */
  children: ReactNode;
  /** Optional custom style for dialog container */
  style?: ViewStyle;
  /** Whether clicking the backdrop closes the dialog */
  dismissible?: boolean;
  /** Optional accessibility label */
  accessibilityLabel?: string;
}

export interface DialogOverlayProps {
  /** Overlay content (typically Dialog.Content) */
  children: ReactNode;
  /** Handler for backdrop press */
  onPress?: () => void;
}

export interface DialogContentProps {
  /** Content container for the dialog */
  children: ReactNode;
  /** Optional custom style */
  style?: ViewStyle;
}

export interface DialogHeaderProps {
  /** Header content (title and optional close button) */
  children: ReactNode;
  /** Optional custom style */
  style?: ViewStyle;
}

export interface DialogTitleProps {
  /** Title text */
  children: ReactNode;
  /** Optional custom style */
  style?: TextStyle;
}

export interface DialogDescriptionProps {
  /** Description text */
  children: ReactNode;
  /** Optional custom style */
  style?: TextStyle;
}

export interface DialogBodyProps {
  /** Body content - scrollable area */
  children: ReactNode;
  /** Optional custom style */
  style?: ViewStyle;
}

export interface DialogFooterProps {
  /** Footer content (typically action buttons) */
  children: ReactNode;
  /** Optional custom style */
  style?: ViewStyle;
}

export interface DialogCloseButtonProps {
  /** Handler for close button press */
  onPress: () => void;
  /** Optional custom style */
  style?: ViewStyle;
}

const DialogRoot: React.FC<DialogProps> = ({
  open,
  onClose,
  children,
  dismissible = true,
  accessibilityLabel,
}) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={dismissible ? onClose : undefined}
      accessibilityLabel={accessibilityLabel}
      statusBarTranslucent
    >
      <DialogOverlay onPress={dismissible ? onClose : undefined}>
        <DialogContent>{children}</DialogContent>
      </DialogOverlay>
    </Modal>
  );
};

const DialogOverlay: React.FC<DialogOverlayProps> = ({
  children,
  onPress,
}) => {
  const { theme } = useTheme();

  const overlayStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.colors.background.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing[5],
  };

  return (
    <Pressable style={overlayStyle} onPress={onPress}>
      {/* Stop propagation to prevent closing when clicking dialog content */}
      <Pressable onPress={(e) => e.stopPropagation()}>
        {children}
      </Pressable>
    </Pressable>
  );
};

const DialogContent: React.FC<DialogContentProps> = ({
  children,
  style,
}) => {
  const { theme } = useTheme();

  const contentStyle: ViewStyle = {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.colors.surface.brand,
    borderWidth: 2,
    borderColor: theme.colors.border.primary,
    borderRadius: theme.borderRadius.lg, // 16px - larger than card for more prominence
    // Maximum elevation for dialog prominence
    ...theme.shadows.xl,
    // On web, ensure proper stacking
    ...(Platform.OS === "web" && { zIndex: 1000 }),
  };

  return <View style={[contentStyle, style]}>{children}</View>;
};

const DialogHeader: React.FC<DialogHeaderProps> = ({ children, style }) => {
  const { theme } = useTheme();

  const headerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[6],
    paddingBottom: theme.spacing[4],
    gap: theme.spacing[4],
  };

  return <View style={[headerStyle, style]}>{children}</View>;
};

const DialogTitle: React.FC<DialogTitleProps> = ({ children, style }) => {
  return (
    <Text variant="title-large" style={[{ flex: 1 }, style]}>
      {children}
    </Text>
  );
};

const DialogDescription: React.FC<DialogDescriptionProps> = ({
  children,
  style,
}) => {
  const { theme } = useTheme();

  const descriptionStyle: TextStyle = {
    color: theme.colors.text.secondary,
  };

  return (
    <Text variant="body-base" style={[descriptionStyle, style]}>
      {children}
    </Text>
  );
};

const DialogBody: React.FC<DialogBodyProps> = ({ children, style }) => {
  const { theme } = useTheme();

  const bodyStyle: ViewStyle = {
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[4],
    gap: theme.spacing[4],
  };

  // Use ScrollView to handle long content
  return (
    <ScrollView
      style={[bodyStyle, style]}
      showsVerticalScrollIndicator={true}
      bounces={false}
    >
      {children}
    </ScrollView>
  );
};

const DialogFooter: React.FC<DialogFooterProps> = ({ children, style }) => {
  const { theme } = useTheme();

  const footerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: theme.spacing[3],
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[6],
  };

  return <View style={[footerStyle, style]}>{children}</View>;
};

const DialogCloseButton: React.FC<DialogCloseButtonProps> = ({
  onPress,
  style,
}) => {
  const { theme } = useTheme();

  const closeButtonStyle: ViewStyle = {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface.invert,
    borderWidth: 2,
    borderColor: theme.colors.border.primary,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Pressable
      style={({ pressed }) => [
        closeButtonStyle,
        pressed && {
          backgroundColor: theme.colors.secondary.pressed,
        },
        style,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Close dialog"
    >
      <FontAwesome
        name="times"
        size={16}
        color={theme.colors.text.inverse}
      />
    </Pressable>
  );
};

export const Dialog = Object.assign(DialogRoot, {
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  CloseButton: DialogCloseButton,
});
