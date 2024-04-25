import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import ReactPlayer from 'react-player';
import './styles/styles.css'
import axios from 'axios'



const InstructorDetail = () => {

  const [courseData,setCourseData]=useState([]);
  const [instructorData,setInstructorData]=useState([]);
  const [relatedCourseData,setRelatedCourseData]=useState([]);
  const [skillSetData,setSkillSetData]=useState([]);
  // const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
    const forImageURL="http://localhost:8000/"
   const {instructorId}=useParams()
  
   useEffect(()=>{
    document.title='Instructor Detail'
    try{
      axios.get(baseURL+"/instructor/"+instructorId)
      .then((response)=>{
        setInstructorData(response.data)
       
        setCourseData(response.data.instructor_courses)
        setSkillSetData(response.data.skill_list)
       
      
       
      
        
      })
    }catch(error){
      console.error(error)
    }
  },[])
  console.log(instructorData)
  return (
    <div className="container mt-3">
    <div className="row">
      <div className="col-4 rounded mx-auto d-block image-container">
        <div className="preview-card__img">
          <img className="img-responsive center-block" src="https://res.cloudinary.com/muhammederdem/image/upload/v1535759872/kuldar-kalvik-799168-unsplash.jpg" alt="" />
        </div>
      </div>
      <div className="col-8">
        <h3>{instructorData.full_name}</h3>
        <p>
        {instructorData.bio}
        </p>
        <p className="fw-bold">Total Courses: <em>{instructorData.total_instructor_courses}</em></p>
        <p className='fw-bold'>Skills: 
        {skillSetData.map((skill,index)=>
          <Link to={"/instructor-skill/"+skill.trim()+"/"+instructorId} className='badge badge-pill text-white ms-2'  style={{backgroundColor:"#6276f4 "}}>{
          skill}
          </Link> 
          )}
        </p>
        <p className='fw-bold'>Recent Course <Link to="/">Course</Link></p>
        
        <p className='fw-bold'>Rating: 7/10 <Link to="/">Instr1</Link></p>
        
      </div>
    </div>
    {/* Course Videos */}
    <div className="card mt-3 cv bg-transparent">
      <div className="card-header ">Course List</div>
      {courseData.map((course,index)=>
        <Link to={"/detail/"+course.id} className=" list-group-item list-group-item action mt-2 ms-2 border-bottom">
         {course.title}</Link>
        
      )}
      
        
         
          
    
    </div>

  </div>
  )
}

export default InstructorDetail