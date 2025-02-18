import { Text, Pressable } from "react-native";
import React from "react";

const Category = ({ isActive, handlePress, category }) => {
  return (
    <Pressable
      onPress={() => handlePress(category)}
      className={`transition-all duration-300 rounded-full px-5 py-3 ${
        isActive ? "bg-green" : "bg-[#282828]"
      }`}
    >
      <Text className={isActive ? "text-black" : "text-white"}>{category}</Text>
    </Pressable>
  );
};

export default Category;
