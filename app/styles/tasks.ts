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
    width: '100%',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#5D0052FF",
    marginBottom: 16,
    width: "50%", 
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
    color: "black",
  },
  userInfoContainer: {
    flex: 1, // Adiciona esta linha
  },
  taskContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FDD992FF',
    borderRadius: 8,
    width: '80%',
    backgroundColor: '#000000FF',
  },
  taskInfoContainer: {
    marginBottom: 8,
  },
  createTaskContainer: {
    marginTop: 32,
  },
  createTaskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  createTaskSubtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FAE6FDFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#5D0052FF",
    borderRadius: 5,
    width: '100%', // Adiciona esta linha
    alignItems: 'center', // Adiciona esta linha
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  taskContainerFinalizada: {
    borderColor: "green",
    borderWidth: 2,
  },
});

export default styles;