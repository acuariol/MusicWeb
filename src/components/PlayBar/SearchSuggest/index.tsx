import React from 'react'
import {createStyles, makeStyles, Paper, Zoom} from "@material-ui/core";
import cls from "classnames";
import {connect} from 'umi'
import {ConnectState} from "@/models/connect";
import SuggestItem from "../SuggestItem";

const useStyles = makeStyles(() => createStyles({
  suggestBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative'
  },
  suggest: {
    position: 'absolute',
    left: 24,
    top: '100%',
    right: 24,
    overflow: 'hidden',
    zIndex: 'inherit',
    height: 'auto',
  },

}))

type SearchSuggestProps = {
  children?: React.ReactElement,
  show?: boolean,
  data: {
    order: string[],
    [propName: string]: any
  },
  onExited?: () => void
}


function SearchSuggest({children, show, data, onExited}: SearchSuggestProps) {
  const classes = useStyles()

  const inProps = (show && data.order.length !== 0)

  return (
    <div className={classes.suggestBox}>
      {children}
      <Zoom in={inProps} mountOnEnter unmountOnExit onExited={onExited}>
        <Paper className={cls(classes.suggest,)}>
          {
            data.order.map(o => (<SuggestItem key={o} item={data[o]} type={o} />))
          }
        </Paper>
      </Zoom>
    </div>
  )
}

const mapStateToProps = ({song}: ConnectState) => ({
  data: song.searchSuggest
})
export default connect(mapStateToProps)(SearchSuggest)
