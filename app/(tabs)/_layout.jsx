import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Octicons, Feather, Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'rgba(0,0,0,0.3)',
          height: 64,
          paddingTop: 5,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View className="flex justify-center items-center w-[100px] mt-3">
              <Octicons name="home" size={24} color={color} />
              <Text className="text-xs mt-1" style={{ color: color }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View className="flex justify-center items-center w-[100px] mt-3">
              <Feather name="search" size={24} color={color} />
              <Text className="text-xs mt-1" style={{ color: color }}>Search</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View className="flex justify-center items-center w-[100px] mt-3">
              <Ionicons name="library-outline" size={24} color={color} />
              <Text className="text-xs mt-1" style={{ color: color }}>Your Library</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
