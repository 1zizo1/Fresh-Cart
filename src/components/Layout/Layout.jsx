import { useEffect, useState } from 'react'
import Style from './Layout.module.css'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
export default function Layout() {
    const[a,setA]= useState()
    useEffect(()=>{

    },[])
  return (
    <>
    <Navbar/>
    <div className="container mx-auto my-6 pt-0 md:pt-10">
      <Outlet></Outlet>
    </div>
    <Footer/> 
    </>
  )
}
