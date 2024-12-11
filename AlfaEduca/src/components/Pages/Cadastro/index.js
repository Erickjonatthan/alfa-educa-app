import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { styles } from './style';

export default function Cadastro({ navigation }) {
    const [formulario, setFormulario] = useState({
        user: '',
        senha: '',
        confirmarSenha: '',
        email: '',
    });
    const [erro, setErro] = useState('');

    const lidarMudanca = (name, value) => {
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const lidarEnvio = async () => {
        if (formulario.senha !== formulario.confirmarSenha) {
            setErro('As senhas não coincidem.');
            return;
        }

        setErro(''); // Limpar mensagem de erro se as senhas coincidirem

        const body = JSON.stringify({
            nome: formulario.user,
            email: formulario.email,
            senha: formulario.senha
        });

        try { // Enviar os dados do formulário para a API
            const response = await fetch('http://172.29.11.176:8080/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (response.status === 201) {
                console.log('Cadastro bem-sucedido:', response);
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                );
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
                    placeholder="Email"
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
                <TextInput
                    style={styles.input}
                    placeholder="Digite a senha novamente"
                    value={formulario.confirmarSenha}
                    onChangeText={(text) => lidarMudanca('confirmarSenha', text)}
                    secureTextEntry
                />
                {erro ? <Text style={styles.erro}>{erro}</Text> : null}
                
                <TouchableOpacity style={[styles.button, styles.buttonSecond]} onPress={lidarEnvio}>
                    <Text style={[styles.text]}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => navigation.navigate('Login')}>
                    <Text>Ir para Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}