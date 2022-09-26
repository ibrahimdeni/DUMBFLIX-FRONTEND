import React from 'react'
import NavbarAdm from '../components/NavigationAdmin'

function LayoutAdm(props) {
  return (
    <>
        <NavbarAdm />
        {props.children}
    </>
  )
}

export default LayoutAdm;