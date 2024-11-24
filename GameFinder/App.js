import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState('');

  const syllabify = (word) => {
    // Função simples para dividir a palavra em sílabas
    return word.match(/[^aeiou]*[aeiou]+(?:[^aeiou]*$|[^aeiou](?=[^aeiou]))?/gi) || [];
  };

  const spellOut = () => {
    const syllables = syllabify(text);
    syllables.forEach((syllable, index) => {
      Speech.speak(syllable, { language: 'pt-BR', pitch: 1, rate: 1 });
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite algo para ouvir"
        onChangeText={setText}
        value={text}
      />
      <Button title="Pressione para ouvir" onPress={spellOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});