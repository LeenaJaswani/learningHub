import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="card">
    <h5 className='card-header '>Dashboard</h5>
    <div className="list-group list-group-flush">
    <Link to="/dashboard" className="list-group-item list-group-item-action" aria-current="true">
       Dashboard
      </Link>
      <Link to="/mycourses" className="list-group-item list-group-item-action" aria-current="true">
        My Courses
      </Link>
      <Link to="/favcourses" className="list-group-item list-group-item-action" aria-current="true">
        Favourite Courses
      </Link>
      <Link to="/recommendedcourses" className="list-group-item list-group-item-action" aria-current="true">
        Recommended Courses
      </Link>
      <Link to="/psettings" className="list-group-item list-group-item-action" aria-current="true">
        Profile Settings
      </Link>
      <Link to="/chngpswd" className="list-group-item list-group-item-action" aria-current="true">
        Change Password
      </Link>
      <Link to="/logout" className="list-group-item list-group-item-action text-danger" aria-current="true">
        Logout
      </Link>
    </div>
  </div>
  )
}

export default Sidebar