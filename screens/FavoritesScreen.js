import React from 'react';
import { View, Text, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { brand } from '../theme';

export default function FavoritesScreen({ navigation }) {
    const { favouriteItems, clearFavorites, addToCart } = useShop();
    const openProduct = (item) => navigation.navigate('ProductDetails', { productId: item.id });
    const addAllToCart = () => favouriteItems.forEach(p => addToCart(p));
    const { width } = useWindowDimensions();
    const numColumns = width > 600 ? 3 : 2;

    if (favouriteItems.length === 0) {
        return (
            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                <Text style={{ textAlign:'center', color:'rgba(0,0,0,.6)' }}>No favourites yet.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Explore')} style={{ marginTop:12 }}>
                    <Text style={{ color: brand.green, fontWeight:'700' }}>Browse products →</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex:1 }}>
            <FlatList
                data={favouriteItems}
                keyExtractor={(it) => String(it.id)}
                numColumns={numColumns}
                renderItem={({ item }) => <ProductCard item={item} onOpen={openProduct} />}
                columnWrapperStyle={{ gap: brand.gap, paddingHorizontal: brand.gap }}
                contentContainerStyle={{ gap: brand.gap, paddingBottom: brand.gap }}
                ListHeaderComponent={
                    <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding: brand.gap }}>
                        <Text style={{ fontWeight:'700', color: brand.text, fontSize:16 }}>Favourites ({favouriteItems.length})</Text>
                        <View style={{ flexDirection:'row', alignItems:'center', gap:12 }}>
                            <TouchableOpacity onPress={addAllToCart} style={{ padding:4 }}>
                                <Ionicons name="cart-outline" size={18} color={brand.text} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={clearFavorites} style={{ padding:4 }}>
                                <Ionicons name="trash" size={18} color="tomato" />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
        </View>
    );
}

