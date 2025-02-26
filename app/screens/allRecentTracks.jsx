import {
  View,
  Text,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import { filterNewRecentTracks } from "../../utils/helper";
import { useGlobalContext } from "../../context/contextProvider";

const AllRecentTracks = () => {
  const navigation = useNavigation();
  const [recentTracks, setRecentTracks] = useState([]);
  const limit = 50;

  const {language}=useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentTracksAll = await api.fetchRecentTracks(limit);

        if (recentTracksAll.items) {
          const newTracks = filterNewRecentTracks(
            recentTracks,
            recentTracksAll
          );
          setRecentTracks(newTracks);
        } else {
          Alert.alert("Error", "Failed to fetch recent tracks");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching tracks");
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SongsInfoScreen", { trackId: item?.track?.id })
        }
        className="items-center mb-4 p-2 flex flex-row w-[90%] h-[80px] rounded-xl mx-auto gap-2"
      >
        <Image
          source={{ uri: item?.track?.album?.images?.[0].url }}
          className="h-20 w-20 rounded-lg"
        />
        <View className="flex flex-col items-start">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-white font-semibold mt-2 w-[200px]"
          >
            {item?.track?.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-white text-sm font-semibold w-[190px]"
          >
            {item?.track?.artists?.map((artist) => artist.name).join(", ")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView>
        <View className="flex flex-row pt-8 bg-[rgba(0,0,0,0.2)] mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={25}
              color="white"
              marginLeft={15}
            />
          </TouchableOpacity>
          <Text className="text-white font-medium text-xl ml-5">
            {language.RecentlyPlayedHead}
          </Text>
        </View>

        {recentTracks.length > 0 ? (
          <FlatList
            data={recentTracks.reverse()}
            renderItem={renderItem}
            keyExtractor={(item) => item.track.id.toString()}
            contentContainerStyle={{ paddingBottom: 70 }}
          />
        ) : (
          <Text className="text-white text-center mt-6">
            No recent tracks available
          </Text>
        )}
      </SafeAreaView>
      <StatusBar backgroundColor="black" style="light" />
    </View>
  );
};

export default AllRecentTracks;
