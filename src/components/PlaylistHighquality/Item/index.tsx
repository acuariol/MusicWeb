import React from 'react'

import {Avatar, createStyles, fade, makeStyles, Theme, Typography} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import cls from 'classnames'

import {formatNumToTenThousand} from '@/utils/utils'

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
    height: '100%',
    paddingLeft: theme.spacing(1.5)
  },
  root: {
    display: 'flex',
    // height: 78,
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#fff',

    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.5),
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
  onClick?: (item: any) => any
}

function Item({item, onClick}: ItemProps) {

  const classes = useStyles()

  const handleClick = (o: any) => {
    if (typeof onClick === 'function')
      onClick(o)
  }

  return (
    <>
      <ListItem
        alignItems="flex-start"
        button
        className={cls(classes.root)}
        onClick={() => handleClick(item)}
      >
        <Avatar src={item.coverImgUrl} />

        <div className={classes.itemContent}>
          <ListItemText>
            <Typography className={classes.title}>
              {item.name}
            </Typography>
          </ListItemText>
          <div className={classes.action}>
            <Typography className={classes.p}>By {item.creator.nickname}</Typography>
            <Typography className={classes.p}>{formatNumToTenThousand(item.playCount)}播放</Typography>
          </div>
        </div>
      </ListItem>
    </>
  )
}


export default Item
