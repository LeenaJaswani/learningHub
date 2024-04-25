import React, { useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import axios from 'axios'
import '../styles/styles.css'

const InstructorDashboard = () => {
  const instructorId = localStorage.getItem('instructorId')
  const baseURL = "http://localhost:8000/lhapi"
  const [dashboardData, setDashbaordData] = useState([])

  useEffect(() => {
    document.title = 'Instructor Dashboard'
    try {
      const response = axios.get(baseURL + "/instructor/dashboard/" + instructorId)
        .then((response) => {
          setDashbaordData(response.data)
        })
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div className="container mt-4">
      <div className="d-flex flex-row" style={{ flexWrap: 'wrap' }}>
        <aside className='col-md-2'>
          <InstructorSidebar />
        </aside>
        <section className='col-md-10 col-12'>
          <div className="d-flex flex-row justify-content-center flex-wrap">
            <div className="col-md-4 col-12 ms-4 me-4 mb-4">
              <div className="card border-success mb-3 " style={{ maxWidth: "18rem" }}>
                <div className="card-header bg-success text-white">Total Courses</div>
                <div className="card-body  border border-success">
                 <Link to="/instructor-mycourses"> <h5 className="card-title text-success">{dashboardData.total_instructor_courses}</h5>
                 </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 ms-4 mb-4">
              <div className="card mb-3" style={{ maxWidth: "18rem" }}>
                <div className="card-header bg-info  text-white">Total Chapters</div>
                <div className="card-body border border-info">
                <Link to="/instructor-mycourses">   <h5 className="card-title text-info ">{dashboardData.total_instructor_chapters}</h5></Link>
                 
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 ms-4 mb-4">
              <div className="card mb-3" style={{ maxWidth: "18rem" }}>
                <div className="card-header bg-primary text-white">Total Enrolled Students</div>
                <div className="card-body  border border-primary" >
                <Link to="/mystudents">    <h5 className="card-title text-primary">{dashboardData.total_instructor_students}</h5></Link>
                 
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default InstructorDashboard