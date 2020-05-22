import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import {history} from 'umi'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ShareIcon from '@material-ui/icons/Share';
import HomeIcon from '@material-ui/icons/Home';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import InfoIcon from '@material-ui/icons/Info';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // transform: 'translateZ(0px)',
      backgroundColor: 'rgba(255,0,0, 0.5)',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },

    speedDial: {
      position: 'fixed',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(4),
        right: theme.spacing(4),
      },
      // [theme.breakpoints.down('lg')]:{
      //   '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      //     right: theme.spacing(4),
      //   },
      // }
    },
    fab: {
      width: 54,
      height: 54
    }
  }),
);

const actions = [
  {icon: <InfoIcon color="primary"/>, name: '关于',path: '/about'},
  {icon: <ShareIcon color="primary"/>, name: '分享'},
  {icon: <QueueMusicIcon color="primary"/>, name: '播放列表'},
  {icon: <HomeIcon color="primary"/>, name: '首页', path: '/'},
];

export default function SpeedDials() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = (action: any) => {
    if (action.path) history.replace(action.path)
    handleClose()
  }

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<AppsIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClick(action)}
            title={action.name}
            classes={{fab: classes.fab}}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
