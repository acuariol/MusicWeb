import * as React from 'react';
import {Typography, Divider, Grid, Hidden, ListSubheader, Card} from '@material-ui/core'
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

const stickyTitle = {
  backgroundColor: '#fafafa',
  padding: '1rem 4px',
  margin: '0 -4px'
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
                <FormattedMessage id="comment.number" />：{total}
              </Typography>
              <Divider />
            </div>

            {loading && <div style={styles}><CircularProgress /></div>}

            <div hidden={loading}>
              <ListSubheader disableGutters>
                {
                  hotComments.length !== 0 && (
                    <Typography variant="h6" gutterBottom style={stickyTitle}>
                      <FormattedMessage id="comment.wonderful" />
                    </Typography>
                  )
                }
              </ListSubheader>

              {
                hotComments.map((item: any, index) => (
                  <CommentsCard key={item.commentId} index={index} item={item} />
                ))
              }
              <ListSubheader disableGutters>
                {
                  comments.length !== 0 && (
                    <Typography variant="h6" gutterBottom style={stickyTitle}>
                      <FormattedMessage id="comment.new" />
                    </Typography>
                  )
                }
              </ListSubheader>

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
