import React from 'react'
import styles from "./styles.less";

type Props= {
  children?:React.ReactElement
}

export default ({children}:Props) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
