import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'

const StudentMyCourses = () => {
  useEffect(()=>{
    document.title='My Courses'
    
  })
  const instructorId=useParams()
  const courseId=useParams()
  const [courseData,setCourseData]=useState([]);
  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const studentId=localStorage.getItem('studentId')
  console.log(studentId)
  
  useEffect(()=>{
    document.title='My Courses'
    try{
      axios.get(baseURL+"/enroll-courses/"+studentId)
      .then((response)=>{
       
          setCourseData(response.data)
       
        
      })
    }catch(error){
      console.error(error)
    }
  },[])
  console.log(courseData)


  return (
    <div className="container mt-4">

      <div className="row">
        <aside className='col-md-3'>
                 
        
        <StudentSidebar/>
        </aside>
        <section className='col-md-9'>
        <div className="card cv ">
            <h3 className="card-header bg-transparent border-0">My Courses</h3>
    <div className="card-body">
    <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
                    <colgroup width="353"></colgroup>
                    <colgroup width="384"></colgroup>
                    <colgroup width="284"></colgroup>
                    <colgroup width="284"></colgroup>

                 
                    <thead>
                    <tr>
                    <td>Name</td>
                    <td>Instructor</td>
                    <td>Study Material</td>
                    <td>Quiz</td>

                  
                    </tr>
                    </thead>
<tbody>
{courseData.map((row,index)=>
                    <tr>
                    <td>
                    <Link to={"/detail/"+row.course.id}>        {row.course.title} </Link>  
                     </td>
                        <td>
               <Link to={"/instructor-detail/"+row.course.instructor.id}>        {row.course.instructor.full_name}</Link> 
                          </td>
                          <td><Link to={`/student/study-materials/`+row.course.id}> 
                   Study Material
                    </Link></td>
                          <td>
               <Link to={"/course-quiz/"+row.course.id}> Quiz </Link> 
                          </td>  

               
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

export default StudentMyCourses