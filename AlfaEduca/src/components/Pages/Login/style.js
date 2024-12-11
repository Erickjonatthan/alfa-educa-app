import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '80%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    height: 45,
    width: '80%', // Aumenta a largura dos inputs
    borderWidth: 1,
    borderColor: '#ecf0f1',
    backgroundColor: '#ecf0f1',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 15,
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonPrimary: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonSecond: {
    backgroundColor: 'rgb(78, 2, 76)',
    borderColor: 'rgb(78, 2, 76)',
    borderWidth: 1,
  },
  title: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 28,
    textTransform: 'capitalize',
  },
  text: {
    color: 'white',
  },
});