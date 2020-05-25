import * as React from 'react';
import {
  Card,
  CircularProgress,
  createStyles,
  IconButton,
  ListItemText,
  Theme,
  Typography,
  withStyles
} from '@material-ui/core'
import {connect} from 'umi'
import request from 'umi-request';
import cls from 'classnames'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {Dispatch} from "@/models/connect";
import MoreButton from '@/components/Buttons/MoreButton'
import {history} from "@@/core/history";


const styles = (theme: Theme) => createStyles({
  cardRoot: {
    backgroundColor: '#1A1A1A',
    color: '#fff'
  },
  header: {
    display: 'flex',
    paddingTop: 24
  },
  num: {
    color: '#313131',
    fontWeight: 600
  },
  title: {
    padding: '0 8px',
    position: 'relative',
    top: 8,

  },
  item: {
    display: 'flex',
    paddingRight: 8,
    alignItems: 'center',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      cursor: 'pointer',

      '& $name': {
        color: '#fff'
      },
      '& $playIcon': {
        color: '#fff'
      }
    }
  },
  itemContent: {
    padding: '8px 0'
  },
  name: {
    color: '#7f7f7f'
  },
  playIcon: {
    color: '#7f7f7f',
  },

  loading: {
    width: '100%',
    textAlign: 'center',
    padding: '64px 0'
  }
})

type Props = {
  classes: any,
  className?: string,
  index: number,
  title: string,
  dispatch: (parse: Dispatch) => void
};

type DataItem = {
  id: number,
  name: string,
  arName: string
}

type State = {
  topFive: Array<DataItem>
  loading?: boolean
  id: null | number
};

function formatData(data: Array<DataItem>) {
  if (!Array.isArray(data)) return []
  return data.map((o: any) => ({
    id: o.id,
    name: o.name,
    arName: o.ar.map((i: any) => i.name).join()
  }))
}

type ItemProps = {
  classes: any,
  item: DataItem,
  onClickPlay: (item: DataItem) => void,

}

function Item({classes, item, onClickPlay,}: ItemProps) {


  return (
    <div className={classes.item}>


      <IconButton onClick={() => onClickPlay(item)}>
        <PlayCircleOutlineIcon className={classes.playIcon} />
      </IconButton>
      <ListItemText className={classes.itemContent}>
        <Typography variant="body2" noWrap gutterBottom title={item.name}>
          {item.name}
        </Typography>
        <Typography variant="body2" noWrap className={classes.name} title={item.arName}>
          {item.arName}
        </Typography>
      </ListItemText>
    </div>
  )
}


// @ts-ignore
@connect()
class CardItem extends React.PureComponent<Props, State> {

  state = {
    topFive: [],
    loading: true,
    id: null
  }

  componentDidMount() {
    request.get(`http://106.12.40.19:3000/top/list?idx=${this.props.index}`)
      .then((response) => {
        if (response && response.code === 200) {

          const {playlist: {tracks, id}} = response;
          const d = formatData(tracks)
          const topFive = d.splice(0, 7)
          this.setState({topFive, loading: false, id})
        }

      })
      .catch((error) => {
        console.log(error)
      });
  }

  handleMoreClick = () => {
    history.push(`/playlist?id=${this.state.id}`)
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    })

  }

  handlePlay = (item: DataItem) => {
    this.props.dispatch({
      type: 'play/fetchSongUrl',
      payload: {id: item.id}
    })
  }

  render() {
    const {classes, className, index, title,} = this.props;
    const {topFive, loading} = this.state;

    return (
      <Card square className={cls(className, classes.cardRoot)}>
        <div className={classes.header}>
          <Typography variant="h2" className={classes.num}>
            #{index + 1}
          </Typography>
          <Typography className={classes.title}>
            {title}
          </Typography>
        </div>
        {
          loading && (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          )
        }

        {
          topFive.map((o: DataItem) => (
            <Item key={o.id} classes={classes} item={o} onClickPlay={this.handlePlay} />)
          )
        }

        <MoreButton onClick={this.handleMoreClick} />

      </Card>
    );
  }
  ;
}

export default withStyles(styles)(CardItem)
