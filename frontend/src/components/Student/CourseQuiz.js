import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
import CheckQuizStatus from './CheckQuizStatus';

const CourseQuiz = () => {
  useEffect(()=>{
    document.title='Course Quiz'
    
  })
  const instructorId=useParams()
  const {courseId}=useParams()
  const [quizData,setQuizData]=useState([]);
  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const studentId=localStorage.getItem('studentId')
  console.log(studentId)
  
  useEffect(()=>{
    document.title='My Courses'
    try{
      axios.get(baseURL+"/assigned-quiz/"+courseId)
      .then((response)=>{
       
        setQuizData(response.data)
       
        
      })
    }catch(error){
      console.error(error)
    }
  },[])
  console.log(quizData)


  return (
    <div className="container mt-4">

      <div className="row">
        <aside className='col-md-3'>
                 
        
        <StudentSidebar/>
        </aside>
        <section className='col-md-9'>
        <div className="card cv ">
            <h3 className="card-header bg-transparent border-0">Quiz Associated to this Course</h3>
    <div className="card-body">
    <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
                    <colgroup width="553"></colgroup>
                    <colgroup width="484"></colgroup>
                  

                 
                    <thead>
                    <tr>
                    <td>Quiz</td>
                
                    <td>Action</td>

                  
                    </tr>
                    </thead>
<tbody>
{quizData.map((row,index)=>
                    <tr>
                    <td>
                                {row.quiz.title}
                     </td>
                     <CheckQuizStatus quiz={row.quiz.id} student={studentId}/>
                        

                  
                    </tr>
                      )}

</tbody></table>
     

    </div>
  </div>
        </section>
      </div>
   
 
  </div>
  )
}

export default CourseQuiz