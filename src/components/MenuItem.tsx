import React from 'react'
import {createStyles, makeStyles, Theme, ListItem, ListItemText} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import {useIntl} from 'umi';
import cls from 'classnames'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItemRoot: {
      height: 74,
      position: 'relative',
      '&:hover': {
        backgroundColor: 'rgba(25,25,25,0.275)',
      },
    },
    activeBg: {
      backgroundColor: '#191919',
      '&:hover': {
        backgroundColor: '#191919',
      },
    },
    iconBox: {
      backgroundColor: '#191919',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    primaryBg: {
      backgroundColor: theme.palette.primary.main
    },
    activeColor: {
      color: '#fff'
    },
    normalColor: {
      color: '#bbbbbb'
    },
    menuText: {
      paddingLeft: 64,
    }
  }),
);

// @ts-ignore
export default (props): React.ReactElement => {

  const {onClick, active, locale, item} = props;

  const classes = useStyles();
  const isActive = active === item.path
  const fontColorClass = isActive ? classes.activeColor : classes.normalColor;

  return (
    <>
      <ListItem
        button className={cls(classes.menuItemRoot, {
        [classes.activeBg]: isActive
      })} onClick={() => onClick(item)}
      >
        <div
          className={cls(classes.iconBox, {
            [classes.primaryBg]: isActive
          })}
        >
          <HomeIcon
            className={fontColorClass}
          />
        </div>
        <ListItemText
          primary={useIntl().formatMessage({id: locale})} className={cls(classes.menuText, fontColorClass)}
        />
      </ListItem>
    </>

  )
}
