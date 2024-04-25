import React, { useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import axios from 'axios'
import '../styles/styles.css'

const StudentDashboard = () => {
  const studentId = localStorage.getItem('studentId')
  const baseURL = "http://localhost:8000/lhapi"
  const [dashboardData, setDashbaordData] = useState([])

  useEffect(() => {
    document.title = 'Student Dashboard'
    try {
      const response = axios.get(baseURL + "/student/dashboard/" + studentId)
        .then((response) => {
          setDashbaordData(response.data)
        })
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div className="container mt-4">
      <div className="d-flex flex-row me-5" style={{ flexWrap: 'wrap' }}>
        <aside className='col-md-2 col-12 '>
          <StudentSidebar />
        </aside>
        <section className='col-md-10 col-10' >
          <div className="d-flex flex-row justify-content-center flex-wrap" >
            <div className="col-md-4 col-sm-12 ms-5 me-5  mb-4">
              <div className="card border-success mb-3 " style={{ maxWidth: "18rem" }}>
                <div className="card-header bg-success text-white">Enrolled Courses</div>
                <div className="card-body border border-success">
                 <Link to="/student-mycourses"> <h5 className="card-title text-success">{dashboardData.total_enrolled_courses}</h5>
                 </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 ms-5 mb-4">
              <div className="card mb-3" style={{ maxWidth: "18rem" }}>
                <div className="card-header bg-info text-white">Favorite Courses</div>
                <div className="card-body border border-info">
                <Link to="/favcourses">   <h5 className="card-title text-info" >{dashboardData.total_favorite_courses}</h5></Link>
                 
                </div>
              </div>
            </div>
      
          </div>
        </section>
      </div>
    </div>
  )
}

export default StudentDashboard