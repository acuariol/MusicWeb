import React, {Component,} from 'react'
import {createStyles, withStyles} from "@material-ui/core";
import {connect, history,} from 'umi';
import {ConnectState, Dispatch} from '@/models/connect'

import {debounce, trim, delay} from 'lodash'
import Logo from '@/components/Logo'
import SearchSuggest from './SearchSuggest'
import Galileo from './Galileo'

import Control from './Control'
import SimpleInput from './SimpleInput';


const styles = () => createStyles({
  pbRoot: {
    width: '100%',
    height: 74,
    backgroundColor: '#252525',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end',
    color: '#fff',
    padding: '0 0 0 24px',
  },

});


interface PlayBarProps {
  classes: any,
  loadingUrl?: boolean,
  dispatch: (parse: Dispatch) => void,
  type?: string
}

type State = {
  focus: boolean,
  inputValue: string
}


class PlayBar extends Component<PlayBarProps, State> {
  private readonly debounceFetchSuggest: (keywords: string) => void;

  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      focus: false
    }

    this.debounceFetchSuggest = debounce(this.fetchSuggest, 300)

  }


  keyUp = (e: any) => {
    const {dispatch} = this.props
    if (e.keyCode && e.keyCode === 13) {
      this.handleSearch();
      dispatch({
        type: 'global/setState',
        payload: {showGalileo: false}
      })

      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  handleSearch = () => {

    const {inputValue} = this.state
    const {type, dispatch} = this.props

    const s = trim(inputValue)
    if (s) {
      history.push(`/search?keywords=${inputValue}&type=${type}`)
    }

    dispatch({
      type: 'global/setState',
      payload: {keywords: s}
    })

    this.setState({focus: false})

    // this.resetSuggest()

  }

  handleInputChange = (e: any) => {
    const {target: {value}} = e;
    const s = trim(value)


    this.setState({inputValue: s})
    this.debounceFetchSuggest(s)


    // else this.resetSuggest()

  }

  handleInputFocus = () => {
    const {inputValue} = this.state
    this.setState({focus: true})
    if (inputValue) {
      this.debounceFetchSuggest(inputValue)
    }
  }

  handleInputBlur = () => {
    // this.setState({focus: false})

    delay(() => {
      this.setState({focus: false})

    }, 300)

  }

  fetchSuggest = (keywords: string) => {
    const {dispatch} = this.props;
    if (trim(keywords))
      dispatch({
        type: 'song/fetchSearchSuggest',
        payload: {keywords}
      })

  }

  handleExited = () => {
    this.resetSuggest()
  }

  resetSuggest = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'song/setState',
      payload: {
        searchSuggest: {
          order: []
        }
      }
    })
  }

  render() {
    const {classes, dispatch} = this.props
    const {focus} = this.state


    return (
      <div className={classes.pbRoot}>
        <Logo />

        <SearchSuggest show={focus} onExited={this.handleExited}>
          <SimpleInput
            placeholder="搜索(键入Enter搜索)"
            onChange={this.handleInputChange}
            onKeyUp={this.keyUp}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
        </SearchSuggest>

        <Control />

        <Galileo dispatch={dispatch} />

      </div>
    )
  }
}

const mapStateToProps = ({global}: ConnectState) => ({
  // loadingUrl: loading.effects['play/fetchSongUrl'],
  type: global.type
})

const Pb = withStyles(styles)(PlayBar)
// @ts-ignore
export default connect(mapStateToProps)(Pb)
