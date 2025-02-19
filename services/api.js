import { useAuthRequest, ResponseType } from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';
import { apiConfig } from '../config/index';
import { axiosRequest } from "./apiConnector";
import { USER, PLAYLIST, TRACKS, ALBUM, ARTISTS, SEARCH } from "./apiEndpoints";

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
        let response = await axiosRequest("GET", USER.GET_USER_PROFILE, null, null, {});
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
      let response = await axiosRequest("GET", ALBUM.GET_NEW_RELEASES, null, null, {});
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
      throw new Error(err.message);
    }    
  },
  fetchSearchResult: async (query)=>{
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
  
  },
  fetchLikedTracks:async ()=>{
    try {
      let response = await axiosRequest("GET", USER.GET_LIKED_TRACKS, null, null, {
        limit: 48,
      });
  
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
      return response.data?.items;
    } catch (err) {
      throw new Error("Error in getting the Liked Songs");
    }
  },
  fetchUserPlaylists:async ()=>{
    try {
      let response = await axiosRequest("GET", USER.GET_USER_PLAYLIST, null, null, {
        limit: 48,
      });
  
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
      return response.data?.items;
    } catch (err) {
      throw new Error("Error in getting the Liked Songs");
    }
  
  },
  fetchUserFollowedArtists:async ()=>{
    try {
      let response = await axiosRequest("GET", USER.GET_USER_FOLLOWED_ARTISTS, null, null, {
        limit: 48,
      });
  
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
      
      return response.data?.artists.items;
    } catch (err) {
      throw new Error("Error in getting the Liked Songs");
    }
  
  },
  fetchArtistInfo:async(artistId)=>{
    try {
      const response = await axiosRequest(
        "GET",
        ARTISTS.GET_ARTIST_INFO + `/${artistId}`,
        null,
        null,
        {}
      );
  
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
  
      return response.data;
    } catch (err) {
      throw new Error("Error in fetching Artist top songs.");
    }
  },
  fetchArtistTopSongs:async(artistId)=>{
    try {
      const response = await axiosRequest(
        "GET",
        ARTISTS.GET_ARTIST_TOP_SONGS + `/${artistId}/top-tracks`,
        null,
        null,
        {
          limit: 30,
          offset: 0,
        }
      );
  
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
  
      return response.data;
    } catch (err) {
      throw new Error("Error in fetching Artist top songs.");
    }
  },
  fetchArtistAlbums: async(artistId)=>{
    try {
      const response = await axiosRequest(
        "GET",
        ARTISTS.GET_ARTIST_ALBUMS + `/${artistId}/albums`,
        null,
        null,
        {
          limit: 10,
          offset: 0,
        }
      );
  
      if (!response?.data) {
        throw new Error("Unexpected response format");
      }
  
      return response.data;
    } catch (err) {
      throw new Error("Error in fetching Artist albums.");
    }
  }
};

export default api;





