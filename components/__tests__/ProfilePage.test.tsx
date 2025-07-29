import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfilePage from '../ProfilePage';

jest.mock('../../hooks/useColorScheme', () => ({ __esModule: true, useColorScheme: () => 'light' }));
jest.mock('@/assets/images/icons/mdi--gear.svg', () => 'GearIcon');
jest.mock('@/assets/images/icons/fluent-emoji-flat--trophy.svg', () => 'TrophyIcon');
jest.mock('@/assets/images/icons/mingcute--user-edit-fill.svg', () => 'UserEditIcon');

const mockUser = {
  id: '1',
  nome: 'Douglas',
  email: 'douglas@exemplo.com',
  imgPerfil: undefined,
  isAdmin: false,
  senha: '123456',
};

describe('ProfilePage', () => {
  it('deve renderizar informações do usuário', () => {
    const { getByText } = render(
      <ProfilePage user={mockUser} handleEditProfile={jest.fn()} handleSettings={jest.fn()} />
    );
    expect(getByText('Douglas')).toBeTruthy();
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