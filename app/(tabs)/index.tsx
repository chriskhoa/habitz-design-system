import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/constants/ThemeContext";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { mode, toggleTheme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedView style={styles.header}>
          <Text variant="title-3xlarge">Button Showcase</Text>
          <Text variant="body-base" style={styles.modeText}>Current mode: {mode}</Text>
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
              label="Default"
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
              label="Default"
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
              label="Default"
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
