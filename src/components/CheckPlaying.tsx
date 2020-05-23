import {connect} from 'umi'
import {ConnectState} from '@/models/connect'

const mapStateToProps = ({play}: ConnectState) => ({
  playing: play.playing,
  songId: play.songId
})
type Props = {
  currentSongId: number,
  songId: number | null,
  children: (state: boolean) => any,
  playing: boolean,

}

export default connect(mapStateToProps)(({playing, songId, currentSongId, children}: Props) => {
    return children(playing && songId === currentSongId)
  }
)
