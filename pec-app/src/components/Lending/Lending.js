import React from 'react'
import Header from '../Header/Header'
import MainButton from '../../shared/MainButton/MainButton'
import "./Lending.css"
import Sidebar from '../Sidebar/Sidebar'
import lendingStuding from "../../pictures/lending-studying.png"
function Lending() {
  return (

   <>
   <div className='lending'> <Header/>
 
<div className='lending-container'>
<  Sidebar />
    <div className="wrapper">
  <div className="lending-large-box">
    <div className='lending-titles-and-image'>
        <div className='lending-titles'>
        <div className='lending-main-title'>
        Fun supported area for learning English 
        </div>
        <div className='lending-extra-title'>
        with co-learn experience
        </div>
        <MainButton
        title={"Try it out"}
        // func={}
        />
       
    </div>
    <img className='lending-image' src={lendingStuding} />
    </div>
    
    
  </div>
  <div className="lending-small-box" style={{gridColumnStart: 1}}>Two</div>
  <div className="lending-small-box"style={{gridColumnStart: 2}}>thee</div>
  <div className="lending-small-box"style={{gridColumnStart: 3}}>thee</div>
  
</div></div>
   


   
   </div>
  
   </>
  )
}

export default Lending