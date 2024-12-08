import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './style';

export default function Login({ navigation }) {
    const [formulario, setFormulario] = useState({
        user: '',
        senha: '',
        logado: true
    });

    const lidarMudanca = (name, value) => {
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const lidarEnvio = () => {
        // Lógica de login
        console.log('Login:', formulario);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>
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
                <TouchableOpacity style={[styles.button, styles.buttonSecond]} onPress={lidarEnvio}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => navigation.navigate('Cadastro')}>
                    <Text>Ir para Cadastro</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}