import React,{useState,useEffect} from 'react'

import InstructorSidebar from './InstructorSidebar'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const UpdateQuestion = () => {
    const instructorId=localStorage.getItem('instructorId')
  
    const [questionData,setQuestionData]=useState({
    
      quiz:'',
      question:'',
      ans1:'',
      ans2:'',
      ans3:'',
      ans4:'',
      correct_ans:''
    })
    const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
 
    const [isSubmitting, setIsSubmitting] = useState(false);
    // update questionData
  
    const handleChange=(event)=>{
     
      setQuestionData({...questionData,[event.target.name]:event.target.value})
   
    }
    
  
  
    // submit form
    const {questionId}=useParams()
  const submitQuestionForm=(e)=>{
    
    e.preventDefault()
   
    const questionFormData=new FormData();
   
   
    // questionFormData.append("quiz",quizId)
    questionFormData.append("question",questionData.question)
    questionFormData.append("ans1",questionData.ans1)
    questionFormData.append("ans2",questionData.ans2)
    questionFormData.append("ans3",questionData.ans3)
    questionFormData.append("ans4",questionData.ans4)
    questionFormData.append("correct_ans",questionData.correct_ans)
    try{
      axios.put(baseURL+`/question/${questionId}`,questionFormData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      }).then((response)=>{
       if(response.status==200 || response.status==201){
            
              Swal.fire({
                  title: 'Question has been updated',
                
                  icon: 'success',
                  confirmButtonText: 'Continue',
                  toast:true,
                  timer:3000,
                  position:'top-right',
                  iconColor:"#5161ce",
                  showCloseButton:true,
                  showConfirmButton:false
              
                })
          
       }
        setQuestionData(response.data)
        console.log(response.data)
        navigate("/update-question/"+questionId)
      })
    }catch(error){
      console.error(error)
    }
  }

  useEffect(()=>{
    document.title='Update Question'
    try{
      axios.get(baseURL+"/question/"+questionId)
      .then((response)=>{
          if(response.status)
          setQuestionData({
            question:response.data.question,
            ans1:response.data.ans1,
            ans2:response.data.ans2,
            ans3:response.data.ans3,
           ans4:response.data.ans4,
           correct_ans:response.data.correct_ans,
          
          })
         
        
      })
    }catch(error){
      console.error(error)
    }
  },[questionId])
  // console.log(questionData)
  return (
    <div className="container mt-4">

    <div className="row">
      <aside className='col-md-3'>
               <InstructorSidebar/>
      
     
      </aside>
      <section className='col-md-9'>
        <div className="card cv">
            <h3 className="card-header border-0 bg-transparent">Update Question</h3>
      {/* <form > */}
 
                <div className="form px-4 pb-4">
                <div className="row mb-3">
                    <label for="inputQuestion" className="col-sm-3 col-form-label">Question</label>
                    <div className="col-sm-4">
                    <textarea name="question" value={questionData.question} onChange={handleChange}  id="" cols="20" rows="2" className="form-control" placeholder='Question'></textarea>
                  </div>
                  </div>
                <div className="row mb-3">
                    <label for="inputAnswer1" className="col-sm-3 col-form-label">Answer1</label>
                    <div className="col-sm-4">
                    <textarea name="ans1" value={questionData.ans1} onChange={handleChange}  id="" cols="20" rows="2" className="form-control" placeholder='Answer1'></textarea>
                  </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputAnswer2" className="col-sm-3 col-form-label">Answer2</label>
                    <div className="col-sm-4">
                    <textarea name="ans2" onChange={handleChange} value={questionData.ans2} id="" cols="20" rows="2" className="form-control" placeholder='Answer2'></textarea>
                  </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputAnswer3" className="col-sm-3 col-form-label">Answer3</label>
                    <div className="col-sm-4">
                    <textarea name="ans3" onChange={handleChange} value={questionData.ans3} id="" cols="20" rows="2" className="form-control" placeholder='Answer3'></textarea>
                  </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputAnswer4" className="col-sm-3 col-form-label">Answer4</label>
                    <div className="col-sm-4">
                    <textarea name="ans4" onChange={handleChange} value={questionData.ans4} id="" cols="20" rows="2" className="form-control" placeholder='Answer4'></textarea>
                  </div>
                  </div>
                  <div className="row mb-3">
                    <label for="inputcorrectAns" className="col-sm-3 col-form-label">Correct Answer</label>
                    <div className="col-sm-4">
                    <textarea name="correct_ans" value={questionData.correct_ans} onChange={handleChange}  id="" cols="20" rows="2" className="form-control" placeholder='correctAns'></textarea>
                  </div>
                  </div>
                  <div className="col-8 text-center " >
                    <button className="btn btn-dark btn-block" style={{marginBottom:"80px"}} type='button' onClick={submitQuestionForm}>Add</button>
                    </div>  
                </div>
                
         
                
                {/* </form> */}
                </div>
      </section>
    </div>
  </div>
  )
}

export default UpdateQuestion