import React, {useState} from 'react'
import {createStyles, makeStyles, Theme, Button} from '@material-ui/core';
import FormattedMessage from '@/components/FormattedMessage'
import Line from './Line'
import {NormalNotice} from './Notice'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0 30px 0'
  },
  title: {
    fontWeight: 'bold',
    display: 'inline-block',
    paddingRight: 12,
  },
  new: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '4px 6px',
    verticalAlign: 'center',
    borderRadius: 4
  },
  textBox: {
    display: 'flex',
    alignItems: 'center',
  },
  more: {
    fontWeight: 'bold',
  }
}))

interface CollectionTitleProps {
  title: string|React.ReactElement,
  allowClickMore?: boolean,
  onMoreClick?: () => void,
  style?: any
  moreText?: any
}

export default (props: CollectionTitleProps) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false);

  const handleMoreClick = () => {
    if (!props.allowClickMore) setOpen(true)
    if (typeof props.onMoreClick === 'function') props.onMoreClick();
  }

  return (
    <div style={props.style}>
      {open && <NormalNotice message="暂未开放更多" open={open} onClose={() => setOpen(false)} />}
      <div className={classes.root}>
        <Line />
        <div className={classes.content}>
          <div className={classes.textBox}>
            <h1 className={classes.title}>{props.title}</h1>
            <span className={classes.new}>NEW</span>
          </div>
          <Button className={classes.more} onClick={handleMoreClick}>
            {props.moreText ||<FormattedMessage id="component.more"/> }

          </Button>
        </div>
      </div>
    </div>
  )
}
