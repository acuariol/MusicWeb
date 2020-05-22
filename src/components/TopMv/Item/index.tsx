import React from 'react'

import {createStyles, makeStyles, Theme, Typography,fade} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Dispatch} from "@/models/connect";
import cls from 'classnames'

const useStyles = makeStyles((theme: Theme) => createStyles({
  inline: {
    display: 'inline',
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
    height: '100%'
  },
  root: {
    display: 'flex',
    // height: 78,
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#fff',

    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main,0.5),
    },
    '&:hover $action': {
      color: '#fff',
    },
    overflow: 'hidden'
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#7f7f7f',
    paddingTop: 6,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',

    textOverflow: '-o-ellipsis-lastline',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
  },
  p: {
    fontSize: 12,
  },
  num: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingRight: 8,
    position: 'relative',
    top: 2
  },
  select: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    '& $action': {
      color: '#fff',
    },
  }
}))

type ItemProps = {
  item: any,
  dispatch: (parse: Dispatch) => void,
  currentId: number
}

function Item({item, dispatch, currentId}: ItemProps) {

  const classes = useStyles()

  const onMouseEnter = (o: any) => {

    console.log('onMouseEnter')
    dispatch({
      type: 'mv/setState',
      payload: {hoverItem: o}
    })

    dispatch({
      type: 'mv/fetchMvUrl',
      payload: {id: o.id}
    })
  }

  return (
    <>
      <ListItem
        alignItems="flex-start"
        button
        className={cls(classes.root, currentId === item.id && classes.select)}
        onClick={() => onMouseEnter(item)}
      >
        <Typography className={classes.num}>{item.index}.</Typography>
        <div className={classes.itemContent}>
          <ListItemText>
            <Typography className={classes.title}>
              {item.name}{item.briefDesc && ` - ${item.briefDesc}`}
            </Typography>
          </ListItemText>
          <div className={classes.action}>
            <Typography className={classes.p}>By {item.artistName}</Typography>
            <Typography className={classes.p}>{item.playCount}播放</Typography>
          </div>
        </div>
      </ListItem>
    </>
  )
}


export default Item
