import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
import CheckQuizInCourse from './CheckQuizInCourse';

const AssignQuiz = () => {
  const [quizData,setQuizData]=useState([]);
  const [courseData,setCourseData]=useState([]);
  const [assignStatus,setAssignStatus]=useState()
  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const instructorId=localStorage.getItem('instructorId')
  console.log(instructorId)
  const {courseId}=useParams()
//   const {quizId}=useParams()
  useEffect(()=>{
    document.title='My Quizzes'
    try{
      axios.get(baseURL+"/instructor-quiz/"+instructorId)
      .then((response)=>{
       
          setQuizData(response.data)
       
        
      })
    }catch(error){
      console.error(error)
    }
    
    try{
        axios.get(baseURL+"/course/"+courseId)
        .then((response)=>{
          setCourseData(response.data)
         
        
          
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
  console.log(quizData)

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
    <h3 className="card-header bg-transparent border-0">Assign Quiz {courseData.title}</h3>
    <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
                   
                    <colgroup width="150"></colgroup>
                
                    <colgroup width="800"></colgroup>

                   
                    <thead>
                    <tr>
                    {/* <td>Image</td> */}
                    <td>Name</td>
               
                   

                    <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                      {quizData.map((row,index)=>
                      
                    <tr key={row.id}>
                    <td>
                     
                      <Link to={"/quiz-questions/"+row.id}>
                      
                        {row.title}</Link></td>
                     
                   
                   
                     <CheckQuizInCourse quiz={row.id} course={courseId}/>
                 
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

export default AssignQuiz