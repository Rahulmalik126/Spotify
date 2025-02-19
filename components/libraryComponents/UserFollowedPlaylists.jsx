import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

const UserFollowedPlaylists = ({userPlaylists}) => {
  return (
    <View className="h-auto">
      <FlatList
      className="mt-5"
      data={userPlaylists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="flex-row w-[90%] items-center gap-2">
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
          </View>
        </View>
      )}
      ItemSeparatorComponent={<View className="h-3"/>}
      ListEmptyComponent={
        <View className="flex items-center justify-center h-40">
          <Text className="text-white text-lg font-semibold">
            No Playlists Found
          </Text>
        </View>
      }
    />
    </View>
  )
}

export default UserFollowedPlaylists