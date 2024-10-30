import React from 'react'
import { fetchData } from '../helpers'
import { Outlet, useLoaderData } from 'react-router-dom'
import Navbar from '../components/Navbar'
import wave from "../assets/wave.svg";

function Main() {
    
    const {userName} = useLoaderData()

  return (
    <>
    <div className='layout'>
        <Navbar userName={userName} />
        <main>
            <Outlet />
        </main>
        <img src={wave} />
    </div>
    </>
  )
}

export default Main


export const mainLoader = () => {
    const userName = fetchData("userName")
    return {userName}
}