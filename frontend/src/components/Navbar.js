import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery,setSearchQuery]=useState({
    'search':''
  })

  const navigate=useNavigate()
  const instructorLoginStatus=localStorage.getItem('instructorLoginStatus')
  const studentLoginStatus=localStorage.getItem('studentLoginStatus')
  const handleChange=(e)=>{
    setSearchQuery({
      ...searchQuery,
      [e.target.name]:e.target.value

    })
  }
  const searchCourse=()=>{
   if (searchQuery.search!=''){
    navigate("/search/"+searchQuery.search)
  }
  
}
// const handleKeyPress = (e) => {
//   if (e.key === 'Enter') {
//     searchCourse(e);
//   }
// };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Learning Hub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allcourses">Courses </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">Categories</Link>
            </li>
           
          </ul>
          <div className="d-flex align-items-center flex-grow-1"> 
            <form className="d-flex mx-auto"> 
              <input name="search"    onChange={handleChange} className="form-control me-2"  placeholder="Search Course" aria-label="Search" style={{ minWidth: "400px" }}/>
              <button className="btn btn-outline-light search" type="submit" onClick={searchCourse} >Search</button>
            </form>
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Instructor
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {instructorLoginStatus!=='true' &&  
               <> <li><Link className="dropdown-item search" to="/instructor-login" >Login</Link></li>
                <li><Link className="dropdown-item search" to="/instructor-signup" >Signup</Link></li>
                </>
                }
                {/* <li><hr className="dropdown-divider " /></li> */}
               {instructorLoginStatus==='true' &&  
               
               <> <li><Link className="dropdown-item search" to="/instructor-dashboard">Dashboard</Link></li>
                <li><Link className="dropdown-item search" to="/instructor-logout">Logout</Link></li>
              </>}
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Student
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
              {studentLoginStatus!=='true' &&  
               <>  <li><Link className="dropdown-item search" to="/student-login" >Login</Link></li>
               <li><Link className="dropdown-item search" to="/student-signup" >Signup</Link></li>
                </>
                }
               
                {/* <li><hr className="dropdown-divider " /></li> */}
                {studentLoginStatus==='true' &&  <>
                <li><Link className="dropdown-item search" to="/student-dashboard">Dashboard</Link></li>
                <li><Link className="dropdown-item search" to="/student-logout">Logout</Link></li>
                </>}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
