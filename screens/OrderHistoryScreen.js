import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { brand, card } from '../theme';

const orders = [
    { id: '1', total: 58.2, date: '2024-05-01' },
    { id: '2', total: 26.4, date: '2024-04-15' },
];

export default function OrderHistoryScreen() {
    return (
        <View style={styles.wrap}>
            <Text style={styles.title}>Order History</Text>
            <FlatList
                data={orders}
                keyExtractor={(i) => i.id}
                renderItem={({ item }) => (
                    <View style={styles.order}>
                        <Text style={styles.orderId}>Order #{item.id}</Text>
                        <Text style={styles.orderMeta}>{item.date} • ${item.total.toFixed(2)}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.placeholder}>No orders yet.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { flex: 1, padding: brand.gap, backgroundColor: brand.cream },
    title: { fontSize: 18, fontWeight: '700', color: brand.text, marginBottom: 12 },
    order: { ...card, padding:16, marginBottom:12 },
    orderId: { fontWeight:'600', color: brand.text },
    orderMeta: { color:'rgba(0,0,0,.6)', marginTop:4 },
    placeholder: { color: 'rgba(0,0,0,.6)', marginTop: 8 },
});
