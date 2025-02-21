import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

import { getRandomColor } from "../../utils/helper";
import { useGlobalContext } from "../../context/contextProvider";

const UserProfileScreen = () => {
  const { userProfile,followedArtists}=useGlobalContext();

  const color = useRef(getRandomColor());

  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[`${color.current}`, "black"]}
      start={{ x: 0.2, y: 0 }} // Start at the top
      end={{ x: 0.2, y: 0.45 }} // End at the bottom
      className="h-full"
    >
      <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={28}
            color="white"
            marginLeft={15}
          />
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-6 h-[35%]">
          <Image
            source={{ uri: userProfile?.images[0]?.url }}
            className="w-[120px] h-[120px] rounded-full ml-8 mt-12"
          />
          <View className="flex flex-col gap-1 mt-4">
            <Text className="text-white text-2xl font-bold">
              {userProfile?.display_name}
            </Text>
            <View className="flex flex-row">
              <Text className="text-white text-base font-bold">
                {userProfile?.followers.total}
              </Text>
              <Text className="text-gray-300 text-base font-light">
                follower•
              </Text>
              <Text className="text-white text-base font-bold">
                {followedArtists.length}
              </Text>
              <Text className="text-gray-300 text-base font-light">
                following
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row w-[50%] mt-5 justify-center gap-3 items-center">
          <Text className="px-4 py-1 border-[0.3px] rounded-full border-white text-white ">
            Edit
          </Text>
          <Entypo name="dots-three-vertical" size={14} color="white" />
        </View>
        <View className="w-[full] flex flex-row justify-center items-center h-[20%]">
          <Text className="text-white font-bold text-xl">
            No recent activity
          </Text>
        </View>
        <StatusBar backgroundColor="black" style="light" />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UserProfileScreen;
