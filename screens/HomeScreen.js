import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { brand, card } from '../theme';

export default function HomeScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    useEffect(() => { getProducts().then(setProducts); }, []);
    const featured = products.slice(0,4);
    const newReleases = products.slice(4,8);
    const openProduct = (item) => navigation.navigate('ProductDetails', { productId: item.id });
    return (
        <ScrollView style={{ flex:1 }} contentContainerStyle={{ paddingBottom: brand.gap }}>
            {/* Hero */}
            <View style={styles.hero}>
                <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1400&auto=format&fit=crop' }} style={{ flex:1 }} imageStyle={{ borderRadius: brand.radius }}>
                    <View style={styles.heroOverlay} />
                    <View style={styles.heroTextWrap}>
                        <Text style={styles.heroTitle}>aixff</Text>
                        <Text style={styles.heroSub}>Fragrance • Flavor • Ingredient • DIY</Text>
                    </View>
                </ImageBackground>
            </View>

            {/* Promo tiles */}
            <View style={styles.tileRow}>
                <TouchableOpacity onPress={() => navigation.navigate('Explore')} style={styles.tile}>
                    <View style={[styles.tileBg, { backgroundColor: '#EFF7F1' }]} />
                    <View style={styles.tileInner}>
                        <View><Text style={styles.kicker}>Explore</Text><Text style={styles.tileTitle}>Browse Categories</Text></View>
                        <Text style={styles.link}>Open →</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Category', { category: 'Fragrances', title: 'Fragrances' })} style={styles.tile}>
                    <View style={[styles.tileBg, { backgroundColor: '#F0F5F2' }]} />
                    <View style={styles.tileInner}>
                        <View><Text style={styles.kicker}>Shop</Text><Text style={styles.tileTitle}>Best-selling Scents</Text></View>
                        <Text style={styles.link}>Shop now →</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Featured */}
            <Text style={styles.sectionLabel}>Featured Products</Text>
            <FlatList
                data={featured}
                keyExtractor={(it) => String(it.id)}
                numColumns={2}
                renderItem={({ item }) => <ProductCard item={item} onOpen={openProduct} />}
                columnWrapperStyle={{ gap: brand.gap, paddingHorizontal: brand.gap }}
                contentContainerStyle={{ paddingBottom: brand.gap }}
                scrollEnabled={false}
            />

            {/* New Releases */}
            <Text style={styles.sectionLabel}>New Releases</Text>
            <FlatList
                data={newReleases}
                keyExtractor={(it) => `new-${it.id}`}
                numColumns={2}
                renderItem={({ item }) => <ProductCard item={item} onOpen={openProduct} />}
                columnWrapperStyle={{ gap: brand.gap, paddingHorizontal: brand.gap }}
                contentContainerStyle={{ paddingBottom: brand.gap }}
                scrollEnabled={false}
            />
            {/* About */}
            <View style={[styles.about, card]}>
                <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 8 }}>About Us</Text>
                <Text style={{ fontSize: 13, color: 'rgba(32,48,42,.8)' }}>
                    Experience the finest fragrances crafted with passion and expertise. Our collection brings you the most exquisite scents from around the world.
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                    <Text style={{ color: brand.green, fontWeight: '700', marginTop: 8 }}>Learn More →</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    hero: { height: 190, marginHorizontal: brand.gap, marginTop: 10, borderRadius: brand.radius, overflow: 'hidden' },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,.35)' },
    heroTextWrap: { position: 'absolute', left: 12, right: 12, bottom: 12 },
    heroTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
    heroSub: { color: 'rgba(255,255,255,.95)', fontSize: 12, marginTop: 4 },

    tileRow: { flexDirection: 'row', gap: brand.gap, marginTop: brand.gap, paddingHorizontal: brand.gap },
    tile: { flex:1, borderRadius: brand.radius, overflow:'hidden', backgroundColor:'#fff' },
    tileBg: { height:110 },
    tileInner: { position:'absolute', inset:0, padding:12, justifyContent:'space-between' },
    kicker: { fontSize:10, letterSpacing:1, color:'rgba(32,48,42,.6)' },
    tileTitle: { color: brand.text, fontWeight:'700' },
    link: { color: brand.green, fontWeight:'700', fontSize:12 },

    sectionLabel: { marginTop:16, marginBottom:8, paddingHorizontal:brand.gap, fontSize:13, fontWeight:'700', color:'rgba(32,48,42,.75)' },
    about: { marginHorizontal: brand.gap, marginTop: brand.gap, padding: brand.gap },
});
