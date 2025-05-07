import { View, Text, StyleSheet} from 'react-native';

export default function TimelapScreen() {
  return (
    <View style={styles.container}>
            <Text>Mis Clases</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  day: {
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  slots: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  slotItem: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 10,
  },
});
