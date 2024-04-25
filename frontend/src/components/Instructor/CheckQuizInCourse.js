import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const CheckQuizInCourse = (props) => {
    const [quizData,setQuizData]=useState([]);
  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const instructorId=localStorage.getItem('instructorId')
  console.log(instructorId)
  console.log(props.course)
 
//   const { quiz, course } = props;
  useEffect(()=>{
    document.title='Check Quiz In Course'
    try{
      axios.get(`${baseURL}/quiz-assign-status/${props.quiz}/${props.course}`)
      .then((response)=>{
       
          setQuizData(response.data)
       
        
      })
    }catch(error){
      console.error(error)
    }
  },[])
  const assignQuiz=(quizId)=>{
   
    // e.preventDefault()
    const quizFormData=new FormData();
    quizFormData.append("instructor",instructorId)
    quizFormData.append("course",props.course)
  
    quizFormData.append("quiz",props.quiz)
  
    try{
      axios.post(baseURL+"/quiz-assign-course/",quizFormData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      }).then((response)=>{
        // navigate("/instructor-mycourses")
        if(response.status===200 || response.status===201){
            
          Swal.fire({
              title: 'Quiz Assigned to the course successfully',
            
              icon: 'success',
              confirmButtonText: 'Continue',
              toast:true,
              timer:3000,
              position:'top-right',
              iconColor:"#5161ce",
              showCloseButton:true,
              showConfirmButton:false
          
            })
           window.location.reload()
          
   }
      })
    }catch(error){
      console.error(error)
    }
  }
  return (
    <>
    
        <td>  
        {quizData.bool==false &&  
        <button className="btn btn-dark btn-block ms-2 " onClick={()=>assignQuiz(props.quiz)}>Assign</button>
        
     
        

       
         }
         {quizData.bool==true &&  
         <>
        <span className='text-success'>  
       Quiz  Assigned to the Course
   
                    
     </span>
     <br />
       <Link to={"/attempted-students/"+props.quiz}>Attempted Students</Link>
                    
       </>
        
         }
        </td>
         
         </>
  )
}

export default CheckQuizInCourse;
