import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";

const Albums = ({ albums }) => {
  console.log("Printing the albums::==>>", albums);

  return (
    <FlatList
      className="mt-5"
      data={albums}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="mb-2 flex-row w-[80%] items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2">
          <Image
            className="w-[55px] h-[55px] rounded-md"
            source={{
              uri: item.images[0]?.url,
            }}
          />
          <View>
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-white text-xl pl-2 font-bold w-auto">
              {item?.name}
            </Text>
            <Text
              numberOfLines={1} ellipsizeMode="tail" className="text-gray-400 text-sm pl-2 font-semibold w-[90%]"
            >
              {item?.artists.length > 0 &&
                (item?.artists?.map((artist)=>artist.name).join(", "))}
            </Text>
          </View>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 250 }} // Prevent last item from getting cut off
      ListEmptyComponent={
        <View className="flex items-center justify-center h-40">
          <Text className="text-white text-lg font-semibold">
            No Albums Found
          </Text>
        </View>
      }
    />
  );
};

export default Albums;
