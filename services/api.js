import PRODUCTS from '../data/products';

// Product APIs
export async function getProducts() {
    return PRODUCTS;
}

export async function getProduct(id) {
    return PRODUCTS.find(p => p.id === id);
}

export async function searchProducts(term) {
    const q = term?.toLowerCase?.() || '';
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(q));
}

// Authentication APIs (dummy)
export async function signIn({ email, password }) {
    if (email?.trim() && password?.trim()) {
        return 'dummy-auth-token';
    }
    throw new Error('Missing credentials');
}

export const signUp = signIn;

export async function signOut() {
    // placeholder for future sign-out logic
}
