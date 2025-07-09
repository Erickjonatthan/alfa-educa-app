import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskModal from '../TaskModal';

describe('TaskModal', () => {
  const task = {
    id: '1',
    titulo: 'Tarefa Teste',
    subtitulo: 'Sub',
    descricao: 'Desc',
    nivel: 1,
    pontos: 10,
    tipo: 'quiz',
    respostaCorreta: '42',
  };
  it('deve exibir informações da tarefa', () => {
    const { getByText } = render(
      <TaskModal visible={true} task={task} onClose={jest.fn()} onPlay={jest.fn()} isFinalizada={false} />
    );
    expect(getByText('Tarefa Teste')).toBeTruthy();
    expect(getByText('Sub')).toBeTruthy();
    expect(getByText('Nível: 1')).toBeTruthy();
    expect(getByText('Pontos: 10')).toBeTruthy();
  });

  it('deve chamar onPlay ao pressionar Iniciar', () => {
    const mockPlay = jest.fn();
    const { getByText } = render(
      <TaskModal visible={true} task={task} onClose={jest.fn()} onPlay={mockPlay} isFinalizada={false} />
    );
    fireEvent.press(getByText('Iniciar'));
    expect(mockPlay).toHaveBeenCalled();
  });

  it('deve mostrar botão Finalizada se isFinalizada=true', () => {
    const { getByText } = render(
      <TaskModal visible={true} task={task} onClose={jest.fn()} onPlay={jest.fn()} isFinalizada={true} />
    );
    expect(getByText('Finalizada')).toBeTruthy();
  });

  it('deve chamar onClose ao pressionar Fechar', () => {
    const mockClose = jest.fn();
    const { getByText } = render(
      <TaskModal visible={true} task={task} onClose={mockClose} onPlay={jest.fn()} isFinalizada={false} />
    );
    fireEvent.press(getByText('Fechar'));
    expect(mockClose).toHaveBeenCalled();
  });
});
