import * as React from 'react';
import {connect} from 'umi'
import {ConnectState, Dispatch} from '@/models/connect'
import {Button, Container, createStyles, Drawer, IconButton, Tooltip, Typography, withStyles} from '@material-ui/core'
import ListSongItem from '@/components/ListSongItem'
import DeleteIcon from "@material-ui/icons/Delete";

const styles = () => createStyles({

  paper: {
    height: 600,
    backgroundColor: '#212121',
    color: '#fff'
  },
  subheader: {
    backgroundColor: '#212121',
  },
  stickyBar: {
    backgroundColor: '#333333',
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',


  },
  titleBar: {
    position: 'relative',
    width: '100%',
    height: 64,

  },
  closeIcon: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 12

  },
  innerBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  }
})

type Props = {
  open: boolean
  dispatch: (parse: Dispatch) => void
  classes: any
  list: any[]
};
type State = {};


class HistoryDrawer extends React.PureComponent<Props, State> {

  onClose = () => {
    const {dispatch} = this.props
    dispatch({
      type: 'playHistory/setState',
      payload: {
        open: false
      }
    })
  }

  handleDelete = (id: number) => {
    const {dispatch} = this.props
    dispatch({
      type: 'playHistory/delete',
      payload: {
        id
      }
    })
  }

  handlePlay = (id: number) => {
    const {dispatch} = this.props
    dispatch({
      type: 'play/fetchSongUrl',
      payload: {
        id
      }
    })
  }

  handleClear = ()=>{
    localStorage.clear();
    const {dispatch} = this.props
    dispatch({
      type: 'playHistory/setState',
      payload: {
        list:[]
      }
    })
  }


  render() {

    const {open, classes, list} = this.props;

    return (
      <Drawer anchor="bottom" open={open} onClose={this.onClose} classes={{paper: classes.paper}}>
        <div className={classes.stickyBar}>

          <div className={classes.titleBar}>
            <Container>
              <div className={classes.innerBar}>

                <Typography align="center">
                  播放列表（{list.length}）
                </Typography>

                <Button color="inherit" onClick={this.handleClear}>清除</Button>
              </div>

            </Container>


          </div>

        </div>
        <Container>
          <div style={{margin: '24px 0'}}>

            {
              list.length === 0 && (
                <Typography variant="h5" color="inherit" align="center" style={{padding: "64px 0"}}>
                  你还没有添加任何歌曲.快去播放吧 <span role="img" aria-label="ha">😝</span>
                </Typography>
              )
            }

            {
              list.map((o: any,i:number) => (
                <ListSongItem
                  index={i+1}
                  onPlayClick={() => this.handlePlay(o.id)}
                  dark
                  item={o}
                  key={o.id}
                  attachSlot={(
                    <Tooltip title="删除">
                      <IconButton color="inherit" onClick={() => this.handleDelete(o.id)}>
                        <DeleteIcon color="inherit" />
                      </IconButton>
                    </Tooltip>
                  )}
                />
              ))
            }
          </div>
        </Container>

      </Drawer>
    );
  };
}


const mapStateToProps = ({playHistory}: ConnectState) => ({
  open: playHistory.open,
  list: playHistory.list
})

const Hd = withStyles(styles)(HistoryDrawer)

export default connect(mapStateToProps)(Hd)
