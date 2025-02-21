import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Loader from '../commonComponents/Loader';

const UserLikedTracks = ({likedTracks,onRefresh,refreshing}) => { 
  const navigation=useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=> navigation.navigate("SongsInfoScreen",{trackId: item?.track?.id})}>
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
          </TouchableOpacity>
    );
  };

  return (
   
   <View>
          <FlatList
            data={likedTracks.reverse()}
            className="mt-5"
            renderItem={renderItem}
            keyExtractor={(item) => item.track.id.toString()}
            contentContainerStyle={{ paddingBottom: 60 ,}}
            ItemSeparatorComponent={() => <View className="h-3"/>}
            ListEmptyComponent={<Loader/>}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            />
      <StatusBar backgroundColor="black" style="light" />
    </View>
  )
}

export default UserLikedTracks