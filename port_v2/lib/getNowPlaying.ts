import { NowPlaying } from "@/types/spotifyType";
import { api } from "./api";

export const getNowPlaying = async (): Promise<NowPlaying> => {
  const res = await api.get("/api/spotify-now-playing");

  return res.data;
};
