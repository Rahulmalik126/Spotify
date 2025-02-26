import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";

import api from "../../services/api";
import { useGlobalContext } from "../../context/contextProvider";

const AlbumInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;

  const [album, setAlbum] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const {language}=useGlobalContext();

  //Function to change the color of the header
  const handleScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const gradientColor1 =
    scrollY > 190 ? "rgba(165, 42, 42, 0.8)" : "rgba(0,0,0,0)";
  const gradientColor2 = scrollY > 190 ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0)";
  const bgIcon = scrollY > 200 ? "rgba(0,0,0,0)" : "rgba(128,128,128,0.8)";

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albumData = await api.fetchAlbumInfo(itemId);
        setAlbum(albumData);
      } catch (error) {
        Alert.alert("Error fetching Album Info:", error);
      }
    };
    fetchAlbum();
  }, []);

  return (
    <View className="h-full relative">
      <LinearGradient
        colors={[`${gradientColor1}`, `${gradientColor2}`]}
        start={{ x: 0.2, y: -0.9 }}
        end={{ x: 0.2, y: 0.7 }}
        className="h-[50px] flex justify-center absolute top-0 w-full z-30"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-[40px] h-[40px] rounded-full fex justify-center items-center ml-5"
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
        colors={["brown", "black"]}
        start={{ x: 0.2, y: -0.9 }}
        end={{ x: 0.2, y: 0.7 }}
        className="h-[100vh]"
      >
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View className="flex flex-row w-full justify-center items-end mb-5 mt-20">
            <Image
              source={{ uri: album?.images?.[0]?.url }}
              className="w-[180px] h-[180px] rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="ml-8 h-[100%]">
            <Text className="text-white text-4xl font-extrabold">
              {album?.name}
            </Text>
            <View className="flex flex-row gap-2 mt-5">
              <Text className="text-white font-normal">
                {album?.artists?.map((artist) => artist.name).join(", ")}
              </Text>
            </View>
            <Text className="text-gray-400 text-xs mt-1">
              {language.AlbumPageText1}•{album?.release_date?.slice(0, 4)}
            </Text>
            <Text className="text-gray-400 text-xs mt-1">
              {album?.total_tracks} {language.AlbumPageText2}
            </Text>

            <View className="flex flex-col w-[100%] h-[100%] gap-1">
              {album?.tracks?.items?.map((song) => {
                return (
                  <TouchableOpacity
                    key={song.id}
                    onPress={() =>
                      navigation.navigate("SongsInfoScreen", {
                        trackId: song?.id,
                      })
                    }
                    className="mt-3 flex-col justify-center mb-2 w-[100%] rounded-md"
                  >
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="text-white font-bold w-auto text-xl"
                    >
                      {song?.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="text-gray-400 text-sm font-semibold w-[90%]"
                    >
                      {song?.artists?.map((artist) => artist.name).join(", ")}
                    </Text>
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

export default AlbumInfoScreen;
