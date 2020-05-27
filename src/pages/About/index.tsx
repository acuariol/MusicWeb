import React from 'react'
import {createStyles, Link, makeStyles, Theme, Typography} from '@material-ui/core'
import * as defaultSettings from '../../../config/defaultSettings'

const useStyles = makeStyles((theme: Theme) => createStyles({
  link: {
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  content:{
    width:'100%',
    height:'50%',
    display:'flex',
    justifyContent:'center',
    flexDirection:'column'
  }
}))

const About: React.FC = () => {


  const classes = useStyles()
  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        {defaultSettings.default.appName}
      </Typography>

      <div className={classes.content}>


      <Typography gutterBottom align="center">
        本网站开源，你可以在Github找到此项目
        <Link
          variant="body1"
          href="https://github.com/acuariol/beatz"
          color="primary"
          target="_blank"
          rel="noopener"
          className={classes.link}
        >
          Beatz
        </Link>。
        此网站及其内容，仅用于学习交流，禁止拷贝二次开发用于商业用途。如本网站侵犯了你的合法权益，请与我联系
        me@acuario.cn
      </Typography>

      <Typography gutterBottom align="center">
        灵感来源：
        <Link
          variant="body1" className={classes.link} href="https://github.com/Binaryify/NeteaseCloudMusicApi"
          color="primary" target="_blank" rel="noopener"
        >
          Binaryify
        </Link>

        <Link
          variant="body1" className={classes.link}
          href="https://www.behance.net/gallery/28753979/Beatz-Online-Music-Concept-%28Free-PSD%29"
          color="primary"
          target="_blank"
          rel="noopener"
          style={{paddingLeft:'1rem'}}
        >
          Gouse Mohammed
        </Link>
      </Typography>

        <Typography variant="body2" align="center" color="textSecondary">
          Thank You
        </Typography>

      </div>

    </div>
  )
}

export default About
