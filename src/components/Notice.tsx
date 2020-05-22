import React from 'react'
import {IconButton, Snackbar} from "@material-ui/core";

import Slide, {SlideProps} from '@material-ui/core/Slide';
import CloseIcon from "@material-ui/icons/Close";

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}


// const useStyles = makeStyles((theme: Theme) => createStyles({
//   root: {
//     backgroundColor: theme.palette.primary.main,
//     width: 30,
//     height: 4
//   }
// }))

interface NoticeProps {
  open: boolean,
  onClose: () => void,
  message?: string,
}

// export interface Notice {
//   NormalNotice: Function
// }

const NormalNotice = (props: NoticeProps): React.ReactElement => {
  // const classes = useStyles()
  return (
    <Snackbar
      TransitionComponent={TransitionDown}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={props.open}
      onClose={props.onClose}
      message={props.message || '未知类型'}
      action={
        <React.Fragment>
          <IconButton size="small" color="inherit" onClick={props.onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />)
}

export {NormalNotice}
