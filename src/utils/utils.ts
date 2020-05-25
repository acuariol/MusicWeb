import {parse} from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const formatNumber = (n: any) => {
  const s = n.toString()
  return s[1] ? s : `0${s}`
}

export const formatNumToTenThousand = (n: any) => {
  if (typeof n !== 'number') return 0
  if (n >= 100000)
    return `${Math.floor((n / 100000) * 10) / 10}万`
  return n
}

export const formatMilliSeconds = (milliSeconds: any): string => {
  if (milliSeconds === 0 || typeof milliSeconds !== 'number') return '00:00'
  let second = Math.round(milliSeconds / 1000)
  const minute = Math.floor(second / 60)
  second = Math.round(second % 60);
  return `${formatNumber(minute)}:${formatNumber(second)}`;
}

export const formatTime = (timeStamp: number, detail?: boolean): string => {
  const date = new Date();
  date.setTime(timeStamp);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const s = detail ? [hour, minute, second].map(formatNumber).join(':') : ''

  return `${[year, month, day].map(formatNumber).join('-')} ${s}`
}

export const getPageQuery = () => parse(window.location.href.split('?')[1]);


