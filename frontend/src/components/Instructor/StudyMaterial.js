import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const StudyMaterial = () => {
    const [studyMaterial,setStudyMaterial]=useState([]);
    const [totalResult,setTotalResult]=useState(0);
    // const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
   const {courseId}=useParams()
  
    useEffect(()=>{
      document.title='My Courses'
      try{
        axios.get(baseURL+"/study-materials/"+courseId)
        .then((response)=>{
            setTotalResult(response.data.length)
            setStudyMaterial(response.data)
           
          
        })
      }catch(error){
        console.error(error)
      }
    },[])
    console.log(studyMaterial)


    // delete row
        const handleDelete=(studyId)=>{
            Swal.fire({
                title: 'Confirm',
                text: 'Are You Sure You want to delete this?',
                icon: 'info',
                confirmButtonText: 'Continue',
                showCancelButton:true,
                showCloseButton: true,
                height:100,
                width:350,
            
              })
              .then((result)=>{
                if(result.isConfirmed){
                    try{
                        axios.delete(baseURL+'/study-material/'+studyId)
                        .then((response)=>{
                            // console.log(response);
                            // setTotalChapters(response.data.length);
                            // setStudyMaterial(response.data)
                            Swal.fire('Success','Deleted')
                            try{
                                axios.get(baseURL+"/study-materials/"+courseId)
                                .then((response)=>{
                                    setTotalResult(response.data.length)
                                    setStudyMaterial(response.data)
                                   
                                  
                                })
                              }catch(error){
                                console.error(error)
                              }
                        });
                      
                    }catch(error){
                        Swal.fire('error','Something went Wrong')
                    }
                }else{
                    Swal.fire('error','Something went Wrong')
                }
              })
        }
    return (
        <div className="container mt-4">
    
          <div className="row">
            <aside className='col-md-3'>
                     
            
            <InstructorSidebar/>
            </aside>
            <section className='col-md-9 '>
            <div className="card cv ">
                
        <div className="card-body ms-4">
        <h3 className="card-header bg-transparent border-0">Study Material ({totalResult}) <Link to={`/add-study/`+courseId}> 
                    <button className="btn btn-dark btn-sm ms-2 float-end">Add Study Material</button>
                    </Link></h3>
     
         
        <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
                    <colgroup width="200"></colgroup>
                    <colgroup width="503"></colgroup>
                    <colgroup width="500"></colgroup>
                    <colgroup width="419"></colgroup>
                    <colgroup width="419"></colgroup>
                    <thead>
                    <tr>
                    {/* <td>Image</td> */}
                    <td>Title</td>
                    <td>Description</td>
                    <td>File</td>
                    <td>Remarks</td>
                    <td>Action</td>
                    </tr>
                    </thead>
                    <tbody >
                      {studyMaterial.map((row,index)=>
                    <tr key={row.id} >
                    <td > <Link to={"/update-study/"+row.id}> {row.title}</Link></td>
                    <td >{row.description}</td>
                    <td className='text-center'>
                        <Link to={row.upload}>File</Link>
                    </td>
                    <td >{row.remarks}</td>

                    <td> 
                    <Link to={"/update-study/"+row.id}> 
                     <button className="btn  btn-secondary">
                        <i className="bi bi-pencil-square"></i></button>
                        </Link>
                    {/* <Link to={"/delete-row/"+row.id}>  */}
                    <button className="btn btn-danger ms-2 " onClick={()=>handleDelete(row.id)}><i className="bi bi-trash-fill danger"></i></button>
                    {/* </Link> */}

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

export default StudyMaterial