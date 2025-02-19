import { Text, Pressable, Image, View } from "react-native";
import React from "react";

const TopTracks = ({ name, imageUrl ,artists}) => {
  return (
    <Pressable className="bg-[#282828] w-full flex flex-row gap-2 items-center rounded-lg p-1">
      <Image
        source={{ uri: imageUrl }}
        className="h-14 rounded-lg aspect-square"
      />
      <View className="flex flex-col">
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        className="text-white font-semibold text-wrap w-[96px]"
        >
        {name}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" className="text-white text-sm w-[100px]">{artists.map((artist)=>artist.name).join(", ")}</Text>
        </View>
    </Pressable>
  );
};

export default TopTracks;
