import React, { useState,useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import '../styles/styles.css';
import InstructorSignup from './InstructorSignup';
import axios from 'axios'
const InstructorForgotPassword = () => {
  const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  useEffect(()=>{
    document.title='Instructor Forgot Password'
  })
  


  // login

  const [instructorData,setInstructorData]=useState({
    email:"",

    
  })
  const [errorMessage,setErrorMessage]=useState('')
  const [successMessage,setSuccessMessage]=useState('')
  // update form value
  const handleChange=(event)=>{
   
    setInstructorData({...instructorData,[event.target.name]:event.target.value})
 
  }
  // console.log(instructorData)


  // submit form
const submitForm=(e)=>{
  e.preventDefault()
  const instructorFormData=new FormData();
 
  instructorFormData.append("email",instructorData.email)
  
  try{
    axios.post(baseURL+"/instructor-forgot-password/",instructorFormData).then((response)=>{
      if(response.data.bool==true){
        setSuccessMessage(response.data.msg)
        setErrorMessage("")
       
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
    <div className="container mt-5">
      <div className="row">
        <div className="d-flex justify-content-center align-items-center ">
          <div className="card">
          {successMessage && <p className='text-success'>{successMessage}</p>}
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
         
            <div className="" id="">
            
                {/* <form > */}
                <div className="form ">
                <h3 className='mb-4'>Enter your Registered Email</h3>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                    value={instructorData.email}
                  />
      
                  <button  type="submit" onClick={(e) => submitForm(e)} className="btn btn-dark btn-block mt-3">Send Email </button>
                </div>
                {/* </form> */}
            
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorForgotPassword;