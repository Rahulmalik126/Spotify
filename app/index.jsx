import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Page() {
  return (
    <LinearGradient
      colors={['gray', 'black']}
      start={{ x: 0.2, y: -0.7 }} // Start at the top
      end={{ x: 0.2, y: 0.45 }} // End at the bottom
      className="flex-1 justify-end items-center h-[60%]"
    >
      <Entypo name="spotify" size={85} color="white" />
      <Text className="text-white text-center font-bold mt-3 text-4xl">
        Millions of songs.{'\n'}Free on Spotify.
      </Text>
      <View className="flex flex-col justify-end items-end h-[40%] gap-3 mb-10">
        <TouchableOpacity onPress={()=>router.push("./sign-up")}>
          <View className="bg-green w-[85vw] rounded-full h-14 justify-center items-center">
            <Text className="text-black text-center font-bold text-xl">Sign up free</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>router.push("./log-in")}>
          <View className="bg-black w-[85vw] rounded-full h-14 border-[0.5px] border-white justify-center items-center">
            <Text className="text-white text-center font-bold text-xl ">Log in</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor="#161622" style="light"/>
    </LinearGradient>
  );
}
