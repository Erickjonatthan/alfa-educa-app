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
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Pagina1')}>
                    <Ionicons name="home" size={24} color="black" />
                    <Text>Página 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Pagina2')}>
                    <Ionicons name="camera" size={24} color="black" />
                    <Text>Página 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Pagina3')}>
                    <Ionicons name="person" size={24} color="black" />
                    <Text>Página 3</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Inicio;