import React,{ useEffect,useState } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
import './styles/styles.css'
import { Link } from 'react-router-dom'
const TopInstructors = () => {
  const baseURL="http://localhost:8000/lhapi"
  const [instructorData,setInstructorData]=useState([]);
  const [nextPage,setNextPage]=useState();
  const [previousPage,setPreviousPage]=useState();
  useEffect(()=>{
    document.title='Top Instructors'
    fetchInstructor(baseURL+"/top-instructors/?all=1")
      
  },[])
  const paginationHandler=((url)=>{
    fetchInstructor(url)
  })
  function fetchInstructor(url){
    try{
      axios.get(url)
      .then((response)=>{
        setNextPage(response.data.next)
    
        setPreviousPage(response.data.previous)
        setInstructorData(response.data.results)
        
      })
    }catch(error){
      console.error(error)
    }
  }
  return (
    <div className="container">
       <h3 className="card-header mb-3">Top Instructors</h3>
       {instructorData && instructorData.map((instructor,index)=>
    <div className="row mt-2 mb-4" >
  <Link to={"/instructor-detail/"+instructor.id} >
 
      <div className="preview-card mb-3" >
        <div className="preview-card__wrp  ">
          <div className="preview-card__item ac">
      
            <div className="preview-card__img">
           
              <img src={instructor.profile_image} alt={instructor.full_name}/>
             
            </div>
     
            <div className="preview-card__content ">
            <div className="card-header">
             
            <div className="preview-card__title">{instructor.full_name}</div>
            <span className="preview-card__code ">Total Courses: {instructor.total_instructor_courses}</span>
                </div>
             
             
              <div className="preview-card__text desc">{instructor.bio} </div>
               <Link to={"/instructor-detail/"+instructor.id}  className="preview-card__button">READ MORE</Link>
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

export default TopInstructors