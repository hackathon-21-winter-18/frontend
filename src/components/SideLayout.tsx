import React from 'react'
import styles from './SideLayout.module.css'
import {Outlet} from 'react-router'
import Sidebar from './Sidebar'

const SideLayout: React.VFC = () => {
  return (
    <div className={styles.sideLayout}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default SideLayout
