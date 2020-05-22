import * as React from 'react';
import {createStyles, withStyles, Paper} from "@material-ui/core";
import {ConnectState, Dispatch} from "@/models/connect";
import {Transition} from 'react-transition-group'

import {connect} from 'umi'
import Content from "./Content";

const styles =()=> createStyles({
  root: {
    position: 'fixed',
    top: 74,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#fafafa',
    overflowY: 'auto',
    overflowX: 'hidden',

    opacity: 0,
    transform: 'scale(0)',
    zIndex: -1,
    transformOrigin: 'top right'
  },

})

const duration = 380;

const defaultStyle = {
  transition: `transform ${duration}ms cubic-bezier(0, 0.55, 0.45, 1), opacity ${duration}ms ease`,
  opacity: 0,
}

const transitionStyles = {
  entering: {
    opacity: 1,
    transform: 'scale(1)',
    zIndex: 1500
  },
  entered: {
    opacity: 1,
    transform: 'scale(1)',
    zIndex: 1500
  },
  exiting: {
    opacity: 0,
    transform: 'scale(0)',
    zIndex: 1500
  },
  exited: {
    opacity: 0,
    transform: 'scale(0)',
    zIndex: -1
  },
};


type Props = {
  classes: any,
  open: boolean,
  dispatch: (parse: Dispatch) => void
};
type State = {};

const el = document.getElementsByTagName('body')[0]

class Broadcast extends React.Component<Props, State> {

  componentDidUpdate() {
    if (this.props.open) {
      el.style.overflow = 'hidden';
    } else {
      el.style.overflow = 'auto';
    }
  }

  render() {
    const {classes, open} = this.props

    return (
      <Transition in={open} timeout={2200}>
        {
          state => (
            <Paper
              className={classes.root} style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
            >
              <Content />
            </Paper>
          )
        }
      </Transition>

    );
  };
}

const mapStateToProps = ({global}: ConnectState) => ({
  open: global.showGalileo
})

const Bd = withStyles(styles)(Broadcast)
export default connect(mapStateToProps)(Bd)
