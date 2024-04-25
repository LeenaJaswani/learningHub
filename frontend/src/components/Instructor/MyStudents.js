import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import InstructorSidebar from '../Instructor/InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'

import Message from '../Message';
const MyStudents = () => {
  const [studentData,setStudentData]=useState([]);
  // const navigate = useNavigate();
  const [messageData,setMessageData]=useState({
    
    message:'',
    
    
  });

  const [broadcastMessageData,setBroadcastMessageData]=useState({
    
    message:'',
    
    
  });
  const baseURL="http://localhost:8000/lhapi"
  const instructorId=localStorage.getItem('instructorId')
  const handleChange=(event)=>{
   
    setMessageData({...messageData,[event.target.name]:event.target.value})
 
  }

  const broadcasthandleChange=(event)=>{
   
    setBroadcastMessageData({...broadcastMessageData,[event.target.name]:event.target.value})
 
  }
  const [errorMessage,setErrorMessage]=useState('')
  const [successMessage,setSuccessMessage]=useState('')
  const [broadcastErrorMessage,setBroadcastErrorMessage]=useState('')
  const [broadcastSuccessMessage,setBroadcastSuccessMessage]=useState('')
  // console.log(instructorId)
  useEffect(()=>{
    document.title='My Students'
    try{
      axios.get(baseURL+"/all-enroll-students/"+instructorId)
      .then((response)=>{
       
          setStudentData(response.data)
        
      })
    }catch(error){
      console.error(error)
    }
  },[])
  console.log(studentData);
  const submitForm=(student_id)=>{
    // e.preventDefault()
    const formData=new FormData();
   
    
    // formData.append("instructor",instructorId)
    // formData.append("student",student_id)
    formData.append("message",messageData.message)
    console.log(messageData)
    formData.append("sender","instructor"); 
    try{
      axios.post(baseURL+"/send-message/"+instructorId+"/"+student_id,formData).then((response)=>{
        if(response.data.bool==true){
         
        setSuccessMessage(response.data.msg)
        setErrorMessage("")
        setMessageData({
          message:""
        })

    }else{
      setErrorMessage(response.data.msg)
      setSuccessMessage("")
    }
      })
    }catch(error){
      console.error(error)
    }
  }
  
  const broadcastsubmitForm=()=>{
    // e.preventDefault()
    const formData=new FormData();
   
    

    formData.append("message",broadcastMessageData.message)
    console.log(messageData)
    formData.append("sender","instructor"); 
    try{
      axios.post(baseURL+"/broadcast-message/"+instructorId,formData).then((response)=>{
        if(response.data.bool==true){
         
        setBroadcastSuccessMessage(response.data.msg)
        setBroadcastErrorMessage("")
        setBroadcastMessageData({
          message:""
        })

    }else{
      setBroadcastErrorMessage(response.data.msg)
      setBroadcastSuccessMessage("")
    }
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
        <div className="card cv ">
            
    <div className="card-body ">
                            <h3 className="card-header bg-transparent border-0">Enrolled Students
                            <span><button type="button" className="btn btn-dark btn -block float-end" data-bs-toggle="modal" data-bs-target="#broadcastMessageModal">
                                      Broadcast Message
                                      </button></span>
                            </h3>


                                       


                                      <div className="modal fade" id="broadcastMessageModal" tabindex="-1" aria-labelledby="broadcastMessageModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg  modal-dialog-centered modal-fullscreen">
                                          <div className="modal-content">
                                            <div className="modal-header">

                                              <h1 className="modal-title fs-5" id="broadcastMessageModalLabel"> 
                                              <em className='linkcolor'>
                                              Send Message to All Students
                                              </em>
                                              {broadcastSuccessMessage && <p className='ms-4 mb-4 text-success text-center float-end'>{broadcastSuccessMessage}</p>}
                                           {broadcastErrorMessage && <p className='ms-4 mb-4 text-success text-center float-end'>{broadcastErrorMessage}</p>}
                                              </h1>
                                            
                                            
         
                                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                              
                                       
                                             {/* <Message instructor_id={instructorId} student_id={""}/> */}
                                          
                                                    
                                                           
                                            </div>
                                            <div className="modal-footer bg-dark">
                                          
                                                                <div className="col-11">
                                                               
                                        <textarea onChange={broadcasthandleChange} value={broadcastMessageData.message} cols="50" rows="1" name="message" className="form-control" placeholder='Message' style={{width:"100%"}} ></textarea>
                                      
                                      </div>
                                              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                              <button type="button" onClick={()=>broadcastsubmitForm()} className="btn btn-dark btn-block">Send</button>
                                              
                                            </div>
                                          </div>
                                        </div>
                                      </div>
    <table id="example" className="table table-striped table-bordered text-center" cellspacing="0" width="100%">
                    <colbroadcast width="400"></colbroadcast>
                    <colbroadcast width="350"></colbroadcast>
                    <colbroadcast width="800"></colbroadcast>

                   
                    <thead>
                    <tr>
                    {/* <td>Image</td> */}
                    <td>Name</td>
                    {/* <td>Description</td> */}
                    <td>Email</td>

                    <td>Message</td>
                    </tr>
                    </thead>
                    <tbody>
                      {studentData.map((obj,index)=>
                    <tr>
                    <td>{obj.student.full_name}</td>
                  
                    <td><Link to={`mailto:${obj.student.email}`}>{obj.student.email}</Link></td>
                    <td>
                   
                                      <button type="button" className="btn linkcolor" data-bs-toggle="modal" data-bs-target={"#messageModal"+index}>
                                      <i className="bi bi-chat-left-dots-fill"></i>
                                      </button>


                                      <div className="modal fade" id={"messageModal"+index} tabindex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered modal-fullscreen">
                                          <div className="modal-content">
                                            <div className="modal-header">

                                              <h1 className="modal-title fs-5" id="messageModalLabel"> <em className='linkcolor'>{obj.student.full_name}</em>
                                              {successMessage && <p className='ms-4 mb-4 text-success text-center float-end'>{successMessage}</p>}
                                           {errorMessage && <p className='ms-4 mb-4 text-success text-center float-end'>{errorMessage}</p>}
                                              </h1>
                                            
                                            
         
                                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                              
                                       
                                             <Message instructor_id={instructorId} student_id={obj.student.id}/>
                                          
                                                    
                                                           
                                            </div>
                                            <div className="modal-footer bg-dark">
                                          
                                                                <div className="col-11">
                                                               
                                        <textarea onChange={handleChange} value={messageData.message} cols="50" rows="1" name="message" className="form-control" placeholder='Message' style={{width:"100%"}} ></textarea>
                                      
                                      </div>
                                              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                              <button type="button" onClick={()=>submitForm(obj.student.id)} className="btn btn-dark btn-block">Send</button>
                                              
                                            </div>
                                          </div>
                                        </div>
                                      </div>
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

export default MyStudents