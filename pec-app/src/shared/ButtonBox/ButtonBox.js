import React from 'react'
import "./ButtonBox.css"
function ButtonBox({title, color, funct}) {
  return (
    <div className='button-box' style={{backgroundColor: color}} onClick={funct}>
{title }
    </div>
  )
}

export default ButtonBox