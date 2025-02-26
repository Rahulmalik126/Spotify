import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { StatusBar } from "expo-status-bar";
import api from "../../services/api";
import { getRandomColor } from "../../utils/helper";
import ArtistFollowButton from "../../components/artistScreenComponents/ArtistFollowButton";
import ShowArtistInfo from "../../components/artistScreenComponents/ShowArtistInfo";
import { useGlobalContext } from "../../context/contextProvider";

const ArtistProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;
  const mainColor = useRef(getRandomColor());

  const [artist, setArtist] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const {language}= useGlobalContext();

  const handleScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const gradientColor1 =
    scrollY > 200 ? `${mainColor.current}` : "rgba(0,0,0,0)";
  const gradientColor2 = scrollY > 200 ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0)";
  const bgIcon = scrollY > 200 ? "rgba(0,0,0,0)" : "rgba(128,128,128,0.8)";

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artistData = await api.fetchArtistInfo(itemId);
        setArtist(artistData); // Store the user's profile data
      } catch (error) {
        Alert.alert("Error fetching Artist Info:", error);
      }
    };
    fetchArtist();
  }, []);

  const formatFollowersCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`; // Convert to millions (M)
    } else if (count >= 100000) {
      return `${(count / 100000).toFixed(1)}L`; // Convert to lakhs (L)
    } else {
      return count.toLocaleString(); // Return the exact number with commas
    }
  };

  return (
    <View className="h-full relative">
      <LinearGradient
        colors={[`${gradientColor1}`, `${gradientColor2}`]}
        start={{ x: 0.2, y: -0.9 }}
        end={{ x: 0.2, y: 0.7 }}
        className="h-[55px] flex justify-center absolute top-0 w-full z-30 "
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
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <ImageBackground
          style={{
            width: "100%",
            height: 250,
            borderRadius: 10,
          }}
          resizeMode="cover"
          source={{
            uri:
              artist?.images?.[0]?.url ||
              "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk",
          }}
          className="flex justify-end"
        >
          <Text className="text-6xl font-extrabold w-[95%] text-white ml-3">
            {artist.name}
          </Text>
        </ImageBackground>
        <LinearGradient
          colors={[`${mainColor.current}`, "black"]}
          start={{ x: 0.2, y: -0.7 }}
          end={{ x: 0.2, y: 0.45 }}
          className="h-full"
        >
          <View className="artists-center flex-row justify-between p-2 w-[90%] mt-2">
            <View>
              <Text className="text-gray-400 text-base font-normal ml-3">
                {artist?.followers?.total &&
                  formatFollowersCount(artist.followers.total)}{" "}
                {language.ArtistPageText1}
              </Text>
              <ArtistFollowButton artistId={artist?.id} />
            </View>
            <AntDesign name="play" size={40} color="#1dd661" />
          </View>
          <View className="flex-row flex-wrap gap-2 p-2 ml-3">
            {artist?.genres?.map((genre) => (
              <View
                key={genre}
                className="bg-white/10 px-3 py-1.5 rounded-full"
              >
                <Text className="text-white text-sm font-medium capitalize">
                  {genre}
                </Text>
              </View>
            ))}
          </View>
          <View className="ml-3">
            <ShowArtistInfo artistId={itemId} />
          </View>
        </LinearGradient>
        <StatusBar backgroundColor="black" style="light" />
      </ScrollView>
    </View>
  );
};

export default ArtistProfileScreen;
