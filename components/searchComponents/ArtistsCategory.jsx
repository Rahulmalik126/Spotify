import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ArtistsCategory = ({ artists }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      className="mt-1"
      data={artists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ArtistProfileScreen", { itemId: item.id })
          }
          className="mb-2 flex-row w-[100%] items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2"
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
      contentContainerStyle={{ paddingBottom: 250 }} // Prevent last item from getting cut off
      ListEmptyComponent={
        <View className="flex items-center justify-center h-40">
          <Text className="text-white text-lg font-semibold">
            No Artists Found
          </Text>
        </View>
      }
    />
  );
};

export default ArtistsCategory;
