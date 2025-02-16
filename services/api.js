// services/api.js
import { useAuthRequest, ResponseType } from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';
import { apiConfig } from '../config/index';
const api = {
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
};

export default api;
