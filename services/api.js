import { useAuthRequest, ResponseType } from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';
import { apiConfig } from '../config/index';
import { axiosRequest } from "./apiConnector";
import { USER_ENDPOINTS } from "./apiEndpoints";

const { GET_CURRENT_USER, GET_TOP_ITEMS, GET_RECENTLY_PLAYED } = USER_ENDPOINTS;


const api = {
  // Spotify Authentication using OAuth
  useSpotifyAuth: () => {
    const redirectUri = makeRedirectUri({
      scheme: process.env.REDIRECT_URI_SCHEME || 'Spotify-Clone',
      path: 'log-in',
      useProxy: true,
    });

    const clientId = apiConfig.clientId;
    const scopes = Array.from(apiConfig.scopes.split(","));

    const [request, response, promptAsync] = useAuthRequest(
      {
        responseType: ResponseType.Token,
        clientId,
        scopes,
        usePKCE: true,
        redirectUri,
      },
      {
        authorizationEndpoint: apiConfig.endpoint,
      }
    );

    return { request, response, promptAsync };
  },

  // Fetch user profile data using the access token
  fetchUserProfile: async () => {
    try {
        let response = await axiosRequest("GET", GET_CURRENT_USER, null, null, {});
        if (!response?.data) {
          throw new Error("Unexpected response format");
        }
        return response.data;
      } catch (err) {
        throw new Error(err.message);
      }    
  },
};

export default api;



