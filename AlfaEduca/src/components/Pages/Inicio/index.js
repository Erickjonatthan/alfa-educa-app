import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomNavigation from '../../BottomNavigation';
import { styles } from './style';

export default function Inicio({ navigation }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const id = await AsyncStorage.getItem('contaId');
                const token = await AsyncStorage.getItem('token');
                if (id && token) {
                    const response = await fetch(`http://192.168.3.102:8080/cadastro/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const userInfo = await response.json();
                    if (userInfo) {
                        setUser(userInfo);
                        await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));
                    } else {
                        console.error('Resposta da API está vazia');
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <View style={styles.container}>
            {user && (
                <>

                    <Text style={styles.title}>Bem-vindo ao AlfaEduca, {user.nome}</Text>

                </>
            )}

            <Text style={styles.subtitle}>O que vamos aprender hoje?</Text>
            <BottomNavigation navigation={navigation} />
        </View>
    );
}