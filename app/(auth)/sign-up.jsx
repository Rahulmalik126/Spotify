import { View, Text, Pressable, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SignUp = () => {
  return (
    <View
      className="flex-1 bg-black"
    >
      <SafeAreaView className="flex-1">
        <View className="h-20" />
        <View className="h-[25%] justify-center items-center">
        <Entypo
          className="text-center"
          name="spotify"
          size={80}
          color="white"
        />
        <Text className="text-white text-[35px] font-bold text-center mt-2 flex justify-center items-center">
          Sign up to start listening
        </Text>
        </View>

        <View className="h-20" />
        <Pressable className="bg-[#1DB954] h-14 mx-auto w-[85vw] rounded-full items-center justify-center my-2">
          <Text className="text-black font-bold text-lg">Log in with Spotify</Text>
        </Pressable>

        <Pressable className="bg-[#131624] h-14 mx-auto w-[85vw] w-75 rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text className="text-white font-medium text-center text-lg w-[80%]">Continue with Phone Number</Text>
        </Pressable>

        <Pressable className="bg-[#131624] py-3 mx-auto w-[85vw] rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <Image
            source={{ uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000' }}
            className="w-7 h-7"
          />
          <Text className="text-white font-medium text-center text-lg  w-[80%]">Continue with Google</Text>
        </Pressable>

        <Pressable className="bg-[#131624] py-3 mx-auto w-[85vw] rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
        <Image
            source={{ uri: 'https://img.icons8.com/?size=100&id=118497&format=png&color=000000' }}
            className="w-7 h-7"
          />
          <Text className="text-white font-medium text-center text-lg  w-[80%] ">Sign In with Facebook</Text>
        </Pressable>
        <View className="flex justify-center items-center gap-2 mt-5">
          <Text className="text-white text-lg font-normal">Already have an account?</Text>
          <TouchableOpacity onPress={()=>router.push("./log-in")}>
          <Text className="text-white text-xl font-bold">Log in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
