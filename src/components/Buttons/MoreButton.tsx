import React from 'react'
import {CardActionArea, createStyles, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    loadingMore: {
      padding: 12,
      backgroundColor: '#121212',
      color: '#8b8b8b'
    },
  })
)

type Props = {
  onClick?: () => void,
  hidden?: boolean,
  title?: any
}

function MoreButton({onClick, hidden, title}: Props) {
  const classes = useStyles()
  return (
    <CardActionArea onClick={onClick} hidden={hidden}>
      <div className={classes.loadingMore}>
        <Typography variant="body2" align="center">
          {title || '更多'}
        </Typography>
      </div>
    </CardActionArea>
  )

}

export default MoreButton
