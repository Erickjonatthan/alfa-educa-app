import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginForm from '../LoginForm';

// Mock do hook de login
jest.mock('@/hooks/useLogin', () => ({
  useLogin: () => ({
    handleLogin: jest.fn(),
    loading: false,
  }),
}));

jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn(), navigate: jest.fn() }) }));

// 1. Teste de login com credenciais válidas
it('deve chamar handleLogin ao pressionar Entrar com email e senha', () => {
  const mockHandleLogin = jest.fn();
  jest.spyOn(require('@/hooks/useLogin'), 'useLogin').mockReturnValue({ handleLogin: mockHandleLogin, loading: false });
  const { getByPlaceholderText, getAllByText } = render(<LoginForm />);
  fireEvent.changeText(getByPlaceholderText('Digite seu email'), 'teste@exemplo.com');
  fireEvent.changeText(getByPlaceholderText('Digite sua senha'), '123456');
  fireEvent.press(getAllByText('Entrar')[getAllByText('Entrar').length - 1]);
  expect(mockHandleLogin).toHaveBeenCalledWith('teste@exemplo.com', '123456');
});

// 2. Teste de mensagem de erro (simulação)
it('deve exibir mensagem de erro se login falhar', async () => {
  // Aqui você pode simular um estado de erro se o LoginForm exibir mensagem
  // Exemplo: mockar um estado de erro e verificar se o texto aparece
  // Este teste é um placeholder, ajuste conforme sua implementação
  // expect(getByText('Credenciais inválidas')).toBeTruthy();
});

// 3. Teste de navegação para cadastro
it('deve navegar para cadastro ao pressionar Cadastrar-se', () => {
  const mockPush = jest.fn();
  jest.spyOn(require('expo-router'), 'useRouter').mockReturnValue({ push: mockPush });
  const { getByText } = render(<LoginForm />);
  fireEvent.press(getByText('Cadastrar-se'));
  expect(mockPush).toHaveBeenCalledWith('/cadastro');
});

// 4. Teste de navegação para recuperação de senha
it('deve navegar para recuperação de senha ao pressionar Esqueceu sua senha?', () => {
  const mockPush = jest.fn();
  jest.spyOn(require('expo-router'), 'useRouter').mockReturnValue({ push: mockPush });
  const { getByText } = render(<LoginForm />);
  fireEvent.press(getByText('Esqueceu sua senha?'));
  expect(mockPush).toHaveBeenCalledWith('/forgot-password');
});
