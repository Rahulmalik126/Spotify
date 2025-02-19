import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

const TopSongs = ({ artistId }) => {
  const [topSongs, setTopSongs] = useState([]);
  const navigation = useNavigation();
 
  useEffect(() => {
    const fetchArtistsTopSongs = async () => {
      try {
        const result = await api.fetchArtistTopSongs(artistId);
        
        if (result) {
          setTopSongs(result.tracks);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchArtistsTopSongs();
  }, []);
  return (
    <>
     {topSongs?.map((item, index) => (
    <Pressable key={item.id} className="flex-row w-[90%] items-center gap-2 mx-2 rounded-md shadow-md p-2">
      <View>
        <Text className="text-white text-md font-bold mr-2">{index + 1}</Text>
      </View>
      <Image
        className="w-[55px] h-[55px] rounded-md"
        source={{ uri: item.album.images[0]?.url }}
      />
      <View style={{ width: "75%" }} className="flex-row justify-between">
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-white text-[18px] font-bold w-[140px]"
          >
            {item?.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-white text-xs font-semibold w-[140px]"
          >
            {item.album.artists.map((artist) => artist.name).join(", ")}
          </Text>
        </View>
        <Entypo name="dots-three-vertical" size={22} color="white" />
      </View>
    </Pressable>
  ))}
  {topSongs?.length === 0 && (
    <View className="flex items-center justify-center h-40">
      <Text className="text-white text-lg font-semibold">No Tracks Found</Text>
    </View>
  )}
    </>
  );
};

export default TopSongs;
