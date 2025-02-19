import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import UserLikedTracks from '../../components/libraryComponents/UserLikedTracks'
import { useRouter, useSearchParams } from 'expo-router/build/hooks'
import { router, useNavigation } from 'expo-router'
import api from '../../services/api'

const allLikedSongs = () => {
  const  [likedSongs,setLikedSongs]=useState([]);
  const navigation=useNavigation();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const likedTracksData = await api.fetchLikedTracks();

      // Handle liked Songs
      if (likedTracksData) {
        setLikedSongs(likedTracksData); // assuming likedTracksData.value has the structure { items: [tracks] }
      } else {
        Alert.alert("Error", "Failed to fetch liked Songs");
      }
    }
    fetchData();
  }, []);

  return (
    <LinearGradient
    colors={['#490ff0', 'black']}
    start={{ x: 0.2, y: -0.7 }} // Start at the top
    end={{ x: 0.2, y: 0.45 }} // End at the bottom
    className="h-full"
  >
    <SafeAreaView>
        <View className="flex flex-col pt-8 bg-[rgba(0,0,0,0.2)] mb-4 gap-5">
            <TouchableOpacity onPress={()=>navigation.goBack()}>
          <MaterialCommunityIcons name="keyboard-backspace" size={25} color="white" marginLeft={15} />
            </TouchableOpacity>
          <Text className="text-white font-bold text-3xl ml-5">Liked Songs</Text>
          <View className="flex flex-row w-[90%] justify-between">
          <Text className="text-gray-400 ml-5">{likedSongs.length} songs</Text>
          <AntDesign name="play" size={50} color="#1dd661"/>
          </View>
          <View className="ml-5">
          <UserLikedTracks likedTracks={likedSongs}/>
          </View>
        </View>
      <StatusBar backgroundColor="black" style="light" /> 
    </SafeAreaView>
  </LinearGradient>
  )
}

export default allLikedSongs