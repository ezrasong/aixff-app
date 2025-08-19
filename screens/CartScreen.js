import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';
import { brand, card } from '../theme';

export default function CartScreen({ navigation }) {
    const { cartItems, removeFromCart, changeCartQty, clearCart } = useShop();
    const itemCount = cartItems.reduce((s, p) => s + (p.qty || 0), 0);
    const subtotal = cartItems.reduce((s, p) => s + (p.price * p.qty || 0), 0);
    const shipping = itemCount > 0 && subtotal < 50 ? 5 : 0;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                <Text style={{ textAlign:'center', color:'rgba(0,0,0,.6)' }}>Your cart is empty.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginTop:12 }}>
                    <Text style={{ color: brand.green, fontWeight:'700' }}>Start shopping →</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{ flex:1 }}>
        <FlatList
            data={cartItems}
            keyExtractor={(it) => String(it.id)}
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <Image source={{ uri: item.imageUrl }} style={styles.img} />
                    <View style={{ flex:1, marginHorizontal:10 }}>
                        <Text style={{ fontWeight:'700', color: brand.text }} numberOfLines={2}>{item.name}</Text>
                        <Text style={{ color: brand.green, fontWeight:'800', marginTop:4 }}>${(item.price * item.qty).toFixed(2)}</Text>
                        <View style={styles.qtyRow}>
                            <TouchableOpacity onPress={() => changeCartQty(item.id, -1)} style={styles.qtyBtn}><Text>-</Text></TouchableOpacity>
                            <Text style={styles.qty}>{item.qty}</Text>
                            <TouchableOpacity onPress={() => changeCartQty(item.id, 1)} style={styles.qtyBtn}><Text>+</Text></TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}><Ionicons name="trash" size={20} color="tomato" /></TouchableOpacity>
                </View>
            )}
            ListHeaderComponent={
                <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding: brand.gap }}>
                    <Text style={{ fontWeight:'700', color: brand.text, fontSize:16 }}>Cart ({itemCount})</Text>
                    <TouchableOpacity onPress={clearCart} style={{ padding:4 }}>
                        <Ionicons name="trash" size={20} color="tomato" />
                    </TouchableOpacity>
                </View>
            }
            ListFooterComponent={
                <View style={styles.footer}>
                    <Text style={styles.summary}>Items: {itemCount}</Text>
                    <Text style={styles.summary}>Subtotal: ${subtotal.toFixed(2)}</Text>
                    <Text style={styles.summary}>Shipping: {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Text>
                    {shipping === 0 && itemCount > 0 && subtotal >= 50 && (
                        <Text style={{ color: brand.green, fontSize:12 }}>You've got free shipping!</Text>
                    )}
                    <Text style={[styles.summary, { marginVertical:8 }]}>Total: ${total.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.checkout}><Text style={{ color:'#fff', fontWeight:'800' }}>Checkout</Text></TouchableOpacity>
                </View>
            }
            contentContainerStyle={{ paddingBottom: brand.gap }}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    row: { ...card, margin: brand.gap, flexDirection:'row', alignItems:'center', padding:12 },
    img: { width:60, height:60, borderRadius:8, backgroundColor:'#f2f2f2' },
    qtyRow: { flexDirection:'row', alignItems:'center', marginTop:8, gap:8 },
    qtyBtn: { borderWidth:1, borderColor:'rgba(0,0,0,.2)', borderRadius:4, paddingHorizontal:8, paddingVertical:2 },
    qty: { minWidth:20, textAlign:'center', fontWeight:'700' },
    footer: { ...card, margin: brand.gap, padding:12 },
    summary: { fontWeight:'800', color: brand.text },
    checkout: { marginTop:8, backgroundColor: brand.green, borderRadius:8, alignItems:'center', padding:12 },
});
