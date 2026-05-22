import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../../pages/commonComponents/Navbar';
import Footer from '../../pages/commonComponents/Footer'

const MainLayout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default MainLayout