import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import api from '../../services/api'; // Import the API service

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
      <View className="bg-black h-full flex flex-1 justify-center w-full">
        {userProfile ? (
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* Check if userProfile.images exists and has items */}
            {userProfile.images && userProfile.images.length > 0 && (
              <Image
                source={{ uri: userProfile.images[0]?.url }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              />
            )}
            <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold' }}>
              {userProfile.display_name}
            </Text>
          </View>
        ) : (
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
            Loading user profile...
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
