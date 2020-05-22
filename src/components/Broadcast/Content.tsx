import * as React from 'react';
import {Container, createStyles, Grid, Theme, Typography, withStyles, Button} from "@material-ui/core";
import {ConnectState, Dispatch} from "@/models/connect";
import cls from 'classnames'
import {connect} from 'umi'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GetAppIcon from '@material-ui/icons/GetApp';
import ShareIcon from '@material-ui/icons/Share';

import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import Comments from "@/components/Comments";
import Lyric from './Lyric'

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative'
  },
  cover: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  coverAction: {
    width: '100%',
    height: 64,

    margin: '20px auto 0',

  },
  coverActionContent: {
    width: 340,

    margin: '0 auto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  img: {
    width: 340,
    borderRadius: '8px',
  },
  box: {
    padding: '40px 0'
  },
  subtitle: {
    display: 'flex'
  },
  textPrimary: {
    color: theme.palette.primary.main
  },

  lyric: {
    paddingTop: 30
  },
  screenExit: {
    position: 'fixed',
    top: 24,
    right: 24,

  },
  btn: {
    backgroundColor: theme.palette.background.paper
  },
  '@keyframes xz': {
    '0%': {
      transform: 'rotate(0)',

    },
    '100%': {
      transform: 'rotate(360deg)',
    }
  },

})


type Props = {
  classes: any,
  dispatch: (parse: Dispatch) => void,
  detail: any
};
type State = {};

// <div className={classes.screenExit}>
//   <IconButton onClick={this.handleClose}>
//     <FullscreenExitIcon fontSize="large" />
//   </IconButton>
// </div>


class Content extends React.PureComponent<Props, State> {


  // handleClose = () => {
  //   const {dispatch} = this.props
  //   dispatch({
  //     type: 'global/setState',
  //     payload: {showGalileo: false}
  //   })
  // }

  render() {

    const {classes, detail} = this.props

    return (
      <div className={cls(classes.root,)}>


        <Container>

          <div className={classes.box}>
            <Grid container spacing={6}>

              <Grid item md={5} lg={5} xl={5} sm={12} xs={12}>
                <div className={classes.cover}>
                  <img
                    className={classes.img}
                    src={detail.al.picUrl}
                    alt=""
                  />

                  <div className={classes.coverAction}>
                    <div className={classes.coverActionContent}>

                      <Button startIcon={<FavoriteBorderIcon />} className={classes.btn}>
                        喜欢
                      </Button>

                      <Button startIcon={<GetAppIcon />} className={classes.btn}>
                        下载
                      </Button>

                      <Button startIcon={<ShareIcon />} className={classes.btn}>
                        分享
                      </Button>

                      <Button startIcon={<CreateNewFolderOutlinedIcon />} className={classes.btn}>
                        收藏
                      </Button>
                    </div>
                  </div>
                </div>

              </Grid>

              <Grid item md={7} lg={7} xl={7} sm={12} xs={12}>
                <Typography variant="h5" gutterBottom>
                  {detail.name}
                </Typography>

                <div className={classes.subtitle}>
                  <Typography>
                    专辑： <span className={classes.textPrimary}>{detail.al.name}</span>
                  </Typography>

                  <Typography style={{paddingLeft: 24}}>
                    歌手：
                    {detail.ar.map((o: any, index: number) => <span key={o.id} className={classes.textPrimary}>
                      {o.name}{detail.ar.length === index + 1 ? '' : '/'}
                    </span>)}

                  </Typography>
                </div>

                <div className={classes.lyric}>
                  <Lyric />
                </div>

              </Grid>

            </Grid>


          </div>
        </Container>

        <Container>
          <Comments />
        </Container>
      </div>

    );
  };
}

const mapStateToProps = ({play}: ConnectState) => ({
  detail: play.detail
})

const Con = withStyles(styles)(Content)
export default connect(mapStateToProps)(Con)
