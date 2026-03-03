import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/constants/ThemeContext";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { mode, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [customCardValue, setCustomCardValue] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [contentDialogOpen, setContentDialogOpen] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        // keyboardShouldPersistTaps="handled"
        // onScrollBeginDrag={Keyboard.dismiss}
      >
        <ThemedView style={styles.header}>
          <Text variant="title-3xlarge">UI Showcase</Text>
          <Text variant="body-base" style={styles.modeText}>
            Current mode: {mode}
          </Text>
          <Button
            label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            variant="tertiary"
            onPress={toggleTheme}
          />
        </ThemedView>

        {/* Primary Buttons */}
        <ThemedView style={styles.section}>
          <Text variant="title-large">Primary Buttons</Text>

          <ThemedView style={styles.row}>
            <Button
              label="Button"
              variant="primary"
              onPress={() => alert("Primary pressed")}
            />
          </ThemedView>

          <ThemedView style={styles.row}>
            <Button
              label="Disabled"
              variant="primary"
              disabled
              onPress={() => {}}
            />
          </ThemedView>
        </ThemedView>

        {/* Secondary Buttons */}
        <ThemedView style={styles.section}>
          <Text variant="title-large">Secondary Buttons</Text>

          <ThemedView style={styles.row}>
            <Button
              label="Button"
              variant="secondary"
              onPress={() => alert("Secondary pressed")}
            />
          </ThemedView>

          <ThemedView style={styles.row}>
            <Button
              label="Disabled"
              variant="secondary"
              disabled
              onPress={() => {}}
            />
          </ThemedView>
        </ThemedView>

        {/* Tertiary Buttons */}
        <ThemedView style={styles.section}>
          <Text variant="title-large">Tertiary Buttons</Text>

          <ThemedView style={styles.row}>
            <Button
              label="Button"
              variant="tertiary"
              onPress={() => alert("Tertiary pressed")}
            />
          </ThemedView>

          <ThemedView style={styles.row}>
            <Button
              label="Disabled"
              variant="tertiary"
              disabled
              onPress={() => {}}
            />
          </ThemedView>
        </ThemedView>

        {/* Input Fields */}
        <ThemedView style={styles.section}>
          <Text variant="title-large">Input Fields</Text>

          <ThemedView style={styles.row}>
            <Text variant="body-medium">Pill</Text>
            <Input
              shape="pill"
              placeholder="Search..."
              value={searchValue}
              onChangeText={setSearchValue}
            />
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="body-medium">Single-line</Text>
            <Input
              shape="single-line"
              placeholder="Enter your name"
              value={textValue}
              onChangeText={setTextValue}
            />
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="body-medium">Multi-line</Text>
            <Input
              shape="multi-line"
              placeholder="Enter your message..."
              value={textAreaValue}
              onChangeText={setTextAreaValue}
            />
          </ThemedView>
        </ThemedView>

        {/* Cards */}
        <ThemedView style={styles.section}>
          <Text variant="title-large">Cards</Text>

          <ThemedView style={styles.row}>
            <Card
              onPress={() => alert("Time card pressed")}
              accessibilityLabel="time"
            >
              <Card.IconContainer>
                <Card.Icon name="clock-o" />
              </Card.IconContainer>
              <Card.Content>
                <Card.Title>time</Card.Title>
                <Card.Description>
                  At a specific time every day, week, or month.
                </Card.Description>
              </Card.Content>
            </Card>
          </ThemedView>

          <ThemedView style={styles.row}>
            <Card
              onPress={() => alert("Date card pressed")}
              accessibilityLabel="date"
            >
              <View
                style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
              >
                <Card.IconContainer>
                  <Card.Icon name="calendar" />
                </Card.IconContainer>
                <Card.Content>
                  <Card.Title>date</Card.Title>
                  <Card.Description>
                    On a specific date or recurring date.
                  </Card.Description>
                </Card.Content>
              </View>
            </Card>
          </ThemedView>

          <ThemedView style={styles.row}>
            <Card accessibilityLabel="Quick action">
              <View style={{ gap: 12 }}>
                <Text variant="title-medium">Quick Action</Text>
                <Text variant="body-base">
                  Non-pressable card with interactive components
                </Text>
                <Input
                  shape="single-line"
                  placeholder="Type something..."
                  value={customCardValue}
                  onChangeText={setCustomCardValue}
                />
                <Button
                  label="Submit"
                  variant="primary"
                  onPress={() => {
                    if (customCardValue.trim()) {
                      alert(`Button clicked! Value: ${customCardValue}`);
                      setCustomCardValue("");
                    } else {
                      alert("Please enter a value first");
                    }
                  }}
                />
              </View>
            </Card>
          </ThemedView>
        </ThemedView>

        {/* Dialogs */}
        <ThemedView style={styles.section}>
          <Text variant="title-large">Dialogs</Text>

          <ThemedView style={styles.row}>
            <Text variant="body-medium">Confirmation</Text>
            <Button
              label="Open Confirm Dialog"
              variant="primary"
              onPress={() => setConfirmDialogOpen(true)}
            />
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="body-medium">With Content</Text>
            <Button
              label="Open Content Dialog"
              variant="secondary"
              onPress={() => setContentDialogOpen(true)}
            />
          </ThemedView>
        </ThemedView>

        {/* Title Typography */}
        <ThemedView style={styles.section}>
          <Text variant="title-large">Title Typography</Text>

          <ThemedView style={styles.row}>
            <Text variant="title-3xlarge">title 3xlarge</Text>
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="title-2xlarge">title 2xlarge</Text>
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="title-xlarge">title xlarge</Text>
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="title-large">title large</Text>
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="title-medium">title medium</Text>
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="title-base">title base</Text>
          </ThemedView>
        </ThemedView>

        {/* Body Typography */}
        <ThemedView style={styles.section}>
          <Text variant="title-large">Body Typography</Text>

          <ThemedView style={styles.row}>
            <Text variant="body-large">body large</Text>
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="body-medium">body medium</Text>
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="body-base">body base</Text>
          </ThemedView>

          <ThemedView style={styles.row}>
            <Text variant="body-caption">body caption</Text>
          </ThemedView>
        </ThemedView>
      </ScrollView>

      {/* Dialog Components */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <Dialog.Header>
          <Dialog.Title>Delete account?</Dialog.Title>
          <Dialog.CloseButton onPress={() => setConfirmDialogOpen(false)} />
        </Dialog.Header>

        <Dialog.Body>
          <Dialog.Description>
            This action cannot be undone. All your data will be permanently
            deleted from our servers.
          </Dialog.Description>
        </Dialog.Body>

        <Dialog.Footer>
          <Button
            label="Cancel"
            variant="secondary"
            onPress={() => setConfirmDialogOpen(false)}
          />
          <Button
            label="Delete"
            variant="primary"
            onPress={() => {
              alert("Account deleted!");
              setConfirmDialogOpen(false);
            }}
          />
        </Dialog.Footer>
      </Dialog>

      <Dialog
        open={contentDialogOpen}
        onClose={() => setContentDialogOpen(false)}
      >
        <Dialog.Header>
          <Dialog.Title>Terms and Conditions</Dialog.Title>
          <Dialog.CloseButton onPress={() => setContentDialogOpen(false)} />
        </Dialog.Header>

        <Dialog.Body>
          <Text variant="body-base">
            Welcome to our application! Before you continue, please read and
            accept our terms and conditions.
          </Text>
          <Text variant="body-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text variant="body-base">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </Text>
        </Dialog.Body>

        <Dialog.Footer>
          <Button
            label="Decline"
            variant="secondary"
            onPress={() => setContentDialogOpen(false)}
          />
          <Button
            label="Accept"
            variant="primary"
            onPress={() => {
              alert("Terms accepted!");
              setContentDialogOpen(false);
            }}
          />
        </Dialog.Footer>
      </Dialog>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 24,
  },
  header: {
    gap: 8,
    marginBottom: 8,
  },
  modeText: {
    opacity: 0.7,
    marginBottom: 8,
  },
  section: {
    gap: 12,
  },
  row: {
    gap: 8,
  },
});
