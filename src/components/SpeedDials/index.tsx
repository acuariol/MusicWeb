import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import {connect, history} from 'umi'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import AppsIcon from '@material-ui/icons/Apps';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // transform: 'translateZ(0px)',
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
      zIndex: 800,
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
  {icon: <InfoIcon color="primary" />, name: '关于', path: '/about'},
  // {icon: <HistoryIcon color="primary" />, name: '播放历史', path: '/history'},
  {icon: <QueueMusicIcon color="primary"/>, name: '播放列表',path: '/history'},
  {icon: <HomeIcon color="primary" />, name: '首页', path: '/'},
];

function SpeedDials(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = (action: any) => {

    const {path} = action

    if (path) {
      if (path === '/history') {
        const {dispatch} = props;
        dispatch({
          type: 'playHistory/setState',
          payload: {
            open: true
          }
        })
      } else{
        history.replace(path)
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: 'smooth',
        })
      }

    }

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


export default connect()(SpeedDials)
