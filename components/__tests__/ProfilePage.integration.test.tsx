import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfilePage from '../ProfilePage';

describe('ProfilePage', () => {
  const mockUser = {
    id: '1',
    nome: 'Douglas',
    email: 'douglas@exemplo.com',
    imgPerfil: undefined,
    isAdmin: false,
    senha: '123456',
  };
  it('deve renderizar o nome do usuário', () => {
    const { getByText } = render(
      <ProfilePage user={mockUser} handleEditProfile={jest.fn()} handleSettings={jest.fn()} />
    );
    expect(getByText('Douglas')).toBeTruthy();
  });

  it('deve renderizar mensagem padrão se não houver usuário', () => {
    const { getByText } = render(
      <ProfilePage user={null} handleEditProfile={jest.fn()} handleSettings={jest.fn()} />
    );
    expect(getByText('Usuário')).toBeTruthy();
  });

  it('deve chamar handleEditProfile ao pressionar Editar perfil', () => {
    const mockEdit = jest.fn();
    const { getByText } = render(
      <ProfilePage user={mockUser} handleEditProfile={mockEdit} handleSettings={jest.fn()} />
    );
    fireEvent.press(getByText('Editar perfil'));
    expect(mockEdit).toHaveBeenCalled();
  });

  it('deve chamar handleSettings ao pressionar Configurações', () => {
    const mockSettings = jest.fn();
    const { getByText } = render(
      <ProfilePage user={mockUser} handleEditProfile={jest.fn()} handleSettings={mockSettings} />
    );
    fireEvent.press(getByText('Configurações'));
    expect(mockSettings).toHaveBeenCalled();
  });
});
