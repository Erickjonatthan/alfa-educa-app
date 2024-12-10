import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Modal, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

export default function Perfil() {
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUserId = await AsyncStorage.getItem('contaId');
            if (storedToken && storedUserId) {
                setToken(storedToken);
                setUserId(storedUserId);
            }
        };
        fetchData();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
            const base64 = await convertToBase64(result.uri);
            setBase64Image(base64);
            setModalVisible(true);
        }
    };

    const convertToBase64 = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                const reader = new FileReader();
                reader.onloadend = function() {
                    resolve(reader.result.split(',')[1]);
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.onerror = function() {
                reject(new Error('Failed to convert image to base64'));
            };
            xhr.open('GET', uri);
            xhr.responseType = 'blob';
            xhr.send();
        });
    };

    const enviarImagem = async () => {
        if (base64Image) {
            try {
                const response = await fetch(`http://localhost:8080/cadastro`, {
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
        }
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Anexar Foto</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.profileImage} />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.modalText}>Deseja enviar esta imagem?</Text>
                        {image && <Image source={{ uri: image }} style={styles.profileImage} />}
                        <TouchableOpacity
                            style={[modalStyles.button, modalStyles.buttonClose]}
                            onPress={enviarImagem}
                        >
                            <Text style={modalStyles.textStyle}>Enviar Imagem</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});