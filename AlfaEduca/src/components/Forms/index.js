import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function FormularioUsuario() {
    const [formulario, setFormulario] = useState({
        user: '',
        senha: '',
        email: '',
        logado: true
    });

    const lidarMudanca = (name, value) => {
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const lidarEnvio = () => {
        if (formulario.logado) {
            // Lógica de login
            console.log('Login:', formulario);
        } else {
            // Lógica de cadastro
            console.log('Cadastro:', formulario);
        }
    };

    const alternarFormulario = () => {
        setFormulario({
            ...formulario,
            logado: !formulario.logado
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{formulario.logado ? 'Login' : 'Cadastro'}</Text>
            <View style={styles.inputContainer}>
                <Text>Usuário:</Text>
                <TextInput
                    style={styles.input}
                    value={formulario.user}
                    onChangeText={(value) => lidarMudanca('user', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Senha:</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={formulario.senha}
                    onChangeText={(value) => lidarMudanca('senha', value)}
                />
            </View>
            {!formulario.logado && (
                <View style={styles.inputContainer}>
                    <Text>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={formulario.email}
                        onChangeText={(value) => lidarMudanca('email', value)}
                    />
                </View>
            )}
            <Button title={formulario.logado ? 'Login' : 'Cadastrar'} onPress={lidarEnvio} />
            <Button title={formulario.logado ? 'Ir para Cadastro' : 'Ir para Login'} onPress={alternarFormulario} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
    },
});