import { View, Text, Image } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/contextProvider";

const UserProfilePic = ({ userProfile }) => {

  // Check if userProfile is available before rendering the image
  if (!userProfile || !userProfile.images || userProfile.images.length === 0) {
    return <Text style={{ color: 'white' }}>No Profile Picture</Text>;
  }

  return (
    <Image
      source={{ uri: userProfile?.images[0]?.url }}
      className="w-[45px] h-[45px] rounded-full border-2 border-white"
    />
  );
};

export default UserProfilePic;
