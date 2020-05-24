import * as React from 'react';
import {Card, Chip, CircularProgress, createStyles, Theme, Typography, withStyles} from '@material-ui/core'
import FormattedMessage from '@/components/FormattedMessage'

import request from "umi-request";
import {history} from "umi";

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    height: 'auto',
    margin: '54px 0',
    backgroundColor: '#1a1a1a',
    // backgroundColor: '#fff',
    color: '#fff'
  },
  loading: {
    padding: '64px 0',
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    padding: '1.5rem 1.5rem 0'
  },

  chipBox: {
    padding: '2rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chip:{
    color: '#fff',
    borderColor:'#fff'
  }
})

type Props = {
  classes: any
};
type State = {
  list: any[],
  loading: boolean
};

class HotSearch extends React.PureComponent<Props, State> {

  state = {
    list: [],
    loading: true
  }

  componentDidMount() {
    request.get(`http://106.12.40.19:3000/search/hot/detail`)
      .then((response) => {
        if (response && response.code === 200) {
          const {data} = response;

          this.setState({list: data || [], loading: false})

        }

      })
      .catch((error) => {
        this.setState({loading: false})
        console.log(error)
      });
  }

  onClick = (item: any) => {
    const {searchWord} = item;
    window.scrollTo({
      left: 0,
      top:0,
      behavior: 'smooth',
    })
    history.push(`/search?keywords=${searchWord}&type=1`)

  }


  render() {

    const {classes,} = this.props;
    const {loading, list} = this.state;


    return (
      <Card className={classes.root} square>
        <Typography variant="h5" color="inherit" className={classes.title}>
          <FormattedMessage id="layout.hotSearch"/>
        </Typography>

        {
          loading && (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          )
        }

        <div className={classes.chipBox}>

          {
            list.map((item: any) => (
              <Chip
                key={item.searchWord}
                label={item.searchWord}
                className={classes.chip}
                size="medium"
                onClick={() => this.onClick(item)}
                variant="outlined"
              />
            ))
          }

        </div>
      </Card>
    );
  };
}


export default withStyles(styles)(HotSearch)
