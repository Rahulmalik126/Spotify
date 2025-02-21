import { TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../../services/api";
import { useGlobalContext } from "../../context/contextProvider";

const PlaylistFollowButton = ({ playlistId }) => {
  const { followedPlaylists } = useGlobalContext();
  const [follow, setFollow] = useState(true);

  useEffect(() => {
    const PlaylistExists = followedPlaylists.some(
      (item) => item.id === playlistId
    );
    if (PlaylistExists) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [followedPlaylists, playlistId]);

  const handleFollow = async () => {
    if (follow === false) {
      try {
        await api.followPlaylist(playlistId);
        setFollow(true);
        Alert.alert("Successfully followed Playlist");
      } catch (err) {
        Alert.alert("Error in following Playlist:", err.message);
      }
    } else {
      try {
        await api.unFollowPlaylist(playlistId);
        setFollow(false);
        Alert.alert(" Successfully unfollowed Playlist");
      } catch (err) {
        Alert.alert("Error in unfollowing Playlist:", err.message);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleFollow()}
      className="flex w-full ml-5"
    >
      {!follow ? (
        <MaterialIcons name="playlist-add" size={24} color="white" />
      ) : (
        <MaterialIcons name="playlist-add-check" size={24} color="green" />
      )}
    </TouchableOpacity>
  );
};

export default PlaylistFollowButton;
