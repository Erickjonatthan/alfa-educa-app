import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#280F2BFF',
  },
  message: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
    margin: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  logoImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  cameraContainer: {
    width: '100%',
    height: 200,
    marginVertical: 20,
    position: 'relative', // Adicionado para permitir posicionamento absoluto do overlay
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  photo: {
    width: '100%',
    height: 400,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FFAA00FF',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    width: '60%',
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 16,
  },
  icon: {
    fontSize: 24,
  },
  centerText: {
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  manipulatedImage: {
    width: 300, // Largura fixa
    height: 200, // Altura fixa
    resizeMode: 'contain', // Garantir que a imagem não seja cortada
    marginBottom: 30,
    marginTop: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Cobrir toda a área da câmera
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
  smallLetter: {
    fontSize: 50,
    color: 'black',
    opacity: 0.5, // Letras semi-transparentes
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    fontSize: 25,
  },
});

export default styles;