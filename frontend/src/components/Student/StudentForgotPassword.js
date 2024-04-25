import React, { useState,useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import '../styles/styles.css';
import axios from 'axios'
const StudentForgotPassword = () => {
  const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  useEffect(()=>{
    document.title='Student Forgot Password'
  })

  // login

  const [studentData,setStudentData]=useState({
    email:"",

    
  })
  const [errorMessage,setErrorMessage]=useState('')
  const [successMessage,setSuccessMessage]=useState('')
  // update form value
  const handleChange=(event)=>{
   
    setStudentData({...studentData,[event.target.name]:event.target.value})
 
  }
  // console.log(studentData)


  // submit form
const submitForm=(e)=>{
  e.preventDefault()
  const studentFormData=new FormData();
 
  studentFormData.append("email",studentData.email)
  
  try{
    axios.post(baseURL+"/student-forgot-password/",studentFormData).then((response)=>{
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
                    value={studentData.email}
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

export default StudentForgotPassword;