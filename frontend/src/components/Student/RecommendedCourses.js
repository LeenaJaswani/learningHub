import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'

const RecommendedCourses = () => {
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
    document.title='Recommended Courses'
    try{
      axios.get(baseURL+"/recommended-courses/"+studentId)
      .then((response)=>{
       
          setCourseData(response.data.results)
       
        
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
            <h3 className="card-header bg-transparent border-0">Recommended Courses</h3>
    <div className="card-body">
    <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
                    <colgroup width="453"></colgroup>
                    <colgroup width="784"></colgroup>

                 
                    <thead>
                    <tr>
                    <td>Name</td>
                    <td>Technologies</td>

                  
                    </tr>
                    </thead>
<tbody>
{courseData.map((course,index)=>
                    <tr>
                    <td>
                    <Link to={"/"}>        {course.title} </Link>  
                     </td>
                        <td>
            
                  {course.tech_list}
               
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

export default RecommendedCourses