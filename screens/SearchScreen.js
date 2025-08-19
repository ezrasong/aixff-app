import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { brand } from '../theme';

export default function SearchScreen({ navigation }) {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    useEffect(() => { getProducts().then(setProducts); }, []);
    const results = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    const openProduct = (item) => navigation.navigate('ProductDetails', { productId: item.id });
    return (
        <View style={{ flex:1 }}>
            <View style={{ padding: brand.gap }}>
                <TextInput
                    placeholder="Search products"
                    value={query}
                    onChangeText={setQuery}
                    autoFocus
                    style={{ backgroundColor:'rgba(32,48,42,.08)', paddingHorizontal:12, paddingVertical:8, borderRadius:8 }}
                />
            </View>
            <FlatList
                data={results}
                keyExtractor={(it) => String(it.id)}
                numColumns={2}
                renderItem={({ item }) => <ProductCard item={item} onOpen={openProduct} />}
                columnWrapperStyle={{ gap: brand.gap, paddingHorizontal: brand.gap }}
                contentContainerStyle={{ paddingBottom: brand.gap }}
            />
        </View>
    );
}
