import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import PlaylistFollowButton from "./PlaylistFollowButton";

const PlaylistsCategory = ({ playlists }) => {
  const navigation=useNavigation();
  
  return (
    <FlatList
      className="mt-1"
      data={playlists.filter((playlist) => playlist)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (

        <TouchableOpacity onPress={()=>navigation.navigate("PlaylistScreen",{playlistId: item.id})} className="mb-2 flex-row w-[90%] items-center gap-2 mx-2 my-2 rounded-md p-2">
          <Image
            className="w-[55px] h-[55px] rounded-md"
            source={{
              uri: item.images[0]?.url,
            }}
          />

          <View
            className="flex-row justify-between items-center w-[350px]"
          >
            <View className="flex flex-col mr-5">
              <Text numberOfLines={1} ellipsizeMode="tail" className="text-white text-xl pl-2 font-bold w-[180px]">
                {item?.name}
              </Text>
              <Text
                className="text-gray-400 text-sm pl-2 font-semibold w-[106px]"
              >
                Playlist
              </Text>
            </View>
        <PlaylistFollowButton playlistId={item.id}/>
                  </View>
        </TouchableOpacity >
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

export default PlaylistsCategory;
