import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Playlists = ({ playlists }) => {
  return (
    <FlatList
      className="mt-5"
      data={playlists.filter((playlist) => playlist)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="mb-2 flex-row w-[90%] items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2">
          <Image
            className="w-[55px] h-[55px] rounded-md"
            source={{
              uri: item.images[0]?.url,
            }}
          />
          <View
            className="flex-row justify-between items-center w-[100%]"
          >
            <View className="flex flex-col">
              <Text numberOfLines={1} ellipsizeMode="tail" className="text-white text-xl pl-2 font-bold w-[180px]">
                {item?.name}
              </Text>
              <Text
                className="text-gray-400 text-sm pl-2 font-semibold w-[106px]"
              >
                Playlist
              </Text>
            </View>
            <MaterialIcons
              className="align-"
              name="playlist-add"
              size={24}
              color="white"
              width="30%"
            />
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

export default Playlists;
