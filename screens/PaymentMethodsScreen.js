import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { brand, card } from '../theme';

export default function PaymentMethodsScreen() {
    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.wrap}>
            <View style={styles.panel}>
                <Text style={styles.title}>Payment Methods</Text>
                <View style={styles.cardBox}>
                    <Text style={styles.cardText}>Visa •••• 4242</Text>
                </View>
                <TouchableOpacity style={styles.addBtn} disabled>
                    <Text style={styles.addTxt}>Add Payment Method</Text>
                </TouchableOpacity>
                <Text style={styles.placeholder}>Adding cards coming soon.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: brand.cream },
    wrap: { padding: brand.gap },
    panel: { ...card, padding: 16 },
    title: { fontSize: 18, fontWeight: '700', color: brand.text, marginBottom: 12 },
    cardBox: { ...card, padding: 16, marginBottom: 16 },
    cardText: { fontWeight: '600', color: brand.text },
    addBtn: { padding: 12, alignItems: 'center', backgroundColor: brand.green, borderRadius: brand.radius, opacity: 0.6 },
    addTxt: { color: '#fff', fontWeight: '800' },
    placeholder: { color: 'rgba(0,0,0,.6)', marginTop: 8 },
});
