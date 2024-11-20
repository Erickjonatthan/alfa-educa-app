import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, ScrollView, Image, ActivityIndicator, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function App() {
  const [qtdJogos, setQtdJogos] = useState('');
  const [specifications, setSpecifications] = useState({
    free: false,
    mobile: false,
    fps: false,
    rpg: false,
    aventura: false,
    estrategia: false,
    simulacao: false,
    esportes: false,
    corrida: false,
  });
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  const fetchGames = async () => {
    setLoading(true);
    setGames([]);
    setImageUrls({});
    const specs = Object.keys(specifications)
      .filter(key => specifications[key])
      .map((spec, index) => `${index + 1}) ${spec.charAt(0).toUpperCase() + spec.slice(1)}`)
      .join(' \n ');
  
    const request = {
      contents: {
        parts: {
          text: `especificações:\n${specs}`
        }
      }
    };
  
    const token = ''; // Substitua 'seu_token_aqui' pelo seu token Bearer
  
    try {
      const response = await fetch(`http://192.168.3.102:8080/jogos?qtdJogos=${qtdJogos}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(request)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const games = await response.json();
      setGames(games);

      const urls = {};
      for (const game of games) {
        const url = await fetchImageUrl(game.titulo);
        urls[game.titulo] = url;
      }
      setImageUrls(urls);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImageUrl = async (gameTitle) => {
    const url = ``;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.items[0].link;
    } catch (error) {
      console.error('Erro ao buscar a imagem:', error);
      return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Game Finder</Text>
      <Text>Quantidade de Jogos:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={qtdJogos}
        onChangeText={setQtdJogos}
      />
      {Object.keys(specifications).map((key) => (
        <View key={key} style={styles.checkboxContainer}>
          <Checkbox
            value={specifications[key]}
            onValueChange={(newValue) => setSpecifications({ ...specifications, [key]: newValue })}
          />
          <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
        </View>
      ))}
      <Button title="Avançar" onPress={fetchGames} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <View style={styles.results}>
        {games.length === 0 && !loading && <Text>Não Encontrado</Text>}
        {games.map((game, index) => (
          <View key={index} style={styles.game}>
            <Text style={styles.gameTitle}>{game.titulo}</Text>
            {imageUrls[game.titulo] ? (
              <Image
                style={styles.gameImage}
                source={{ uri: imageUrls[game.titulo] }}
              />
            ) : (
              <ActivityIndicator size="small" color="#0000ff" />
            )}
            {Object.entries(game).map(([key, value]) => (
              key !== 'titulo' && <Text key={key}>{`${key}: ${value}`}</Text>
            ))}
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 8,
  },
  results: {
    marginTop: 20,
  },
  game: {
    marginBottom: 20,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});