import React from 'react';
import zh_CN from '@/locales/zh-CN'

export default ({id}: { id: string }):React.ReactElement => {
  return <>{zh_CN[id]}</>
}

