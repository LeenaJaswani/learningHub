import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/styles.css';
const StudentSidebar = () => {
  const studentId = localStorage.getItem('studentId')
  return (
    <div className="card" style={{width:"250px"}}>
    <h5 className='card-header'>Dashboard</h5>
    <div className="list-group list-group-flush">
    <Link to="/student-dashboard" className="list-group-item list-group-item-action" aria-current="true">
       Dashboard
      </Link>
      <Link to="/student-mycourses" className="list-group-item list-group-item-action" aria-current="true">
        My Courses
      </Link>
      <Link to="/favcourses" className="list-group-item list-group-item-action" aria-current="true">
        Favourite Courses
      </Link>
      <Link to="/recommendedcourses" className="list-group-item list-group-item-action" aria-current="true">
        Recommended Courses
      </Link>
      <Link to="/myinstructors" className="list-group-item list-group-item-action " aria-current="true">
        My Instructors
      </Link>
      <Link to="/student-psettings" className="list-group-item list-group-item-action" aria-current="true">
        Profile Settings
      </Link>
      <Link to={"/student-change-pswd/"+studentId} className="list-group-item list-group-item-action" aria-current="true">
        Change Password
      </Link>
      <Link to="/student-logout" className="list-group-item list-group-item-action text-danger" aria-current="true">
        Logout
      </Link>
    </div>
  </div>
  )
}

export default StudentSidebar