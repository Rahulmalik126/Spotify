import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useAuthRequest, makeRedirectUri, ResponseType } from 'expo-auth-session';
import { router, useNavigation } from 'expo-router';

const clientId = '83f6deddb76547e58f62b791154d8e67'; // Your Spotify client ID

// Using makeRedirectUri to generate a correct redirect URI
const redirectUri = makeRedirectUri({
  scheme: 'Spotify-Clone',  // Replace with your app's scheme
});
console.log(redirectUri);

const LogIn = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigation = useNavigation();

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,  // Using implicit flow, gets the token directly
      clientId,
      scopes: [
        'user-read-email',
        'user-library-read',
        'user-read-recently-played',
        'user-top-read',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
      ],
      redirectUri,  // Using the generated redirect URI
    },
    {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      setAccessToken(access_token); // Set the access token once obtained
      console.log('Access Token:', access_token);

      // Navigate to the next screen or home
      navigation.navigate('home');  // Make sure you have a 'home' route in your navigation stack
    } else if (response?.type === 'error') {
      console.error('Auth Error:', response.error);
      Alert.alert('Error', response.error);
    }
  }, [response]);

  const handleLoginWithSpotify = async () => {
    if (!request || isAuthenticating) return;
    try {
      setIsAuthenticating(true);
      await promptAsync(); // Initiates the login process
      setIsAuthenticating(false);
    } catch (err) {
      console.log('Prompt async error:', err);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <View className="h-20" />
        <View className="h-[25%] justify-center items-center">
          <Entypo className="text-center" name="spotify" size={80} color="white" />
          <Text className="text-white text-[35px] font-bold text-center mt-2 flex justify-center items-center">
            Log in to Spotify
          </Text>
        </View>

        <View className="h-20" />
        <Pressable
          className="bg-[#1DB954] h-14 mx-auto w-[85vw] rounded-full items-center justify-center my-2"
          onPress={handleLoginWithSpotify}
        >
          <Text className="text-black font-bold text-lg">Log in with Spotify</Text>
        </Pressable>

        <Pressable className="bg-[#131624] h-14 mx-auto w-[85vw] w-75 rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text className="text-white font-medium text-center text-lg w-[80%]">Continue with Phone Number</Text>
        </Pressable>

        <Pressable className="bg-[#131624] py-3 mx-auto w-[85vw] rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <Image
            source={{ uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000' }}
            className="w-7 h-7"
          />
          <Text className="text-white font-medium text-center text-lg w-[80%]">Continue with Google</Text>
        </Pressable>

        <Pressable className="bg-[#131624] py-3 mx-auto w-[85vw] rounded-full items-center justify-center flex-row align-items-center my-2 border-[#C0C0C0] border-[0.8px]">
          <Image
            source={{ uri: 'https://img.icons8.com/?size=100&id=118497&format=png&color=000000' }}
            className="w-7 h-7"
          />
          <Text className="text-white font-medium text-center text-lg w-[80%]">Sign In with Facebook</Text>
        </Pressable>

        <View className="flex justify-center items-center gap-2 mt-5">
          <Text className="text-white text-lg font-normal">Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('./sign-up')}>
            <Text className="text-white text-xl font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LogIn;
