import React, {PureComponent} from 'react'
import {Container, createStyles, Grid, Link, Theme, Typography, withStyles} from '@material-ui/core'
import {connect} from 'umi'
import {ConnectState, Dispatch} from "@/models/connect";
import CopyrightIcon from '@material-ui/icons/Copyright';

const styles = (theme: Theme) => createStyles({
  footerContainer: {
    backgroundColor: '#1A1A1A',
    height: 'auto',
    padding: '74px 0'
  },
  title: {
    color: '#7f7f7f',
    fontWeight: 'bold',
    padding: '0 0 24px',
    borderBottom: '1px solid #7f7f7f',
    marginBottom: 34
  },
  text: {
    color: '#7f7f7f',
    margin: '14px 0',
    '&:hover': {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
    display: 'block'
  },
  copyright: {
    color: '#7f7f7f',
    padding: '34px 0',
    backgroundColor: '#161616',
  }
})

type FooterProps = {
  topArtists: any[],
  classes: any,
  dispatch: (parse: Dispatch) => void
}

const social = [
  {
    name: 'Github',
    url: ''
  },
  {
    name: '微博',
    url: ''
  },
  {
    name: 'BiliBili',
    url: ''
  },
  {
    name: '简书',
    url: ''
  },
  {
    name: 'Twitter',
    url: ''
  },
  {
    name: 'Instagram',
    url: ''
  },
  {
    name: 'Pinterest',
    url: ''
  }
]

class Foo extends PureComponent<FooterProps> {
  componentDidMount() {
    this.props.dispatch({
      type: 'song/fetchTopArtists',
      payload: {limit: 10}
    })
  }

  render() {
    const {classes, topArtists} = this.props
    return (
      <>
        <div className={classes.footerContainer}>
          <Container>
            <Grid container spacing={8}>
              <Grid item md={3} lg={3} xl={3}>
                <Typography className={classes.title} variant="h6">
                  热门歌手
                </Typography>
                {
                  (topArtists || []).map(o => (
                    <Typography variant="body1" key={o.id} className={classes.text}>
                      {o.name}
                    </Typography>
                  ))
                }
              </Grid>

              <Grid item md={3} lg={3} xl={3}>
                <Typography className={classes.title} variant="h6">
                  语言
                </Typography>

                <Typography variant="body1" className={classes.text}>
                  中文
                </Typography>

                <Typography variant="body1" className={classes.text}>
                  English
                </Typography>

              </Grid>

              <Grid item md={3} lg={3} xl={3}>
                <Typography className={classes.title} variant="h6">
                  关注我们
                </Typography>
                {
                  social.map((item: any) => (
                    <Typography key={item.name} variant="body1" className={classes.text}>
                      {item.name}
                    </Typography>
                  ))
                }
              </Grid>

              <Grid item md={3} lg={3} xl={3}>
                <Typography className={classes.title} variant="h6">
                  灵感来自
                </Typography>

                <Link
                  variant="body1" className={classes.text} href="https://github.com/Binaryify/NeteaseCloudMusicApi"
                  color="primary" target="_blank" rel="noopener"
                >
                  Binaryify
                </Link>

                <Link
                  variant="body1" className={classes.text}
                  href="https://www.behance.net/gallery/28753979/Beatz-Online-Music-Concept-%28Free-PSD%29"
                  color="primary"
                  target="_blank"
                  rel="noopener"
                >
                  Gouse Mohammed
                </Link>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Typography align="center" className={classes.copyright}>
          Copyright <CopyrightIcon fontSize="small" style={{verticalAlign: 'text-top'}} /> 2020
        </Typography>
      </>
    );
  }
}


const mapStateToProps = ({song}: ConnectState) => ({
  topArtists: song.topArtists
})

const Footer = withStyles(styles)(Foo)
export default connect(mapStateToProps)(Footer)
