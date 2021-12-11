import React from 'react'
import styles from './Loading.module.css'
import loadingGif from '../assets/loading.gif'

const Loading: React.VFC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingText}>
        LOADING...
        <img src={loadingGif} alt="" />
      </div>
    </div>
  )
}

export default Loading
