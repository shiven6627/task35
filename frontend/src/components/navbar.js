import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <header>
<div className='container'>
        <Link to='/'>
        <h1>navbar </h1>
        </Link>
    </div> 
    </header>
     )
}

export default navbar
