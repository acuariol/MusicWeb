import React from 'react';
import {
  Divider,
  List,
  withStyles,
  createStyles,
  Theme,
  Typography,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import {connect} from 'umi'
import {Dispatch, ConnectState} from "@/models/connect";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormattedMessage from '@/components/FormattedMessage'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'sticky',
      top: 44
    },
    listRoot: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {

      // padding: '6px 12px 6px 6px',
      '&:hover': {
        backgroundColor: '#f0f0f0',
        cursor: 'pointer',
        // color: '#fff'
      },

      '&:hover $playIcon': {
        visibility: 'visible'
      }
    },
    playIcon: {
      visibility: 'hidden',

    },
    action: {
      flexShrink: 0,
      display: 'flex',
      paddingLeft: '0.7rem',
      alignItems: 'center'
    },
    names: {
      paddingLeft: '0.7rem',
      width: 110,
      textAlign: 'right'
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem 0 '
    }
  })


type Props = {
  classes: any,
  dispatch: (parse: Dispatch) => void,
  loading: boolean | undefined,
  simiSong: any[],
};
type State = {};

class SimilarSongs extends React.PureComponent<Props, State> {

  handlePlay = ({id}: any) => {

    if (typeof id !== 'number') return
    const {dispatch} = this.props;

    dispatch({
      type: 'play/fetchSongUrl',
      payload: {id}
    })


    dispatch({
      type: 'song/fetchSimiSong',
      payload: {id}
    })

    dispatch({
      type: 'song/fetchLyric',
      payload: {id}
    })

    dispatch({
      type: 'song/fetchMusicComment',
      payload: {id}
    })
  }

  render() {

    const {classes, loading, simiSong} = this.props;
    return (
      <div className={classes.root}>
        <div style={{padding: '0 0 24px'}}>
          <Typography gutterBottom variant="h6">
            <FormattedMessage id="comment.similarity"/>
          </Typography>
          <Divider />
        </div>

        {
          loading && <div className={classes.loading}><CircularProgress /></div>
        }

        <List className={classes.listRoot} hidden={loading}>
          {
            simiSong.map((item) => (
              <ListItem key={item.id} className={classes.listItem}>
                <ListItemText>
                  <Typography noWrap>
                    {item.name}
                  </Typography>
                </ListItemText>
                <div className={classes.action}>
                  <IconButton size="small" onClick={() => this.handlePlay(item)}>
                    <PlayCircleOutlineIcon className={classes.playIcon} />
                  </IconButton>
                  <Typography variant="body2" className={classes.names} noWrap title={item.artists}>
                    {item.artists}
                  </Typography>
                </div>
              </ListItem>
            ))
          }
        </List>
      </div>
    );
  };
}

const Ss = withStyles(styles)(SimilarSongs)

const mapStateToProps = ({loading, song}: ConnectState) => ({
  loading: loading.effects['song/fetchSimiSong'],
  simiSong: song.simiSong.list
})

export default connect(mapStateToProps)(Ss)
