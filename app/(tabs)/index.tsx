import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/constants/ThemeContext';

export default function HomeScreen() {
  const { mode, toggleTheme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Button Showcase</ThemedText>
          <ThemedText style={styles.modeText}>Current mode: {mode}</ThemedText>
          <Button
            label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            variant="tertiary"
            onPress={toggleTheme}
          />
        </ThemedView>

        {/* Primary Buttons */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Primary Buttons</ThemedText>

          <ThemedView style={styles.row}>
            <Button label="Default" variant="primary" onPress={() => alert('Primary pressed')} />
          </ThemedView>

          <ThemedView style={styles.row}>
            <Button label="Disabled" variant="primary" disabled onPress={() => {}} />
          </ThemedView>
        </ThemedView>

        {/* Secondary Buttons */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Secondary Buttons</ThemedText>

          <ThemedView style={styles.row}>
            <Button label="Default" variant="secondary" onPress={() => alert('Secondary pressed')} />
          </ThemedView>

          <ThemedView style={styles.row}>
            <Button label="Disabled" variant="secondary" disabled onPress={() => {}} />
          </ThemedView>
        </ThemedView>

        {/* Tertiary Buttons */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Tertiary Buttons</ThemedText>

          <ThemedView style={styles.row}>
            <Button label="Default" variant="tertiary" onPress={() => alert('Tertiary pressed')} />
          </ThemedView>

          <ThemedView style={styles.row}>
            <Button label="Disabled" variant="tertiary" disabled onPress={() => {}} />
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
