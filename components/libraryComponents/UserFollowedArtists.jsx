import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Loader from "../commonComponents/Loader";

const UserFollowedArtists = ({ followedArtists ,onRefresh,refreshing}) => {
  const navigation = useNavigation();

  return (
    <View className="flex ">
      <FlatList
        className="mt-5"
        data={followedArtists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item?.id}
            onPress={() =>
              navigation.navigate("ArtistProfileScreen", { itemId: item?.id })
            }
            className=" flex flex-row w-[100%] items-center gap-2 rounded-md"
          >
            <Image
              className="w-[55px] h-[55px] rounded-full"
              source={{
                uri:
                  item.images[0]?.url ||
                  `https://dummyimage.com/600x400/b839b8/000000.png&text=${item.name[0]}`,
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
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 450 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListEmptyComponent={<Loader />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default UserFollowedArtists;
