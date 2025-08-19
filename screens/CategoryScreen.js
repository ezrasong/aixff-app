import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Text, ScrollView, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, useWindowDimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { brand } from '../theme';

export default function CategoryScreen({ route, navigation }) {
    const { category } = route.params;
    const [products, setProducts] = useState([]);
    useEffect(() => { getProducts().then(setProducts); }, []);
    const [filter, setFilter] = useState(null);
    const [price, setPrice] = useState(null);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('Relevance');
    const [filterVisible, setFilterVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);
    const [expanded, setExpanded] = useState({});
    const { width } = useWindowDimensions();
    const numColumns = width > 600 ? 3 : 2;
    const SORT_OPTIONS = [
        { label: 'Relevance', icon: 'star-outline' },
        { label: 'Alphabetical A-Z', icon: 'text-outline' },
        { label: 'Alphabetical Z-A', icon: 'text-outline' },
        { label: 'Price: Low to High', icon: 'arrow-down' },
        { label: 'Price: High to Low', icon: 'arrow-up' },
    ];

    const filterOverlay = useRef(new Animated.Value(0)).current;
    const filterSheet = useRef(new Animated.Value(300)).current;
    const sortOverlay = useRef(new Animated.Value(0)).current;
    const sortScale = useRef(new Animated.Value(0.8)).current;

    const openFilters = () => {
        setFilterVisible(true);
        Animated.timing(filterOverlay, { toValue: 1, duration: 200, useNativeDriver: true }).start();
        Animated.spring(filterSheet, { toValue: 0, useNativeDriver: true, bounciness: 0 }).start();
    };

    const closeFilters = () => {
        Animated.timing(filterOverlay, { toValue: 0, duration: 200, useNativeDriver: true }).start();
        Animated.spring(filterSheet, { toValue: 300, useNativeDriver: true, bounciness: 0 }).start(() => {
            setFilterVisible(false);
        });
    };

    const openSort = () => {
        setSortVisible(true);
        Animated.timing(sortOverlay, { toValue: 1, duration: 200, useNativeDriver: true }).start();
        Animated.spring(sortScale, { toValue: 1, useNativeDriver: true, bounciness: 0 }).start();
    };

    const closeSort = () => {
        Animated.timing(sortOverlay, { toValue: 0, duration: 200, useNativeDriver: true }).start();
        Animated.spring(sortScale, { toValue: 0.8, useNativeDriver: true, bounciness: 0 }).start(() => {
            setSortVisible(false);
        });
    };

    const FILTERS = {
        Fragrances: [
            { title: 'By Character', options: ['Citrus', 'Aldehydic', 'Floral', 'Fruity', 'Green', 'Spicy', 'Woody'] },
            { title: 'By Application', options: ['Perfume', 'Skin Care', 'Personal Wash', 'Fabric Care', 'Home Care', 'Air Care', 'Oral Care'] },
            { title: 'By Specification', options: ['100% Plant-based', 'ECOCERT', '26 Allergens Free', '66 Allergens Free', 'Food Grade Fragrance', 'Water-soluble', 'Microcapsule'] },
            { title: 'DIY', options: ['Top Note', 'Body Note', 'Base Note'] },
        ],
        Flavor: [
            { title: 'Beverages', options: ['Dairies', 'Coffees & Teas', 'Milk & Dairy Drinks', 'Soft Drinks & Carbonates', 'Ice Cream & Desserts', 'Juice Drinks', 'Non-dairy Cream', 'Functional Beverages', 'Yogurt', 'Alcoholic Beverages'] },
            { title: 'Dairies', options: ['Milk & Dairy Drinks', 'Yogurt', 'Cheeses', 'Dairy Alternatives'] },
            { title: 'Bakery', options: ['Breads & Rolls', 'Cakes', 'Biscuits & Cookies'] },
            { title: 'Confectionery', options: ['Chocolate', 'Hard Candy', 'Fondants', 'Gum & Mints', 'Coatings'] },
            { title: 'Savories', options: ['Sauces & Gravies', 'Dressings & Condiments', 'Dips & Spreads', 'Marinades & Rubs'] },
            { title: 'Snacks', options: ['Sweet Snacks', 'Savory Snacks'] },
            { title: 'Pet Food', options: ['Dry Pet Food', 'Wet Pet Food', 'Pet Snacks', 'Livestock Feed'] },
        ],
    };

    FILTERS.Ingredient = FILTERS.Flavor;

    const PRICE_FILTER = { title: 'Price Range', options: ['Under $50', '$50 - $80', '$80+'] };
    let items = products.filter(p => p.category === category);
    if (filter) items = items.filter(p => p.tags?.includes(filter));
    if (price) {
        items = items.filter(p => {
            if (price === 'Under $50') return p.price < 50;
            if (price === '$50 - $80') return p.price >= 50 && p.price <= 80;
            if (price === '$80+') return p.price > 80;
            return true;
        });
    }
    if (search.trim()) {
        const q = search.toLowerCase();
        items = items.filter(p => p.name.toLowerCase().includes(q));
    }
    if (sort === 'Alphabetical A-Z') items.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'Alphabetical Z-A') items.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'Price: Low to High') items.sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') items.sort((a, b) => b.price - a.price);
    const toggleExpand = (title) => setExpanded(prev => ({ ...prev, [title]: !prev[title] }));
    const resetFilters = () => { setFilter(null); setPrice(null); setExpanded({}); };
    const applyFilters = () => closeFilters();
    const openProduct = (item) => navigation.navigate('ProductDetails', { productId: item.id });

    const overlayStyle = { opacity: filterOverlay };
    const sheetStyle = { transform: [{ translateY: filterSheet }] };

    return (
        <View style={{ flex:1 }}>
            <FlatList
                data={items}
                keyExtractor={(it) => String(it.id)}
                numColumns={numColumns}
                renderItem={({ item }) => <ProductCard item={item} onOpen={openProduct} />}
                columnWrapperStyle={{ gap: brand.gap, paddingHorizontal: brand.gap }}
                contentContainerStyle={{ paddingBottom: brand.gap }}
                ListHeaderComponent={() => (
                    <View style={{ padding: brand.gap, gap:12 }}>
                        <Text style={{ fontWeight:'700', fontSize:20 }}>{route.params?.title || category}</Text>
                        <Text style={{ color:'rgba(32,48,42,.75)', fontSize:13 }}>Filter and explore curated products.</Text>
                        <TextInput
                            placeholder="Search products"
                            value={search}
                            onChangeText={setSearch}
                            style={{ backgroundColor:'rgba(32,48,42,.08)', paddingHorizontal:12, paddingVertical:8, borderRadius:8 }}
                        />
                        <View style={{ flexDirection:'row', gap:10 }}>
                            <TouchableOpacity
                                onPress={openFilters}
                                style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingHorizontal:12, paddingVertical:6, borderRadius:16, backgroundColor:'rgba(32,48,42,.08)' }}
                            >
                                <Ionicons name="options" size={16} color={brand.text} />
                                <Text style={{ color:brand.text, fontSize:12, marginLeft:4 }}>Filters</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={openSort}
                                style={{ flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingHorizontal:12, paddingVertical:6, borderRadius:16, backgroundColor:'rgba(32,48,42,.08)' }}
                            >
                                <Ionicons name="swap-vertical" size={16} color={brand.text} />
                                <Text style={{ color:brand.text, fontSize:12, marginLeft:4 }}>{sort}</Text>
                            </TouchableOpacity>
                        </View>
                        {(filter || price) && (
                            <View style={{ flexDirection:'row', flexWrap:'wrap', gap:8, marginTop:8 }}>
                                {filter && (
                                    <TouchableOpacity
                                        onPress={() => setFilter(null)}
                                        style={{ flexDirection:'row', alignItems:'center', backgroundColor:brand.green, paddingHorizontal:10, paddingVertical:4, borderRadius:16 }}
                                    >
                                        <Text style={{ color:'#fff', fontSize:12 }}>{filter}</Text>
                                        <Ionicons name="close" size={12} color="#fff" style={{ marginLeft:4 }} />
                                    </TouchableOpacity>
                                )}
                                {price && (
                                    <TouchableOpacity
                                        onPress={() => setPrice(null)}
                                        style={{ flexDirection:'row', alignItems:'center', backgroundColor:brand.green, paddingHorizontal:10, paddingVertical:4, borderRadius:16 }}
                                    >
                                        <Text style={{ color:'#fff', fontSize:12 }}>{price}</Text>
                                        <Ionicons name="close" size={12} color="#fff" style={{ marginLeft:4 }} />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={resetFilters} style={{ justifyContent:'center' }}>
                                    <Text style={{ fontSize:12, color:brand.green }}>Clear</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />
            <Modal visible={filterVisible} transparent animationType="none" onRequestClose={closeFilters}>
                <Animated.View style={[{ flex:1, justifyContent:'flex-end', backgroundColor:'rgba(0,0,0,0.3)' }, overlayStyle]}>
                    <TouchableWithoutFeedback onPress={closeFilters}>
                        <View style={{ flex:1 }} />
                    </TouchableWithoutFeedback>
                    <Animated.View style={[{ backgroundColor:'#fff', borderTopLeftRadius:14, borderTopRightRadius:14, maxHeight:'80%' }, sheetStyle]}>
                        <View style={{ flexDirection:'row', justifyContent:'space-between', padding:brand.gap }}>
                            <Text style={{ fontWeight:'700', fontSize:16 }}>Filters</Text>
                            <TouchableOpacity onPress={resetFilters}><Text style={{ color:brand.green }}>Reset</Text></TouchableOpacity>
                        </View>
                        <ScrollView contentContainerStyle={{ paddingHorizontal:brand.gap, paddingBottom:brand.gap, gap:16 }}>
                            {[...(FILTERS[category] || []), PRICE_FILTER].map(group => {
                                const isExpanded = expanded[group.title];
                                const limit = 6;
                                const opts = isExpanded ? group.options : group.options.slice(0, limit);
                                return (
                                    <View key={group.title} style={{ gap:6 }}>
                                        <Text style={{ fontWeight:'700', color:brand.text }}>{group.title}</Text>
                                        <View style={{ flexDirection:'row', flexWrap:'wrap', gap:8 }}>
                                            {opts.map(opt => {
                                                const isPrice = group.title === 'Price Range';
                                                const selected = (isPrice ? price : filter) === opt;
                                                const onPress = () => {
                                                    if (isPrice) {
                                                        setPrice(selected ? null : opt);
                                                    } else {
                                                        setFilter(selected ? null : opt);
                                                    }
                                                };
                                                return (
                                                    <TouchableOpacity
                                                        key={opt}
                                                        onPress={onPress}
                                                        style={{ paddingHorizontal:12, paddingVertical:6, borderRadius:16, backgroundColor:selected ? brand.green : 'rgba(32,48,42,.08)', marginBottom:8 }}
                                                    >
                                                        <Text style={{ color:selected ? '#fff' : brand.text, fontSize:12 }}>{opt}</Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                        {group.options.length > limit && (
                                            <TouchableOpacity onPress={() => toggleExpand(group.title)}>
                                                <Text style={{ color:brand.green }}>{isExpanded ? 'Show less' : `Show ${group.options.length - limit} more`}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                );
                            })}
                        </ScrollView>
                        <TouchableOpacity
                            onPress={applyFilters}
                            style={{ margin:brand.gap, backgroundColor:brand.green, padding:12, borderRadius:8, alignItems:'center' }}
                        >
                            <Text style={{ color:'#fff', fontWeight:'700' }}>Apply</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </Modal>
            <Modal visible={sortVisible} transparent animationType="none" onRequestClose={closeSort}>
                <Animated.View style={[{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,.3)' }, { opacity: sortOverlay }]}>
                    <TouchableWithoutFeedback onPress={closeSort}>
                        <View style={{ position:'absolute', top:0, bottom:0, left:0, right:0 }} />
                    </TouchableWithoutFeedback>
                    <Animated.View style={[{ backgroundColor:'#fff', borderRadius:8, width:'80%', paddingVertical:8 }, { transform:[{ scale: sortScale }] }]}>
                        <Text style={{ fontWeight:'700', textAlign:'center', paddingVertical:8, borderBottomWidth:1, borderColor:'rgba(0,0,0,0.05)', color:brand.text }}>Sort by</Text>
                        {SORT_OPTIONS.map(({ label, icon }) => (
                            <TouchableOpacity
                                key={label}
                                onPress={() => { setSort(label); closeSort(); }}
                                style={{ flexDirection:'row', alignItems:'center', padding:12, gap:8, backgroundColor: sort === label ? 'rgba(62,176,83,0.1)' : '#fff' }}
                            >
                                <Ionicons name={icon} size={16} color={brand.text} />
                                <Text style={{ flex:1, color:brand.text }}>{label}</Text>
                                {sort === label && <Ionicons name="checkmark" size={16} color={brand.green} />}
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                </Animated.View>
            </Modal>
        </View>
    );
}

