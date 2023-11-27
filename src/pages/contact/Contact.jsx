import React from 'react'
import './contact.css'


const Contact = () => {
  return (
    <div className='ctn'>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => {
            window.open("https://wa.me/+919425600513");
          }}  >Contact Me</button>
          
          
    </div>
  )
}

export default Contact