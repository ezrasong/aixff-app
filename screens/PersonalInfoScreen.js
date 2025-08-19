import React from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import { brand, card } from '../theme';

export default function PersonalInfoScreen() {
    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.wrap}>
            <View style={styles.cardWrap}>
                <Text style={styles.title}>Personal Information</Text>
                <View style={styles.field}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput style={styles.input} placeholder="John Doe" editable={false} />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="hello@aixff.com" editable={false} />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput style={styles.input} placeholder="(000) 000-0000" editable={false} />
                </View>
                <Text style={styles.placeholder}>Editing coming soon.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: brand.cream },
    wrap: { padding: brand.gap },
    cardWrap: { ...card, padding: 16 },
    title: { fontSize: 18, fontWeight: '700', color: brand.text, marginBottom: 12 },
    field: { marginBottom: 16 },
    label: { fontWeight: '600', marginBottom: 4, color: brand.text },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: brand.radius, padding: 10, backgroundColor: '#f9f9f9' },
    placeholder: { color: 'rgba(0,0,0,.6)', marginTop: 8 },
});
