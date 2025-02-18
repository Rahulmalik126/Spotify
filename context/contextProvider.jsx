import React, { createContext, useContext, useEffect, useState } from "react";
import api from '../services/api'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await api.fetchUserProfile();
        setUserProfile(profileData); // Store the user's profile data
      } catch (error) {
        Alert.alert('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        userProfile,
        setUserProfile
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

