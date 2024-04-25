import React,{ useEffect,useState } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
import './styles/styles.css'
import { Link } from 'react-router-dom'
const PopularCourses = () => {
  const baseURL="http://localhost:8000/lhapi"
  const [courseData,setCourseData]=useState([]);
  const [nextPage,setNextPage]=useState();
  const [previousPage,setPreviousPage]=useState();
  useEffect(()=>{
    document.title='Popular Courses'
    
      fetchPCourse(baseURL+"/popular-courses/?all=1")
      
  },[])
  const paginationHandler=((url)=>{
    fetchPCourse(url)
  })
  function fetchPCourse(url){
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
       <h3 className="card-header mb-3">Popular Courses</h3>
       {courseData && courseData.map((row,index)=>
    <div className="row mt-2 mb-4" >
  <Link to={"/detail/"+row.course.id} >
 
      <div className="preview-card mb-3" >
        <div className="preview-card__wrp  ">
          <div className="preview-card__item ac">
      
            <div className="preview-card__img">
           
              <img src={row.course.featured_image} alt={row.course.title}/>
             
            </div>
     
            <div className="preview-card__content ">
            <div className="card-header">
              <span className="preview-card__code float-start ms-2">Rating: {row.rating}</span>
                  <span className="preview-card__code float-end">Views: {row.course.course_views}</span>
                </div>
              <div className="preview-card__title">{row.course.title}</div>
              <div className="preview-card__text desc">{row.course.description} </div>
              <Link to={"/detail/"+row.course.id} className="preview-card__button">READ MORE</Link>
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

export default PopularCourses