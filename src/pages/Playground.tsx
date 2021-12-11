import React, {useEffect, useState} from 'react'
import styles from './Playground.module.css'
import {useLocation} from 'react-router'
import {Edit} from './Edit'

const Playground: React.VFC = () => {
  return (
    <div className={styles.playground}>
      <h1>Playground</h1>
      <div className={styles.divider} />
      <Edit imageUrl="https://www.juken-net.com/main/wp-content/uploads/2017/07/mizu.png" />
    </div>
  )
}

export default Playground
