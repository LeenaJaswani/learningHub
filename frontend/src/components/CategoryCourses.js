import React,{ useEffect,useState } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
import './styles/styles.css'
import { Link,useParams } from 'react-router-dom'
const CategoryCourses = () => {
  const baseURL="http://localhost:8000/lhapi"
  const [courseData,setCourseData]=useState([]);
  const [nextPage,setNextPage]=useState();
  const [previousPage,setPreviousPage]=useState();
  const {categoryId,categorySlug}=useParams()
  useEffect(()=>{
    document.title='Category Courses'
   fetchCCourse(baseURL+"/course/?category="+categoryId)
      
  },[])
  const paginationHandler=((url)=>{
    fetchCCourse(url)
  })
  function fetchCCourse(url){
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
  // console.log(courseData)
  return (
    <div className="container">
    <div className="row mt-2 mb-4" >
  <h3 className="card-header mb-3"> {categorySlug} Courses</h3>
      {courseData && courseData.map((course,index)=>
       <Link to={"/detail/"+course.id}>
      <div key={course.id} className="preview-card mb-3 ac " >
        <div className="preview-card__wrp  ">
          <div className="preview-card__item ac">
            <div className="preview-card__img">
              <img src={course.featured_image} alt=""/>
            </div>
            <div className="preview-card__content ms-2">
            <div className="card-header">
              <span className="preview-card__code float-start">Rating: 4.5/5</span>
                  <span className="preview-card__code float-end">Enrolled: 245</span>
                </div>
              <div className="preview-card__title">{course.title}</div>
              <div className="preview-card__text desc">{course.description} </div>
              <Link to={"/detail/"+course.id} className="preview-card__button">READ MORE</Link>
            </div>
          </div>
        
        </div>
      </div>
      </Link>
      )}
 
  
  
    </div>
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

export default CategoryCourses