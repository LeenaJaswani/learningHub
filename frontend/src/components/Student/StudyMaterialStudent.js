import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import StudentSidebar from '../Student/StudentSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const StudyMaterialStudent = () => {
    const [studyMaterial,setStudyMaterial]=useState([]);
    const [totalResult,setTotalResult]=useState(0);
    // const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
   const {courseId}=useParams()
  
    useEffect(()=>{
      document.title='My Courses'
      try{
        axios.get(baseURL+"/student/study-materials/"+courseId)
        .then((response)=>{
            setTotalResult(response.data.length)
            setStudyMaterial(response.data)
           
          
        })
      }catch(error){
        console.error(error)
      }
    },[])
    console.log(studyMaterial)

    return (
        <div className="container mt-4">
    
          <div className="row">
            <aside className='col-md-3'>
                     
            
            <StudentSidebar/>
            </aside>
            <section className='col-md-9 '>
            <div className="card cv ">
                
        <div className="card-body ms-4">
        <h3 className="card-header bg-transparent border-0">Study Material ({totalResult}) </h3>
     
         
        <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
    <colgroup width="420"></colgroup>
                    <colgroup width="453"></colgroup>
                    <colgroup width="500"></colgroup>

                    <colgroup width="419"></colgroup>
                    <thead>
                    <tr>
                    {/* <td>Image</td> */}
                    <td>Title</td>
                    <td>Description</td>
                    <td>File</td>
                    <td>Remarks</td>
                    
                    </tr>
                    </thead>
                    <tbody >
                      {studyMaterial.map((row,index)=>
                    <tr key={row.id} >
                    <td >  {row.title}</td>
                    <td >{row.description}</td>
                    <td className='text-center'>
                        <Link to={row.upload} target='_blank'>File</Link>
                    </td>
                    <td >{row.remarks}</td>

                  
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

export default StudyMaterialStudent