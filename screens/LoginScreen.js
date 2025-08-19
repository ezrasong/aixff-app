// /screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useShop } from '../context/ShopContext';
import { brand, card } from '../theme';

export default function LoginScreen({ navigation }) {
    const { signIn } = useShop();
    const [email, setEmail] = useState('');

    const onSubmit = async () => {
        try { await signIn({ email, password: 'dummy' }); }
        catch (e) { Alert.alert('Login failed', e.message); }
    };

    return (
        <View style={styles.wrap}>
            <Text style={styles.logo}>aixff</Text>
            <View style={styles.card}>
                <Text style={styles.title}>Sign in</Text>
                <TextInput
                    placeholder="Email or mobile phone number"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholderTextColor="rgba(0,0,0,.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.primary} onPress={onSubmit}>
                    <Text style={styles.primaryText}>Continue</Text>
                </TouchableOpacity>
                <Text style={styles.disclaimer}>
                    By continuing, you agree to aixff's Conditions of Use and Privacy Notice.
                </Text>
                <TouchableOpacity><Text style={styles.link}>Need help?</Text></TouchableOpacity>
            </View>
            <View style={styles.dividerRow}>
                <View style={styles.line} />
                <Text style={styles.divider}>New to aixff?</Text>
                <View style={styles.line} />
            </View>
            <TouchableOpacity style={styles.secondary} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.secondaryText}>Create your aixff account</Text>
            </TouchableOpacity>
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
    primaryText: { color:'#fff', fontWeight:'700' },
    disclaimer: { fontSize:12, color:'rgba(0,0,0,.6)', marginTop:12 },
    link: { color: brand.green, marginTop:8, fontWeight:'700' },
    dividerRow: { flexDirection:'row', alignItems:'center', marginVertical:20 },
    line: { flex:1, height:1, backgroundColor:'rgba(0,0,0,.1)' },
    divider: { marginHorizontal:8, color:'rgba(0,0,0,.6)', fontSize:12 },
    secondary: { borderWidth:1, borderColor:'rgba(0,0,0,.3)', borderRadius:4, paddingVertical:12, alignItems:'center' },
    secondaryText: { fontWeight:'700', color: brand.text },
});
