import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import TracksCategory from "./TracksCategory";
import AlbumsCategory from "./AlbumsCategory";
import PlaylistsCategory from "./PlaylistsCategory";
import ArtistsCategory from "./ArtistsCategory";
import Category from "../commonComponents/Category";
import { searchCategories } from "../../constants/constants";

const SearchResult = ({ searchedData , language}) => {
  const [activeCategory, setActiveCategory] = useState(language?.SearchBarPageResultCategories?.[0]);

  useEffect(()=>{
    setActiveCategory(language?.SearchBarPageResultCategories?.[0])
  },[language])

  const handleActiveCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      {Object.entries(searchedData).length > 0 ? (
        <View>
          <View className="w-full flex-row justify-between p-2">
            {language?.SearchBarPageResultCategories?.map((category) => {
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
          {activeCategory === language?.SearchBarPageResultCategories?.[0] && (
            <TracksCategory tracks={searchedData?.tracks?.items} />
          )}
          {activeCategory === language?.SearchBarPageResultCategories?.[1]  && (
            <AlbumsCategory albums={searchedData?.albums?.items} />
          )}
          {activeCategory === language?.SearchBarPageResultCategories?.[2]  && (
            <PlaylistsCategory playlists={searchedData?.playlists?.items} />
          )}
          {activeCategory === language?.SearchBarPageResultCategories?.[3]  && (
            <ArtistsCategory artists={searchedData?.artists?.items} />
          )}
        </View>
      ) : (
        <View className="bg-black h-full w-full flex flex-col mt-40 items-center gap-4">
          <Text className="text-white text-2xl font-semibold text-center w-[70%]">
            {language.SearchBarPageResultText}
          </Text>
        </View>
      )}
    </>
  );
};

export default SearchResult;
