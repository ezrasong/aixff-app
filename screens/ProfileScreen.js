import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Animated, ScrollView } from 'react-native';
import { useShop } from '../context/ShopContext';
import { brand, card } from '../theme';

function OptionRow({ label, screen, navigation }) {
    const scale = useRef(new Animated.Value(1)).current;
    const pressIn = () =>
        Animated.timing(scale, { toValue: 0.97, duration: 120, useNativeDriver: true }).start();
    const pressOut = () =>
        Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }).start();
    return (
        <Pressable onPress={() => navigation.navigate(screen)} onPressIn={pressIn} onPressOut={pressOut}>
            <Animated.View style={[styles.row, { transform: [{ scale }] }]}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Text style={styles.chevron}>›</Text>
            </Animated.View>
        </Pressable>
    );
}

export default function ProfileScreen({ navigation }) {
    const { signOut } = useShop();
    const options = [
        { label: 'Personal Information', screen: 'PersonalInfo' },
        { label: 'Payment Methods', screen: 'PaymentMethods' },
        { label: 'Shipping Address', screen: 'ShippingAddress' },
        { label: 'Order History', screen: 'OrderHistory' },
    ];
    return (
        <ScrollView style={styles.screen} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.header}>
                <View style={styles.avatar}><Text style={styles.avatarTxt}>A</Text></View>
                <View>
                    <Text style={styles.name}>Demo User</Text>
                    <Text style={styles.email}>hello@aixff.com</Text>
                </View>
            </View>
            {options.map((o) => (
                <OptionRow key={o.label} {...o} navigation={navigation} />
            ))}
            <TouchableOpacity onPress={signOut} style={styles.logout}>
                <Text style={styles.logoutTxt}>Log out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: { flex:1, backgroundColor: brand.cream },
    header: { ...card, flexDirection:'row', alignItems:'center', margin:brand.gap, padding:16, gap:12 },
    avatar: { width:50, height:50, borderRadius:25, backgroundColor:brand.green, alignItems:'center', justifyContent:'center' },
    avatarTxt: { color:'#fff', fontWeight:'800', fontSize:20 },
    name: { fontWeight:'700', color: brand.text },
    email: { color:'rgba(0,0,0,.6)', marginTop:2 },
    row: { ...card, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginHorizontal:brand.gap, marginTop:10, padding:14 },
    rowLabel: { fontWeight:'600', color: brand.text },
    chevron: { color:'rgba(0,0,0,.4)', fontSize:18 },
    logout: { margin: brand.gap, marginTop:20, padding:14, alignItems:'center', backgroundColor: brand.green, borderRadius:brand.radius },
    logoutTxt: { color:'#fff', fontWeight:'800' },
});
