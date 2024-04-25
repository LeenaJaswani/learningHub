import React, { useEffect, useState } from 'react'
import InstructorSidebar from './InstructorSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'

const InstructorProfileSettings = () => {
  const navigate = useNavigate()
  const instructorId = localStorage.getItem('instructorId')
  const baseURL = "http://localhost:8000/lhapi"

  const [instructorData, setInstructorData] = useState({
    'full_name': "",
    'email': "",
    'contact_no': "",
    'skills': "",
    "bio": "",
    'qualification': "",
    "prev_profile_image": "",
    "profile_image": "",
    'status': "",
    "login_via_otp":""
  })

  const handleChange = (event) => {
    setInstructorData({ ...instructorData, [event.target.name]: event.target.value })
    setInstructorData({ ...instructorData, [event.target.name]: event.target.checked });
  }

  const handleFileChange = (event) => {
    setInstructorData({ ...instructorData, [event.target.name]: event.target.files[0] })
  }
  const fetchInstructorDetails = async () => {
    try {
      const response = await axios.get(baseURL + "/instructor/" + instructorId)
      if (response.status) {
        setInstructorData({
          full_name: response.data.full_name,
          email: response.data.email,
          bio: response.data.bio,
          prev_profile_image: response.data.profile_image,
          profile_image: '',
          skills: response.data.skills,
          qualification: response.data.qualification,
          contact_no: response.data.contact_no,
          login_via_otp:response.data.login_via_otp
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
   
    fetchInstructorDetails()
  }, [instructorId, baseURL])

  const submitForm = async (e) => {
    e.preventDefault()
    const instructorFormData = new FormData();
    instructorFormData.append("full_name", instructorData.full_name)
    instructorFormData.append("email", instructorData.email)
    instructorFormData.append("qualification", instructorData.qualification)
    instructorFormData.append("contact_no", instructorData.contact_no)
    instructorFormData.append("skills", instructorData.skills)
    instructorFormData.append("bio", instructorData.bio)
    instructorFormData.append("login_via_otp", instructorData.login_via_otp)
    
    
    if (instructorData.profile_image !== "") {
      instructorFormData.append("profile_image", instructorData.profile_image, instructorData.profile_image.name)
    }

    try {
      const response = await axios.put(baseURL + "/instructor/" + instructorId, instructorFormData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })

      // console.log(response.data)
      fetchInstructorDetails();
      Swal.fire({
        title: 'Profile has been updated',
        icon: 'success',
        confirmButtonText: 'Continue',
        toast: true,
        timer: 3000,
        position: 'top-right',
        iconColor: "#5161ce",
        showCloseButton: true,
        showConfirmButton: false
      })

    
     
    } catch (error) {
      console.error(error);
      setInstructorData({
        ...instructorData,
        status: "error"
      })
    }
  }

  useEffect(() => {
    document.title = "Profile Settings"
    if (instructorData.status === "success") {
      navigate("/instructor-login");
    }
  }, [instructorData.status, navigate]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className='col-md-3'>
          <InstructorSidebar />
        </aside>
        <section className='col-md-9 '>
          <div className="card cv">
            {instructorData.status === "success" && (
              <p className="text-success">Profile Settings Changed</p>
            )}
            {instructorData.status === "error" && (
              <p className="text-danger">Something went wrong</p>
            )}
            <h3 className="card-header border-0 bg-transparent">Profile Settings</h3>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="form px-4">
                <div className=" row">
                  <label htmlFor="inputFullName" className="col-sm-3 col-form-label">Full Name</label>
                  <div className="col-sm-9">
                    <input name="full_name" value={instructorData.full_name} type="text" onChange={handleChange} className="form-control" id="inputFullName" />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input name="email" type="email" className="form-control" id="inputEmail" value={instructorData.email} />
                  </div>
                </div>
                <div className=" row">
                  <label htmlFor="inputContactNo" className="col-sm-3 col-form-label">Contact Number</label>
                  <div className="col-sm-9">
                    <input name="contact_no" value={instructorData.contact_no} type="number" onChange={handleChange} className="form-control" id="inputContactNo" />
                  </div>
                </div>
                <div className=" row">
                  <label htmlFor="inputQualification" className="col-sm-3 col-form-label">Qualification</label>
                  <div className="col-sm-9">
                    <input name="qualification" type="text" onChange={handleChange} className="form-control" id="inputQualification" value={instructorData.qualification} />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="inputPhoto" className="col-sm-3 col-form-label">Profile Photo</label>
                  <div className="col-sm-4">
                    <input type="file" className="form-control" name="profile_image" onChange={handleFileChange} id="image" />
                    {instructorData.prev_profile_image &&
                      <img width="300" height="200" className="rounded-circle" src={instructorData.prev_profile_image} alt={instructorData.title} />}
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="inputSkills" className="col-sm-3 col-form-label">Skills</label>
                  <div className="col-sm-6">
                    <textarea onChange={handleChange} name="skills" id="" cols="20" rows="2" className="form-control" placeholder='Skills' value={instructorData.skills}></textarea>
                    <div id="emailHelp" className="form-text">Python,Javascript, React, Java etc.</div>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="inputSkills" className="col-sm-3 col-form-label">Bio</label>
                  <div className="col-sm-6">
                    <textarea name="bio" id="" cols="20" rows="2" onChange={handleChange} className="form-control" placeholder='Skills' value={instructorData.bio}></textarea>
                  </div>
                </div>
                        <br />
                                    <div className="row">
                      <div className="col-sm-3"> <label className="form-check-label" htmlFor="exampleCheck1">Login Via OTP</label></div>
                      <div className="col-sm-9">
                        <div className="form-check">
                          <input type="checkbox" name="login_via_otp" className="form-check-input" id="exampleCheck1" checked={instructorData.login_via_otp} onChange={handleChange} />
                        
                        </div>
                      </div>
                    </div>
                <div className="col-8 text-center">
                  <button type="submit" className="btn btn-dark btn-block" style={{ marginBottom: "80px" }}>Update</button>
                </div>
              </div>
             
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default InstructorProfileSettings