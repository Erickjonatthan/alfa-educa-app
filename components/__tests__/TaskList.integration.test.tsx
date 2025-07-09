import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskList from '../TaskList';

describe('TaskList', () => {
  const tasks = [
    { id: '1', titulo: 'Tarefa 1', subtitulo: '', descricao: '', nivel: 1, pontos: 10, tipo: '', respostaCorreta: '' },
    { id: '2', titulo: 'Tarefa 2', subtitulo: '', descricao: '', nivel: 1, pontos: 10, tipo: '', respostaCorreta: '' },
  ];
  const isTaskFinalizada = (id: string) => id === '1';
  it('deve renderizar todas as tarefas', () => {
    const { getByText } = render(
      <TaskList tasks={tasks} isTaskFinalizada={isTaskFinalizada} openModal={jest.fn()} />
    );
    expect(getByText('Tarefa 1')).toBeTruthy();
    expect(getByText('Tarefa 2')).toBeTruthy();
  });

  it('deve chamar openModal ao pressionar uma tarefa', () => {
    const mockOpenModal = jest.fn();
    const { getByText } = render(
      <TaskList tasks={tasks} isTaskFinalizada={isTaskFinalizada} openModal={mockOpenModal} />
    );
    fireEvent.press(getByText('Tarefa 2'));
    expect(mockOpenModal).toHaveBeenCalledWith(tasks[1]);
  });
});
