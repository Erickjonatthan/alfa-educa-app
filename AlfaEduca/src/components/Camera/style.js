import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 0.5, // Ocupa metade da tela
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%', // Mesma altura da visualização da câmera
    flexDirection: 'row', // Alinha as letras lado a lado
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // Fundo semi-transparente
  },
  letter: {
    fontSize: 100,
    color: 'black',
    opacity: 0.5, // Letras semi-transparentes
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});