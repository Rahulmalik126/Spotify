import { gradientColors } from "../constants/constants";

export const filterNewRecentTracks = (prevTracks, recentTracksAll) => {
  const newTracks = [...prevTracks];

  recentTracksAll.items.forEach((item) => {
    const existingTrackIndex = newTracks.findIndex(
      (track) => track.track.id === item.track.id
    );

    if (existingTrackIndex !== -1) {
      newTracks[existingTrackIndex] = item;
    } else {
      newTracks.unshift(item);
    }
  });
  return newTracks;
};
const getArtists = (artists) => {
  return artists.map((artist) => artist.name).join(", ");
};

export const structuringNewReleases = (newReleases) => {
  return newReleases?.map((item) => ({
    id: item.id,
    imageUrl: item.images[0].url,
    artists: getArtists(item?.artists),
  }));
};

export const structuringTopArtists = (topArtists) => {
  return topArtists?.map((item) => ({
    id: item.id,
    imageUrl: item.images[0].url,
    artists: item.name,
  }));
};

export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * gradientColors.length);
  return gradientColors[randomIndex];
}
