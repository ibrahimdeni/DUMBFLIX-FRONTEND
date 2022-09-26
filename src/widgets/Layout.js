import React from 'react'
import NavigationBar from '../components/NavigationBar'

function Layout(props) {
  return (
    <>
        <NavigationBar />
        {props.children}
    </>
  )
}

export default Layout;