import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from '../../BottomNavigation';

export default function Perfil({ navigation }) {
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [tempImage, setTempImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUserId = await AsyncStorage.getItem('contaId');
            const user = await AsyncStorage.getItem('user_info');
            if (storedToken && storedUserId) {
                setToken(storedToken);
                setUserId(storedUserId);
                setUser(JSON.parse(user));
            }
        };
        fetchData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setTempImage(null); // Limpa a imagem temporária quando a tela perde o foco
            };
        }, [])
    );

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true, // Ativa o Base64 para facilitar o envio
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setTempImage(result.assets[0].uri); // Configura a imagem temporária para exibição
            setBase64Image(result.assets[0].base64); // Configura a imagem em Base64
        } else {
            Alert.alert('Aviso', 'Nenhuma imagem foi selecionada.');
        }
    };

    const enviarImagem = async () => {
        if (base64Image) {
            try {
                const response = await fetch(`http://192.168.3.102:8080/cadastro`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id: userId,
                        imgPerfil: base64Image
                    })
                });

                if (response.ok) {
                    setImage(tempImage); // Atualiza a imagem de perfil permanentemente
                    setTempImage(null); // Limpa a imagem temporária
                    Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
                } else {
                    const errorData = await response.text();
                    console.error('Erro ao enviar imagem:', errorData);
                    Alert.alert('Erro', 'Falha ao enviar imagem.');
                }
            } catch (error) {
                console.error('Erro ao enviar imagem:', error);
                Alert.alert('Erro', 'Erro ao conectar com o servidor.');
            }
        } else {
            Alert.alert('Erro', 'Nenhuma imagem selecionada.');
        }
    };

    const logout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            {user && (
                <>
                    <Image source={{ uri: tempImage || `data:image/jpeg;base64,${user.imgPerfil}` }} style={styles.profileImage} />
                    <Text>{user.nome}</Text>
                    <Text>{user.email}</Text>
                </>
            )}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Escolher Foto</Text>
            </TouchableOpacity>
            {tempImage && (
                <TouchableOpacity style={styles.button} onPress={enviarImagem}>
                    <Text style={styles.buttonText}>Alterar Foto Perfil</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <BottomNavigation navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 20,
    },
});