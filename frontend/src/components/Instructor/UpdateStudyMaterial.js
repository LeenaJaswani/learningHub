import React,{useState,useEffect} from 'react'

import InstructorSidebar from './InstructorSidebar'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const UpdateStudyMaterial = () => {
    const instructorId=localStorage.getItem('instructorId')
  
    const [studyMaterial,setStudyMaterial]=useState({
    
      title:'',
      description:'',
      upload:'',
      prev_upload:'',
      remarks:''
    })
    const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
 
    const [isSubmitting, setIsSubmitting] = useState(false);
    // update studyMaterial
  
    const handleChange=(event)=>{
     
      setStudyMaterial({...studyMaterial,[event.target.name]:event.target.value})
   
    }
    
    const handleFileChange=(event)=>{
     
        const file = event.target.files[0];
        setStudyMaterial({...studyMaterial, [event.target.name]: file });
   
    }
  
    // submit form
    const {studyId}=useParams()
  const submitStudyForm=(e)=>{
    
    e.preventDefault()
   
    const studyFormData=new FormData();
   
   
    studyFormData.append("course",studyMaterial.course)
    studyFormData.append("title",studyMaterial.title)
    studyFormData.append("description",studyMaterial.description)
    if(studyMaterial.upload!==""){
    studyFormData.append("upload",studyMaterial.upload)
     }
      studyFormData.append("remarks",studyMaterial.remarks)
    try{
      axios.put(baseURL+`/study-material/${studyId}`,studyFormData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      }).then((response)=>{
       if(response.status==200 || response.status==201){
            
              Swal.fire({
                  title: 'Study has been updated',
                
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
        setStudyMaterial(response.data)
        console.log(response.data)
        navigate("/update-study/"+studyId)
      })
    }catch(error){
      console.error(error)
    }
  }

  useEffect(()=>{
    document.title='Update Study'
    try{
      axios.get(baseURL+"/study-material/"+studyId)
      .then((response)=>{
          if(response.status)
          setStudyMaterial({
            course:response.data.course,
            title:response.data.title,
            description:response.data.description,
            remarks:response.data.remarks,
            prev_upload:response.data.upload,
            upload:''
          })
         
        
      })
    }catch(error){
      console.error(error)
    }
  },[studyId])
  // console.log(studyMaterial)
  return (
    <div className="container mt-4">

    <div className="row">
      <aside className='col-md-3'>
               <InstructorSidebar/>
      
     
      </aside>
      <section className='col-md-9'>
        <div className="card cv">
            <h3 className="card-header border-0 bg-transparent">Update Study</h3>
      {/* <form > */}
                <div className="form px-4 pb-4">
                <div className=" row mb-2">
                    <label for="exampleFormControlInput1" className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" id="exampleFormControlInput1" name="title" value={studyMaterial.title} onChange={handleChange}  placeholder="Study Title"/>
                    </div>
                </div><div className="row mb-3">
                    <label for="inputDescription" className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-4">
                    <textarea name="description" onChange={handleChange}  value={studyMaterial.description}  id="" cols="20" rows="2" className="form-control" placeholder='Description'></textarea>
                  </div>
                  </div>
                <div className="row mb-2" >
                    <label for="upload" className="col-sm-3 col-form-label">Video</label>
                    <div className="col-sm-8">
                    <input type="file" className="form-control" id="upload" name="upload" onChange={handleFileChange}/>
                    {studyMaterial.prev_upload &&
                <div style={{width:"350px"}}> Previous Upload: <Link to={studyMaterial.prev_upload}> <b>{studyMaterial.prev_upload.split('/').pop()}</b> </Link>
                 </div>   
                    }
                   
                    </div>
                    </div>
                
                    <div className="row">
                    <label for="inputNotes" className="col-sm-3 col-form-label">Notes</label>
                    <div className="col-sm-4">
                    <textarea id="InputNotes" name="remarks" onChange={handleChange} value={studyMaterial.remarks}  cols="20" rows="2" className="form-control" placeholder='Description'></textarea>
                  </div>
                  </div>
                  <div className="col-8 text-center " >
                    <button className="btn btn-dark btn-block" style={{marginBottom:"80px"}} type='submit' onClick={submitStudyForm}>Update</button>
                    </div>  
                </div>
                
                {/* </form> */}
                </div>
      </section>
    </div>
  </div>
  )
}

export default UpdateStudyMaterial