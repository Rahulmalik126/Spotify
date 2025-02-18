import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import SearchResult from '../../components/SearchResult'

const SearchBarScreen = () => {
  const [query,setQuery]=useState("");
  return (
    <View className="bg-black h-[100%]">
      <SafeAreaView>
        <View className="flex flex-row items-center gap-3 py-3">
          <TouchableOpacity onPress={()=>router.back()} >
       <MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" marginLeft={15} />
          </TouchableOpacity>
       <TextInput value={query} onChangeText={setQuery} className="text-white font-semibold text-[15px] flex-1" placeholder='What do you want to listen to?' placeholderTextColor={'#adacac'}/>
        </View>
        {query?<SearchResult/>:(<View className="flex flex-col w-[100%] h-[80%] justify-center items-center text-center gap-1">
          <Text className="text-white font-bold text-2xl">Play what you love</Text>
          <Text className="text-[#adacac] font-bold text-sm">Search for artists, songs, podcasts, and more.</Text>
        </View>)}
      </SafeAreaView>
      <StatusBar backgroundColor="black" style="light" />
    </View>
  )
}

export default SearchBarScreen