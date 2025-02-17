import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import api from "../../services/api"; // Import the API service
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "@react-navigation/native";

import UserProfilePic from "../../components/UserProfilePic";
import { useGlobalContext } from "../../context/contextProvider";
import Category from "../../components/Category";
import { categories } from "../../constants/constants";

const Home = () => {
  const { userProfile } = useGlobalContext();
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");
  
  const [recentTracks, setRecentTracks] = useState([]);
  // Fetch featured playlists when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const [recentTracksResult, newReleasesResult] = await Promise.allSettled([
        api.fetchRecentTracks(),
        api.fetchNewReleases(),
      ]);

      // Handle recent tracks
      if (recentTracksResult.status === "fulfilled") {
        setRecentTracks(recentTracksResult.value?.items);
      } else {
        Alert.alert("Error", "Failed to fetch recent tracks");
      }

      // Handle new releases
      if (newReleasesResult.status === "fulfilled") {
        setNewReleases(newReleasesResult.value?.albums.items);
      } else {
        Alert.alert("Error", "Failed to fetch recent tracks");
      }
    };

    fetchData();
  }, []);

   const handleActiveCategory = (category) => {
    setActiveCategory(category);
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <ScrollView>
      <SafeAreaView className="bg-black">
        <View className="bg-black h-[100vh] flex justify-start w-full ml-4">
          {userProfile ? (
            <View className="flex flex-row items-start bg-black h-full">
              {userProfile.images && userProfile.images.length > 0 && (
                <TouchableOpacity onPress={openDrawer}>
                  <UserProfilePic userProfile={userProfile} />
                </TouchableOpacity>
              )}
               <View className="flex flex-row gap-3 ml-4">
                {categories.map((category) => (
                  <Category
                    key={category}
                    isActive={activeCategory === category}
                    handlePress={handleActiveCategory}
                    category={category}
                  />
                ))}
              </View>

            </View>
          ) : (
            <Text
            className="text-white text-center mt-6"
              >
              Loading user profile...
            </Text>
          )}
        </View>

        <StatusBar backgroundColor="black" style="light" />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
