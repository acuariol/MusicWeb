import React, {Component} from 'react'
import {Grid, Hidden} from '@material-ui/core'
import {connect} from 'umi'

import {ConnectState, Dispatch} from '@/models/connect'
import {TopSongItemProps} from '@/models/song'
import TrendingCarousel, {BannersItemProps} from "@/components/TrendingCarousel";
import CollectionTitle from "@/components/CollectionTitle";
import TopSong from '@/components/TopSong'
import TopMv from "@/components/TopMv";
import Discover from "@/components/Discover";
import FeatureRanking from "@/components/FeatureRanking";
import HotSearch from '@/components/HotSearch'
import styles from './styles.less'

interface HomeProps {
  banners: BannersItemProps[],
  topSong: TopSongItemProps[],
  dispatch: (params: Dispatch) => void,
  showSearch: boolean
}

type State = {}

class Home extends Component<HomeProps, State> {


  componentDidMount() {

    this.props.dispatch({
      type: 'song/fetchBanner'
    })

    this.props.dispatch({
      type: 'song/fetchTopSong'
    })


  }


  openUrl = (url: string) => {
    window.open(url, '_block')
  }

  render() {

    const {banners, topSong} = this.props;


    return (
      <>
        <Grid container spacing={5} alignItems="stretch">
          <Grid item sm={12} xs={12} md={12} xl={8} lg={8}>
            <div className={styles.content}>
              <TrendingCarousel banners={banners} />
              <div style={{paddingTop: '45%'}}>
                <CollectionTitle
                  title="新歌速览"
                  allowClickMore
                  onMoreClick={() => this.openUrl('https://music.163.com/#/discover/album/')}
                />
                <TopSong topSong={topSong} />

                <CollectionTitle
                  style={{paddingTop: 64}}
                  title="发现"
                />

                <Discover />

                <CollectionTitle
                  style={{paddingTop: 64}}
                  title="特色榜单"
                />
                <FeatureRanking />
              </div>
            </div>
          </Grid>
          <Hidden mdDown>
            <Grid item md={4} lg={4}>
              <div className={styles.sidebar}>
                <TopMv />
                <HotSearch />
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = ({song}: ConnectState) => ({
  banners: song.banners,
  topSong: song.topSong,
})

export default connect(mapStateToProps)(Home)
