import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput } from 'react-native';

interface Activity {
  id: number;
  question: string;
  answer: string;
}

const ActivityManager = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    // Função para buscar atividades do servidor
    const fetchActivities = async () => {
      const response = await fetch('');
      const data = await response.json();
      setActivities(data);
    };

    fetchActivities();
  }, []);

  const handleAnswerSubmit = async () => {
    const currentActivity = activities[currentActivityIndex];

    // Enviar resposta para o servidor
    const response = await fetch(`SERVIDOR/${currentActivity.id}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer: userAnswer }),
    });

    const result = await response.json();

    if (result.correct) {
      // Passar para a próxima atividade
      setCurrentActivityIndex((prevIndex) => prevIndex + 1);
      setUserAnswer('');
    } else {
      alert('Resposta incorreta, tente novamente.');
    }
  };

  if (activities.length === 0) {
    return <Text>Carregando atividades...</Text>;
  }

  const currentActivity = activities[currentActivityIndex];

  return (
    <View>
      <Text>{currentActivity.question}</Text>
      <TextInput
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Digite sua resposta"
      />
      <Button title="Enviar Resposta" onPress={handleAnswerSubmit} />
    </View>
  );
};

export default ActivityManager;