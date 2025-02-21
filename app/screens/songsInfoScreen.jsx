import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState, useRef} from 'react';
import { ProgressBar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { getRandomColor } from '../../utils/helper';
import { useGlobalContext } from '../../context/contextProvider';
import api from '../../services/api';
import Loader from '../../components/commonComponents/Loader';

const SongsInfoScreen = () => {
  const [track, setTrack] = useState(null);
  const [gradientColor, setGradientColor]=useState("");
  const [toggle,setToggle]=useState(true);
  const [like,setLike]=useState("");

  const { likedSongs } = useGlobalContext();

  const route = useRoute();
  const { trackId } = route.params;

  const navigation=useNavigation();

  const handleToggle=()=>{
    setToggle(!toggle);
  }
  
  useEffect(() => {
    const trackExists = likedSongs.some(item => item.track.id === trackId);
    if (trackExists) {
      setLike("green");
    } else {
      setLike("white");
    }
  }, [likedSongs, trackId]);

  const handleLike= async(trackId)=>{
    if(like==="white"){
      try{
        await api.likeTrack(trackId);
        setLike("green");
        Alert.alert("Song Added to Liked Songs");
      }catch(err){
        Alert.alert("Error in Liking Song:",err.message);
      }
    }else{
      try{
        await api.deleteTrack(trackId);
        setLike("white");
        Alert.alert("Removed from Liked Songs");
      }catch(err){
        Alert.alert("Error in removing the Song:",err.message);
      }

    }
  }

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const trackData = await api.fetchTrackInfo(trackId);
        setTrack(trackData);
      } catch (error) {
        Alert.alert("Error fetching track info:", error);
      }
    };
    fetchTrack();
    setGradientColor(getRandomColor());
  }, []);

  if (!track) return <Text className="text-white text-center mt-10"><Loader/></Text>;

  return (
    <LinearGradient
      colors={[`${gradientColor}`, 'black']}
      start={{ x: 0.2, y: -0.7 }} // Start at the top
      end={{ x: 0.2, y: 0.85 }} // End at the bottom
      className="flex-1 justify-end items-center"
    >

    <View className="flex w-[85%] h-full">
    <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4">
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color="white"
            />
        </TouchableOpacity>
      <View className="items-center mt-18">
        <Image 
          source={{ uri: track?.album?.images?.[0]?.url }} 
          className="w-[100%] h-72 rounded-md mt-10" 
          resizeMode="cover"
        />
      </View>

      <View className="flex flex-row justify-between mt-10">
      <View className="mt-6">
        <Text numberOfLines={1} ellipsizeMode="tail"  className="text-white text-xl font-bold w-[170px]">{track?.name}</Text>
        <View className="flex flex-row items-center gap-1">
        <Ionicons name="sparkles-sharp" size={10} color="#1dd661" className="mt-1" />
        <Text numberOfLines={1} ellipsizeMode="tail" className="text-gray-400 text-sm mt-1 w-[180px]">{track?.artists?.map((artist)=>artist.name).join(", ")}</Text>
        </View>
        <View className="flex flex-row items-center gap-1 mt-2">
        <MaterialCommunityIcons name="album" size={20} color="#1dd661" />
        <Text className="text-gray-400 text-sm">{track?.album?.name}</Text>
        </View>
      </View>
      <View className="flex flex-row gap-6 items-center">
      <Ionicons name="add-circle-outline" size={35} color="white" />
      <TouchableOpacity onPress={()=>handleLike(track?.id)}>
      <AntDesign name="heart" size={24} color={`${like}`} />
      </TouchableOpacity>
      </View>
      </View>

      <View className="mt-8">
        <ProgressBar progress={Math.random()} color="#1dd661" className="h-1 rounded-full" />
        <View className="flex-row justify-between mt-1">
          <Text className="text-gray-400 text-xs">3:06</Text>
          <Text className="text-gray-400 text-xs">3:44</Text>
        </View>
      </View>

      <View className="flex flex-row w-[100%] items-center justify-center gap-8">
      <MaterialCommunityIcons name="skip-previous" size={40} color="white" />
      <TouchableOpacity onPress={handleToggle}>
        {toggle?
      <Ionicons name="play-circle-sharp" size={75} color="white" />:
      <Ionicons name="pause-circle" size={75} color="white" />
        }
      </TouchableOpacity>
      <MaterialIcons name="skip-next" size={40} color="white" />
      </View>
      <StatusBar backgroundColor="black" style="light" />
    </View>
    </LinearGradient>
  );
};

export default SongsInfoScreen;
