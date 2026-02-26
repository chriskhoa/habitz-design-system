import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text variant="title-3xlarge">Modal Example</Text>
      <Text variant="body-base">This is a modal screen.</Text>
      <Link href="/" dismissTo asChild>
        <Button label="Go to home screen" variant="secondary" onPress={() => {}} />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 16,
  },
});
