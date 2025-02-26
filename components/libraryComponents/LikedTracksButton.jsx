import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LikedTracksButton = ({ likedTracks, language }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("AllLikedSongs")}
      className="flex w-[90%] h-[55px] flex-row items-center"
    >
      <LinearGradient
        colors={["#490ff0", "#bbe4c6"]}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        className="flex justify-center items-center w-[55px] mt-4 h-[55px]"
      >
        <AntDesign name="heart" size={24} color="white" />
      </LinearGradient>
      <View className="flex flex-col justify-center ml-2">
        <Text className="text-white text-xl font-normal">{language?.LibraryPageBtn1Head}</Text>
        <View className="flex flex-row gap-1">
          <MaterialIcons
            name="push-pin"
            size={14}
            color="#1fd65d"
            style={{ transform: "rotate(30deg)", marginTop: 3 }}
          />
          <Text className="text-gray-400 text-sm">
          {language?.LibraryPageBtn1SubHead1} • {likedTracks.length} {language?.LibraryPageBtn1SubHead2}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LikedTracksButton;
