import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
 <div className="container" style={{marginTop:"100px"}}>

  <div class="container">
  <footer class="d-flex flex-wrap justify-content-between align-items-center   border-top footer">
    <p className="px-2 py-1 ">© 2024  LearningHub</p>

    

    <ul class="nav col-md-4 justify-content-end">
    <li className=""><Link to="/" className="nav-link px-2 pt-1 pb-3  text-white">Home</Link></li>
  
      <li className=""><Link to="/faqs" className="nav-link px-2 pt-1 pb-3 text-white">FAQs</Link></li>   
    </ul>
  </footer>
</div>
  </div>
  )
}

export default Footer