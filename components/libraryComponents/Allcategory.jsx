import React from "react";
import { FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";  // Importing the useRouter hook
import { StatusBar } from "expo-status-bar";
import UserProfilePic from "../../components/commonComponents/UserProfilePic";
import LikedTracksButton from "../../components/libraryComponents/LikedTracksButton";
import { SafeAreaView } from "react-native-safe-area-context";

const Allcategory = ({ likedTracks, userPlaylists, followedArtists }) => {
  const router = useRouter(); // Use router hook to handle navigation

  const combinedData = [
    { type: "likedTracks", data: likedTracks },
    { type: "playlists", data: userPlaylists },
    { type: "artists", data: followedArtists },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "likedTracks":
        return (
          <View className="flex flex-col gap-3">
            <View className="mb-2">
              <LikedTracksButton likedTracks={likedTracks} />
            </View>
            {likedTracks.length > 0 ? (
              likedTracks.map((track, index) => (
                <View key={index} className="flex flex-row items-center gap-2">
                  <Image source={{ uri: track.track.album.images[0].url }} className="h-[55px] w-[55px]" />
                  <View className="flex flex-col items-start">
                    <Text className="text-white font-semibold">{track.track.name}</Text>
                    <Text className="text-white text-sm">{track.track.artists.map((artist) => artist.name).join(", ")}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-white text-center mt-6">No recent tracks available</Text>
            )}
          </View>
        );
      case "playlists":
        return (
          <View className="flex flex-col gap-3">
            {userPlaylists.map((playlist, index) => (
              <View key={index} className="flex-row items-center gap-2">
                <Image source={{ uri: playlist.images[0]?.url }} className="w-[55px] h-[55px]" />
                <View className="flex flex-col">
                  <Text className="text-white text-xl">{playlist.name}</Text>
                  <Text className="text-gray-400 text-sm">Playlist</Text>
                </View>
              </View>
            ))}
          </View>
        );
      case "artists":
        return (
          <View className="flex flex-col gap-3">
            {followedArtists.map((artist, index) => (
              <View key={index} className="flex-row items-center gap-2">
                <Image
                  source={{
                    uri: artist.images[0]?.url || `https://dummyimage.com/600x400/b839b8/000000.png&text=${artist.name[0]}`,
                  }}
                  className="w-[55px] h-[55px] rounded-full"
                />
                <Text className="text-white text-xl">{artist.name}</Text>
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="bg-black flex flex-col h-full w-full mt-4">
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={<View className="h-3" />}
        contentContainerStyle={{paddingBottom:200}}
      />
    </View>
  );
};

export default Allcategory;
