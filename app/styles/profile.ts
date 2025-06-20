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
    titleContainer: {
      marginBottom: 16,
      marginTop: 16,
    },
    title: {
      textAlign: 'center',
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
    profileImageContainer: {
      marginBottom: 16,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    userName: {
      marginBottom: 16,
    },
    optionContainer: {
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row', // Adicione esta linha para alinhar o ícone e o texto na horizontal
    },
    optionContainerDark: {
      backgroundColor: '#333',
    },
    optionContainerLight: {
      backgroundColor: '#fff',
    },
    optionText: {
      marginLeft: 8, // Adicione esta linha para adicionar espaço entre o ícone e o texto
    },
    optionTextDark: {
      color: '#fff',
    },
    optionTextLight: {
      color: '#000',
    },
    optionIcon: {
      marginRight: 8, // Adicione esta linha para adicionar espaço entre o ícone e o texto
    },
    userLevel: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    progressBar: {
      height: 10,
      width: 200,
      borderRadius: 10,
      margin: 10,

    },
    xpText: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 20,
    },
  });

export default styles;