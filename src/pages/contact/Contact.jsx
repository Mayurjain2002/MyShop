import React from 'react'
import './contact.css'


const Contact = () => {
  return (
    <div className='ctn'>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => {
            window.open("https://wa.me/+918602119424");
          }}  >Contact Me</button>
          
          
    </div>
  )
}

export default Contact