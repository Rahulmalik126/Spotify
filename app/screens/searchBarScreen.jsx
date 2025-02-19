import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import SearchResult from '../../components/searchComponents/SearchResult'
import api from '../../services/api'

const SearchBarScreen = () => {
  const [query,setQuery]=useState("");
  const [searchedData,setSearchedData]=useState([]);

  const handleSearch = async () => {
    try {
      const result = await api.fetchSearchResult(query);
      if (result) {
        setSearchedData(result);     
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View className="bg-black h-[100%]">
      <SafeAreaView>
        <View className="flex flex-row items-center gap-3 py-3">
          <TouchableOpacity onPress={()=>router.back()} >
       <MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" marginLeft={15} />
          </TouchableOpacity>
       <TextInput autoFocus value={query} onChangeText={setQuery} onBlur={()=>handleSearch()} className="text-white font-semibold text-[15px] flex-1" placeholder='What do you want to listen to?' placeholderTextColor={'#adacac'}/>
        </View>
        {query?<SearchResult searchedData={searchedData}/>:(<View className="flex flex-col w-[100%] h-[80%] justify-center items-center text-center gap-1">
          <Text className="text-white font-bold text-2xl">Play what you love</Text>
          <Text className="text-[#adacac] font-bold text-sm">Search for artists, tracks, albums, and more.</Text>
        </View>)}
      </SafeAreaView>
      <StatusBar backgroundColor="black" style="light" />
    </View>
  )
}

export default SearchBarScreen