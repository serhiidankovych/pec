import React from 'react'

function SmallBox({colNum, title, image, func}) {
  return (
    <div className="lending-small-box" style={{gridColumnStart: colNum}}>
        <div>
            <div>{title}</div>
            <img src={ image}></img>
        </div>
    </div>
  )
}

export default SmallBox