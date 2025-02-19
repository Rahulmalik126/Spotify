import { Text, Pressable, Image } from "react-native";
import React from "react";
import { router, usePathname } from "expo-router";

const HorizontalListItem = ({ title, imageUrl, artists, itemId }) => {
  const pathname = usePathname();

  const handleNavigation = () => {
    if(title.toLowerCase().includes("artist")){
      if (pathname.includes("/screens/artistProfileScreen")) {
        // If already on the artistProfileScreen, set params
        router.setParams({ title, itemId });
      } else {
        // Otherwise, navigate with the params in the URL
        router.push(`/screens/artistProfileScreen?title=${title}&itemId=${itemId}`);
      }
    }
  };

  return (
    <Pressable onPress={handleNavigation} className="mx-1.5">
      <Image source={{ uri: imageUrl }} className="w-44 aspect-square rounded-lg" />
      <Text numberOfLines={2} ellipsizeMode="tail" className="text-neutral-300 text-sm w-40 mt-2">
        {artists}
      </Text>
    </Pressable>
  );
};

export default HorizontalListItem;
