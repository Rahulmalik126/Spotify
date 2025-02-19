import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TracksCategory from "./TracksCategory";
import AlbumsCategory from "./AlbumsCategory";
import PlaylistsCategory from "./PlaylistsCategory";
import ArtistsCategory from "./ArtistsCategory";
import Category from "../commonComponents/Category";
import { searchCategories } from "../../constants/constants";

const SearchResult = ({ searchedData }) => {
  const [activeCategory, setActiveCategory] = useState("Tracks");

  const handleActiveCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      {Object.entries(searchedData).length > 0 ? (
        <View>
          <View className="w-full flex-row justify-between p-2">
            {searchCategories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <Category
                  key={category}
                  category={category}
                  isActive={isActive}
                  handlePress={handleActiveCategory}
                />
              );
            })}
          </View>
          {activeCategory === "Tracks" && (
            <TracksCategory tracks={searchedData?.tracks?.items} />
          )}
          {activeCategory === "Albums" && (
            <AlbumsCategory albums={searchedData?.albums?.items} />
          )}
          {activeCategory === "Playlists" && (
            <PlaylistsCategory playlists={searchedData?.playlists?.items} />
          )}
          {activeCategory === "Artists" && (
            <ArtistsCategory artists={searchedData?.artists?.items} />
          )}
        </View>
      ) : (
        <View className="bg-black h-full w-full flex flex-col mt-40 items-center gap-4">
          <MaterialCommunityIcons
            name="emoticon-confused-outline"
            size={40}
            color="white"
          />
          <Text className="text-white text-2xl font-semibold text-center">
            No results found,{"\n"} But the music world is vast {"\n"}Try again!
          </Text>
        </View>
      )}
    </>
  );
};

export default SearchResult;
