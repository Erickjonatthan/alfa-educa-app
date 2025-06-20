import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { listarAtividades } from '@/controllers/atividade/listarAtividades';
import { listarResposta } from '@/controllers/resposta/listarResposta';
import Task from '@/context/Task';
import Answer from '@/context/Answer';

const useFetchTasks = () => {
  const [atividades, setAtividades] = useState<Task[]>([]);
  const [respostas, setRespostas] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAtividades = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const [data, respostasData] = await Promise.all([
          listarAtividades(token),
          listarResposta(token),
        ]);
        setAtividades(data);
        setRespostas(respostasData);
      }
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAtividades();
    }, [])
  );

  return { atividades, respostas, isLoading, fetchAtividades };
};

export default useFetchTasks;