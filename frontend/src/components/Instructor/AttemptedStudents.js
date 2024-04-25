import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'

import QuizResult from './QuizResult';

const AttemptedStudents = () => {
  const [studentData,setStudentData]=useState([]);

  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const instructorId=localStorage.getItem('instructorId')
  console.log(instructorId)

  const {quizId}=useParams()
  useEffect(()=>{
    document.title='My Quizzes'
    try{
      axios.get(baseURL+"/attempted-quiz/"+quizId)
      .then((response)=>{
       
          setStudentData(response.data)
       
        
      })
    }catch(error){
      console.error(error)
    }
    
   


    //   try{
    //     axios.get(baseURL+"/assign-status/"+instructorId+"/"+quizId)
    //       .then((response)=>{
    //         console.log(response)
    //         if(response.data.bool==true){
    //           setAssignStatus("success")
    //         }
            
    //       })
    //     }catch(error){
    //       console.error(error)
    //     }
  },[])
  console.log(studentData)

  // delete quiz
 


  return (
    <div className="container mt-4">

      <div className="row">
        <aside className='col-md-3'>
                 
        
        <InstructorSidebar/>
        </aside>
        <section className='col-md-9'>
        <div className="card cv ">
            
    <div className="card-body ms-4">
    <h3 className="card-header bg-transparent border-0">
   Student List
        </h3>
    <table id="example" className="table table-striped table-bordered text-center" cellspacing="0" width="100%">
                   
                    <colgroup width="150"></colgroup>
                
                    <colgroup width="800"></colgroup>

                   
                    <thead>
                    <tr>
                    {/* <td>Image</td> */}
                    <td>Name</td>
                    <td>Email</td>
              
                <td>Result</td>
                   

                   
                    </tr>
                    </thead>
                    <tbody>
                      {studentData.map((obj,index)=>
                      
                    <tr key={obj.id}>
                    <td>
                     
                    
                      
                        {obj.student.full_name}
                      </td>
                     
                   
                   
                        <td><Link to={`mailto:${obj.student.email}`}>{obj.student.email}</Link></td>
                 <td>
                 
                <div>
                    <button type="button" className="btn btn-dark btn-block" data-bs-toggle="modal" data-bs-target={"#exampleModal"+obj.id}>
                        Quiz Result
                    </button>
                    <div className="modal fade" id={"exampleModal"+obj.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <QuizResult quiz={quizId} student={obj.student.id}/>
                    </div>
                </div>
         
                    </td>
                    </tr>
                    
 )}

                    </tbody>
    </table>
     

    </div>
  </div>
        </section>
      </div>
   
 
  </div>
  )
}

export default AttemptedStudents