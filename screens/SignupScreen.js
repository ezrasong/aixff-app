// /screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useShop } from '../context/ShopContext';
import { brand, card } from '../theme';

export default function SignupScreen({ navigation }) {
    const { signUp } = useShop();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        try { await signUp({ email, password }); }
        catch (e) { Alert.alert('Signup failed', e.message); }
    };

    return (
        <View style={styles.wrap}>
            <Text style={styles.logo}>aixff</Text>
            <View style={styles.card}>
                <Text style={styles.title}>Create account</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholderTextColor="rgba(0,0,0,.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    placeholderTextColor="rgba(0,0,0,.4)"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.primary} onPress={onSubmit}>
                    <Text style={styles.primaryText}>Create your aixff account</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dividerRow}>
                <View style={styles.line} />
                <TouchableOpacity
                    onPress={() =>
                        navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Login')
                    }
                >
                    <Text style={styles.link}>Back to Sign in</Text>
                </TouchableOpacity>
                <View style={styles.line} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { flex:1, padding:16, justifyContent:'center' },
    logo: { fontSize:28, fontWeight:'800', color: brand.text, textAlign:'center', marginBottom:20 },
    card: { ...card, padding:16 },
    title: { fontSize:20, fontWeight:'700', marginBottom:12 },
    input: { borderWidth:1, borderColor:'#ccc', borderRadius:4, padding:10, marginBottom:12 },
    primary: { backgroundColor: brand.green, borderRadius:4, paddingVertical:12, alignItems:'center' },
    primaryText: { color:'#fff', fontWeight:'700', textAlign:'center' },
    dividerRow: { flexDirection:'row', alignItems:'center', marginTop:20 },
    line: { flex:1, height:1, backgroundColor:'rgba(0,0,0,.1)' },
    link: { color: brand.green, fontWeight:'700', marginHorizontal:8 },
});
