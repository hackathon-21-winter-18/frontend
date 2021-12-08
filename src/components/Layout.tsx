import React from 'react'
import {Outlet} from 'react-router'
import Header from './Header'

const Layout: React.VFC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
