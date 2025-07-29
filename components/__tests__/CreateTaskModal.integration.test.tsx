import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreateTaskModal from '../CreateTaskModal';

describe('CreateTaskModal', () => {
  const baseTask = {
    titulo: 'Nova tarefa',
    subtitulo: 'Sub',
    descricao: 'Desc',
    nivel: 1,
    pontos: 10,
    tipo: 'quiz',
    respostaCorreta: '42',
  };
  it('deve exibir erro se tentar criar tarefa sem campos obrigatórios', async () => {
    const onCreate = jest.fn();
    const setNewTask = jest.fn();
    const { getByText } = render(
      <CreateTaskModal visible={true} onClose={jest.fn()} onCreate={onCreate} newTask={{}} setNewTask={setNewTask} />
    );
    fireEvent.press(getByText('Criar Atividade'));
    await waitFor(() => {
      expect(onCreate).not.toHaveBeenCalled();
    });
  });

  it('deve chamar onCreate se todos os campos obrigatórios estiverem preenchidos', async () => {
    const onCreate = jest.fn().mockResolvedValue(undefined);
    const setNewTask = jest.fn();
    const { getByText, rerender } = render(
      <CreateTaskModal visible={true} onClose={jest.fn()} onCreate={onCreate} newTask={baseTask} setNewTask={setNewTask} />
    );
    fireEvent.press(getByText('Criar Atividade'));
    await waitFor(() => {
      expect(onCreate).toHaveBeenCalled();
    });
  });
});
