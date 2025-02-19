import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Image, Text, View } from "react-native";

const ShowArtistAlbum = ({ artistId }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchArtistsAlbums = async () => {
      try {
        const result = await api.fetchArtistAlbums(artistId);

        if (result) {
          setAlbums(result?.items);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchArtistsAlbums();
  }, []);
  return (
    <>
  {albums?.map((item) => (
    <View key={item.id} className="mb-2 flex-row w-[95%] items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2">
      <Image
        className="w-[55px] h-[55px] rounded-md"
        source={{
          uri: item.images[0]?.url,
        }}
      />
      <View>
        <Text numberOfLines={1} ellipsizeMode="tail" className="text-white text-xl pl-2 font-bold w-[200px]">
          {item?.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-gray-400 text-sm pl-2 font-semibold w-auto"
        >
          {item?.artists.length > 0 && item?.artists?.map((artist) => artist.name).join(", ")}
        </Text>
      </View>
    </View>
  ))}
  {albums?.length === 0 && (
    <View className="flex items-center justify-center h-40">
      <Text className="text-white text-lg font-semibold">
        No Albums Found
      </Text>
    </View>
  )}
</>
  );
};

export default ShowArtistAlbum;
