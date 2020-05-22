import React from 'react';
import {Box, createStyles, makeStyles, Paper} from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  paper: {
    padding: 24,
    boxSizing: 'border-box',
    height:'auto'
    // minHeight: 520,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center'
  }

}))

interface TabPanelProps {
  children?: React.ReactNode;
  hidden:boolean,
}

function TabPanel(props: TabPanelProps) {
  const {children, hidden} = props;
  const classes = useStyles();

  return (
    <Paper
      role="tabpanel"
      hidden={hidden}
      classes={{root: classes.paper}}
    >
      <Box color="#000">
        {children}
      </Box>
    </Paper>
  );
}

// const mapStateToProps = ({loading}: ConnectState) => ({
//   loading: loading.effects['song/fetchSearch'],
//
// })


// export default connect(mapStateToProps)(TabPanel)
export default TabPanel
