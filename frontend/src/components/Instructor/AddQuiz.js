import React,{ useState,useEffect} from 'react'
import InstructorSidebar from './InstructorSidebar'
import { Link,useNavigate  } from 'react-router-dom';
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const AddQuiz = () => {
  const instructorId=localStorage.getItem('instructorId')

  const [quizData,setQuizData]=useState({
  
    title:'',
    description:''
  
  })
  const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  

  // update quizData

  const handleChange=(event)=>{
   
    setQuizData({...quizData,[event.target.name]:event.target.value})
 
  }
  
 

  // submit form
const submitQuizForm=(e)=>{
  e.preventDefault()
  const quizFormData=new FormData();
 

  quizFormData.append("instructor",instructorId)
  quizFormData.append("title",quizData.title)
  quizFormData.append("description",quizData.description)
 
  try{
    axios.post(baseURL+"/quiz/",quizFormData,{
    
    }).then((response)=>{
      navigate("/iquiz")
      console.log(response.data)
      Swal.fire({
        title: 'Quiz Added',
        icon: 'success',
        confirmButtonText: 'Continue',
        toast: true,
        timer: 3000,
        position: 'top-right',
        iconColor: "#5161ce",
        showCloseButton: true,
        showConfirmButton: false
      })
    })
    navigate("/iquiz")
  }catch(error){
    console.error(error)
  }
}

  // console.log(categories)
  return (
    <div className="container mt-4">

    <div className="row">
      <aside className='col-md-3'>
               <InstructorSidebar/>
      
     
      </aside>
      <section className='col-md-9 '>
        <div className="card cv">
            <h3 className="card-header border-0 bg-transparent">Add Quiz</h3>
      <form onSubmit={(e) => submitQuizForm(e)}>
                <div className="form px-4 pb-4">
             
                <div className=" row mb-2">
                    <label htmlFor="title" className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" id="title" name="title" onChange={handleChange} placeholder="Quiz Title"/>
                    </div>
                </div><div className="row mb-3">
                    <label htmlFor="inputDescription" className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-4">
                    <textarea  id="inputDescription" onChange={handleChange}cols="20" rows="2" className="form-control" name="description" placeholder='Description'></textarea>
                  </div>
                  </div>
          
                
                
                  <div className="col-8 text-center " >
                    <button className="btn btn-dark btn-block" style={{marginBottom:"80px"}} type='submit' >Add</button>
                    </div>  
                </div>
                
                </form>
                </div>
      </section>
    </div>
  </div>
  )
}

export default AddQuiz