import React from 'react'
import { playlistState } from '../atoms/playlistAtom'
import { useRecoilValue} from 'recoil'
import Song from './Song'

function Songs() {
  const playlist = useRecoilValue(playlistState)

  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb 20">
      {playlist?.tracks.items.map((track, i) => (
        // <div key={track.id}>
        //   {track.track.name}
        // </div>
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  )
}

export default Songs
