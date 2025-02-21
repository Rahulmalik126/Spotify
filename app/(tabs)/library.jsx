import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";

import { useGlobalContext } from "../../context/contextProvider";
import UserProfilePic from "../../components/commonComponents/UserProfilePic";
import Category from "../../components/commonComponents/Category";
import { libraryCategories } from "../../constants/constants";
import UserLikedTracks from "../../components/libraryComponents/UserLikedTracks";
import UserFollowedPlaylists from "../../components/libraryComponents/UserFollowedPlaylists";
import UserFollowedArtists from "../../components/libraryComponents/UserFollowedArtists";
import api from "../../services/api";
import Allcategory from "../../components/libraryComponents/Allcategory";

const Library = () => {
  const { userProfile } = useGlobalContext();

  const [activeCategory, setActiveCategory] = useState("All");
  const [likedTracks, setLikedTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  // Function to open the Drawer Navigator
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  //Function to Handle Active Category
  const handleActiveCategory = (category) => {
    setActiveCategory(category);
  };

  const fetchData = async () => {
    const [likedTracksData, userPlaylistsData, userFollowedArtistsData] =
      await Promise.allSettled([
        api.fetchLikedTracks(),
        api.fetchUserPlaylists(),
        api.fetchUserFollowedArtists(),
      ]);

    setRefreshing(false);

    // Handle liked tracks
    if (likedTracksData.status === "fulfilled" && likedTracksData.value) {
      setLikedTracks(likedTracksData.value); // assuming likedTracksData.value has the structure { items: [tracks] }
    } else {
      Alert.alert("Error", "Failed to fetch recent tracks");
    }

    //Handle followed artists
    if (userFollowedArtistsData.status === "fulfilled") {
      setFollowedArtists(userFollowedArtistsData.value);
    } else {
      Alert.alert("Error", "Failed to fetch top artists");
    }

    // Handle new Playlists
    if (userPlaylistsData.status === "fulfilled" && userPlaylistsData.value) {
      setUserPlaylists(userPlaylistsData.value); // assuming userPlaylistsData.value has the structure { albums: { items: [albums] } }
    } else {
      Alert.alert("Error", "Failed to fetch new releases");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <View className="bg-black h-full">
      <SafeAreaView>
        <View className="bg-black flex flex-col h-auto justify-start w-full ml-4">
          {userProfile ? (
            <View className="flex flex-col">
              <View className="flex flex-row items-center bg-black h-auto">
                {userProfile.images && userProfile.images.length > 0 && (
                  <TouchableOpacity onPress={openDrawer}>
                    <UserProfilePic userProfile={userProfile} />
                  </TouchableOpacity>
                )}
                <Text className="text-white text-center text-3xl font-bold ml-4">
                  Your Library
                </Text>
              </View>
              <View className="flex flex-row gap-3 mt-4">
                {libraryCategories.map((category) => (
                  <Category
                    key={category}
                    isActive={activeCategory === category}
                    handlePress={handleActiveCategory}
                    category={category}
                  />
                ))}
              </View>
              {activeCategory === "All" && (
                <View className="h-[100vh] ml-1">
                  <Allcategory
                    likedTracks={likedTracks}
                    userPlaylists={userPlaylists}
                    followedArtists={followedArtists}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
                </View>
              )}
              <View className="ml-1">
                {activeCategory === "Tracks" && (
                  <UserLikedTracks
                    likedTracks={likedTracks}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
                )}
                {activeCategory === "Playlists" && (
                  <UserFollowedPlaylists
                    userPlaylists={userPlaylists}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
                )}
                {activeCategory === "Artists" && (
                  <UserFollowedArtists
                    followedArtists={followedArtists}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                  />
                )}
              </View>
            </View>
          ) : (
            <Text className="text-white text-center mt-6">
              Loading user profile...
            </Text>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Library;
