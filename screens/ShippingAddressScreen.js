import React from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { brand, card } from '../theme';

export default function ShippingAddressScreen() {
    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.wrap}>
            <View style={styles.panel}>
                <Text style={styles.title}>Shipping Address</Text>
                <View style={styles.field}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput style={styles.input} placeholder="123 Main St" editable={false} />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>City</Text>
                    <TextInput style={styles.input} placeholder="Metropolis" editable={false} />
                </View>
                <View style={styles.row}>
                    <View style={[styles.field, { flex: 1, marginRight:8 }]}>  
                        <Text style={styles.label}>State</Text>
                        <TextInput style={styles.input} placeholder="CA" editable={false} />
                    </View>
                    <View style={[styles.field, { flex: 1, marginLeft:8 }]}>  
                        <Text style={styles.label}>ZIP</Text>
                        <TextInput style={styles.input} placeholder="00000" editable={false} />
                    </View>
                </View>
                <TouchableOpacity style={styles.addBtn} disabled>
                    <Text style={styles.addTxt}>Save Address</Text>
                </TouchableOpacity>
                <Text style={styles.placeholder}>Address editing coming soon.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: brand.cream },
    wrap: { padding: brand.gap },
    panel: { ...card, padding: 16 },
    title: { fontSize: 18, fontWeight: '700', color: brand.text, marginBottom: 12 },
    field: { marginBottom: 16 },
    label: { fontWeight: '600', marginBottom: 4, color: brand.text },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: brand.radius, padding: 10, backgroundColor: '#f9f9f9' },
    row: { flexDirection:'row' },
    addBtn: { padding:12, alignItems:'center', backgroundColor: brand.green, borderRadius: brand.radius, opacity:0.6 },
    addTxt: { color:'#fff', fontWeight:'800' },
    placeholder: { color: 'rgba(0,0,0,.6)', marginTop: 8 },
});
