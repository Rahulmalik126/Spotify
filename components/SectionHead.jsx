import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
const SectionHead = ({ title, path }) => {

  return (
    <View className="flex flex-row justify-between w-[91%] items-center mt-3">
      <Text className="text-white font-medium text-2xl mb-2">{title}</Text>
      <TouchableOpacity onPress={()=>router.push(path)}>
        <Text className="text-gray-400 font-medium text-sm mb-2">show all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHead;
