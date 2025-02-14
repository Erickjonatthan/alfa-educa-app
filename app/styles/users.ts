import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    alignItems: 'center',
  },
  containerDark: {
    backgroundColor: '#280F2BFF',
  },
  containerLight: {
    backgroundColor: '#FCE6FFFF',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  header: {
    marginBottom: 16,
    marginTop: 16,
  },
  welcomeMessage: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 16,
    width: '100%',
  },
  progressTitle: {
    marginBottom: 8,
  },
  progressContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  progressContent: {
    color: '#000',
  },
  startButton: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  startButtonDark: {
    backgroundColor: '#333',
  },
  startButtonLight: {
    backgroundColor: '#fff',
  },
  startButtonText: {
    marginLeft: 8,
  },
  startButtonTextDark: {
    color: '#fff',
  },
  startButtonTextLight: {
    color: '#000',
  },
  startButtonIcon: {
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#000',
    marginBottom: 16,
    flexDirection: 'row', // Adiciona esta linha
    alignItems: 'center', // Adiciona esta linha
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10, // Altera para marginRight
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: "#FFAA00FF",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  resetButtonContainer:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  adminText: {
    color: "yellow",
  },
  userInfoContainer: {
    flex: 1, // Adiciona esta linha
  },
});

export default styles;