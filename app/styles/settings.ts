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
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      marginTop: 16,
    },
    backButton: {
      marginRight: 8,
    },
    title: {
      textAlign: 'center',
      flex: 1,
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
      flexDirection: 'row',
      alignItems: 'center',
    },
    achievementImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    sectionTitleDark: {
      color: '#fff',
    },
    sectionTitleLight: {
      color: '#000',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    scrollContainer: {
      flexGrow: 1,
    },
  });

  export default styles;