import { View, ActivityIndicator } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View className="h-40 w-[100vw] flex-row justify-center items-center">
      <ActivityIndicator size="large" color="green" />
    </View>
  );
};

export default Loader;
