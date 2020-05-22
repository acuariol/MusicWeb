import React, {Component} from 'react'
import {createStyles, withStyles,} from "@material-ui/core";
import {connect} from 'umi';
import {ConnectState, Dispatch} from "@/models/connect";
import {SongsItemProps, TypeEnum} from '@/models/song';

import {isEqual,delay} from 'lodash';

import TypeNavigation from '@/components/TypeNavigation';
import {history} from "@@/core/history";
import TabPanel from '@/components/TabPanel'
import {AlbumPanel, PlayListPanel, SinglesPanel, VideosPanel} from '@/components/SearchResult'
import {MusicLoading} from '@/components/Loading';


const styles = () => createStyles({
  content: {
    maxWidth: 1100,
    margin: 'auto'
  },
  loadingBar: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0'
  },
})

interface SearchProps {
  classes: any,
  showSearch: boolean,
  dispatch: (pares: Dispatch) => void,
  songs: Array<SongsItemProps>,
  location: {
    query: {
      keywords?: string,
      type?: string
    }
  },
  keywords: string,
  type: string,
  loading: boolean,
}


class Search extends Component<SearchProps> {


  componentDidMount() {
    console.log('componentDidMount')
    const {location: {query}, keywords: k, type: t, dispatch} = this.props;

    const keywords = query.keywords || k;
    const type = query.type || t

    if (keywords) {
      this.fetchSearch(keywords)
    }
    dispatch({
      type: 'global/setState',
      payload: {keywords, type}
    })

  }

  componentDidUpdate(prevProps: Readonly<SearchProps>,) {
    console.log('componentDidUpdate')
    // console.log({prevProps})
    // console.log(this.props)
    const {keywords, type} = this.props
    if (keywords && !isEqual({keywords, type}, {keywords: prevProps.keywords, type: prevProps.type})) {
      this.fetchSearch(keywords, type)
      console.log('可以请求数据')
    }

  }

  componentWillUnmount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'global/setState',
      payload: {keywords: '', type: '1'}
    })

  }


  fetchSearch = (keywords: string, type?: string | undefined) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'song/setState',
      payload: {searchLoading: true}
    })

    delay(() => {
      dispatch({
        type: 'song/fetchSearch',
        payload: {keywords, type}
      })
    }, 1200)

  }


  handleChange = (type: string) => {
    const {keywords, location: {query}, dispatch} = this.props;

    const k = keywords || query.keywords
    if (k) {
      history.replace(`/search?keywords=${k}&type=${type}`)
    }

    dispatch({
      type: 'global/setState',
      payload: {type}
    })
  }

  render() {
    const {classes, keywords, type, loading} = this.props;

    return (
      <>
        <TypeNavigation keywords={keywords} onChange={this.handleChange} />

        <div className={classes.content}>

          <div className={classes.loadingBar} style={{display: loading ? 'flex' : 'none'}}>
            <MusicLoading />
          </div>

          <TabPanel hidden={type !== TypeEnum.singles || loading}>
            <SinglesPanel />
          </TabPanel>
          <TabPanel hidden={type !== TypeEnum.album || loading}>
            <AlbumPanel />
          </TabPanel>
          <TabPanel hidden={type !== TypeEnum.playList || loading}>
            <PlayListPanel />
          </TabPanel>

          <TabPanel hidden={type !== TypeEnum.video || loading}>
            <VideosPanel />
          </TabPanel>

        </div>
      </>
    )
  }
}

const Sa = withStyles(styles)(Search)

const mapStateToProps = ({global, song}: ConnectState) => ({
  keywords: global.keywords,
  type: global.type,
  loading: song.searchLoading
})

// @ts-ignore
export default connect(mapStateToProps)(Sa)
