import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguageContext } from "../index";

const Page=()=> {

  const { language } = useLanguageContext();
  
  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      if (accessToken && expirationDate) {
        const currentTime = Date.now();
        if (currentTime < parseInt(expirationDate)) {
          router.push("./(tabs)/home");
        } else {
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("expirationDate");
        }
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <LinearGradient
      colors={["gray", "black"]}
      start={{ x: 0.2, y: -0.7 }} // Start at the top
      end={{ x: 0.2, y: 0.45 }} // End at the bottom
      className="flex-1 justify-end items-center h-[60%]"
    >
      <Entypo name="spotify" size={85} color="white" />
      <Text className="text-white text-center font-bold mt-3 text-4xl py-1">
        {language.EntryPageQuoteLine1}{"\n"}{language.EntryPageQuoteLine2}
      </Text>
      <View className="flex flex-col justify-end items-end h-[40%] gap-3 mb-10">
        <TouchableOpacity onPress={() => router.push("./sign-up")}>
          <View className="bg-green w-[85vw] rounded-full h-14 justify-center items-center">
            <Text className="text-black text-center font-bold text-xl">
              {language.EntryPageText2}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("./log-in")}>
          <View className="bg-black w-[85vw] rounded-full h-14 border-[0.5px] border-white justify-center items-center">
            <Text className="text-white text-center font-bold text-xl ">
            {language.EntryPageText3}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </LinearGradient>
  );
}

export default Page;