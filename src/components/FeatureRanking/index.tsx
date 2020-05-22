import React from 'react';
import {Dispatch} from "@/models/connect";
import {connect} from 'umi'
import Card from './Card'
import styles from './styles.less'


type Props = {
  dispatch: (parse: Dispatch) => void
};

type State = {};


class FeatureRanking extends React.PureComponent<Props, State> {


  render() {
    const {dispatch} = this.props
    return (
      <div className={styles.container}>
        <Card className={styles.item} index={0} title="云音乐新歌榜" dispatch={dispatch}/>
        <Card className={styles.item} index={1} title="云音乐热歌榜" dispatch={dispatch}/>
        <Card className={styles.item} index={2} title="网易原创歌曲榜" dispatch={dispatch}/>
        <Card className={styles.item} index={3} title="云音乐飙升榜" dispatch={dispatch}/>
      </div>
    );
  };
}

// const mapStateToProps = ({song}: ConnectState) => {
//   const data = [...song.topList]
//   const after = data.splice(10, data.length)
//   return {
//     before: data,
//     after
//   }
// }


export default connect()(FeatureRanking)
