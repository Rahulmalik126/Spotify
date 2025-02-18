import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TracksCategory from "./TracksCategory";
import AlbumsCategory from "./AlbumsCategory";
import PlaylistsCategory from "./PlaylistsCategory";
import ArtistsCategory from "./ArtistsCategory";
import Category from "../commonComponents/Category";

const SearchResult = ({ searchedData }) => {
  const [activeCategory, setActiveCategory] = useState("Tracks");
  const categories = ["Tracks", "Artists", "Albums", "Playlists"];

  const handleActiveCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      {Object.entries(searchedData).length > 0 ? (
        <View>
          <View className="w-full flex-row justify-between p-2">
            {categories.map((category) => {
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
          <ActivityIndicator size="large" color="green" />
        </View>
      )}
    </>
  );
};

export default SearchResult;
