import { View, Text, Pressable, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserLikedTracks = ({likedTracks}) => { 
  const renderItem = ({ item }) => {
    return (
      <View className="items-center flex flex-row w-[100%] h-auto rounded-xl gap-2">
        <Image
          source={{ uri: item.track.album.images[0].url }}
          className="h-[55px] w-[55px] "
        />
        <View className="flex flex-col items-start">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-white font-semibold text-center mt-2"
          >
          {item.track.name}
        </Text>
        <Text className="text-white text-sm font-semibold text-center">{item.track.artists.map((artist)=>artist.name).join(", ")}</Text>
          </View>
      </View>
    );
  };

  return (
   
   <View>
      {likedTracks.length > 0 ? (
          <FlatList
            data={likedTracks.reverse()}
            className="mt-5"
            renderItem={renderItem}
            keyExtractor={(item) => item.track.id.toString()}
            contentContainerStyle={{ paddingBottom: 60 ,}}
            ItemSeparatorComponent={() => <View className="h-3"
          />}/>
        ) : (
          <Text className="text-white text-center mt-6">No recent tracks available</Text>
        )}
      <StatusBar backgroundColor="black" style="light" />
    </View>
  )
}

export default UserLikedTracks