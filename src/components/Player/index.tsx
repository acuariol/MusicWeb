import * as React from 'react';
import {createStyles, withStyles} from '@material-ui/core'
import {connect} from 'umi'
import ReactPlayer from "react-player";
import {ConnectState} from "@/models/connect";

const styles = () => createStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    // zIndex: -1
  }
})


type Props = {
  classes: any,
  url?: string
};
type State = {};

const mapStateToProps = ({mv}: ConnectState) => ({
  url: mv.url
})


// @ts-ignore
@connect(mapStateToProps)
class Player extends React.Component<Props, State> {

  componentDidMount() {

  }

  render() {

    const {classes, url} = this.props
    return (
      <div className={classes.root}>
        <ReactPlayer url={url} key="player" width="100%" height="100%" playing controls />
      </div>
    );
  };
}


export default withStyles(styles)(Player)
