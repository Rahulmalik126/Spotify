import { useAuthRequest, ResponseType } from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';
import { apiConfig } from '../config/index';
import { axiosRequest } from "./apiConnector";
import { USER_ENDPOINTS, PLAYLIST, TRACKS, ALBUM_ENDPOINTS, ARTISTS, SEARCH } from "./apiEndpoints";

const { GET_CURRENT_USER, GET_TOP_ITEMS, GET_RECENTLY_PLAYED, } = USER_ENDPOINTS;


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
  fetchFeaturedPlaylists: async () => {
    try {
      let response = await axiosRequest("GET", PLAYLIST.GET_FEATURED_PLAYLIST, null, null, {});
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }    
  },
  fetchRecentTracks: async (limit) => {
    try {
      let response = await axiosRequest("GET", TRACKS.GET_RECENT_TRACKS, null, null, {limit});
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }    
  },
  
  fetchNewReleases:async ()=> {
    try {
      let response = await axiosRequest("GET", ALBUM_ENDPOINTS.GET_NEW_RELEASES, null, null, {});
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }    
  },
  fetchTopItems: async (type)=>{
    try {
      let response = await axiosRequest("GET", ARTISTS.GET_TOP_ARTISTS + `/${type}`, null, null, {});
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
      return response.data;
    } catch (err) {
      console.log("Error is here:    nehbciebrvb",err);
      
      throw new Error(err.message);
    }    
  },
  getSearchResult: async (query)=>{
    try {
      const response = await axiosRequest("GET",SEARCH.GET_SEARCHED_DATA,null,null,
        {
          query,
          type: "album,track,playlist,artist",
          limit: 10,
          offset: 0,
        }
      );
  
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
  
      return response.data;
    } catch (err) {
      throw new Error("Error in fetching categorized result.");
    }
  
  }
};

export default api;



