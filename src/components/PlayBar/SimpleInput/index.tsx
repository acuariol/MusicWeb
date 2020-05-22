import React from 'react'
import {makeStyles, TextField, createStyles, Theme, fade, InputAdornment} from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'center',
      margin: '0 24px',
      '& .MuiInput-root': {
        height: 46,
        backgroundColor: fade('rgb(55,55,55)', 0.7),
        '&:hover': {
          backgroundColor: fade('rgb(55,55,55)', 1),
        },

      },
      '& .MuiInput-input': {
        width: 220,

        transition: theme.transitions.create('width'),
        padding: '0 12px',
        fontSize: '1rem',

        color: '#7f7f7f',
        '&:focus': {
          width: 420,
          color: '#fff',
        },
      },


    },
    icon: {
      color: '#7f7f7f',
      padding: '0 0 0 20px'
    }
  })
);

const SimpleInput = (props: any) => {

  const classes = useStyles()
  return (
    <TextField
      classes={{root: classes.root}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" className={classes.icon}>
            <SearchIcon color="inherit" />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

export default SimpleInput
