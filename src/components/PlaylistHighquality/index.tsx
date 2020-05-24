import * as React from 'react';
import {Card, CircularProgress, createStyles, Typography, withStyles} from '@material-ui/core'

import request from "umi-request";
import {history} from "umi";
import FormattedMessage from '@/components/FormattedMessage'
import MoreButton from '@/components/Buttons/MoreButton'
import Item from './Item'

const styles = ( ) => createStyles({
  root: {
    width: '100%',
    margin: '0',
    backgroundColor: '#1a1a1a',
    // backgroundColor: '#fff',
    color: '#fff',

    boxSizing: 'border-box'
  },
  loading: {
    display: 'flex',
    padding:'64px 0',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    padding: '1.5rem 1.5rem 0'
  },
  chipBox: {
    padding: '1.9rem 0 0 0',

  },

})

type Props = {
  classes: any,
};
type State = {
  list: any[],
  loading: boolean
};

class PlaylistHighquality extends React.PureComponent<Props, State> {

  state = {
    list: [],
    loading: true
  }

  componentDidMount() {
    request.get(`http://106.12.40.19:3000/top/playlist/highquality`)
      .then((response) => {
        if (response && response.code === 200) {
          const {playlists} = response;

          const sortList = (playlists || []).splice(0, 6)
          this.setState({list: sortList || [], loading: false})

        }

      })
      .catch((error) => {
        this.setState({loading: false})
        console.log(error,'erdddddror')
      });
  }



  handleClick = (item:any)=>{
    history.push(`/playlist?id=${item.id}`)
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    })

  }

  render() {

    const {classes,} = this.props;
    const {loading, list} = this.state;


    return (
      <Card classes={{root: classes.root}} square>
        <Typography variant="h5" color="inherit" className={classes.title}>
          <FormattedMessage id="layout.boutiqueSong"/>
        </Typography>


        {
          loading && (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          )
        }

        <div className={classes.chipBox} hidden={loading}>
          {
            list.map((item: any) => (
              <Item
                onClick={this.handleClick}
                key={item.id}
                item={item}
              />
            ))
          }
        </div>
        <MoreButton hidden={loading}/>
      </Card>
    );
  };
}


export default withStyles(styles)(PlaylistHighquality)
