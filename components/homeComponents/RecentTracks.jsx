import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RecentTracks = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View className="flex flex-row flex-wrap w-[95%] justify-center items-center gap-x-2 -ml-1.5">
      {data.length > 0 ? (
        data.map(({ track }) => (
          <View key={track.id} className="w-[47.5%] mb-2">
            <Pressable
              onPress={() =>
                navigation.navigate("SongsInfoScreen", { trackId: track.id })
              }
              className="bg-[#282828] flex flex-row gap-2 items-center rounded-lg p-1"
            >
              <Image
                source={{ uri: track?.album?.images[0].url }}
                className="h-14 rounded-lg aspect-square"
              />
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                className="text-white font-semibold text-wrap w-[95px]"
              >
                {track?.name}
              </Text>
            </Pressable>
          </View>
        ))
      ) : (
        <Text className="text-white text-center mt-6">
          No recent tracks available.
        </Text>
      )}
    </View>
  );
};

export default RecentTracks;
