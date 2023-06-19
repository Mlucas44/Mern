import React from 'react'
import Home from './../components/Home/Home' 

const HomePage = ({ userInfo }) => {

  return (
    <>
    <Home userInfo={userInfo}/>
    </>
  )
}

export default HomePage