import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import PlaylistFollowButton from '../searchComponents/PlaylistFollowButton';
import Loader from '../commonComponents/Loader';

const UserFollowedPlaylists = ({userPlaylists,onRefresh, refreshing}) => {
  const navigation=useNavigation();

  return (
    <View className="h-auto">
      <FlatList
      className="mt-5"
      data={userPlaylists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigation.navigate("PlaylistScreen",{playlistId: item.id})} className="flex-row w-[90%] items-center gap-2">
          <Image
            className="w-[55px] h-[55px]"
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
            <PlaylistFollowButton playlistId={item?.id}/>
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={<View className="h-3"/>}
      ListEmptyComponent={
       <Loader/>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
    </View>
  )
}

export default UserFollowedPlaylists