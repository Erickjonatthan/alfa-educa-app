import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';
import { styles } from './style';

export default function BottomNavigation({ navigation }) {
    const routes = useNavigationState(state => state.routes);
    const currentRoute = routes[routes.length - 1].name;

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Camera')}>
                <Ionicons name="camera" size={24} color={currentRoute === 'Camera' ? 'purple' : 'black'} />
                <Text style={[styles.iconText, { color: currentRoute === 'Camera' ? 'purple' : 'black' }]}>Câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Inicio')}>
                <Ionicons name="home" size={24} color={currentRoute === 'Inicio' ? 'purple' : 'black'} />
                <Text style={[styles.iconText, { color: currentRoute === 'Inicio' ? 'purple' : 'black' }]}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Perfil')}>
                <Ionicons name="person" size={24} color={currentRoute === 'Perfil' ? 'purple' : 'black'} />
                <Text style={[styles.iconText, { color: currentRoute === 'Perfil' ? 'purple' : 'black' }]}>Perfil</Text>
            </TouchableOpacity>
        </View>
    );
}