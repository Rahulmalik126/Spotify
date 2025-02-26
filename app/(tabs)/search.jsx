import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "../../context/contextProvider";
import UserProfilePic from "../../components/commonComponents/UserProfilePic";
import api from "../../services/api";
import TopTracks from "../../components/searchComponents/TopTracks";
import Loader from "../../components/commonComponents/Loader";

const Search = () => {
  const { userProfile, language } = useGlobalContext();

  const [topTracks, setTopTracks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const fetchData = async () => {
    const topTracksData = await api.fetchTopItems("tracks");

    // Handle top tracks
    if (topTracksData) {
      setTopTracks(topTracksData.items);
      setRefreshing(false);
    } else {
      Alert.alert("Error", "Failed to fetch top artists");
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

  //Function to Open Drawer Navigation
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View className="bg-black h-full">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SafeAreaView className="bg-black">
          <View className="bg-black flex h-auto justify-start w-full ml-2">
            {userProfile ? (
              <View className="flex flex-row items-center bg-black h-auto">
                {userProfile.images && userProfile.images.length > 0 && (
                  <TouchableOpacity onPress={openDrawer} className="ml-2">
                    <UserProfilePic userProfile={userProfile} />
                  </TouchableOpacity>
                )}
                <View className="flex flex-row w-[75%] justify-between items-center">
                  <Text className="text-white text-3xl font-bold ml-4">
                    {language?.SearchPageHead1}
                  </Text>
                  <Feather name="camera" size={24} color="white" />
                </View>
              </View>
            ) : (
              <Text className="text-white text-center mt-6">
                Loading user profile...
              </Text>
            )}
            <View className="flex flex-col items-center mt-6 w-[97%]">
              <TouchableOpacity
                onPress={() => navigation.navigate("SearchBarScreen")}
                className="bg-white w-[95%] py-3 flex flex-row items-center px-3 rounded-lg"
              >
                <AntDesign name="search1" size={24} color="black" />
                <Text className="font-normal ml-1 text-#adacac">
                  {language?.SearchPageInputPlaceHolder}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-col justify-center mt-4 ml-2">
              <Text className=" text-white text-2xl font-bold">{language?.SearchPageHead2}</Text>
              <View className="flex flex-row flex-wrap justify-between w-[95%] gap-2">
                {topTracks && topTracks.length > 0 ? (
                  topTracks.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        width: "48.5%",
                        marginVertical: 3,
                        paddingBottom: 5,
                      }}
                    >
                      <TopTracks
                        trackId={item.id}
                        imageUrl={item.album.images[0].url}
                        name={item.name}
                        artists={item.artists}
                      />
                    </View>
                  ))
                ) : (
                  <Loader />
                )}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Search;
