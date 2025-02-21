import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

import UserProfilePic from "./UserProfilePic";
import { useGlobalContext } from "../../context/contextProvider";

const DrawerContent = () => {
  const { userProfile } = useGlobalContext();
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-black">
      <TouchableOpacity
        onPress={() => navigation.navigate("UserProfileScreen")}
        className="flex flex-row mt-3 ml-3 pb-3 items-center border-b-[1px] border-gray-500"
      >
        <UserProfilePic userProfile={userProfile} />
        <View className="ml-3 flex flex-col items-start justify-start">
          <Text className="text-white text-lg font-bold">
            {userProfile?.display_name}
          </Text>
          <Text className="text-gray-500 text-sm font-medium">
            View Profile
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="flex flex-row mt-4">
        <MaterialIcons
          name="add-circle-outline"
          size={24}
          color="white"
          className="p-5 pr-2"
        />
        <Text className="p-5 text-white text-lg pl-0 font-bold">
          Add Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex flex-row">
        <MaterialIcons
          name="electric-bolt"
          size={24}
          color="white"
          className="p-5 pr-2"
        />
        <Text className="p-5 text-white text-lg pl-0 font-bold">
          What's New
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex flex-row"
        onPress={() => navigation.navigate("AllRecentTracks")}
      >
        <FontAwesome6
          name="clock-rotate-left"
          size={24}
          color="white"
          className="p-5 pr-2"
        />
        <Text className="p-5 text-white text-lg pl-0 font-bold">Recents</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex flex-row">
        <Ionicons
          name="settings-outline"
          size={24}
          color="white"
          className="p-5 pr-2"
        />
        <Text className="p-5 text-white text-lg pl-0 font-bold">
          Settings and Privacy
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;
