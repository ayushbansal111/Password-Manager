import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Back from './components/Back'
import Footer from './components/Footer'

function App() {


  return (
    <>
    <div className="bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_10%,#63e_120%)]">
    <Navbar/>
    <Back/>
    </div>
    <Footer/>
      
    </>
  )
}

export default App
