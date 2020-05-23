import * as React from 'react';
import {connect} from 'umi'
import {ConnectState, Dispatch,} from "@/models/connect";
import {List, Card, CardMedia, CircularProgress} from '@material-ui/core'
import Player from '@/components/Player'
import {HoverItem} from '@/models/mv'
import styles from './styles.less';
import Item from './Item'


type Props = {
  dispatch: (parse: Dispatch) => void,
  topMv: any[],
  hoverItem: HoverItem,
  loading: boolean | undefined
}

type State = {};

class PlayMv extends React.Component<Props, State> {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'mv/fetchTopMv',
      payload: {limit: 10}
    })
  }

  render() {

    const {topMv, dispatch, hoverItem, loading} = this.props;

    return (
      <Card square className={styles.container} elevation={0}>

        <Card square elevation={0} className={styles.player}>
          <CardMedia
            className={styles.media}
            image={hoverItem.cover}
            title={hoverItem.name}
          />
          <Player />
        </Card>

        {
          loading && (
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          )
        }

        <List className={styles.mvListRoot} disablePadding>
          {
            topMv.map(item => (<Item currentId={hoverItem.id} key={item.id} item={item} dispatch={dispatch} />))
          }
        </List>
      </Card>
    );
  };
}

const mapStateToProps = ({mv, loading}: ConnectState) => ({
  topMv: mv.topMv,
  hoverItem: mv.hoverItem,
  loading: loading.effects['mv/fetchTopMv']
})


export default connect(mapStateToProps)(PlayMv)
