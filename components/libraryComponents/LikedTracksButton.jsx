import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { router, useNavigation, useRouter } from 'expo-router';

const LikedTracksButton = ({ likedTracks }) => {
  const router = useRouter();
  
  const handleNavigateToLikedTracks = () => {
    router.push({
      pathname: '/screens/allLikedSongs'  // Pass the likedTracks as a query
    })}
  return (
    <TouchableOpacity
      onPress={handleNavigateToLikedTracks} // Use navigate correctly
      className="flex w-[90%] h-[55px] flex-row items-center"
    >
      <LinearGradient
        colors={["#490ff0", "#bbe4c6"]}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        className="flex justify-center items-center w-[55px] mt-4 h-[55px]"
      >
        <AntDesign name="heart" size={24} color="white" />
      </LinearGradient>
      <View className="flex flex-col justify-center ml-2">
        <Text className="text-white text-xl font-normal">Liked Songs</Text>
        <View className="flex flex-row gap-1">
          <MaterialIcons
            name="push-pin"
            size={14}
            color="#1fd65d"
            style={{ transform: "rotate(30deg)", marginTop: 3 }}
          />
          <Text className="text-gray-400 text-sm">
            Playlists • {likedTracks.length} Songs
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LikedTracksButton;
