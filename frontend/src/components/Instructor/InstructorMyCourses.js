import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'

const InstructorMyCourses = () => {
  const [courseData, setCourseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(3);
  const baseURL = "http://localhost:8000/lhapi"
  const instructorId = localStorage.getItem('instructorId')

  useEffect(() => {
    document.title = 'My Courses'
    try {
      axios.get(baseURL + "/instructor-courses/" + instructorId)
        .then((response) => {
          setCourseData(response.data)
        })
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleDelete = (courseId) => {
    Swal.fire({
      title: 'Confirm',
      text: 'Are You Sure You want to delete this course',
      icon: 'info',
      confirmButtonText: 'Continue',
      showCancelButton: true,
      showCloseButton: true,
      height: 100,
      width: 350,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseURL + '/instructor-course-detail/' + courseId)
            .then(() => {
              setCourseData(prevCourses => prevCourses.filter(course => course.id !== courseId));
              Swal.fire('Success', 'Course Deleted');
            });
        } catch (error) {
          Swal.fire('error', 'Something went Wrong');
        }
      } else {
        Swal.fire('error', 'Something went Wrong');
      }
    });
  };

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courseData.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className='col-md-3'>
          <InstructorSidebar />
        </aside>
        <section className='col-md-9 ' style={{marginTop:"-15px"}}>
          <div className="card cv ">
            <div className="card-body  ms-4">
              <h3 className="card-header bg-transparent border-0">My Courses</h3>
              <div className="row">
                {currentCourses.map((course, index) => (
                  <div className="col-12 mb-4" key={course.id}>
                    
                    <div className="card w-100 shadow" style={{ borderColor: '#5161ce !important', borderWidth: '25px', borderRadius: '10px' }}>
                      <div className="row no-gutters">
                        <div className="col-md-3 d-flex align-items-center justify-content-center">
                          <img src={course.featured_image} className="card-img rounded-circle" alt={course.title} style={{ width: '100px', height: '100px' }} />
                        </div>
                        
                        <div className="col-md-9">
                          
                          <div className="card-body">
                          <p className="float-end">
                            <button className="btn btn-danger ms-2 mb-2" onClick={() => handleDelete(course.id)}>
                                <i className="bi bi-trash-fill danger"></i>
                              </button>
                            </p>
                            <h5 className="card-title">
                              <Link to={"/course-chapters/" + course.id}>{course.title}</Link>
                            </h5>
                            <p className="card-text">
                           Ratings: <em>  {course.course_rating ? `${course.course_rating}/5` : 'No Ratings'}</em> 
                            </p>
                            <p className="card-text">
                            Enrolled Students: <strong><Link to={"/enrolled-students/" + course.id}> {course.total_enrolled_students}</Link></strong>
                            </p>
                          
                            <div className="d-flex flex-wrap justify-content-center">
                              
                              <Link to={`/add-chapter/${course.id}`}>
                                <button className="btn btn-dark btn-block ms-2 mb-2  hovc">Add Chapter</button>
                              </Link>
                              <Link to={`/update-course/${course.id}`}>
                                <button className="btn btn-secondary ms-2 mb-2 hovco">Update course</button>
                              </Link>
                              <Link to={`/assign-quiz/${course.id}`}>
                                <button className="btn btn-dark btn-block ms-2 mb-2 ho">Assign Quiz</button>
                              </Link>
                              <Link to={`/study-materials/${course.id}`}>
                                <button className="btn   ms-2 hovcos">Study Material</button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  {Array.from({ length: Math.ceil(courseData.length / coursesPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(pageNumber)}>
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default InstructorMyCourses