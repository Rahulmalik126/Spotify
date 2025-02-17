// USERS ENDPOINTS
export const USER_ENDPOINTS = {
    GET_CURRENT_USER: "/me",
    GET_TOP_ITEMS: "/me/top",
    GET_RECENTLY_PLAYED: "/me/player/recently-played",
  };
  
  // ALBUM ENDPOINTS
  export const ALBUM_ENDPOINTS = {
    GET_NEW_RELEASES: "/browse/new-releases",
  };

  export const PLAYLIST={
    GET_FEATURED_PLAYLIST:"/browse/featured-playlists"
  }
  
  export const TRACKS={
    GET_RECENT_TRACKS:"/me/player/recently-played?limit=8",
  }
  