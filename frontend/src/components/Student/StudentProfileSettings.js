import React, { useEffect, useState } from 'react'
import StudentSidebar from './StudentSidebar'
import axios from 'axios'
import Swal from 'sweetalert2'

const StudentProfileSettings = () => {
  const studentId = localStorage.getItem('studentId')
  const baseURL = "http://localhost:8000/lhapi"

  const [studentData, setStudentData] = useState({
    'full_name': "",
    'email': "",
    'contact_no': "",
    'interested_categories': "",
    "bio": "",
    'qualification': "",
    "prev_profile_image": "",
    "profile_image": "",
    'status': "",
    "login_via_otp":""
  })

  const handleChange = (event) => {
    setStudentData({ ...studentData, [event.target.name]: event.target.value })
    setStudentData({ ...studentData, [event.target.name]: event.target.checked });
  }

  const handleFileChange = (event) => {
    setStudentData({ ...studentData, [event.target.name]: event.target.files[0] })
  }

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(baseURL + "/student/" + studentId)
      if (response.status === 200) {
        setStudentData({
          full_name: response.data.full_name,
          email: response.data.email,
          bio: response.data.bio,
          prev_profile_image: response.data.profile_image,
          profile_image: '',
          interested_categories: response.data.interested_categories,
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
    fetchStudentDetails()
  }, [studentId, baseURL])

  const submitForm = async (e) => {
    e.preventDefault()
    const studentFormData = new FormData();
    studentFormData.append("full_name", studentData.full_name)
    studentFormData.append("email", studentData.email)
    studentFormData.append("qualification", studentData.qualification)
    studentFormData.append("contact_no", studentData.contact_no)
    studentFormData.append("interested_categories", studentData.interested_categories)
    studentFormData.append("bio", studentData.bio)
    studentFormData.append("login_via_otp", studentData.login_via_otp)

    if (studentData.profile_image !== "") {
      studentFormData.append("profile_image", studentData.profile_image, studentData.profile_image.name)
    }

    try {
      const response = await axios.put(baseURL + "/student/" + studentId, studentFormData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })

      if (response.status === 200) {
        setStudentData(prevState => ({
          ...prevState,
          status: "success"
        }));
       
        fetchStudentDetails();
        Swal.fire({
          title: 'Profile has been updated',
          icon: 'success',
          confirmButtonText: 'OK',
          toast: true,
          timer: 3000,
          position: 'top-right',
          iconColor: "#5161ce",
          showCloseButton: true,
          showConfirmButton: false
        })
      }

    } catch (error) {
      console.error(error);
      setStudentData(prevState => ({
        ...prevState,
        status: "error"
      }));
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className='col-md-3'>
          <StudentSidebar />
        </aside>
        <section className='col-md-9 '>
          <div className="card cv">
            {studentData.status === "success" && (
              <p className="text-success">Profile Settings Changed</p>
            )}
            {studentData.status === "error" && (
              <p className="text-danger">Something went wrong</p>
            )}
            <h3 className="card-header border-0 bg-transparent">Profile Settings</h3>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="form px-4">
                <div className=" row">
                  <label htmlFor="inputFullName" className="col-sm-3 col-form-label">Full Name</label>
                  <div className="col-sm-9">
                    <input name="full_name" value={studentData.full_name} type="text" onChange={handleChange} className="form-control" id="inputFullName" />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input name="email" type="email" className="form-control" id="inputEmail" value={studentData.email} />
                  </div>
                </div>
                <div className=" row">
                  <label htmlFor="inputContactNo" className="col-sm-3 col-form-label">Contact Number</label>
                  <div className="col-sm-9">
                    <input name="contact_no" value={studentData.contact_no} type="number" onChange={handleChange} className="form-control" id="inputContactNo" />
                  </div>
                </div>
                <div className=" row">
                  <label htmlFor="inputQualification" className="col-sm-3 col-form-label">Qualification</label>
                  <div className="col-sm-9">
                    <input name="qualification" type="text" onChange={handleChange} className="form-control" id="inputQualification" value={studentData.qualification} />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="inputPhoto" className="col-sm-3 col-form-label">Profile Photo</label>
                  <div className="col-sm-4">
                    <input type="file" className="form-control" name="profile_image" onChange={handleFileChange} id="image" />
                    {studentData.prev_profile_image &&
                      <img width="300" height="200" className="rounded-circle" src={studentData.prev_profile_image} alt={studentData.title} />}
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="inputInterests" className="col-sm-3 col-form-label">Interests</label>
                  <div className="col-sm-6">
                    <textarea onChange={handleChange} name="interested_categories" id="" cols="20" rows="2" className="form-control" placeholder='Interests' value={studentData.interested_categories}></textarea>
                    <div id="emailHelp" className="form-text">Python,Javascript, React, Java etc.</div>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="inputSkills" className="col-sm-3 col-form-label">Bio</label>
                  <div className="col-sm-6">
                    <textarea name="bio" id="" cols="20" rows="2" onChange={handleChange} className="form-control" placeholder='Skills' value={studentData.bio}></textarea>
                  </div>
                </div>
                <br />
                                    <div className="row">
                      <div className="col-sm-3"> <label className="form-check-label" htmlFor="exampleCheck1">Login Via OTP</label></div>
                      <div className="col-sm-9">
                        <div className="form-check">
                          <input type="checkbox" name="login_via_otp" className="form-check-input" id="exampleCheck1" checked={studentData.login_via_otp} onChange={handleChange} />
                        
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

export default StudentProfileSettings