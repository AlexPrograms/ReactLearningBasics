import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'


const App = () => {
  return (
    <main> 
      <div className='pattern'/>
      <div className="wrapper">
        <header>
          <img src='./hero-img.png' alt="hero"/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy</h1>
        </header>

          <Search/>
      </div>
    </main>
  )
}

export default App
