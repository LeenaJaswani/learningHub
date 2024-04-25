import React,{useEffect,useState} from 'react'
import './styles/styles.css'
import { Link,useParams } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'
import FAQ from './FAQ';


import AllCourses from './AllCourses';
const Home = () => {
  const baseURL="http://localhost:8000/lhapi"
  const [courseData,setCourseData]=useState([]);
  const [popularCourseData,setPopularCourseData]=useState([]);
  const [topInstructorData,setTopInstructorData]=useState([]);
  useEffect(()=>{
    document.title='Learning Hub'
    try{
      axios.get(baseURL+"/course/?result=4")
      .then((response)=>{
       
          setCourseData(response.data.results)
        
      })
    }catch(error){
      console.error(error)
    }

console.log(courseData)
    // popular courses
    try{
      axios.get(baseURL+"/popular-courses/?popular=1")
      .then((response)=>{
       
          setPopularCourseData(response.data.results)
        
      })
    }catch(error){
      console.error(error)
    }

    // popular instructors
    try{
      axios.get(baseURL+"/top-instructors/?top=1")
      .then((response)=>{
       console.log(response.data)
          setTopInstructorData(response.data.results)
        
      })
    }catch(error){
      console.error(error)
    }
  },[])

  return (
    <div className="container ">
      <div className="row my-3">
        <h3>Latest Courses <Link to="/allcourses" className='float-end'>See All...</Link></h3>
        {courseData && courseData.map((course,index)=>
        <div className="col-md-3 col-sm-6   c">
       
        <Link to={"/detail/"+course.id}>  
        <div className="preview-card mt-4">
            <div className="preview-card__wrp">
              <div className="preview-card__item d-flex flex-column align-items-center">
                <div className="preview-card__img">
                  <img src={course.featured_image} alt={course.title}/>
                </div>
                <div className="preview-card__content text-center">
                  
                  <div className="preview-card__title">{course.title}</div>
                  {/* <div className="preview-card__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</div> */}
                  <Link to="/detail/1" className="preview-card__button">READ MORE</Link>
                </div>
                
              </div>
              <div className="card-footer mt-4">
              <span className="preview-card__code float-start">Rating: {course.course_rating}</span>
                  <span className="preview-card__code float-end">Enrolled: {course.total_enrolled_students}</span>
                </div>
            </div>
          </div></Link> 
        </div>
      
    )}
      </div>
<br />

      <div className="row my-3">
        <h1>Popular Courses <Link to="/popular-courses" className='float-end'>See All...</Link></h1>
       
       {popularCourseData && popularCourseData.map((row,index)=>
        <div className="col-md-3 col-sm-6">
        <Link to={"/detail/"+row.course.id}>  
          <div className="preview-card mt-4">
            <div className="preview-card__wrp">
              <div className="preview-card__item d-flex flex-column align-items-center">
                <div className="preview-card__img">
                <img src={row.course.featured_image} alt={row.course.title}/>
                
                </div>
                <div className="preview-card__content text-center">
                  
                  <div className="preview-card__title">{row.course.title}</div>
               
                  <Link to={"/detail/"+row.course.id} className="preview-card__button">READ MORE</Link>
                </div>
              </div>
              <div className="card-footer mt-4">
              <span className="preview-card__code float-start">Rating: {row.rating || 'No ratings yet'}</span>
                  <span className="preview-card__code float-end">Views: {row.course.course_views}</span>
                </div>
            </div>
          </div>
          </Link>
        </div>
     
       )}
      </div> 
      <br />
       <div className="row my-3">
        <h1>Top Instructors <Link to="/top-instructors" className='float-end'>See All...</Link></h1>
        {topInstructorData && topInstructorData.map((row,index)=>
        <div className="col-md-3 col-sm-6">
        <Link to={"/instructor-detail/"+row.id}>   
           <div className="preview-card mt-4">
            <div className="preview-card__wrp">
              <div className="preview-card__item d-flex flex-column align-items-center">
                <div className="preview-card__img">
                  <img src={row.profile_image} alt={row.full_name} />
                </div>
                <div className="preview-card__content text-center">
                
                  <div className="preview-card__title">{row.full_name} 
                  
                  </div>
                  <span className="preview-card__code">Total Courses: {row.total_instructor_courses}</span>
                  <Link to={"/instructor-detail/"+row.id}>   READ MORE</Link>
                </div>
              </div>
            </div>
          </div>
          </Link>
        </div>
        )}
       
      </div> 


      <br />
      <div className="row ">
      <FAQ/>
      
 
      </div> 
     
    </div>
  )
}

export default Home