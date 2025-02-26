import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import UserLikedTracks from "../../components/libraryComponents/UserLikedTracks";
import { useGlobalContext } from "../../context/contextProvider";

const AllLikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const {language}=useGlobalContext();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const likedTracksData = await api.fetchLikedTracks();

      // Handle liked Songs
      if (likedTracksData) {
        setLikedSongs(likedTracksData);
      } else {
        Alert.alert("Error", "Failed to fetch liked Songs");
      }
    };
    fetchData();
  }, []);

  return (
    <LinearGradient
      colors={["#490ff0", "black"]}
      start={{ x: 0.2, y: -0.7 }} // Start at the top
      end={{ x: 0.2, y: 0.45 }} // End at the bottom
      className="h-full"
    >
      <SafeAreaView>
        <View className="flex flex-col pt-8 bg-[rgba(0,0,0,0.2)] mb-4 gap-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={25}
              color="white"
              marginLeft={15}
            />
          </TouchableOpacity>
          <Text className="text-white font-bold text-3xl ml-5">
            {language?.LikedPageHead}
          </Text>
          <View className="flex flex-row w-[90%] justify-between">
            <Text className="text-gray-400 ml-5">
              {likedSongs.length} {language?.LikedPageText1}
            </Text>
            <AntDesign name="play" size={50} color="#1dd661" />
          </View>
          <View className="ml-5">
            <UserLikedTracks likedTracks={likedSongs} />
          </View>
        </View>
        <StatusBar backgroundColor="black" style="light" />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AllLikedSongs;
