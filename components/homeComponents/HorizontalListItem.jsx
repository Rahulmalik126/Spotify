import { Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HorizontalListItem = ({ title, imageUrl, artists, itemId }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (title.toLowerCase().includes("artist")) {
      navigation.navigate("ArtistProfileScreen", {
        itemId: itemId,
      });
    }
    if (title.toLowerCase().includes("releases")) {
      navigation.navigate("AlbumInfoScreen", {
        itemId: itemId,
      });
    }
  };

  return (
    <Pressable onPress={handleNavigation} className="mx-1.5">
      <Image
        source={{ uri: imageUrl }}
        className="w-44 aspect-square rounded-lg"
      />
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        className="text-neutral-300 text-sm w-40 mt-2"
      >
        {artists}
      </Text>
    </Pressable>
  );
};

export default HorizontalListItem;
