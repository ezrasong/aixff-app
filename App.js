// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ShopProvider, useShop } from './context/ShopContext';

// Screens
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CategoryScreen from './screens/CategoryScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

// Image assets
import aixffLogo from './assets/aixff.png';
import backgroundImage from './assets/background.png';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

// Tabs without Profile
const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#3EB053',
            tabBarInactiveTintColor: 'rgba(0,0,0,.5)',
            tabBarIcon: ({ color, size }) => {
              const map = { Home: 'home', Explore: 'compass', Favourites: 'heart', Cart: 'cart' };
              return <Ionicons name={map[route.name]} size={size} color={color} />;
            },
          })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Favourites" component={FavoritesScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
  );
}

// Root stack shows tabs + pushes Profile/Details modally
const RootStack = createNativeStackNavigator();
function AppNavigator() {
  return (
      <RootStack.Navigator>
        <RootStack.Screen
            name="MainTabs"
            component={MainTabs}
            options={({ navigation }) => ({
              headerTitle: () => (
                  <Image
                      source={aixffLogo}
                      style={{ width: 120, height: 40 }}
                      resizeMode="contain"
                  />
              ),
              headerRight: () => (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ paddingHorizontal: 8 }}>
                      <Ionicons name="search" size={24} color="#20302A" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ paddingHorizontal: 8 }}>
                      <Ionicons name="person-circle" size={28} color="#20302A" />
                    </TouchableOpacity>
                  </View>
              ),
            })}
        />
      <RootStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
              headerTitle: () => (
                  <Image source={aixffLogo} style={{ width: 120, height: 40 }} resizeMode="contain" />
              ),
              title: 'My Profile',
          }}
      />
      <RootStack.Screen
          name="PersonalInfo"
          component={PersonalInfoScreen}
          options={{
              headerTitle: () => (
                  <Image source={aixffLogo} style={{ width: 120, height: 40 }} resizeMode="contain" />
              ),
              title: 'Personal Info',
          }}
      />
      <RootStack.Screen
          name="PaymentMethods"
          component={PaymentMethodsScreen}
          options={{
              headerTitle: () => (
                  <Image source={aixffLogo} style={{ width: 120, height: 40 }} resizeMode="contain" />
              ),
              title: 'Payment Methods',
          }}
      />
      <RootStack.Screen
          name="ShippingAddress"
          component={ShippingAddressScreen}
          options={{
              headerTitle: () => (
                  <Image source={aixffLogo} style={{ width: 120, height: 40 }} resizeMode="contain" />
              ),
              title: 'Shipping Address',
          }}
      />
      <RootStack.Screen
          name="OrderHistory"
          component={OrderHistoryScreen}
          options={{
              headerTitle: () => (
                  <Image source={aixffLogo} style={{ width: 120, height: 40 }} resizeMode="contain" />
              ),
              title: 'Order History',
          }}
      />
      <RootStack.Screen
          name="Search"
          component={SearchScreen}
          options={{
              headerTitle: () => (
                  <Image source={aixffLogo} style={{ width: 120, height: 40 }} resizeMode="contain" />
              ),
              title: 'Search',
          }}
      />
      <RootStack.Screen
          name="Category"
          component={CategoryScreen}
          options={({ route }) => ({
              headerTitle: () => (
                  <Image source={aixffLogo} style={{ width: 120, height: 40 }} resizeMode="contain" />
              ),
              title: route.params?.title || 'Category',
          })}
      />
        <RootStack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ presentation: 'transparentModal', headerShown: false }}
        />
      </RootStack.Navigator>
  );
}

// Auth flow (dummy)
const AuthStack = createNativeStackNavigator();
function AuthNavigator() {
  return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Signup" component={SignupScreen} />
      </AuthStack.Navigator>
  );
}

function Root() {
  const { token } = useShop();
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ImageBackground
            source={backgroundImage}
            style={{ flex: 1 }}
            resizeMode="repeat"
        >
          <NavigationContainer theme={navTheme}>
            {token ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </ImageBackground>
      </GestureHandlerRootView>
  );
}

export default function App() {
  return (
      <ShopProvider>
        <Root />
      </ShopProvider>
  );
}
