import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLanguageContext } from "../../index";

const SignUp = () => {
  const {language} =useLanguageContext();
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
            {language.SignUpPageHead}
          </Text>
        </View>

        <View className="h-20" />
        <Pressable className="bg-[#1DB954] h-14 mx-auto w-[85vw] rounded-full items-center justify-center my-2">
          <Text className="text-black font-bold text-lg">
            {language.SignUpPageOption1}
          </Text>
        </Pressable>

        <Pressable className="bg-[#131624] h-14 mx-auto w-[85vw] w-75 rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text className="text-white font-medium text-center text-lg w-[80%]">
          {language.SignUpPageOption2}
          </Text>
        </Pressable>

        <Pressable className="bg-[#131624] py-3 mx-auto w-[85vw] rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
            }}
            className="w-7 h-7"
          />
          <Text className="text-white font-medium text-center text-lg  w-[80%]">
          {language.SignUpPageOption3}
          </Text>
        </Pressable>

        <Pressable className="bg-[#131624] py-3 mx-auto w-[85vw] rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=118497&format=png&color=000000",
            }}
            className="w-7 h-7"
          />
          <Text className="text-white font-medium text-center text-lg  w-[80%] ">
          {language.SignUpPageOption4}
          </Text>
        </Pressable>
        <View className="flex justify-center items-center gap-2 mt-5">
          <Text className="text-white text-lg font-normal">
          {language.SignUpPageText1}
          </Text>
          <TouchableOpacity onPress={() => router.push("./log-in")}>
            <Text className="text-white text-xl font-bold">{language.SignUpPageNavigateText}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar backgroundColor="black" style="light" />
    </View>
  );
};

export default SignUp;
