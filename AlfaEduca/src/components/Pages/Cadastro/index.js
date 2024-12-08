import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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

    const lidarEnvio = () => {
        // Lógica de cadastro
        console.log('Cadastro:', formulario);
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