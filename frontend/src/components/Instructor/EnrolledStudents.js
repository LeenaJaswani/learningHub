import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'

const EnrolledStudents = () => {
  const [studentData,setStudentData]=useState([]);
  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const instructorId=localStorage.getItem('instructorId')
  const {courseId}=useParams()
  console.log(instructorId)
  useEffect(()=>{
    document.title='My Courses'
    try{
      axios.get(baseURL+"/enroll-students/"+courseId)
      .then((response)=>{
       
          setStudentData(response.data)
        
      })
    }catch(error){
      console.error(error)
    }
  },[])
  console.log(studentData)



  return (
    <div className="container mt-4">

      <div className="row">
        <aside className='col-md-3'>
                 
        
        <InstructorSidebar/>
        </aside>
        <section className='col-md-9 '>
        <div className="card cv ">
            
    <div className="card-body ms-4">
    <h3 className="card-header bg-transparent border-0">Enrolled Students</h3>
    <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
                    <colgroup width="400"></colgroup>
                    <colgroup width="350"></colgroup>
                    {/* <colgroup width="800"></colgroup> */}

                   
                    <thead>
                    <tr>
                    {/* <td>Image</td> */}
                    <td>Name</td>
                    {/* <td>Description</td> */}
                    <td>Email</td>

                    {/* <td>Action</td> */}
                    </tr>
                    </thead>
                    <tbody>
                      {studentData.map((obj,index)=>
                    <tr>
                    <td>{obj.student.full_name}</td>
                  
                    <td><Link to={`mailto:${obj.student.email}`}>{obj.student.email}</Link></td>

                    {/* <td>   */}
                  
                        
                 {/* {obj.student.interested_categories} */}

                    {/* </td> */}
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

export default EnrolledStudents