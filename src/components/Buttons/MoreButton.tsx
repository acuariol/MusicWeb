import React from 'react'
import {CardActionArea, createStyles, makeStyles, Typography} from "@material-ui/core";
import FormattedMessage from '@/components/FormattedMessage'

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
  onClick?: (arg?:any) => void,
  hidden?: boolean,
  title?: any
}

function MoreButton({onClick, hidden, title}: Props) {
  const classes = useStyles()
  return (
    <CardActionArea onClick={onClick} hidden={hidden}>
      <div className={classes.loadingMore}>
        <Typography variant="body2" align="center">
          {title || <FormattedMessage id="component.more"/>}
        </Typography>
      </div>
    </CardActionArea>
  )

}

export default MoreButton
