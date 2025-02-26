import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Octicons, Feather, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";

import DrawerContent from "../../components/commonComponents/DrawerContent";
import GlobalProvider, { useGlobalContext } from "../../context/contextProvider";
import Home from "./home";
import Search from "./search";
import Library from "./library";
import ArtistProfileScreen from "../screens/artistProfileScreen";
import SongsInfoScreen from "../screens/songsInfoScreen";
import SearchBarScreen from "../screens/searchBarScreen";
import AllRecentTracks from "../screens/allRecentTracks";
import AlbumInfoScreen from "../screens/albumInfoScreen";
import AllLikedSongs from "../screens/allLikedSongs";
import PlaylistScreen from "../screens/playlistScreen";
import UserProfileScreen from "../screens/userProfileScreen";
import Page from "../index";
import SignUp from "../(auth)/sign-up";
import LogIn from "../(auth)/log-in"

const Tabs = createBottomTabNavigator();
// Tab Navigation
const TabsLayout = () => {
  const {language} =useGlobalContext();
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.5)",
          height: 58,
          paddingTop: 5,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        component={Home}
        options={{
          title: language.TabName1,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                marginTop: 3,
              }}
            >
              <Octicons name="home" size={24} color={color} />
              <Text style={{ color: color, marginTop: 1 }}>{language.TabName1}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        component={Search}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                marginTop: 3,
              }}
            >
              <Feather name="search" size={24} color={color} />
              <Text style={{ color: color, marginTop: 1 }}>{language.TabName2}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        component={Library}
        options={{
          title: "Library",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                marginTop: 3,
              }}
            >
              <Ionicons name="library-outline" size={24} color={color} />
              <Text style={{ color: color, marginTop: 1 }}>{language.TabName3}</Text>
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const Drawer = createDrawerNavigator();
// Drawer Navigation
export const DrawerNavigator = () => {
  return (
    <GlobalProvider>
      <Drawer.Navigator
        drawerContent={() => <DrawerContent />}
        screenOptions={{
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "gray",
          drawerLabelStyle: { marginLeft: -25, display: "none", height: 0 },
        }}
      >
        <Drawer.Screen
          name="tabs"
          component={TabsLayout}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </GlobalProvider>
  );
};

const Stack = createNativeStackNavigator();
//Stack Navigation
function Navigation() {
  return (
    <GlobalProvider>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="tabs"
              component={TabsLayout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="search"
              component={Search}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="library"
              component={Library}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AlbumInfoScreen"
              component={AlbumInfoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllLikedSongs"
              component={AllLikedSongs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllRecentTracks"
              component={AllRecentTracks}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ArtistProfileScreen"
              component={ArtistProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlaylistScreen"
              component={PlaylistScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SearchBarScreen"
              component={SearchBarScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SongsInfoScreen"
              component={SongsInfoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserProfileScreen"
              component={UserProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="index"
              component={Page}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="sign-up"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="log-in"
              component={LogIn}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </GlobalProvider>
  );
}
export default Navigation;
