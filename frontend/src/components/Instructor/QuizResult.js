import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const QuizResult = (props) => {
    const [resultData,setResultData]=useState([]);
  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const instructorId=localStorage.getItem('instructorId')
  console.log(instructorId)

 

  useEffect(()=>{
    document.title='Quiz Result'
    try{
      axios.get(`${baseURL}/quiz-result/${props.quiz}/${props.student}`)
      .then((response)=>{
       
          setResultData(response.data)
       
        
      })
    }catch(error){
      console.error(error)
    }
  },[])
 
  return (
    <>
    
    
<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
    <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Quiz Result</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
    <div className='card'>
                        <h4>Total Questions: <strong>{resultData.total_questions}</strong> </h4>
                        <h5>Attempted Questions : <em>{resultData.total_attempted_questions}</em></h5>
                        <h5>Correct Answers : <b className='text-success'>{resultData.total_correct_answers}</b></h5>
                    </div>
    </div>
                    
    </div>
</div>

         </>
  )
}

export default QuizResult;



