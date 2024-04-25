import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import InstructorSidebar from '../Instructor/InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const CheckQuizStatus = (props) => {
    const [quizData,setQuizData]=useState([]);
  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const studentId=localStorage.getItem('studentId')
  console.log(studentId)

 
//   const { quiz, course } = props;
  useEffect(()=>{
    document.title='Check Quiz In Course'
    try{
      axios.get(`${baseURL}/quiz-attempt-status/${props.quiz}/${props.student}`)
      .then((response)=>{
       
          setQuizData(response.data)
       
        
      })
    }catch(error){
      console.error(error)
    }
  },[])

  return (
    <>
    
        <td>  
        {quizData.bool==false &&  
      
         <Link to={"/take-quiz/"+props.quiz}> Take Quiz </Link> 
                    
     
        

       
         }
         {quizData.bool==true &&  
        <span className='text-success'>  
     Attempted
     </span>
        
         }
        </td>
         
         </>
  )
}

export default CheckQuizStatus;
