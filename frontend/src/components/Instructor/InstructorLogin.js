import React, { useState,useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import '../styles/styles.css';
import InstructorSignup from './InstructorSignup';
import axios from 'axios'
const InstructorLogin = () => {
  const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  useEffect(()=>{
    document.title='Instructor Login'
  })
  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  // login

  const [instructorLoginData,setInstructorLoginData]=useState({
    email:"",
    password:""
    
  })
  const [errorMessage,setErrorMessage]=useState('')

  // update form value
  const handleChange=(event)=>{
   
    setInstructorLoginData({...instructorLoginData,[event.target.name]:event.target.value})
 
  }
  // console.log(instructorLoginData)


  // submit form
  const submitLoginForm = (e) => {
    e.preventDefault();
    const instructorFormData = new FormData();
    instructorFormData.append("email", instructorLoginData.email);
    instructorFormData.append("password", instructorLoginData.password);
    try {
      axios.post(baseURL + "/instructor-login/", instructorFormData).then((response) => {
        if (response.data.bool === true) {
          if (response.data.login_via_otp === true) {
            navigate(`/verify-instructor/${response.data.instructor_id}`);
          } else {
            localStorage.setItem('instructorLoginStatus', true);
            localStorage.setItem('instructorId', response.data.instructor_id);
            navigate("/instructor-dashboard");
          }
          
        } else {
          console.log(response.data.instructor_id)
          if (response.data.msg === 'Account is not verified') {
            const verifyLink = (
              <div>
                <p>{response.data.msg}</p>
                <Link to={`/verify-instructor/${response.data.instructor_id}`}>Click here to verify your account</Link>
              </div>
            );
            setErrorMessage(verifyLink);
          } else {
            setErrorMessage(response.data.msg);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
// const instructorLoginStatus=localStorage.getItem('instructorLoginStatus')
// if(instructorLoginStatus==='true'){
//   navigate("/instructor-dashboard")
// }


const studentLoginStatus = localStorage.getItem('studentLoginStatus');
  if (studentLoginStatus === 'true') {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col text-center">
            <p className="text-danger">You are already logged in as Student</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="d-flex justify-content-center align-items-center ">
          <div className="card">
            {errorMessage &&  <p className='text-danger'>{errorMessage}</p>}
            
          <h3 className='card-header border-0 bg-transparent text-center mb-2 color'>Instructor Login</h3>
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
                className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                {/* <form > */}
                <div className="form px-4 pt-2">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                    value={instructorLoginData.email}
                  />
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                    value={instructorLoginData.password}
                  />
                  <div className="mb-3">
    
    <Link to="/instructor-forgot-password " className='link-secondary link-offset-2 link-underline-opacity-45 link-underline-opacity-100-hover'>Forgot Password?</Link>
    
  </div>
                  <button  type="submit" onClick={(e) => submitLoginForm(e)} className="btn btn-dark btn-block mt-3">Login</button>
                </div>
                {/* </form> */}
              </div>
              <div
                className={`tab-pane fade ${activeTab === 'signup' ? 'show active' : ''}`}
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <InstructorSignup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;