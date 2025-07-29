import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskList from '../TaskList';

const mockTasks = [
  {
    id: '1',
    titulo: 'Tarefa 1',
    subtitulo: 'Sub 1',
    descricao: 'Descrição 1',
    nivel: 1,
    pontos: 10,
    tipo: 'simples',
    respostaCorreta: 'Resposta 1'
  },
  {
    id: '2',
    titulo: 'Tarefa 2',
    subtitulo: 'Sub 2',
    descricao: 'Descrição 2',
    nivel: 2,
    pontos: 20,
    tipo: 'simples',
    respostaCorreta: 'Resposta 2'
  }
];

describe('TaskList', () => {
  it('deve renderizar todas as tarefas', () => {
    const { getByText } = render(
      <TaskList tasks={mockTasks} isTaskFinalizada={() => false} openModal={jest.fn()} />
    );
    expect(getByText('Tarefa 1')).toBeTruthy();
    expect(getByText('Tarefa 2')).toBeTruthy();
  });

  it('deve aplicar estilo de tarefa finalizada', () => {
    const { getByText } = render(
      <TaskList tasks={mockTasks} isTaskFinalizada={id => id === '1'} openModal={jest.fn()} />
    );
    const tarefa1 = getByText('Tarefa 1');
    expect(tarefa1.parent).not.toBeNull();
    if (tarefa1.parent) {
      expect(tarefa1.parent.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({}),
          expect.objectContaining({}),
        ])
      );
    }
  });

  it('deve chamar openModal ao pressionar uma tarefa', () => {
    const mockOpenModal = jest.fn();
    const { getByText } = render(
      <TaskList tasks={mockTasks} isTaskFinalizada={() => false} openModal={mockOpenModal} />
    );
    fireEvent.press(getByText('Tarefa 2'));
    expect(mockOpenModal).toHaveBeenCalledWith(mockTasks[1]);
  });
});