
import '../styles/styles.css';
import React, { useState,useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import axios from 'axios'

const InstructorSignup = () => {
  const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi/instructor/"
  useEffect(()=>{
    document.title='Instructor Signup'
  })

  const [instructorData,setInstructorData]=useState({
    'full_name':"",
    'email':"",
    'password':"",
    'contact_no':"",
    'skills':"",
    'qualification':"",
    'status':"",
'otp_digit':""
  })

  // update form value
  const handleChange=(event)=>{
    setInstructorData({...instructorData,[event.target.name]:event.target.value})
  }
// console.log(instructorData)


// submit form
const submitForm=(e)=>{
  e.preventDefault()
  const otp_digit=Math.floor(100000+Math.random()*900000)
  const instructorFormData=new FormData();
  instructorFormData.append("full_name",instructorData.full_name)
  instructorFormData.append("email",instructorData.email)
  instructorFormData.append("password",instructorData.password)
  instructorFormData.append("qualification",instructorData.qualification)
  instructorFormData.append("contact_no",instructorData.contact_no)
  instructorFormData.append("skills",instructorData.skills)
  instructorFormData.append("otp_digit",otp_digit)
  try{
    axios.post(baseURL,instructorFormData).then((response)=>{
    // setInstructorData({
    //   'full_name':"",
    // 'email':"",
    // 'password':"",
    // 'contact_no':"",
    // 'skills':"",
    // 'qualification':"",
    // 'status':"success"

    // })
    navigate("/verify-instructor/"+response.data.id)
  })
}catch(error){

    console.error(error);
    setInstructorData({
    
    'status':"error"

    })
   
  }
}
useEffect(() => {
  if (instructorData.status === "success") {
    navigate("/instructor-login");
  }
}, [instructorData.status, navigate]);

  
// const instructorLoginStatus=localStorage.getItem('instructorLoginStatus')
// if(instructorLoginStatus=="true"){
 
// }

  const [activeTab, setActiveTab] = useState('signup');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
  

<div className="container mt-5 ">
      <div className="row">
        <div className="d-flex justify-content-center align-items-center ">
        
          <div className="card">
          {instructorData.status === "success" && (
          <p className="text-success">You are successfully registered</p>
        )}
        {instructorData.status === "error" && (
          <p className="text-danger">Something went wrong</p>
        )}
          <h3 className='card-header border-0 bg-transparent mb-2 color text-center'>Instructor Signup</h3>
            <ul className="nav nav-pills mb-3 ms-4" id="pills-tab" role="tablist">
              <li className="nav-item text-center">
              <Link
                 className={`nav-link ${activeTab === 'login' ? 'active btl' : 'btl inactive'}`}
                  id="pills-home-tab"
                  onClick={() => handleTabClick('login')}
                  to="/instructor-login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link
                  className={`nav-link ${activeTab === 'signup' ? 'active bts' : 'bts inactive'}`}
                  id="pills-profile-tab"
                  onClick={() => handleTabClick('signup')}
                  to="/instructor-signup"
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
                {/* <form onSubmit={(e) => { e.preventDefault(); }}> */}
                 <div className="form px-4">
      <input
        type="text"
        name="full_name"
        className="form-control"
        placeholder="Full Name"
        onChange={handleChange}
        value={instructorData.full_name}
      />
      <input
        type="email"
        name="email"
        className="form-control"
        placeholder="Email"
        onChange={handleChange}
        value={instructorData.email}
      />
      <input
        type="number"
        name="contact_no"
        className="form-control"
        placeholder="Contact No."
        onChange={handleChange}
        value={instructorData.contact_no}
      />
      <input
        type="password"
        name="password"
        className="form-control"
        placeholder="Password"
        onChange={handleChange}
        value={instructorData.password}
      />
       <input
        type="text"
        name="qualification"
        className="form-control"
        placeholder="Qualification"
        onChange={handleChange}
        value={instructorData.qualification}
      />
      <textarea  onChange={handleChange} name="skills" id="" cols="30" rows="2" className="form-control" placeholder='Skills'  value={instructorData.skills}></textarea>

      <div id="emailHelp" className="form-text">Python,Javascript, React, Java etc.</div>
      <button className="btn btn-dark btn-block mt-2 mb-5" type="submit" onClick={(e) => submitForm(e)}>Signup</button>



  
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

export default InstructorSignup;