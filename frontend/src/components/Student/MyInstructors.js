import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Message from '../Message';

const MyInstructors = () => {
  useEffect(()=>{
    document.title='My Instructors'
    
  })
  const [messageData,setMessageData]=useState({
    
    message:'',
    
    
  });
  const [instructorData,setinstructorData]=useState([]);
  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const studentId=localStorage.getItem('studentId')
  console.log(studentId)
  const handleChange=(event)=>{
   
    setMessageData({...messageData,[event.target.name]:event.target.value})
 
  }
  const [errorMessage,setErrorMessage]=useState('')
  const [successMessage,setSuccessMessage]=useState('')
  const [broadcastErrorMessage,setBroadcastErrorMessage]=useState('')
  const [broadcastSuccessMessage,setBroadcastSuccessMessage]=useState('')
  useEffect(()=>{
    document.title='My Courses'
    try{
      axios.get(baseURL+"/myinstructors/"+studentId)
      .then((response)=>{
       
          setinstructorData(response.data)
       
        
      })
    }catch(error){
      console.error(error)
    }
  },[])
  console.log(instructorData)

  const submitForm=(instructor_id)=>{
    // e.preventDefault()
    const formData=new FormData();
   
    
    // formData.append("instructor",instructorId)
    // formData.append("student",student_id)
    formData.append("message",messageData.message)
    console.log(messageData)
    formData.append("sender","student"); 
    try{
      axios.post(baseURL+"/send-message/"+instructor_id+"/"+studentId,formData).then((response)=>{
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
  return (
    <div className="container mt-4">

      <div className="row">
        <aside className='col-md-3'>
                 
        
        <StudentSidebar/>
        </aside>
        <section className='col-md-9'>
        <div className="card cv ">
            <h3 className="card-header bg-transparent border-0">My Instructors</h3>
    <div className="card-body">
    <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
                    <colgroup width="353"></colgroup>
                    <colgroup width="384"></colgroup>
                    <colgroup width="384"></colgroup>
                    

                 
                    <thead>
                    <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Action</td>
                  

                  
                    </tr>
                    </thead>
<tbody>
{instructorData.map((row,index)=>
                    <tr>
                   
                        <td>
               <Link to={"/instructor-detail/"+row.instructor.id} className='linkcolor'>        {row.instructor.full_name}</Link> 
                          </td>
                          <td><Link to={`mailto:${row.instructor.email}`} className='linkcolor'>{row.instructor.email}</Link></td>
                         
                          <td>
                   {/* message */}
                   <button type="button" className="btn linkcolor" data-bs-toggle="modal" data-bs-target={"#messageModal"+index}>
                   <i className="bi bi-chat-left-dots-fill"></i>
                   </button>


                   <div className="modal fade" id={"messageModal"+index} tabindex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
                     <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered modal-fullscreen">
                       <div className="modal-content">
                         <div className="modal-header">

                           <h1 className="modal-title fs-5" id="messageModalLabel"> <em className='linkcolor'>{row.instructor.full_name}</em>
                           {successMessage && <p className='ms-4 mb-4 text-success text-center float-end'>{successMessage}</p>}
                        {errorMessage && <p className='ms-4 mb-4 text-success text-center float-end'>{errorMessage}</p>}
                           </h1>
                         
                         

                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div className="modal-body">
                           
                    
                          <Message student_id={studentId} instructor_id={row.instructor.id}/>
                       
                                 
                                        
                         </div>
                         <div className="modal-footer bg-dark">
                       
                                             <div className="col-11">
                                            
                     <textarea onChange={handleChange} value={messageData.message} cols="50" rows="1" name="message" className="form-control" placeholder='Message' style={{width:"100%"}} ></textarea>
                   
                   </div>
                          
                           <button type="button" onClick={()=>submitForm(row.instructor.id)} className="btn btn-dark btn-block">Send</button>
                           
                         </div>
                       </div>
                     </div>
                   </div>
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

export default MyInstructors