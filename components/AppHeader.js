import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { brand } from '../theme';

export default function AppHeader({ navigation, onSearch }) {
    return (
        <View style={styles.bar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ paddingVertical: 6 }}>
                {/* Replace with your real SVG/PNG */}
                <Image source={{ uri: 'https://dummyimage.com/160x24/ffffff/000.png&text=aixff' }}
                       style={{ height: 24, width: 170, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <View style={styles.right}>
                <TouchableOpacity onPress={onSearch} style={styles.iconBtn}><Ionicons name="search" size={18} color="rgba(0,0,0,.75)" /></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconBtn}><Ionicons name="person" size={18} color="rgba(0,0,0,.75)" /></TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    bar: { height: brand.headerH, paddingHorizontal: brand.gap, backgroundColor: '#fff',
        borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,.06)', flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between' },
    right: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    iconBtn: { padding: 8, borderRadius: 8 },
});
