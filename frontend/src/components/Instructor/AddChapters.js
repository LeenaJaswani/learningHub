import React,{useState,useEffect} from 'react'

import InstructorSidebar from './InstructorSidebar'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import '../styles/styles.css';
import axios from 'axios'
const AddChapter = () => {
    const instructorId=localStorage.getItem('instructorId')
  
    const [chapterData,setChaptereData]=useState({
    
      title:'',
      description:'',
      video:'',
      notes:''
    })
    const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
 
  
    // update chapterData
  
    const handleChange=(event)=>{
     
      setChaptereData({...chapterData,[event.target.name]:event.target.value})
   
    }
    
    const handleFileChange=(event)=>{
     
        const file = event.target.files[0];
        setChaptereData({...chapterData, [event.target.name]: file });
   
    }
  
    // submit form
    const {courseId}=useParams()
  const submitChapterForm=(e)=>{
    e.preventDefault()
   
    const chapterFormData=new FormData();
   
   
    chapterFormData.append("course",courseId)
    chapterFormData.append("title",chapterData.title)
    chapterFormData.append("description",chapterData.description)
    chapterFormData.append("video",chapterData.video,chapterData.video.name)
    chapterFormData.append("notes",chapterData.notes)
    try{
      axios.post(baseURL+"/chapter/",chapterFormData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      }).then((response)=>{
        navigate("/add-chapter/1")
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
            <h3 className="card-header border-0 bg-transparent">Add Chapter</h3>
      <form >
                <div className="form px-4 pb-4">
                <div className=" row mb-2">
                    <label for="exampleFormControlInput1" className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" id="exampleFormControlInput1" name="title" onChange={handleChange}  placeholder="Chapter Title"/>
                    </div>
                </div><div className="row mb-3">
                    <label for="inputDescription" className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-4">
                    <textarea name="description" onChange={handleChange}  id="" cols="20" rows="2" className="form-control" placeholder='Description'></textarea>
                  </div>
                  </div>
                <div className="row mb-2" >
                    <label for="video" className="col-sm-3 col-form-label">Video</label>
                    <div className="col-sm-4">
                    <input type="file" className="form-control" id="video" name="video" onChange={handleFileChange}/>
                    </div>
                    </div>
                
                    <div className="row">
                    <label for="inputNotes" className="col-sm-3 col-form-label">Notes</label>
                    <div className="col-sm-4">
                    <textarea id="InputNotes" name="notes" onChange={handleChange} cols="20" rows="2" className="form-control" placeholder='Description'></textarea>
                  </div>
                  </div>
                  <div className="col-8 text-center " >
                    <button className="btn btn-dark btn-block" style={{marginBottom:"80px"}} type='button' onClick={submitChapterForm}>Add</button>
                    </div>  
                </div>
                
                </form>
                </div>
      </section>
    </div>
  </div>
  )
}

export default AddChapter