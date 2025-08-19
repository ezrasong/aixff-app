import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useShop } from '../context/ShopContext';
import { brand, card } from '../theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function ProductCard({ item, onOpen }) {
    const { addToCart, toggleFavorite, favouriteIds } = useShop();
    const fav = favouriteIds.includes(item.id);

    const scale = useRef(new Animated.Value(1)).current;
    const pressIn = () => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
    const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

    return (
        <AnimatedTouchable
            style={[styles.card, { transform: [{ scale }] }]}
            activeOpacity={0.9}
            onPress={() => onOpen(item)}
            onPressIn={pressIn}
            onPressOut={pressOut}
        >
            <View style={styles.imgWrap}>
                <Image source={{ uri: item.imageUrl }} style={styles.img} contentFit="cover" cachePolicy="memory-disk" />
                <TouchableOpacity style={styles.heart} onPress={() => toggleFavorite(item)}>
                    <Ionicons name={fav ? 'heart' : 'heart-outline'} size={18} color={fav ? brand.green : 'rgba(0,0,0,.6)'} />
                </TouchableOpacity>
            </View>
            <View style={styles.meta}>
                <Text numberOfLines={2} style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.add} onPress={() => addToCart(item)}>
                    <Text style={{ color: '#fff', fontWeight: '800' }}>Add</Text>
                </TouchableOpacity>
            </View>
        </AnimatedTouchable>
    );
}
const styles = StyleSheet.create({
    card: { ...card, flex: 1, position: 'relative', overflow: 'hidden', marginBottom: brand.gap },
    imgWrap: { height: 120, backgroundColor: '#f2f2f2' },
    img: { height: '100%', width: '100%' },
    heart: { position: 'absolute', right: 8, top: 8, backgroundColor: '#fff', borderRadius: 8, padding: 6, borderWidth: 1, borderColor: 'rgba(0,0,0,.06)' },
    meta: { padding: 10 },
    title: { fontSize: 13, fontWeight: '700', color: brand.text },
    price: { fontSize: 12, color: brand.green, fontWeight: '800', marginTop: 4 },
    add: { position: 'absolute', right: 10, bottom: 10, backgroundColor: brand.green, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
});
