import React,{ useEffect,useState } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
import './styles/styles.css'
import { Link } from 'react-router-dom'
const AllCourses = () => {
  const baseURL="http://localhost:8000/lhapi/course"
  const [courseData,setCourseData]=useState([]);

  const [nextPage,setNextPage]=useState();
  const [previousPage,setPreviousPage]=useState();
  useEffect(()=>{
    document.title='All Courses'
   fetchCourse(baseURL)
  },[])
  const paginationHandler=((url)=>{
    fetchCourse(url)
  })
  function fetchCourse(url){
    try{
      axios.get(url)
      .then((response)=>{
        setNextPage(response.data.next)
    
        setPreviousPage(response.data.previous)
          setCourseData(response.data.results)
        
      })
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className="container">
       <h3 className="card-header mb-3">Latest Courses</h3>
       {courseData && courseData.map((course,index)=>
    <div className="row mt-2 mb-4" >
  <Link to={"/detail/"+course.id} >
 
      <div className="preview-card mb-3" >
        <div className="preview-card__wrp  ">
          <div className="preview-card__item ac">
      
            <div className="preview-card__img">
           
              <img src={course.featured_image} alt={course.title}/>
             
            </div>
     
            <div className="preview-card__content ">
            <div className="card-header">
              <span className="preview-card__code float-start ms-2">Rating: {(Math.floor(course.course_rating)) || "No Ratings yet"}</span>
                  <span className="preview-card__code float-end">Enrolled: {course.total_enrolled_students}</span>
                </div>
              <div className="preview-card__title">{course.title}</div>
              <div className="preview-card__text desc">{course.description} </div>
              <Link to={"/detail/"+course.id} className="preview-card__button">READ MORE</Link>
            </div>
          </div>
        
        </div>
      </div>
   
      </Link>

    </div>
    )}
  
    {/* pagination */}
    <nav aria-label="Page navigation example">
  <ul className="pagination mb-5  justify-content-center">
    {previousPage &&
    <li className="page-item">
      <button className="page-link" onClick={()=>paginationHandler(previousPage)} aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        &nbsp;Previous</button>
    </li>
    }
    {nextPage &&
  
    
    <li className="page-item">
      <button className="page-link"  onClick={()=>paginationHandler(nextPage)}  aria-label="Next">
      Next <span aria-hidden="true">&raquo;</span>
      </button>
    </li>
    }
  </ul>
</nav>
  </div>
  )
}

export default AllCourses