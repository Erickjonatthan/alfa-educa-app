import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginForm from '../LoginForm';

jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('../../hooks/useLogin', () => ({ useLogin: () => ({ handleLogin: jest.fn(), loading: false }) }));
jest.mock('../../hooks/useShowGif', () => ({ __esModule: true, useShowGif: () => false }));
jest.mock('../../hooks/useColorScheme', () => ({ __esModule: true, useColorScheme: () => 'light' }));
jest.mock('expo-image', () => ({ Image: 'Image' }));

describe('LoginForm', () => {
  it('deve renderizar corretamente', () => {
    const { getByPlaceholderText, getAllByText } = render(<LoginForm />);
    expect(getByPlaceholderText('Digite seu email')).toBeTruthy();
    expect(getByPlaceholderText('Digite sua senha')).toBeTruthy();
    expect(getAllByText('Entrar').length).toBeGreaterThanOrEqual(1);
  });

  it('deve permitir digitar email e senha', () => {
    const { getByPlaceholderText } = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Digite seu email');
    const senhaInput = getByPlaceholderText('Digite sua senha');
    fireEvent.changeText(emailInput, 'teste@exemplo.com');
    fireEvent.changeText(senhaInput, '123456');
    expect(emailInput.props.value).toBe('teste@exemplo.com');
    expect(senhaInput.props.value).toBe('123456');
  });

  it('deve chamar handleLogin ao pressionar Entrar', () => {
    const mockHandleLogin = jest.fn();
    jest.spyOn(require('@/hooks/useLogin'), 'useLogin').mockReturnValue({ handleLogin: mockHandleLogin, loading: false });
    const { getAllByText, getByPlaceholderText } = render(<LoginForm />);
    fireEvent.changeText(getByPlaceholderText('Digite seu email'), 'teste@exemplo.com');
    fireEvent.changeText(getByPlaceholderText('Digite sua senha'), '123456');
    const buttons = getAllByText('Entrar');
    fireEvent.press(buttons[buttons.length - 1]);
    expect(mockHandleLogin).toHaveBeenCalledWith('teste@exemplo.com', '123456');
  });
});