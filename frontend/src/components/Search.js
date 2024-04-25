import React,{ useEffect,useState } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
import './styles/styles.css'
import { Link,useParams } from 'react-router-dom'
const Search = () => {
  const baseURL="http://localhost:8000/lhapi"
  const [courseData,setCourseData]=useState([]);
  const {searchQuery}=useParams()
  useEffect(()=>{
    document.title='All Courses'
    try{
      axios.get(baseURL+"/search-courses/"+searchQuery)
      .then((response)=>{
       
          setCourseData(response.data)
        
      })
    }catch(error){
      console.error(error)
    }
  },[])
  console.log(courseData)

  return (
    <div className="container">
       <h3 className="card-header mb-3">Searches for "{searchQuery}"</h3>
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
              <span className="preview-card__code float-start ms-2">Rating: 4.5/5</span>
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

    </div>
    )}
  
    {/* pagination */}
    <nav aria-label="Page navigation example">
  <ul className="pagination mb-5  justify-content-center">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
  </div>
  )
}

export default Search