import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ShowArtistInfo from "../../components/artistScreenComponents/ShowArtistInfo";
import { router, useLocalSearchParams } from "expo-router";
import api from "../../services/api";
import { StatusBar } from "expo-status-bar";

const ArtistProfileScreen = () => {
  const navigation = useNavigation();
  const { title, itemId } = useLocalSearchParams();
  const [artist, setArtist] = useState({});

  const [scrollY, setScrollY] = useState(0);
  
  const handleScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };
  const gradientColor1 = scrollY > 200 ?"rgba(165, 42, 42, 0.8)": "rgba(0,0,0,0)";
  const gradientColor2 = scrollY > 200 ?"rgba(0,0,0,0.9)": "rgba(0,0,0,0)";
  const bgIcon=scrollY>200?"rgba(0,0,0,0)":"rgba(128,128,128,0.8)";
  

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
        className="h-[50px] flex justify-center absolute top-0 w-full z-30 "
        >
      <TouchableOpacity onPress={() => router.back()} className="w-[40px] h-[40px] rounded-full fex justify-center items-center ml-5" style={{backgroundColor:`${bgIcon}`}}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="white"
            style={{padding:4}}
            />
        </TouchableOpacity>
            </LinearGradient>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
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
        colors={["brown", "black"]}
        start={{ x: 0.2, y: -0.7 }} 
        end={{ x: 0.2, y: 0.45 }}
        className="h-full"
        >
        <View className="artists-center flex-row justify-between p-2 w-[90%]">
          <View>
          <Text className="text-gray-400 text-base font-normal ml-3">
            {artist?.followers?.total && formatFollowersCount(artist.followers.total)} monthly listeners
          </Text>
            <TouchableOpacity className= "w-[50px] border-[1px] border-gray-300 flex justify-center items-center rounded-lg ml-3 mt-2">
              <Text className="text-gray-300 p-1">follow</Text>
            </TouchableOpacity>
          </View>
          <AntDesign name="play" size={50} color="#1dd661"/>
        </View>
        <View className="flex-row flex-wrap gap-2 p-2">
          {artist?.genres?.map((genre) => (
            <View key={genre} className="bg-white/10 px-3 py-1.5 rounded-full">
              <Text className="text-white text-sm font-medium capitalize">
                {genre}
              </Text>
            </View>
          ))}
        </View>
        <ShowArtistInfo artistId={itemId} /> 
      </LinearGradient>
        <StatusBar backgroundColor="black" style="light" />
        </ScrollView>
    </View>
  );
};

export default ArtistProfileScreen;
