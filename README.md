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

### First-time Setup Checklist
1. Install a recent LTS version of Node.js and the Expo CLI globally (`npm install --global expo`) if you have not already.
2. Install project dependencies with `npm install` and ensure you have a simulator or the Expo Go app to run the project.
3. Because there is no backend yet, the app reads from local JSON. If you need a temporary API during development, you can run a mock server:
   ```bash
   npx json-server --watch data/products.json --port 3001
   ```
   Adjust the endpoints in [`services/api.js`](services/api.js) to point to the mock server.

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

## Handover Notes

This project is an early demo and omits several pieces you may want before
shipping to production. When taking over the codebase, consider the following
items:

### Backend and Data
- There is no API server bundled with this repo. Plan to build your own backend
  and expose endpoints for products and authentication.
- All API helpers in [`services/api.js`](services/api.js) pull from static JSON
  in [`data/`](data/). Replace each function with real HTTP calls, handle
  failures and timeouts, and remove the dummy data.
- Introduce environment variables for server URLs and secrets (e.g. with
  [expo-constants](https://docs.expo.dev/versions/latest/sdk/constants/) or
  [dotenv](https://www.npmjs.com/package/react-native-dotenv)).

### Authentication
- `signIn`, `signUp`, and `signOut` are placeholders. Implement these to talk to
  your auth service and store tokens in `ShopContext` (and optionally
  `AsyncStorage`) with appropriate refresh/expiry handling.

### Testing and Linting
- There is no testing or linting set up. Add Jest with
  `@testing-library/react-native` for component tests and configure ESLint/
  Prettier to enforce consistent style.
- Include corresponding npm scripts (`test`, `lint`) and consider running them
  in a pre-commit hook or CI job.

### CI/CD and Releases
- No CI/CD pipelines or EAS build profiles are configured. Set up GitHub Actions
  (or your preferred service) to install dependencies, run tests/lint, and
  trigger [EAS Build](https://docs.expo.dev/build/introduction/) for production
  artifacts.

### Feature Gaps
- Pagination, form validation, error states, accessibility checks, and visual
  polish are intentionally minimal. Expand them based on your product
  requirements.
- DIY guidance and marketing strategies are missing. Document customization
  steps and promotional approaches to help store owners tailor and grow their
  apps.

Document any additional decisions in this README to help future developers.

---
With the service layer in place, integrating a real backend is a matter of replacing a few functions, letting you focus on building the server without restructuring the app.
