import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, RefreshControl } from "react-native";
import api from "../../services/api";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import UserProfilePic from "../../components/commonComponents/UserProfilePic";
import { useGlobalContext } from "../../context/contextProvider";
import Category from "../../components/commonComponents/Category";
import { homeCategories } from "../../constants/constants";
import SectionHead from "../../components/homeComponents/SectionHead";
import HorizontalListCard from "../../components/homeComponents/HorizontalListCards";
import {
  structuringNewReleases,
  structuringTopArtists,
} from "../../utils/helper";
import RecentTracks from "../../components/homeComponents/RecentTracks";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Loader from "../../components/commonComponents/Loader";

const Home = () => {
  const { userProfile, language } = useGlobalContext();
  console.log(language);
  

  const navigation = useNavigation();

  const [activeCategory, setActiveCategory] = useState(language?.HomePageCategories?.[0]);
  const [recentTracks, setRecentTracks] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 8;

  useEffect(()=>{
    setActiveCategory(language?.HomePageCategories?.[0])
  },[language])

  const fetchData = async () => {
    const [recentTracksData, newReleasesData, topArtistData] =
      await Promise.allSettled([
        api.fetchRecentTracks(limit),
        api.fetchNewReleases(),
        api.fetchTopItems("artists"),
      ]);

      setRefreshing(false);

    // Handle recent tracks
    if (recentTracksData.status === "fulfilled" && recentTracksData.value) {
      setRecentTracks(recentTracksData.value.items); 
    } else {
      Alert.alert("Error", "Failed to fetch recent tracks");
    }

    // Handle top artists
    if (topArtistData.status === "fulfilled") {
      setTopArtists(topArtistData.value?.items);
    } else {
      Alert.alert("Error", "Failed to fetch top artists");
    }

    // Handle new releases
    if (newReleasesData.status === "fulfilled" && newReleasesData.value) {
      setNewReleases(newReleasesData.value.albums.items); 
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

  // Handle active Category
  const handleActiveCategory = (category) => {
    setActiveCategory(category);
  };

  //function to open the Drawer Navigator
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <View className="bg-black h-full">
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}>
        <SafeAreaView>
          <View className="bg-black flex h-auto justify-start w-full ml-4">
            {userProfile ? (
              <View className="flex flex-row items-start bg-black h-auto">
                {userProfile.images && userProfile.images.length > 0 && (
                  <TouchableOpacity onPress={openDrawer}>
                    <UserProfilePic userProfile={userProfile} />
                  </TouchableOpacity>
                )}
                <View className="flex flex-row gap-3 ml-4">
                  {language?.HomePageCategories?.map((category) => (
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
              <Text className="text-white text-center mt-6">
                Loading user profile...
              </Text>
            )}
            {activeCategory === language.HomePageCategories?.[0] && (
              <>
                <View className="bg-black h-auto w-full mt-4">
                  <SectionHead
                    title={language.HomePageHead1}
                    path={"/screens/allRecentTracks"}
                    subHead={language.HomePageHead1SubHead1}
                  />
                  {recentTracks.length > 0 ? (
                    <RecentTracks data={recentTracks} />
                  ) : (
                    <Loader />
                  )}
                </View>
                <View className="bg-black h-auto w-full mb-3">
                  <HorizontalListCard
                    title={language.HomePageHead2}
                    data={structuringTopArtists(topArtists)}
                    section={"topArtists"}
                  />
                  <HorizontalListCard
                    title={language.HomePageHead3}
                    data={structuringNewReleases(newReleases)}
                    section={"newReleases"}
                  />
                </View>
              </>
            )}
            {activeCategory === language.HomePageCategories?.[1] && (
              <>
                <View className="bg-black h-auto w-full mt-4">
                  <SectionHead
                    title={language.HomePageHead1}
                    path={"/screens/allRecentTracks"}
                  />
                  {recentTracks.length > 0 ? (
                    <RecentTracks data={recentTracks} />
                  ) : (
                    <Loader />
                  )}
                </View>
                <View className="bg-black h-auto w-full mb-3">
                  <HorizontalListCard
                    title={language.HomePageHead3}
                    data={structuringNewReleases(newReleases)}
                    section={"newReleases"}
                  />
                </View>
              </>
            )}
            {activeCategory === language.HomePageCategories?.[2] && (
              <>
                <View className="bg-black h-auto w-full mb-3">
                  <HorizontalListCard
                    title={language.HomePageHead2}
                    data={structuringTopArtists(topArtists)}
                    section={"topArtists"}
                  />
                  <HorizontalListCard
                    title={language.HomePageHead3}
                    data={structuringNewReleases(newReleases)}
                    section={"newReleases"}
                  />
                </View>
              </>
            )}
          </View>
          <StatusBar backgroundColor="black" style="light" />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Home;
