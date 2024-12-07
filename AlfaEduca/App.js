import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FormularioUsuario from './src/components/Forms';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FormularioUsuario />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});