import React from 'react'
// import {makeStyles, createStyles, Theme} from '@material-ui/core'
// import {PageLoading} from '@ant-design/pro-layout'
import TopBarProgress from "react-topbar-progress-indicator";


// const useStyles = makeStyles((theme: Theme) => createStyles({
//   root: {
//     display: 'inline-block',
//     backgroundColor: theme.palette.primary.main,
//     borderRadius: '50%',
//     width: '1.2rem',
//     height: '1.2rem',
//     position:'relative',
//     '&::before':{
//       position:'absolute',
//       content:'""',
//       top:0,
//       left:0,
//       width: '100%',
//       height:'100%',
//       backgroundColor:'inherit',
//       borderRadius:'inherit',
//       animation: '$wave 2.5s ease-out infinite',
//     },
//   },
//
//   root2:{
//     display: 'inline-block',
//     transform: 'rotate(75deg)',
//     width: '15px',
//     height: '15px',
//     // backgroundColor: theme.palette.primary.main,
//     '&::before, &::after':{
//       position:'absolute',
//       content:'""',
//       top:'50%',
//       left:'50%',
//       width: '100%',
//       height:'100%',
//
//       borderRadius:'15px',
//       transform:'translate(-50%,-50%)',
//       animation: '$loading 1.5s linear infinite',
//     },
//     '&::before':{
//       boxShadow:'15px 15px #e77f67, -15px -15px #778beb'
//     },
//     '&::after':{
//       boxShadow:'15px 15px #f8a5c2, -15px -15px #f5cd79',
//       transform: 'translate(-50%,-50%) rotate(90deg)',
//     },
//
//
//   },
//
//
//   '@keyframes wave': {
//     '50%, 70%': {
//      transform:'scale(2)'
//     },
//     '80%, 100%': {
//      opacity:0
//     }
//   },
//
//   '@keyframes loading': {
//
//     '50%': {
//       height:45
//     },
//
//   },
// }))

TopBarProgress.config({
  barColors: {
    "0": "#F6D242",
    "1.0": "#FF52E5"
  },
  shadowBlur: 5
});


// <div style={{paddingTop: 100, textAlign: 'center'}}>
//   <div className={classes.root} />
// </div>

export default () => {
  // const classes = useStyles()
  return (
    <TopBarProgress />
  )
}
