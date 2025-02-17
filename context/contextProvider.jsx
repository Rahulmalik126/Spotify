import React, { createContext, useContext, useEffect, useState } from "react";
import api from '../services/api'; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await api.fetchUserProfile();
        console.log('User Profile:', profileData); // Log the fetched profile data
        setUserProfile(profileData); // Store the user's profile data
      } catch (error) {
        console.error('Error fetching profile:', error);
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

