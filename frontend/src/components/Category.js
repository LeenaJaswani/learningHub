import React,{ useEffect,useState } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
import './styles/styles.css'
import { Link,useParams } from 'react-router-dom'
const Category = () => {
  const baseURL="http://localhost:8000/lhapi"
  const [categoryData,setCategoryData]=useState([]);
  const [nextPage,setNextPage]=useState();
  const [previousPage,setPreviousPage]=useState();
  useEffect(()=>{
    document.title='Category'

        fetchCategory(baseURL+"/category/")
     
  },[])
  const paginationHandler=((url)=>{
    fetchCategory(url)
  })
  console.log(categoryData)
  function fetchCategory(url){
    try{
      axios.get(url)
      .then((response)=>{
        setNextPage(response.data.next)
    
        setPreviousPage(response.data.previous)
          setCategoryData(response.data.results)
        
      })
    }catch(error){
      console.error(error)
    }
  }
  return (
    <div className="container">
    <div className="row mt-2 mb-4" >
  <h3 className="card-header mb-3">Categories</h3>
      {categoryData && categoryData.map((course,index)=>
       <div key={index} className="col-lg-4 col-md-6 mb-3">
      <div className="preview-card mb-3 ac " >
        <div className="preview-card__wrp  ">
          <div className="preview-card__item ac">

            <div className="preview-card__content ms-2">
          
              <div className="preview-card__title">{course.title}</div>
              <div className="preview-card__text fw-bold">{course.total_category_courses} Courses</div>
              <div className="preview-card__text desc">{course.description} </div>
              <Link to={"/course/"+course.id+"/"+course.title} className="preview-card__button">READ MORE</Link>
            </div>
          </div>
        
        </div>
      </div>
   </div>
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

export default Category