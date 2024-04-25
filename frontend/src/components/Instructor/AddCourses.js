import React,{ useState,useEffect} from 'react'
import InstructorSidebar from './InstructorSidebar'
import { Link,useNavigate  } from 'react-router-dom';
import '../styles/styles.css';
import axios from 'axios'

const AddCourses = () => {
  const instructorId=localStorage.getItem('instructorId')
  const [categories,setCategories]=useState([])
  const [courseData,setCourseData]=useState({
    category:'',
    title:'',
    description:'',
    featured_image:'',
    technologies:''
  })
  const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  useEffect(()=>{
    try{
      axios.get(baseURL+"/category/")
      .then((response)=>{
       
          setCategories(response.data.results)
        
      })
    }catch(error){
      console.error(error)
    }
    // fetch current course
    
  },[])

  // update courseData

  const handleChange=(event)=>{
   
    setCourseData({...courseData,[event.target.name]:event.target.value})
 
  }
  
  const handleFileChange=(event)=>{
   
    setCourseData({...courseData,[event.target.name]:event.target.files[0]})
 
  }

  // submit form
const submitCourseForm=(e)=>{
  e.preventDefault()
  const courseFormData=new FormData();
 
  courseFormData.append("category",courseData.category)
  courseFormData.append("instructor",instructorId)
  courseFormData.append("title",courseData.title)
  courseFormData.append("description",courseData.description)
  courseFormData.append("featured_image",courseData.featured_image,courseData.featured_image.name)
  courseFormData.append("technologies",courseData.technologies)
  try{
    axios.post(baseURL+"/course/",courseFormData,{
      headers:{
        'content-type':'multipart/form-data'
      }
    }).then((response)=>{
      navigate("/instructor-mycourses")
      console.log(response.data.results)
    })
  }catch(error){
    console.error(error)
  }
}

  console.log(categories)
  console.log(courseData)
  return (
    <div className="container mt-4">

    <div className="row">
      <aside className='col-md-3'>
               <InstructorSidebar/>
      
     
      </aside>
      <section className='col-md-9 '>
        <div className="card cv">
            <h3 className="card-header border-0 bg-transparent">Add Courses</h3>
      <form onSubmit={(e) => submitCourseForm(e)}>
                <div className="form px-4 pb-4">
                <div className=" row mb-2">
                    <label htmlFor="Categories" className="col-sm-3 col-form-label">Categories</label>
                    <div className="col-sm-9">
                    <label for="category" className="form-label">Category</label>
                       <select name="category" value={courseData.category} onChange={handleChange} className='form-control'> 
                       {categories.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                       </select>
                    </div>
                </div>
                <div className=" row mb-2">
                    <label htmlFor="title" className="col-sm-3 col-form-label">Title</label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" id="title" name="title" onChange={handleChange} placeholder="Course Title"/>
                    </div>
                </div><div className="row mb-3">
                    <label htmlFor="inputDescription" className="col-sm-3 col-form-label">Description</label>
                    <div className="col-sm-4">
                    <textarea  id="inputDescription" onChange={handleChange}cols="20" rows="2" className="form-control" name="description" placeholder='Description'></textarea>
                  </div>
                  </div>
                <div className="row mb-2" >
                    <label for="video" className="col-sm-3 col-form-label">Featured Image</label>
                    <div className="col-sm-4">
                    <input type="file" className="form-control" name="featured_image" onChange={handleFileChange} id="video"/>
                    </div>
                    </div>
                
                    <div className="row">
                    <label for="inputTechnologies" className="col-sm-3 col-form-label">Technologies</label>
                    <div className="col-sm-4">
                    <textarea  onChange={handleChange} name="technologies" id="" cols="20" rows="2" className="form-control" placeholder='Python, PHP, JS etc.'></textarea>
                  </div>
                  </div>
                  <div className="col-8 text-center " >
                    <button className="btn btn-dark btn-block" style={{marginBottom:"80px"}} type='submit' >Add</button>
                    </div>  
                </div>
                
                </form>
                </div>
      </section>
    </div>
  </div>
  )
}

export default AddCourses