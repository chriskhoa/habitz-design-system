import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Text } from '@/components/ui/text';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text variant="title-3xlarge">Explore</Text>
      <Text variant="body-base">This is a blank page for exploration.</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 8,
  },
});
