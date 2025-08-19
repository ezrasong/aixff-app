import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn as apiSignIn, signUp as apiSignUp, signOut as apiSignOut } from '../services/api';

const Ctx = createContext(null);
export const useShop = () => useContext(Ctx);

export function ShopProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [favs, setFavs] = useState([]);
    const [theme, setTheme] = useState('light'); // default white mode
    const [token, setToken] = useState(null);    // dummy auth

    useEffect(() => {
        (async () => {
            try {
                const [c, f, t, k] = await Promise.all([
                    AsyncStorage.getItem('aixff:cart'),
                    AsyncStorage.getItem('aixff:favs'),
                    AsyncStorage.getItem('aixff:theme'),
                    AsyncStorage.getItem('aixff:token'),
                ]);
                if (c) setCart(JSON.parse(c));
                if (f) setFavs(JSON.parse(f));
                if (t) setTheme(t);
                if (k) setToken(k);
            } catch {}
        })();
    }, []);

    useEffect(() => { AsyncStorage.setItem('aixff:cart', JSON.stringify(cart)).catch(()=>{}); }, [cart]);
    useEffect(() => { AsyncStorage.setItem('aixff:favs', JSON.stringify(favs)).catch(()=>{}); }, [favs]);
    useEffect(() => { AsyncStorage.setItem('aixff:theme', theme).catch(()=>{}); }, [theme]);
    useEffect(() => { token ? AsyncStorage.setItem('aixff:token', token) : AsyncStorage.removeItem('aixff:token'); }, [token]);

    const addToCart = (p) => setCart((s) => {
        const existing = s.find((x) => x.id === p.id);
        if (existing) {
            return s.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
        }
        return [...s, { ...p, qty: 1 }];
    });
    const changeCartQty = (id, delta) => setCart((s) => s.flatMap((x) => {
        if (x.id !== id) return [x];
        const qty = x.qty + delta;
        return qty > 0 ? [{ ...x, qty }] : [];
    }));
    const removeFromCart = (id) => setCart((s) => s.filter((x) => x.id !== id));
    const clearCart = () => setCart([]);
    const toggleFavorite = (p) => setFavs((s) => (s.find((x) => x.id === p.id) ? s.filter((x) => x.id !== p.id) : [...s, p]));
    const clearFavorites = () => setFavs([]);
    const toggleTheme = () => setTheme((m) => (m === 'light' ? 'dark' : 'light'));

    // auth helpers (can be swapped with real API)
    const signIn = async (creds) => {
        const t = await apiSignIn(creds);
        setToken(t);
    };
    const signUp = async (creds) => {
        const t = await apiSignUp(creds);
        setToken(t);
    };
    const signOut = async () => {
        await apiSignOut();
        setToken(null);
    };

    const value = useMemo(() => ({
        cartItems: cart,
        favouriteItems: favs,
        favouriteIds: favs.map((x) => x.id),
        addToCart, removeFromCart, changeCartQty, clearCart,
        toggleFavorite, clearFavorites,
        theme, toggleTheme,
        token, signIn, signUp, signOut,
    }), [cart, favs, theme, token]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
