import React,{useState,useEffect} from 'react'

import InstructorSidebar from './InstructorSidebar'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const UpdateChapter = () => {
    const instructorId=localStorage.getItem('instructorId')
  
    const [chapterData,setChapterData]=useState({
    
      title:'',
      description:'',
      video:'',
      prev_video:'',
      notes:''
    })
    const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
 
    const [isSubmitting, setIsSubmitting] = useState(false);
    // update chapterData
  
    const handleChange=(event)=>{
     
      setChapterData({...chapterData,[event.target.name]:event.target.value})
   
    }
    
    const handleFileChange=(event)=>{
     
        const file = event.target.files[0];
        setChapterData({...chapterData, [event.target.name]: file });
   
    }
  
    // submit form
    const {chapterId}=useParams()
  const submitChapterForm=(e)=>{
    
    e.preventDefault()
   
    const chapterFormData=new FormData();
   
   
    chapterFormData.append("course",chapterData.course)
    chapterFormData.append("title",chapterData.title)
    chapterFormData.append("description",chapterData.description)
    if(chapterData.video!==""){
    chapterFormData.append("video",chapterData.video)
     }
      chapterFormData.append("notes",chapterData.notes)
    try{
      axios.put(baseURL+`/chapter/${chapterId}`,chapterFormData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      }).then((response)=>{
       if(response.status==200 || response.status==201){
            
              Swal.fire({
                  title: 'Chapter has been updated',
                
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
        setChapterData(response.data)
        console.log(response.data)
        navigate("/update-chapter/"+chapterId)
      })
    }catch(error){
      console.error(error)
    }
  }

  useEffect(()=>{
    document.title='Update Chapter'
    try{
      axios.get(baseURL+"/chapter/"+chapterId)
      .then((response)=>{
          if(response.status)
          setChapterData({
            course:response.data.course,
            title:response.data.title,
            description:response.data.description,
            notes:response.data.notes,
            prev_video:response.data.video,
            video:''
          })
         
        
      })
    }catch(error){
      console.error(error)
    }
  },[chapterId])
  // console.log(chapterData)
  return (
    <div className="container mt-4">

    <div className="row">
      <aside className='col-md-3'>
               <InstructorSidebar/>
      
     
      </aside>
      <section className='col-md-9'>
        <div className="card cv">
            <h3 className="card-header border-0 bg-transparent">Update Chapter</h3>
      {/* <form > */}
                <div className="form px-4 pb-4">
                <div className=" row mb-2">
                    <label for="exampleFormControlInput1" className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" id="exampleFormControlInput1" name="title" value={chapterData.title} onChange={handleChange}  placeholder="Chapter Title"/>
                    </div>
                </div><div className="row mb-3">
                    <label for="inputDescription" className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-4">
                    <textarea name="description" onChange={handleChange}  value={chapterData.description}  id="" cols="20" rows="2" className="form-control" placeholder='Description'></textarea>
                  </div>
                  </div>
                <div className="row mb-2" >
                    <label for="video" className="col-sm-3 col-form-label">Video</label>
                    <div className="col-sm-4">
                    <input type="file" className="form-control" id="video" name="video" onChange={handleFileChange}/>
                    {chapterData.prev_video &&
                     <video width="350"  controls>
                     <source src={chapterData.prev_video} type="video/mp4"/>
                     <source src={chapterData.prev_video} type="video/ogg"/>
                     Your browser does not support HTML video.
                     </video>
                    }
                   
                    </div>
                    </div>
                
                    <div className="row">
                    <label for="inputNotes" className="col-sm-3 col-form-label">Notes</label>
                    <div className="col-sm-4">
                    <textarea id="InputNotes" name="notes" onChange={handleChange} value={chapterData.notes}  cols="20" rows="2" className="form-control" placeholder='Description'></textarea>
                  </div>
                  </div>
                  <div className="col-8 text-center " >
                    <button className="btn btn-dark btn-block" style={{marginBottom:"80px"}} type='submit' onClick={submitChapterForm}>Update</button>
                    </div>  
                </div>
                
                {/* </form> */}
                </div>
      </section>
    </div>
  </div>
  )
}

export default UpdateChapter