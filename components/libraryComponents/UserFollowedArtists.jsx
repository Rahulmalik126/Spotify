import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

const UserFollowedArtists = ({followedArtists}) => {
    
  return (
    <View className="flex ">
         <FlatList
      className="mt-5"
      data={followedArtists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className=" flex flex-row w-[100%] items-center gap-2 rounded-md">
          <Image
            className="w-[55px] h-[55px] rounded-full"
            source={{
              uri: item.images[0]?.url
              || `https://dummyimage.com/600x400/b839b8/000000.png&text=${item.name[0]}`,
            }}
            />
          <View>
            <Text numberOfLines={1} ellipsizeMode="tail" className="text-white text-xl pl-2 font-bold w-auto">
              {item?.name}
            </Text>
          </View>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 450 }}
      ItemSeparatorComponent={()=><View className="h-3"/>}
      ListEmptyComponent={
        <View className="flex items-center justify-center h-40">
          <Text className="text-white text-lg font-semibold">
            No Artists Found
          </Text>
        </View>
      }
    />
      </View>
  )
}

export default UserFollowedArtists