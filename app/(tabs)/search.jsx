import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/contextProvider";
import UserProfilePic from "../../components/UserProfilePic";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import api from "../../services/api";
import TopTracks from "../../components/TopTracks";

const Search = () => {
  const { userProfile } = useGlobalContext();
  const [topTracks, setTopTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const topTracksData = await api.fetchTopItems("tracks");
      console.log("CHECK: ", topTracksData);

      // Handle top tracks
      if (topTracksData) {
        setTopTracks(topTracksData.items);
      } else {
        Alert.alert("Error", "Failed to fetch top artists");
      }
    };
    fetchData();
  }, []);

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <ScrollView>
      <SafeAreaView className="bg-black">
        <View className="bg-black flex h-auto justify-start w-full ml-2">
          {userProfile ? (
            <View className="flex flex-row items-center bg-black h-auto mt-6">
              {userProfile.images && userProfile.images.length > 0 && (
                <TouchableOpacity onPress={openDrawer}>
                  <UserProfilePic userProfile={userProfile} />
                </TouchableOpacity>
              )}
              <View className="flex flex-row w-[75%] justify-between items-center">
                <Text className="text-white text-3xl font-bold ml-2">
                  Search
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
            <TouchableOpacity onPress={()=>router.push("/screens/searchBarScreen")} className="bg-white w-[95%] py-3 flex flex-row items-center px-3 rounded-lg">
              <AntDesign name="search1" size={24} color="black" />
              <Text className="font-normal ml-1 text-#adacac">
                What do you want to listen to?
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-col justify-center mt-4 ml-2">
            <Text className=" text-white text-2xl font-bold">Top Tracks</Text>
            <View className="flex flex-row flex-wrap justify-between w-[95%] gap-2"
            >
              {topTracks.map((item) => (
                <View
                  key={item.id}
                  style={{ width: "47%", marginVertical: 5}}
                >
                  <TopTracks
                    imageUrl={item.album.images[0].url}
                    name={item.name}
                    artists={item.artists}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Search;
