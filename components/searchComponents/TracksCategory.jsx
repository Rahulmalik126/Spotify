import { View, Text, FlatList, Image } from "react-native";
import React from "react";

const TracksCategory = ({ tracks }) => {
  return (
    <FlatList
      className="mt-5"
      data={tracks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="mb-2 flex-row items-center gap-2 mx-2 my-2 w-[80%] rounded-md shadow-md p-2">
          <Image
            className="w-[50px] h-[50px] rounded-md"
            source={{ uri: item.album.images[0]?.url }}
          />
          <View>
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-white font-bold w-auto text-xl">
              {item?.name}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-gray-400 text-sm font-semibold w-[90%]">
              {item.album.artists.map((artist)=>artist.name).join(", ")}
            </Text>
          </View>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 250 }} 
      ListEmptyComponent={
        <View className="flex items-center justify-center h-40">
          <Text className="text-white text-lg font-semibold">
            No Tracks Found
          </Text>
        </View>
      }
      />
  );
};

export default TracksCategory;
