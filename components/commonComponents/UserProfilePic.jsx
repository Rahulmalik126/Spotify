import { Image } from "react-native";
import React from "react";

const UserProfilePic = ({ userProfile }) => {
  return (
    <Image
      source={{ uri: userProfile?.images[0]?.url }}
      className="w-[45px] h-[45px] rounded-full border-2 border-white"
    />
  );
};

export default UserProfilePic;
