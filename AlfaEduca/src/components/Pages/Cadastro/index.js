import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

export default function Cadastro({ navigation }) {
    const [formulario, setFormulario] = useState({
        user: '',
        senha: '',
        email: '',
    });

    const lidarMudanca = (name, value) => {
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

      const lidarEnvio = async () => {
        const body = JSON.stringify({
            nome: formulario.user,
            email: formulario.email,
            senha: formulario.senha
        });
        try {
            const response = await fetch('http://localhost:8080/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });
    
            if (response.status === 201) {
                const data = await response.json();
                await AsyncStorage.setItem('id', data.id);
                await AsyncStorage.setItem('user', data.nome);
                await AsyncStorage.setItem('email', data.email);
                console.log('Cadastro bem-sucedido:', data);
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                navigation.navigate('Login'); // Navegar para a página de login
            } else {
                const errorData = await response.text();
                console.error('Erro no cadastro:', errorData);
                Alert.alert('Erro', 'Falha ao realizar cadastro.');
            }
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
            Alert.alert('Erro', 'Erro ao conectar com o servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Cadastro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    value={formulario.user}
                    onChangeText={(text) => lidarMudanca('user', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={formulario.senha}
                    onChangeText={(text) => lidarMudanca('senha', text)}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formulario.email}
                    onChangeText={(text) => lidarMudanca('email', text)}
                />
                <TouchableOpacity style={[styles.button, styles.buttonSecond]} onPress={lidarEnvio}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => navigation.navigate('Login')}>
                    <Text>Ir para Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}