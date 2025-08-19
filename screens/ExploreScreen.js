import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { brand, card } from '../theme';

const CARDS = [
    { title: 'Fragrances', sub: 'Perfumes & Mists', category: 'Fragrances', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Flavor',     sub: 'Aromatics for taste', category: 'Flavor', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Ingredient', sub: 'Oils & Extracts',     category: 'Ingredient', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop' },
    { title: 'DIY',        sub: 'Kits & Bases',        category: 'DIY', image: 'https://images.unsplash.com/photo-1505575972945-279fbf2ff39f?q=80&w=1400&auto=format&fit=crop' },
];

export default function ExploreScreen({ navigation }) {
    return (
        <View style={{ flex:1 }}>
            {/* Sub-hero */}
            <View style={styles.hero}>
                <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1505575972945-279fbf2ff39f?q=80&w=1400&auto=format&fit=crop' }} style={{ flex: 1 }} imageStyle={{ borderRadius: brand.radius }}>
                    <View style={styles.overlay} />
                    <View style={styles.heroText}><Text style={styles.h2}>Discover by Category</Text><Text style={styles.sub}>Fragrances • Flavor • Ingredient • DIY</Text></View>
                </ImageBackground>
            </View>

            {/* 4 cards */}
            <View style={{ paddingHorizontal: brand.gap, paddingTop: brand.gap }}>
                <Text style={styles.section}>Categories</Text>
                <View style={styles.grid}>
                    {CARDS.map((c) => (
                        <TouchableOpacity key={c.title} onPress={() => navigation.navigate('Category', { category: c.category, title: c.title })} style={styles.card} activeOpacity={0.9}>
                            <ImageBackground source={{ uri: c.image }} style={styles.cardImg} imageStyle={{ borderRadius: brand.radius }} />
                            <View style={styles.cardOverlay} />
                            <View style={styles.cardText}>
                                <Text style={styles.badge}>Explore</Text>
                                <View><Text style={styles.cardTitle}>{c.title}</Text><Text style={styles.cardSub}>{c.sub}</Text></View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Marketing Strategy tile */}
                <TouchableOpacity onPress={() => {}} style={styles.msTile} activeOpacity={0.9}>
                    <View style={styles.msBg} />
                    <View style={styles.msInner}>
                        <View>
                            <Text style={styles.msKicker}>Marketing</Text>
                            <Text style={styles.msTitle}>Marketing Strategy</Text>
                            <Text style={styles.msSub}>Campaigns, offers, and brand storytelling</Text>
                        </View>
                        <View style={styles.msButton}><Text style={{ color: '#fff', fontWeight: '700' }}>View</Text></View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    hero: { height: 160, marginHorizontal: brand.gap, marginTop: 10, borderRadius: brand.radius, overflow: 'hidden' },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,.35)' },
    heroText: { position: 'absolute', left: 12, right: 12, bottom: 12 },
    h2: { color: '#fff', fontSize: 18, fontWeight: '700' },
    sub: { color: 'rgba(255,255,255,.95)', fontSize: 12, marginTop: 2 },

    section: { fontSize: 13, fontWeight: '700', color: 'rgba(32,48,42,.75)', marginBottom: 8 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: brand.gap },
    card: { width: '47%', height: 150, borderRadius: brand.radius, overflow: 'hidden', backgroundColor: '#fff' },
    cardImg: { flex: 1 },
    cardOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,.25)' },
    cardText: { position: 'absolute', inset: 0, padding: 10, justifyContent: 'space-between' },
    badge: { alignSelf: 'flex-start', fontSize: 10, letterSpacing: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: 'rgba(255,255,255,.85)', color: brand.text, fontWeight: '700' },
    cardTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
    cardSub: { color: 'rgba(255,255,255,.95)', fontSize: 11, marginTop: 2 },

    msTile: { ...card, marginTop: brand.gap, overflow: 'hidden' },
    msBg: { height: 120, backgroundColor: brand.cream },
    msInner: { position: 'absolute', inset: 0, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    msKicker: { fontSize: 11, letterSpacing: 1, color: 'rgba(32,48,42,.6)', marginBottom: 2 },
    msTitle: { color: brand.text, fontWeight: '700', fontSize: 18 },
    msSub: { color: 'rgba(32,48,42,.75)', fontSize: 12 },
    msButton: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: brand.radius, backgroundColor: brand.green },
});
