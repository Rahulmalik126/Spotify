import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import api from "../services/api";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [followedPlaylists, setFollowedPlaylists] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await api.fetchUserProfile();
        setUserProfile(profileData); // Store the user's profile data
      } catch (error) {
        Alert.alert("Error fetching profile:", error);
      }
    };
    const fetchLikedSongs = async () => {
      const likedTracksData = await api.fetchLikedTracks();

      if (likedTracksData.length > 0) {
        setLikedSongs(likedTracksData);
      } else {
        Alert.alert("Error", "Failed to fetch liked Songs");
      }
    };
    const fetchFollowedPlaylist = async () => {
      const followedPlaylistData = await api.fetchUserPlaylists();

      if (followedPlaylistData.length > 0) {
        setFollowedPlaylists(followedPlaylistData);
      } else {
        Alert.alert("Error", "Failed to fetch liked Songs");
      }
    };
    const fetchFollowedArtists = async () => {
      const followedArtistsData = await api.fetchUserFollowedArtists();

      if (followedArtistsData.length > 0) {
        setFollowedArtists(followedArtistsData);
      } else {
        Alert.alert("Error", "Failed to fetch liked Songs");
      }
    };

    fetchProfile();
    fetchLikedSongs();
    fetchFollowedPlaylist();
    fetchFollowedArtists();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        userProfile,
        setUserProfile,
        likedSongs,
        setLikedSongs,
        followedArtists,
        setFollowedArtists,
        followedPlaylists,
        setFollowedPlaylists,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
