const BASE = [
    {
        name: 'Rose Essence',
        category: 'Fragrances',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1529673371793-009ef0ab01bb?q=80&w=1200&auto=format&fit=crop',
        description: 'Elegant rose blend with soft green facets.',
        tags: ['Floral', 'Perfume', '100% Plant-based', 'Top Note'],
    },
    {
        name: 'Ocean Breeze',
        category: 'Fragrances',
        price: 69.99,
        imageUrl: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop',
        description: 'Crisp aquatic notes with sea salt and driftwood.',
        tags: ['Green', 'Air Care', 'Water-soluble', 'Body Note'],
    },
    {
        name: 'Citrus Burst',
        category: 'Flavor',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1605979979283-9e3f498bb0e8?q=80&w=1200&auto=format&fit=crop',
        description: 'Orange • Lemon • Lime — bright, zesty, food-grade.',
        tags: ['Beverages', 'Snacks'],
    },
    {
        name: 'Amber Night',
        category: 'Fragrances',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop',
        description: 'Warm amber & woods with subtle spice.',
        tags: ['Woody', 'Home Care', 'Microcapsule', 'Base Note'],
    },
    {
        name: 'Lavender Oil',
        category: 'Ingredient',
        price: 39.99,
        imageUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&auto=format&fit=crop',
        description: 'Pure lavender essential oil for multiple uses.',
        tags: ['Bakery', 'Savories'],
    },
];

const PRODUCTS = [];
for (let i = 0; i < 200; i++) {
    const b = BASE[i % BASE.length];
    PRODUCTS.push({ ...b, id: i + 1, name: `${b.name} #${i + 1}` });
}
export default PRODUCTS;
