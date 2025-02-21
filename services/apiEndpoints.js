export const USER = {
  GET_USER_PROFILE: "/me",
  GET_TOP_ITEMS: "/me/top",
  GET_RECENTLY_PLAYED: "/me/player/recently-played",
  GET_LIKED_TRACKS: "/me/tracks",
  GET_USER_PLAYLIST: "/me/playlists",
  GET_USER_FOLLOWED_ARTISTS: "/me/following?type=artist",
  PUT_LIKE_TRACKS: "/me/tracks",
  DELETE_LIKE_TRACKS: "/me/tracks",
  PUT_FOLLOW_PLAYLIST: "/playlists/",
  DELETE_FOLLOW_PLAYLIST: "/playlists/",
  PUT_FOLLOW_ARTIST: "/me/following?type=artist",
  DELETE_FOLLOW_ARTIST: "/me/following?type=artist",
};

export const ALBUM = {
  GET_NEW_RELEASES: "/browse/new-releases",
  GET_ALBUM_INFO: "/albums",
};

export const PLAYLIST = {
  GET_FEATURED_PLAYLIST: "/browse/featured-playlists",
  GET_PLAYLIST_INFO: "/playlists",
};

export const TRACKS = {
  GET_RECENT_TRACKS: "/me/player/recently-played",
  GET_TRACK_INFO: "/tracks",
};

export const ARTISTS = {
  GET_TOP_ARTISTS: "/me/top",
  GET_ARTIST_TOP_SONGS: "/artists",
  GET_ARTIST_ALBUMS: "/artists",
  GET_ARTIST_RELATED_ARTIST: "/artists",
  GET_ARTIST_INFO: "/artists",
};

export const SEARCH = {
  GET_SEARCHED_DATA: "/search",
};
