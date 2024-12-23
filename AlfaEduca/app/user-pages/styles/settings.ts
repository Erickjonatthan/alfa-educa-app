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
  });

  export default styles;