# AIXFF

AIXFF is a simple React Native demo storefront built with [Expo](https://expo.dev/). It currently uses local dummy data and a lightweight service layer so it is easy to swap in a real backend later.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) and npm
- [Expo CLI](https://docs.expo.dev/) (`npm install --global expo`)

### Installation
```bash
npm install
```

### Running in Development
Start the Expo development server and choose your target platform:
```bash
npm start
# or
npm run android
npm run ios
npm run web
```

### Building for Production
Use [EAS Build](https://docs.expo.dev/build/introduction/) to generate production binaries:
```bash
npx expo login           # if you have not logged in yet
npx eas build --platform android   # or ios
```
See Expo's documentation for additional configuration such as signing keys and build profiles.

## Replacing the Dummy Backend
All network and authentication logic is centralized in [`services/api.js`](services/api.js). These helpers currently return local data, but they are designed to be replaced with real HTTP requests.

### Products
Replace the product functions with calls to your backend:
```js
export async function getProducts() {
  const res = await fetch('https://api.example.com/products');
  return res.json();
}
```
Provide similar implementations for `getProduct` and `searchProducts`.

### Authentication
`signIn`, `signUp`, and `signOut` are placeholders. Swap them out for your auth system and return a token or session information. `ShopContext` already stores the token and exposes sign-in/up/out methods to the rest of the app.

### Error Handling & Extras
- Wrap requests in `try/catch` blocks and surface user‑friendly messages.
- Add authorization headers by reading the token from `ShopContext` or `AsyncStorage`.
- Consider adding pagination, caching, and other features as your backend grows.

## Project Structure
- `services/` – service layer for backend calls
- `context/` – global state (`ShopContext`)
- `screens/` – app screens (Home, Category, Search, Product Details)

---
With the service layer in place, integrating a real backend is a matter of replacing a few functions, letting you focus on building the server without restructuring the app.
