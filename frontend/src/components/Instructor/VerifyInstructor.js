import React, { useState,useEffect } from 'react';
import { Link,useNavigate,useParams  } from 'react-router-dom';
import '../styles/styles.css';
import InstructorSignup from './InstructorSignup';
import axios from 'axios'
const VerifyInstructor = () => {
  const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  useEffect(()=>{
    document.title='Verify Your Account'
  })
  const instructorLoginStatus=localStorage.getItem('instructorLoginStatus')

const {instructorId}=useParams()
  // login

  const [instructorData,setInstructorData]=useState({
    otp_digit:""
    
  })
  const [errorMessage,setErrorMessage]=useState('')

  // update form value
  const handleChange=(event)=>{
   
    setInstructorData({...instructorData,[event.target.name]:event.target.value})
 
  }
  // console.log(instructorData)


  // submit form
const submitForm=(e)=>{
  e.preventDefault()
  const instructorFormData=new FormData();
 
  instructorFormData.append("otp_digit",instructorData.otp_digit)
  
  try{
    axios.post(baseURL+"/verify-instructor/"+instructorId,instructorFormData).then((response)=>{
      if(response.data.bool==true){
        
        localStorage.setItem('instructorId',response.data.instructor_id)
        navigate("/instructor-dashboard")
        localStorage.setItem("instructorLoginStatus",true)
      }else{
        setErrorMessage(response.data.msg)
      }
    })
  }catch(error){
    console.error(error)
  }
}
// const instructorStatus=localStorage.getItem('instructorStatus')
// if(instructorStatus==='true'){
//   navigate("/instructor-dashboard")
// }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="d-flex justify-content-center align-items-center ">
          <div className="card">
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
          <h3 className='card-header border-0 bg-transparent text-center mb-2 color'>Enter 6 digit OTP</h3>
       
        
                {/* <form > */}
                <div className="form px-4 pt-2">
                  <input
                    type="number"
                    name="otp_digit"
                    className="form-control"
                    placeholder="Enter 6 digit OTP here"
                    onChange={handleChange}
                    value={instructorData.otp_digit}
                  />
               
     
                  <button  type="submit" onClick={(e) => submitForm(e)} className="btn btn-dark btn-block mt-3">Verify</button>
                </div>
                {/* </form> */}
              </div>
             
            </div>
          </div>
        </div>
   
  );
};

export default VerifyInstructor;