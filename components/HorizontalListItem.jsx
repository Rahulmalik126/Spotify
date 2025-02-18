import { Text, Pressable, Image } from "react-native";
import React from "react";

const HorizontalListItem = ({ imageUrl, artists }) => {
  return (
    <Pressable className="mx-1.5">
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
