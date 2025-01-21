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
      alignItems: 'center',
    },
    welcomeMessage: {
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
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
  });

export default styles;