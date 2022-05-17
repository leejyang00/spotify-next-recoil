import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
// import spotifyApi from "../lib/spotify";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

// Custom Hook
function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // If Refresh access token attempt fails, direct user to login...
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi
}

export default useSpotify;