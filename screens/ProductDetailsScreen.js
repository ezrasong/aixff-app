import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback, Animated, PanResponder } from 'react-native';
import { Image } from 'expo-image';
import { getProduct } from '../services/api';
import { useShop } from '../context/ShopContext';

export default function ProductDetailsScreen({ route, navigation }) {
    const { productId } = route.params;
    const [product, setProduct] = useState({});
    useEffect(() => { getProduct(productId).then(p => setProduct(p || {})); }, [productId]);
    const { addToCart, toggleFavorite, favouriteIds } = useShop();
    const isFav = favouriteIds.includes(product.id);

    const SHEET_HEIGHT = 400;
    const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

    useEffect(() => {
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
        }).start();
    }, []);

    const maybeGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const close = () => {
        Animated.spring(translateY, {
            toValue: SHEET_HEIGHT,
            useNativeDriver: true,
            bounciness: 0,
        }).start(maybeGoBack);
    };

    let startY = 0;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                translateY.stopAnimation(value => {
                    startY = value;
                });
            },
            onPanResponderMove: (_, gesture) => {
                const next = Math.min(Math.max(startY + gesture.dy, 0), SHEET_HEIGHT);
                translateY.setValue(next);
            },
            onPanResponderRelease: (_, gesture) => {
                if (startY + gesture.dy > 150 || gesture.vy > 1.2) {
                    close();
                } else {
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                        bounciness: 0,
                    }).start();
                }
            },
        })
    ).current;

    const sheetStyle = {
        transform: [{ translateY }],
    };

    const overlayOpacity = translateY.interpolate({
        inputRange: [0, SHEET_HEIGHT],
        outputRange: [1, 0],
    });

    return (
        <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={close}>
                <Animated.View style={[styles.backdrop, { opacity: overlayOpacity }]} />
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.sheet, sheetStyle]} {...panResponder.panHandlers}>
                    <View style={styles.handle} />
                    <ScrollView contentContainerStyle={{ padding: 16 }}>
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <View style={{ height: 96, width: 96, borderRadius: 10, overflow: 'hidden', backgroundColor: '#eee' }}>
                                <Image source={{ uri: product.imageUrl }} style={{ height: '100%', width: '100%' }} contentFit="cover" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: '800' }}>{product.name}</Text>
                                <Text style={{ color: '#3EB053', fontWeight: '800', marginTop: 4 }}>${product.price?.toFixed(2)}</Text>
                                <Text style={{ color: 'rgba(0,0,0,.6)', marginTop: 4, fontSize: 12 }}>
                                    In Stock • Ships from aixff • Free delivery over $50
                                </Text>
                            </View>
                        </View>

                        <Text style={{ marginTop: 12 }}>{product.description}</Text>

                        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
                            <TouchableOpacity onPress={() => addToCart(product)} style={styles.cta}>
                                <Text style={{ color: '#fff', fontWeight: '800' }}>Add to Cart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleFavorite(product)} style={[styles.ghost, isFav && { borderColor: '#3EB053' }]}>
                                <Text style={{ color: isFav ? '#3EB053' : '#20302A', fontWeight: '800' }}>{isFav ? 'Favourited' : 'Favourite'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={close} style={styles.ghost}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'flex-end' },
    backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
    sheet: { backgroundColor: '#fff', borderTopLeftRadius: 14, borderTopRightRadius: 14, maxHeight: '85%' },
    handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#ccc', alignSelf: 'center', marginVertical: 8 },
    cta: { flex: 1, backgroundColor: '#3EB053', borderRadius: 10, padding: 12, alignItems: 'center' },
    ghost: { paddingHorizontal: 16, borderRadius: 10, backgroundColor: '#efefef', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'transparent' },
});

