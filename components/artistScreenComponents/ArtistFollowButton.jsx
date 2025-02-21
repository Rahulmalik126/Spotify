import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../../context/contextProvider";

const ArtistFollowButton = ({ artistId }) => {
  const { followedArtists } = useGlobalContext();
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const ArtistExists = followedArtists.some((item) => item.id === artistId);
    if (ArtistExists) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [followedArtists, artistId]);

  return (
    <View className="w-[78px]">
    <TouchableOpacity className=" border-[1px] border-gray-300 flex justify-center items-center rounded-lg ml-3 mt-2 pb-[1px]">
      <Text className="text-gray-300 ">
        {follow ? "following" : "follow"}
      </Text>
    </TouchableOpacity>
    </View>
  );
};

export default ArtistFollowButton;
