import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputLight: {
    backgroundColor: '#fff',
    color: '#000000',
  },
  inputDark: {
    backgroundColor: '#1A1A1AFF',
    color: '#FFFFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    height: 40,
    width: '100%',
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
  },
  registerButton: {
    backgroundColor: '#FFAA00FF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  loginButtonText: {
    color: '#FFFFFFFF',
    fontSize: 16,
  },
  registerPrompt: {
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  subtitle:{
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: '#FFFFFFFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#000000',
    fontSize: 16,
  },
});

export default styles;