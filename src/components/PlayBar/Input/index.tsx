import {withStyles, TextField, createStyles, Theme} from '@material-ui/core';


const InputField = withStyles(createStyles((theme: Theme) => ({
  root: {
    justifyContent: 'center',
    width: 0,
    marginRight: 0,
    transition:'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '& .MuiInput-root': {
      height: 46,
      backgroundColor: 'rgb(55,55,55)',
    },
    '& .MuiInput-input': {
      padding: '0 12px',
      fontSize: '1rem',
      // fontWeight: '',
      color: '#fff'
    },

    '& label.Mui-focused': {
      color: '#fff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
})))(TextField);

export default InputField
