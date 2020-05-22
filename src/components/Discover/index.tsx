import React from 'react';
import {Card, CardActionArea, CardMedia, Typography} from '@material-ui/core'
import {connect} from 'umi'
import {InView} from 'react-intersection-observer'

import {TopListItemProps} from '@/models/song'
import {ConnectState, Dispatch} from "@/models/connect";
import styles from "./styles.less";

type Props = {
  before: Array<TopListItemProps>,
  dispatch: (parse: Dispatch) => void,
  entry?: any,
  inView?: any
};

type State = {
  fetched?: boolean
};

function ItemCard({item}: { item: TopListItemProps }) {
  return (
    <Card elevation={0} className={styles.item}>
      <CardActionArea>
        <CardMedia image={item.coverImgUrl || item.picUrl} className={styles.media} />
      </CardActionArea>
      <div className={styles.mark} style={{display: item.loading ? 'none' : 'block'}}>
        <Typography color="inherit" variant="body2">
          {item.name}
        </Typography>
      </div>
    </Card>
  )
}

class Discover extends React.PureComponent<Props, State> {

  state = {
    fetched: false
  }

  inViewChange = (inView: boolean) => {
    const {fetched} = this.state;
    if (!fetched && inView) {
      const {dispatch} = this.props
      dispatch({
        type: 'song/fetchTopList'
      })
      this.setState({fetched: !fetched})
    }
  }


  render() {
    const {before} = this.props
    return (
      <InView as="div" onChange={this.inViewChange}>
        <div className={styles.container}>
          {before.map((o: TopListItemProps) => (<ItemCard item={o} key={o.id} />))}
        </div>
      </InView>
    );
  };
}

const mapStateToProps = ({song}: ConnectState) => {
  const data = [...song.topList]
  data.splice(10, data.length)
  return {
    before: data,
  }
}


export default connect(mapStateToProps)(Discover)
