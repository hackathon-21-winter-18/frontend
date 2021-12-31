import React from 'react'
import styles from './Playground.module.css'
import {Edit} from './Edit'

const Playground: React.VFC = () => {
  return (
    <div className={styles.playground}>
      <h1>Playground</h1>
      <div className={styles.divider} />
      <Edit
        imageUrl="https://www.juken-net.com/main/wp-content/uploads/2017/07/mizu.png"
        isPlayground={true}
        xGap={300}
        yGap={42}
      />
    </div>
  )
}

export default Playground
