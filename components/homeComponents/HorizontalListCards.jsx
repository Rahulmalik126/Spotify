import { View, Text, FlatList } from "react-native";
import React from "react";

import HorizontalListItem from "./HorizontalListItem";
import Loader from "../commonComponents/Loader";

const HorizontalListCard = ({ title, data ,section}) => {
  return (
    <View className="-ml-1">
      <Text className="text-white text-3xl font-bold mb-2 mt-4 ml-1">
        {title}
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <HorizontalListItem
            title={title}
            imageUrl={item.imageUrl}
            artists={item.artists}
            itemId={item.id}
            section={section}
          />
        )}
        ListEmptyComponent={<Loader />}
      />
    </View>
  );
};

export default HorizontalListCard;
