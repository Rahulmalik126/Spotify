import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import api from "../../services/api"; 

const LogIn = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { request, response, promptAsync } = api.useSpotifyAuth(); // Use the custom API service

  useEffect(() => {
    const saveToken = async () => {
      if (response?.type === "success") {
        const { access_token, expires_in } = response.params;
        if (access_token) {
          const expirationDate = Date.now() + expires_in * 1000;
          await AsyncStorage.setItem("accessToken", access_token);
          await AsyncStorage.setItem(
            "expirationDate",
            expirationDate.toString()
          );

          router.push("../(tabs)/home");
        }
      } else if (response?.type === "error") {
        Alert.alert("Error", response.error);
      }
    };

    saveToken();
  }, [response]);

  const handleLoginWithSpotify = async () => {
    if (!request || isAuthenticating) return;
    try {
      setIsAuthenticating(true);
      await promptAsync();
      setIsAuthenticating(false);
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View className="flex-1 bg-black">
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
            Log in to Spotify
          </Text>
        </View>

        <View className="h-20" />
        <Pressable
          className="bg-[#1DB954] h-14 mx-auto w-[85vw] rounded-full items-center justify-center my-2"
          onPress={handleLoginWithSpotify}
        >
          <Text className="text-black font-bold text-lg">
            Log in with Spotify
          </Text>
        </Pressable>

        <Pressable className="bg-[#131624] h-14 mx-auto w-[85vw] w-75 rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text className="text-white font-medium text-center text-lg w-[80%]">
            Continue with Phone Number
          </Text>
        </Pressable>

        <Pressable className="bg-[#131624] py-3 mx-auto w-[85vw] rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
            }}
            className="w-7 h-7"
          />
          <Text className="text-white font-medium text-center text-lg w-[80%]">
            Continue with Google
          </Text>
        </Pressable>

        <Pressable className="bg-[#131624] py-3 mx-auto w-[85vw] rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=118497&format=png&color=000000",
            }}
            className="w-7 h-7"
          />
          <Text className="text-white font-medium text-center text-lg w-[80%]">
            Sign In with Facebook
          </Text>
        </Pressable>

        <View className="flex justify-center items-center gap-2 mt-5">
          <Text className="text-white text-lg font-normal">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("./sign-up")}>
            <Text className="text-white text-xl font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
        <StatusBar backgroundColor="black" style="light" />
      </SafeAreaView>
    </View>
  );
};

export default LogIn;
