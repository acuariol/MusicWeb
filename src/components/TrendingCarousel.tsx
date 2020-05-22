import React, {useState} from 'react'
import ArrowBackIosIcon from '@material-ui/icons/NavigateBefore';
import ArrowForwardIosIcon from '@material-ui/icons/NavigateNext';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css'
import cls from 'classnames'
import {createStyles, IconButton, makeStyles, CardMedia,} from "@material-ui/core";
import {NormalNotice} from './Notice'

const useStyles = makeStyles(() =>
  createStyles({
    wrap: {
      position:'absolute',
      top:0,
      left:0,
      right:0
    },
    swiperContainer: {
      width: '100%',
      height: 'auto',
      overflow:'hidden'
    },
    img: {
      width: '100%',
      height: 0,
      paddingTop: '37.03%',
      backgroundSize: 'contain'
    },

    navIcon: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: '#fff',
      zIndex: 2,
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.5)',
      }
    },
    leftIcon: {
      left: 20
    },
    rightIcon: {
      right: 20
    }
  }),
)
const params = {
  autoplay: {
    delay: 4500,
    disableOnInteraction: false
  },
  lazy: true,
}

export interface BannersItemProps {
  targetId: number,
  imageUrl: string,
  targetType: number,
  typeTitle?: string,
  url?: string,
}

interface TrendingCarouselProps {
  banners: BannersItemProps[]
}

export default ({banners}: TrendingCarouselProps) => {
  const classes = useStyles();
  const [swiper, setSwiper] = useState(null);

  const [open, setOpen] = useState(false);

  const goNext = () => {
    if (swiper !== null) {
      // @ts-ignore
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      // @ts-ignore
      swiper.slidePrev();
    }
  };

  const hanldeSwiperItemClick = (item: BannersItemProps) => {

    const {targetType, targetId, url} = item;

    if (targetType === 1004) {
      window.open(`https://music.163.com/#/mv?id=${targetId}`, '_block')
      return
    }

    if (targetType === 1) {
      window.open(`https://music.163.com/#/song?id=${targetId}`, '_block')
      return
    }

    // 自带url
    if (targetType === 3000) {
      window.open(url, '_block');
      return
    }
    // 专辑
    if (targetType === 10) {
      window.open(`https://music.163.com/#/album?id=${targetId}`, '_block')
      return
    }

    setOpen(true)

  }

  return (
    <>
      <NormalNotice open={open} onClose={() => setOpen(false)} />
      <div className={classes.wrap}>

        <IconButton className={cls(classes.navIcon, classes.leftIcon)} onClick={goPrev}>
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton className={cls(classes.navIcon, classes.rightIcon)} onClick={goNext}>
          <ArrowForwardIosIcon />
        </IconButton>

        <Swiper {...params} getSwiper={setSwiper} shouldSwiperUpdate containerClass={classes.swiperContainer}>
          {
            banners.map((o: BannersItemProps) => (
              <div key={o.imageUrl} onClick={() => hanldeSwiperItemClick(o)}>
                <CardMedia className={classes.img} image={o.imageUrl} />
              </div>)
            )
          }
        </Swiper>
      </div>
    </>
  )
}
