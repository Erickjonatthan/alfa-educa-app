import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

export default function Login({ navigation }) {
    const [formulario, setFormulario] = useState({
        email: '',
        senha: '',
        logado: true
    });

    const lidarMudanca = (name, value) => {
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const lidarEnvio = async () => {
        console.log('Email:', formulario.email);
        console.log('Senha:', formulario.senha);
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: formulario.email,
                    senha: formulario.senha
                })
            });

            const data = await response.json();
            if (response.ok) {
                await AsyncStorage.setItem('token', data.token);
                console.log('Login bem-sucedido:', data);
                navigation.navigate('Inicio'); // Navegar para a página inicial
            } else {
                console.error('Erro no login:', data);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    value={formulario.email}
                    onChangeText={(text) => lidarMudanca('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={formulario.senha}
                    onChangeText={(text) => lidarMudanca('senha', text)}
                    secureTextEntry
                />
                <TouchableOpacity style={[styles.button, styles.buttonSecond]} onPress={lidarEnvio}>
                    <Text style={[styles.text]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => navigation.navigate('Cadastro')}>
                    <Text>Ir para Cadastro</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}