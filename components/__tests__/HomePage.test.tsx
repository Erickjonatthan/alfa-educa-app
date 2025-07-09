import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomePage from '../HomePage';

describe('HomePage', () => {
  const mockUser = { nome: 'Douglas', email: 'douglas@exemplo.com' };
  it('deve renderizar o nome do usuário', () => {
    const { getByText } = render(
      <HomePage user={mockUser} handleStartLearning={jest.fn()} />
    );
    expect(getByText('Bem vindo, Douglas!')).toBeTruthy();
  });

  it('deve renderizar mensagem padrão se não houver usuário', () => {
    const { getByText } = render(
      <HomePage user={null} handleStartLearning={jest.fn()} />
    );
    expect(getByText('Bem vindo, Usuário!')).toBeTruthy();
  });

  it('deve chamar handleStartLearning ao pressionar o botão', () => {
    const mockStart = jest.fn();
    const { getByText } = render(
      <HomePage user={mockUser} handleStartLearning={mockStart} />
    );
    fireEvent.press(getByText('Começar a Aprender'));
    expect(mockStart).toHaveBeenCalled();
  });
});
