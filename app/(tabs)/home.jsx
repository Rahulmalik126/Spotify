import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import api from '../../services/api'; // Import the API service
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
          const profileData = await api.fetchUserProfile();
          console.log('User Profile:', profileData); // Log the fetched profile data
          setUserProfile(profileData); // Store the user's profile data
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
    };

    fetchProfile();
  }, []);

  return (
    <ScrollView>
    <SafeAreaView>

      <View className="bg-black h-full flex flex-1 justify-center w-full">
        {userProfile ? (
          <View
          className="flex items-center bg-black, h-full"
    >
            {/* Check if userProfile.images exists and has items */}
            {userProfile.images && userProfile.images.length > 0 && (
              <Image
                source={{ uri: userProfile.images[0]?.url }}
                className="w-50 h-50 rounded-xl border-2 border-white"
                />
              )}
          </View>
        ) : (
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
            Loading user profile...
          </Text>
        )}
      </View>
      <StatusBar backgroundColor="black" style="light"/>
        </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
