import * as React from 'react';
import {Typography, Divider, Grid, Hidden} from '@material-ui/core'
import {connect} from 'umi'
import {ConnectState, Dispatch} from "@/models/connect";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormattedMessage from '@/components/FormattedMessage'
import SimilarSongs from './SimilarSongs'
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


    return (
      <div style={{paddingTop: 64}}>

        <Grid container spacing={4}>
          <Grid item md={8} lg={8} sm={12} xs={12} xl={8}>

            <div style={{padding: '0 0 24px'}}>
              <Typography gutterBottom variant="h6">
                <FormattedMessage id="comment.number"/>：{total}
              </Typography>
              <Divider />
            </div>

            {loading && <div style={styles}><CircularProgress /></div>}

            <div hidden={loading}>
              {
                hotComments.length !== 0 && (
                  <Typography variant="h6" gutterBottom style={{padding: '0 0 14px'}}>
                    <FormattedMessage id="comment.wonderful"/>
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
                    <FormattedMessage id="comment.new"/>
                  </Typography>
                )
              }

              {
                comments.map((item: any, index) => (
                  <CommentsCard key={item.commentId} index={index} item={item} />
                ))
              }


            </div>



          </Grid>

          <Hidden mdDown>
            <Grid item md={4} lg={4}>
              <SimilarSongs />
            </Grid>
          </Hidden>

        </Grid>


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
