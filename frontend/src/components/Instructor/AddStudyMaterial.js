import React,{useState,useEffect} from 'react'

import InstructorSidebar from './InstructorSidebar'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import '../styles/styles.css';
import axios from 'axios'
const AddStudyMaterial = () => {
    const instructorId=localStorage.getItem('instructorId')
  
    const [studyMaterial,setStudyMaterial]=useState({
    
      title:'',
      description:'',
      upload:'',
      remarks:''
    })
    const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
 
  
    // update studyMaterial
  
    const handleChange=(event)=>{
     
      setStudyMaterial({...studyMaterial,[event.target.name]:event.target.value})
   
    }
    
    const handleFileChange=(event)=>{
     
        const file = event.target.files[0];
        setStudyMaterial({...studyMaterial, [event.target.name]: file });
   
    }
  
    // submit form
    const {courseId}=useParams()
  const submitStudyMaterialForm=(e)=>{
    e.preventDefault()
   
    const studyFormData=new FormData();
   
   
    studyFormData.append("course",courseId)
    studyFormData.append("title",studyMaterial.title)
    studyFormData.append("description",studyMaterial.description)
    studyFormData.append("upload",studyMaterial.upload,studyMaterial.upload.name)
    studyFormData.append("remarks",studyMaterial.remarks)
    try{
      axios.post(baseURL+"/study-materials/"+courseId,studyFormData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      }).then((response)=>{
      
        console.log(response.data)
      })
    }catch(error){
      console.error(error)
    }
  }
  return (
    <div className="container mt-4">

    <div className="row">
      <aside className='col-md-3'>
               <InstructorSidebar/>
      
     
      </aside>
      <section className='col-md-9 '>
        <div className="card cv">
            <h3 className="card-header border-0 bg-transparent">Add Study Material</h3>
      <form >
                <div className="form px-4 pb-4">
                <div className=" row mb-2">
                    <label for="exampleFormControlInput1" className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" id="exampleFormControlInput1" name="title" onChange={handleChange}  placeholder="Title"/>
                    </div>
                </div><div className="row mb-3">
                    <label for="inputDescription" className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-4">
                    <textarea name="description" onChange={handleChange}  id="" cols="20" rows="2" className="form-control" placeholder='Description'></textarea>
                  </div>
                  </div>
                <div className="row mb-2" >
                    <label for="upload" className="col-sm-3 col-form-label">Upload File</label>
                    <div className="col-sm-4">
                    <input type="file" className="form-control" id="upload" name="upload" onChange={handleFileChange}/>
                    </div>
                    </div>
                
                    <div className="row">
                    <label for="inputRemarks" className="col-sm-3 col-form-label">Remarks</label>
                    <div className="col-sm-4">
                    <textarea id="InputRemarks" name="remarks" onChange={handleChange} cols="20" rows="2" className="form-control" placeholder='Description'></textarea>
                  </div>
                  </div>
                  <div className="col-8 text-center " >
                    <button className="btn btn-dark btn-block" style={{marginBottom:"80px"}} type='button' onClick={submitStudyMaterialForm}>Add</button>
                    </div>  
                </div>
                
                </form>
                </div>
      </section>
    </div>
  </div>
  )
}

export default AddStudyMaterial