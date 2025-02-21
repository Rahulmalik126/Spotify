import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const AlbumsCategory = ({ albums }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      className="mt-1"
      data={albums}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AlbumInfoScreen", { itemId: item.id })
          }
          className="mb-2 flex-row w-[80%] items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2"
        >
          <Image
            className="w-[55px] h-[55px] rounded-md"
            source={{
              uri: item.images[0]?.url,
            }}
          />
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-white text-xl pl-2 font-bold w-auto"
            >
              {item?.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-gray-400 text-sm pl-2 font-semibold w-[90%]"
            >
              {item?.artists.length > 0 &&
                item?.artists?.map((artist) => artist.name).join(", ")}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      TouchableOpacity
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

export default AlbumsCategory;
