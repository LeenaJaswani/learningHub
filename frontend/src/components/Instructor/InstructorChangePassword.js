import React,{useEffect,useState} from 'react'
import InstructorSidebar from './InstructorSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'

const InstructorChangePassword = () => {
  const instructorLoginStatus=localStorage.getItem('instructorLoginStatus')

  const params = useParams(); 
  let instructorId;

  if (instructorLoginStatus) {
    instructorId = localStorage.getItem('instructorId');
  } else {
    instructorId = params.instructorId; 
  }
  const baseURL = "http://localhost:8000/lhapi"
const navigate=useNavigate()
  const [instructorData, setInstructorData] = useState({
    'password': "",
   
  })
  
  const handleChange = (event) => {
    setInstructorData({ ...instructorData, [event.target.name]: event.target.value })
  }


  
  useEffect(() => {
    document.title="Change Password"
  
  }, [])

  const submitForm = async (e) => {
    e.preventDefault()
    const instructorFormData = new FormData();
    instructorFormData.append("password", instructorData.password)
    
  

    try {
      const response = await axios.post(baseURL + "/instructor-change-pswd/" + instructorId, instructorFormData, )

      console.log(response.data)
      Swal.fire({
        title: 'Password has been updated',
        icon: 'success',
        confirmButtonText: 'Continue',
        toast: true,
        timer: 3000,
        position: 'top-right',
        iconColor: "#5161ce",
        showCloseButton: true,
        showConfirmButton: false
      })

      if (instructorData.status === "success") {
        navigate("/instructor-login");
      }
     
    } catch (error) {
      console.error(error);
      setInstructorData({
        ...instructorData,
        status: "error"
      })
    }
  }
  
  
  return (
    <div className="container mt-4">

    <div className="row">
    {instructorLoginStatus  && (
      <aside className='col-md-3'>
               <InstructorSidebar/>
      
   
      </aside>
        )}
      <section className='col-md-9'>
        <div className="card cv mx-auto"  style={{ maxWidth: '500px' }}>
        {instructorData.status === "success" && (
              <p className="text-success">Password Changed</p>
            )}
            {instructorData.status === "error" && (
              <p className="text-danger">Something went wrong</p>
            )}
            <h3 className="card-header bg-transparent border-0 text-center">Change Password</h3>
            <form onSubmit={(e) => submitForm(e)}>
                <div className="form px-4 pt-5">
                
                                
         
                    <div className="mb-3 row">
                    <label for="inputPassword" className="col-sm-4 col-form-label justify-content-center">New Password</label>
                    <div className="col-sm-6">
                    <input onChange={handleChange}name="password" type="password" className="form-control" id="inputPassword"/>
                    </div>
                    </div>

                 
                  <div className="col-8 text-center"><button className="btn btn-dark btn-block mt-3 " type="submit">Change</button></div>  
                </div>
                
                </form>
                </div>
      </section>
    </div>
  </div>
  )
}

export default InstructorChangePassword