import { View, Text, FlatList } from "react-native";
import React from "react";
import HorizontalListItem from "./HorizontalListItem";

const HorizontalListCard = ({ title, data }) => {
  return (
    <View className="-ml-1">
      <Text className="text-white text-3xl font-bold mb-2 mt-4 ml-1">{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <HorizontalListItem imageUrl={item.imageUrl} artists={item.artists} />
        )}
        />
    </View>
  );
};

export default HorizontalListCard;
