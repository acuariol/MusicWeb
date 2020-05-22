import * as React from 'react';
import {Typography} from '@material-ui/core'
import {connect} from 'umi'
import {ConnectState, Dispatch} from "@/models/connect";
import CircularProgress from '@material-ui/core/CircularProgress';

import CommentsCard from './Card'

type Props = {
  hotComments: [],
  comments: [],
  total: number,
  dispatch: (parse: Dispatch) => void,
  loading: boolean | undefined,
};
type State = {};

const styles = {
  display: 'flex',
  justifyContent: 'center',
  padding: '2rem'
}

class Comments extends React.PureComponent<Props, State> {


  render() {

    const {hotComments, comments, total, loading} = this.props;

    if (loading) return <div style={styles}><CircularProgress /></div>
    return (
      <div style={{paddingTop: 64}}>

        <Typography gutterBottom variant="h6" style={{padding: '0 0 14px'}}>
          评论：{total}
        </Typography>

        {
          hotComments.length !== 0 && (
            <Typography variant="h6" gutterBottom style={{padding: '0 0 14px'}}>
              精彩评论
            </Typography>
          )
        }

        {
          hotComments.map((item: any, index) => (
            <CommentsCard key={item.commentId} index={index} item={item} />
          ))
        }

        {
          comments.length !== 0 && (
            <Typography variant="h6" gutterBottom style={{padding: '30px 0 14px'}}>
              最新评论
            </Typography>
          )
        }

        {
          comments.map((item: any, index) => (
            <CommentsCard key={item.commentId} index={index} item={item} />
          ))
        }

      </div>
    );
  };
}

const mapStateToProps = ({song, loading}: ConnectState) => ({
  hotComments: song.commentData.hotComments,
  comments: song.commentData.comments,
  total: song.commentData.total,
  loading: loading.effects['song/fetchMusicComment'],
})


export default connect(mapStateToProps)(Comments)
