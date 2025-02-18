import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import Tracks from "./Tracks";
import Albums from "./Albums";
import Playlists from "./Playlists";
import Artists from "./Artists";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SearchResult = ({ searchedData }) => {
  const [activeCategory, setActiveCategory] = useState("Tracks");
  const categories = ["Tracks", "Artists", "Albums", "Playlists"];

  return (
    <>
      {Object.entries(searchedData).length > 0 ? (
        <View>
          <View className="w-full flex-row justify-between p-2">
            {categories.map((category) => {
              return (
                <Pressable
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  className={`${
                    activeCategory == category ? "bg-[#309635]" : "bg-[#282828]"
                  } p-2 rounded-full transition-all duration-200`}
                >
                  <Text
                    className={`${
                      activeCategory == category ? "text-black" : "text-white"
                    } text-base pl-3 pr-3`}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {activeCategory === "Tracks" && (
            <Tracks tracks={searchedData?.tracks?.items} />
          )}
          {activeCategory === "Albums" && (
            <Albums albums={searchedData?.albums?.items} />
          )}
          {activeCategory === "Playlists" && (
            <Playlists playlists={searchedData?.playlists?.items} />
          )}
          {activeCategory === "Artists" && (
            <Artists artists={searchedData?.artists?.items} />
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
