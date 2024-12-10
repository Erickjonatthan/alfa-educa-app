import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

const Inicio = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Tela Inicial</Text>
                <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Configurações')}>
                    <Ionicons name="settings" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Camera')}>
                    <Ionicons name="camera" size={24} color="black" />
                    <Text>Câmera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Inicio')}>
                    <Ionicons name="home" size={24} color="black" />
                    <Text>Início</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Perfil')}>
                    <Ionicons name="person" size={24} color="black" />
                    <Text>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Inicio;