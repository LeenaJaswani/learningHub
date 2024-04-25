
import '../styles/styles.css';
import React, { useState,useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import axios from 'axios'

const StudentSignup = () => {
  const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi/student/"
  useEffect(()=>{
    document.title='Student Signup'
  })

  const [studentData,setStudentData]=useState({
    'full_name':"",
    'email':"",
    'password':"",
    'bio':"",
    'contact_no':"",
    'qualification':"",
    'interested_categories':"",
    'status':"",
    'otp_digit':""

  })

  // update form value
  const handleChange=(event)=>{
    setStudentData({...studentData,[event.target.name]:event.target.value})
  }
// console.log(studentData)


// submit form
const submitForm=(e)=>{
  e.preventDefault()
  const studentFormData=new FormData();
  const otp_digit=Math.floor(100000+Math.random()*900000)
  studentFormData.append("full_name",studentData.full_name)
  studentFormData.append("email",studentData.email)
  studentFormData.append("password",studentData.password)
  studentFormData.append("bio",studentData.bio)
  studentFormData.append("interested_categories",studentData.interests)
  studentFormData.append("contact_no",studentData.contact_no)
  studentFormData.append("qualification",studentData.interests)
  studentFormData.append("otp_digit",otp_digit)

  try{
    axios.post(baseURL,studentFormData).then((response)=>{
    
    navigate("/verify-student/"+response.data.id)
  })
}catch(error){

    console.error(error);
    setStudentData({
    
    'status':"error"

    })
   
  }
}
useEffect(() => {
  if (studentData.status === "success") {
    navigate("/student-login");
  }
}, [studentData.status, navigate]);

  
  const [activeTab, setActiveTab] = useState('signup');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
  

<div className="container mt-5 ">
      <div className="row">
        <div className="d-flex justify-content-center align-items-center ">
          <div className="card">
          {/* {studentData.status === "" && (
          <p className="text-danger">All Fields are Required</p>
        )} */}
          {studentData.status === "success" && (
          <p className="text-success">You are successfully registered</p>
        )}
        {studentData.status === "error" && (
          <p className="text-danger">Something went wrong</p>
        )}
          <h3 className='card-header border-0 bg-transparent mb-2 color text-center'>Student Signup</h3>
            <ul className="nav nav-pills mb-3 ms-4" id="pills-tab" role="tablist">
              <li className="nav-item text-center">
              <Link
                 className={`nav-link ${activeTab === 'login' ? 'active btl' : 'btl inactive'}`}
                  id="pills-home-tab"
                  onClick={() => handleTabClick('login')}
                  to="/student-login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link
                  className={`nav-link ${activeTab === 'signup' ? 'active bts' : 'bts inactive'}`}
                  id="pills-profile-tab"
                  onClick={() => handleTabClick('signup')}
                  to="/student-signup"
                >
                  Signup
                </Link>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className={`tab-pane fade ${activeTab === 'signup' ? 'show active' : ''}`}
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                {/* <form > */}
                 <div className="form px-4">
      <input
        type="text"
        name="full_name"
        className="form-control"
        placeholder="Full Name"
        onChange={handleChange}
        value={studentData.full_name}
      />
      <input
        type="email"
        name="email"
        className="form-control"
        placeholder="Email"
        onChange={handleChange}
        value={studentData.email}
      />
     
      <input
        type="number"
        name="contact_no"
        className="form-control"
        placeholder="Contact Number"
        onChange={handleChange}
        value={studentData.contact_no}
      />
   
      <input
        type="password"
        name="password"
        className="form-control"
        placeholder="Password"
        onChange={handleChange}
        value={studentData.password}
      />
      <input
        type="text"
        name="qualification"
        className="form-control"
        placeholder="Qualification"
        onChange={handleChange}
        value={studentData.qualification}
      />
           <textarea name="bio"   onChange={handleChange}
        value={studentData.bio} id="" cols="20" rows="2" className="form-control mb-2" placeholder='Bio'></textarea>

      <textarea name="interests"   onChange={handleChange}
        value={studentData.interests} id="" cols="10" rows="2" className="form-control" placeholder='Interests'></textarea>

      <div id="emailHelp" className="form-text">Python,Javascript, React, Java etc.</div>
      <button type="submit" onClick={(e) => submitForm(e)} className="btn btn-dark btn-block mt-2 mb-5">Signup</button>



  
    </div>
    {/* </form> */}
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    

  );
};

export default StudentSignup;