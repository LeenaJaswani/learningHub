import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/styles.css';
const InstructorSidebar = () => {
  const instructorId = localStorage.getItem('instructorId')
  return (
    <div className="card" style={{width:"250px"}}>
    <h5 className='card-header'>Dashboard</h5>
    <div className="list-group list-group-flush">
    <Link to="/instructor-dashboard" className="list-group-item list-group-item-action" aria-current="true">
       Dashboard
      </Link>
      <Link to="/instructor-mycourses" className="list-group-item list-group-item-action" aria-current="true">
        My Courses
      </Link>
      <Link to="/addcourses" className="list-group-item list-group-item-action" aria-current="true">
       Add Courses
      </Link>
      <Link to="/iquiz" className="list-group-item list-group-item-action " aria-current="true">
        Quiz
      </Link>
      <Link to="/addquiz" className="list-group-item list-group-item-action " aria-current="true">
        Add Quiz
      </Link>
      <Link to="/mystudents" className="list-group-item list-group-item-action" aria-current="true">
        My Students
      </Link>
      <Link to="/instructor-psettings" className="list-group-item list-group-item-action" aria-current="true">
        Profile Settings
      </Link>
      <Link to={"/instructor-change-pswd/"+instructorId} className="list-group-item list-group-item-action" aria-current="true">
        Change Password
      </Link>
      <Link to="/instructor-logout" className="list-group-item list-group-item-action text-danger" aria-current="true">
        Logout
      </Link>

    </div>
  </div>
  )
}

export default InstructorSidebar