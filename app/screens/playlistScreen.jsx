import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "../../services/api";

const PlaylistScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { playlistId } = route.params;

  const [playlist, setPlaylist] = useState({});
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };
  const gradientColor1 =
    scrollY > 190 ? "rgba(165, 42, 42, 0.8)" : "rgba(0,0,0,0)";
  const gradientColor2 = scrollY > 190 ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0)";
  const bgIcon = scrollY > 200 ? "rgba(0,0,0,0)" : "rgba(128,128,128,0.8)";

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const playlistData = await api.fetchPlaylistInfo(playlistId);
        setPlaylist(playlistData);
      } catch (error) {
        Alert.alert("Error fetching Playlist Info:", error);
      }
    };
    fetchPlaylist();
  }, []);

  return (
    <View className="h-full">
      <LinearGradient
        colors={[`${gradientColor1}`, `${gradientColor2}`]}
        start={{ x: 0.2, y: -0.9 }}
        end={{ x: 0.2, y: 0.7 }}
        className="h-[50px] flex justify-center absolute top-0 w-full z-30 "
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-[40px] h-[40px] rounded-full fex justify-center items-center ml-5 mt-2"
          style={{ backgroundColor: `${bgIcon}` }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="white"
            style={{ padding: 4 }}
          />
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={[`brown`, `black`]}
        start={{ x: 0.2, y: -0.9 }}
        end={{ x: 0.2, y: 0.7 }}
        className="h-[100vh]"
      >
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View className=" mt-20 flex flex-row w-full justify-center items-end mb-5">
            <Image
              source={{ uri: playlist?.images?.[0]?.url }}
              className="w-[180px] h-[180px] rounded-lg "
              resizeMode="cover"
            />
          </View>
          <View className="ml-8">
            <Text className="text-white text-4xl font-extrabold">
              {playlist?.name}
            </Text>
            <View className="mt-1">
              <Text className="text-gray-400 text-base font-normal">
                {playlist?.description}
              </Text>
            </View>
            <View className="flex flex-row mt-2 items-center gap-2">
              <Image
                source={{ uri: playlist?.images?.[0]?.url }}
                className="w-[18px] h-[18px] rounded-full "
                resizeMode="cover"
              />
              <Text className="text-white text-sm">
                {playlist?.owner?.display_name}
              </Text>
            </View>
            <View className="flex flex-row gap-2 mt-2">
              <AntDesign name="earth" size={18} color="gray" />
              <Text className="text-gray-400 text-sm">
                {playlist?.followers?.total} saves{" "}
              </Text>
            </View>
            <Text className="text-gray-400 text-xs mt-2">
              {playlist?.tracks?.items?.length} Songs
            </Text>
            <View className="flex flex-col w-[100%] h-full gap-2 ">
              {playlist?.tracks?.items?.map((song, index) => {
                return (
                  <TouchableOpacity
                    key={`song-${index}`}
                    onPress={() =>
                      navigation.navigate("SongsInfoScreen", {
                        trackId: song?.track?.id,
                      })
                    }
                    className=" mt-3 flex-row items-center gap-2 w-[100%] rounded-md"
                  >
                    <Image
                      className="w-[50px] h-[50px] rounded-md"
                      source={{ uri: song?.track?.album?.images?.[0]?.url }}
                    />
                    <View className="flex flex-col gap-1 w-[70%]">
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-white font-bold w-auto text-xl"
                      >
                        {song?.track?.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-gray-400 text-sm font-semibold w-[80%]"
                      >
                        {song?.track?.artists
                          ?.map((artist) => artist.name)
                          .join(", ")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <StatusBar backgroundColor="black" style="light" />
    </View>
  );
};

export default PlaylistScreen;
