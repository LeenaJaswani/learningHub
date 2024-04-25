import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import ReactPlayer from 'react-player';
import './styles/styles.css'
import axios from 'axios'
import Swal from 'sweetalert2'


const CourseDetail = () => {
  const navigate=useNavigate()
  const [chapterData,setChapterData]=useState([]);
  const [courseData,setCourseData]=useState([]);
  const [instructorData,setInstructorData]=useState([]);
  const [relatedCourseData,setRelatedCourseData]=useState([]);
  const [techListData,setTechListData]=useState([]);
  const [studentLoginStatus,setStudentLoginStatus]=useState()
  const [enrollStatus,setEnrollStatus]=useState()
  const [ratingStatus,setRatingStatus]=useState()
  const [averageRating,setAverageRating]=useState(0)
  const [favoriteStatus,setFavoriteStatus]=useState()
  const [courseViews,setCourseViews]=useState(0)
    // const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
    const forImageURL="http://localhost:8000/"
   const {courseId}=useParams()
   const studentId=localStorage.getItem('studentId')
  
   useEffect(()=>{
    document.title='Course Detail'
    try{
      axios.get(baseURL+"/course/"+courseId)
      .then((response)=>{
        setCourseData(response.data)
        setChapterData(response.data.course_chapters)
        setInstructorData(response.data.instructor)
        setRelatedCourseData(JSON.parse(response.data.related_videos))
        setTechListData(response.data.tech_list)
       if(response.data.course_rating!="" && response.data.course_rating!=null){
        setAverageRating(response.data.course_rating)
       }
      
        
      })
    }catch(error){
      console.error(error)
    }
    // check enroll status
    try{
    axios.get(baseURL+"/enroll-status/"+studentId+"/"+courseId)
      .then((response)=>{
        console.log(response)
        if(response.data.bool==true){
          setEnrollStatus("success")
        }
        
      })
    }catch(error){
      console.error(error)
    }

    // rating status
    try{
      axios.get(baseURL+"/rating-status/"+studentId+"/"+courseId)
        .then((response)=>{
          console.log(response)
          if(response.data.bool==true){
            setRatingStatus("success")
          }
          
        })
      }catch(error){
        console.error(error)
      }
        // favourite status


        try{
          axios.get(baseURL+"/favorite-status/"+studentId+"/"+courseId)
            .then((response)=>{
              console.log(response)
              if(response.data.bool==true){
                setFavoriteStatus("success");
              }
              
            })
          }catch(error){
            console.error(error)
          }
    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus==='true'){
      setStudentLoginStatus('success')
    }


    // update views
    axios.get(baseURL+"/update-views/"+courseId)
    .then((response)=>{
      console.log(response.data)
      setCourseViews(response.data.views)
    })
  },[])

// mark as favorite course
const markAsFavorite = () => {

    const favFormData = new FormData();
    favFormData.append("course", courseId);
    favFormData.append("student", studentId);
    favFormData.append("status", true);

    try {
      axios.post(baseURL + "/add-favorite-course/", favFormData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
      
         
         

          Swal.fire({
            title: "Added to Wishlist",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            iconColor: "#5161ce",
            showCloseButton: true,
            showConfirmButton: false,
          });
          setFavoriteStatus("success");
        }
      });
    } catch (error) {
      console.error(error);
    }
  
};

const removeFavorite = (pk) => {

    const removeFormData = new FormData();
    removeFormData.append("course", courseId);
    removeFormData.append("student", studentId);
    removeFormData.append("status", false);

    try {
      axios
        .get(baseURL + "/remove-favorite-course/" + courseId + "/" + studentId, removeFormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (
            (response.status === 200 || response.status === 201) &&
            studentLoginStatus === "success"
          ) {
            // Update favorite status in local state and local storage
        
           

            Swal.fire({
              title: "Removed from Wishlist",
              icon: "error",
              confirmButtonText: "Continue",
              toast: true,
              timer: 3000,
              position: "top-right",
              showCloseButton: true,
              showConfirmButton: false,
            });
            setFavoriteStatus("");
          }
        });
    } catch (error) {
      console.error(error);
    }
  
};

  const enrollCourse=()=>{
   
    // e.preventDefault()
    const courseFormData=new FormData();
   
    courseFormData.append("course",courseId)
    console.log(courseId)
    courseFormData.append("student",studentId)
  
    try{
      axios.post(baseURL+"/student-course-enroll/",courseFormData,{
        headers:{
          'content-type':'multipart/form-data'
        }
      }).then((response)=>{
        // navigate("/instructor-mycourses")
        if((response.status===200 || response.status===201) && studentLoginStatus=="success"){
            
          Swal.fire({
              title: 'Enrolled',
            
              icon: 'success',
              confirmButtonText: 'Continue',
              toast:true,
              timer:3000,
              position:'top-right',
              iconColor:"#5161ce",
              showCloseButton:true,
              showConfirmButton:false
          
            })
            setEnrollStatus("success")
          
   }
      })
    }catch(error){
      console.error(error)
    }
  }
  // console.log(courseData," -- ",relatedCourseData)
  // rate

  const [ratingData,setRatingData]=useState({
    rating:'',
    review:'',
    
  
  })

  const handleChange=(event)=>{
   
    setRatingData({...ratingData,[event.target.name]:event.target.value})
 
  }
  const submitForm=(e)=>{
    e.preventDefault()
    const ratingFormData=new FormData();
   
    ratingFormData.append("course",courseId)
    ratingFormData.append("student",studentId)
    ratingFormData.append("rating",ratingData.rating)
    ratingFormData.append("review",ratingData.review)

    try{
      axios.post(baseURL+"/course-rating/",ratingFormData,)
      .then((response)=>{
        if((response.status===200 || response.status===201) && studentLoginStatus=="success"){
            
          Swal.fire({
              title: 'Rated',
            
              icon: 'success',
              confirmButtonText: 'Continue',
              toast:true,
              timer:3000,
              position:'top-right',
              iconColor:"#5161ce",
              showCloseButton:true,
              showConfirmButton:false
          
            })
         window.location.reload()
          
   }
    
      })
    }catch(error){
      console.error(error)
    }
  }

  const formatChapterDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    let formattedDuration = '';
    if (hours > 0) {
      formattedDuration += hours + ' hours ';
    }
    if (minutes > 0) {
      formattedDuration += minutes + ' minutes ';
    }
    formattedDuration += seconds + ' seconds';

    return formattedDuration;
  };
const formatCourseDuration = (durationString) => {
  if (!durationString || typeof durationString !== 'string') return 'Duration: 0 seconds'; 

  const durationParts = durationString.split(":").map(Number);
  if (durationParts.length < 3) return 'Duration: 0 seconds'; 

  const hours = durationParts[0];
  const minutes = durationParts[1];
  const seconds = Math.floor(durationParts[2]);

  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += hours + ' hours ';
  }
  if (minutes > 0) {
    formattedDuration += minutes + ' minutes ';
  }
  formattedDuration += seconds + ' seconds';

  return formattedDuration;
};



  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4 rounded mx-auto d-block image-container">
          <div className="preview-card__img">
            <img className="img-responsive center-block" src={courseData.featured_image} alt={courseData.title} />
          </div>
        </div>
        <div className="col-8">
          <h3>{courseData.title}   {studentLoginStatus === 'success' && (
  favoriteStatus ? (
    <button
      title="Remove Favorite"
      onClick={removeFavorite}
      className="btn bg-transparent"
    >
      <i className="bi bi-heart-fill outline-danger heart text-danger"></i>
    </button>
  ) : (
    <button
      title="Add Favorite"
      onClick={markAsFavorite}
      className="btn bg-transparent"
    >
      <i className="bi bi-heart-fill outline-danger heart"></i>
    </button>
  )
)}</h3>
          <p>
          {courseData.description}
          </p>
          <p className='fw-bold'>Course By: {courseData.instructor ? <Link to={"/instructor-detail/"+instructorData.id}>{instructorData.full_name}</Link> : 'Loading...'}</p>
          <p className='fw-bold'>Technologies: 
          {techListData.map((tech,index)=>
          <Link to={"/category/"+tech.trim()} className='badge badge-pill text-white ms-2'  style={{backgroundColor:"#6276f4 "}}>{
          tech}
          </Link> 
          )}
          </p>
          <p className='fw-bold'>Duration: {formatCourseDuration(courseData.total_course_duration)}</p>
          <p className='fw-bold'> Enrolled Students: {courseData.total_enrolled_students} </p>
          <p className='fw-bold'> Views: {courseViews} </p>
          <p className='fw-bold'>Rating: {averageRating}/5         {studentLoginStatus==='success' && enrollStatus==='success' &&  
         <> {  ratingStatus!=="success" &&
         <button  type="button"  data-bs-toggle="modal" data-bs-target="#staticBackdrop"
          className="btn btn-dark btn-block">Rate the Course
          </button>
} 
{  ratingStatus=="success" &&
        <small className="badge bg-light text-dark">Your Rating : {ratingData.rating}</small>
} 
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg d-flex justify-content-center">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Rate {courseData.title} Course</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-flex flex-column align-items-center">
                <form class="row g-3 w-100">
                  <div class="col-md-6 d-flex  align-items-center">
                    <label for="inputRating" className="form-label">Rating</label>
                    <select id="inputRating" name="rating" className="form-control ms-4" onChange={handleChange}>
                                <option selected>Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              
                                <option value="4">4</option>
                                <option value="5">5</option>
                                </select>
                  </div>
                  <div className="col-md-6 d-flex  align-items-center">
                    <label for="inputReview" className="form-label">Review</label>
                    <textarea name="review" id="inputReview" cols="48"  onChange={handleChange} rows="4" className="form-control ms-3"></textarea>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <button type="submit" onClick={submitForm} className="btn btn-dark btn-block">Done</button>
                  </div>
                </form>
              </div>
            </div>
</div>
</div>
</>

           }
           
           
           </p>
  
          
          {studentLoginStatus==='success'   && enrollStatus!=='success'  && <button  type="submit"  onClick={enrollCourse} className="btn btn-dark btn-block">Enroll</button>}
       
          {studentLoginStatus==='success' && enrollStatus==='success' &&  <span  className="btn btn-dark btn-block">You are Enrolled in this Course</span> }
          {studentLoginStatus!=='success'  &&  <Link to="/student-login"><button  type="submit"  onClick={enrollCourse} className="btn btn-dark btn-block">Login to Enroll</button> </Link> }
       
        </div>
      </div>
      {/* Course Videos */}
      {studentLoginStatus==='success'  &&  enrollStatus==='success' &&
      <div className="card mt-3 cv">
        <div className="card-header">Course Chapters</div>
        <ul className="list-group list-group-flush">
        {chapterData.map((chapter,index)=>
          <li className="list-group-item">
            {chapter.title}
          
          <span className='float-end'>
          <span className="me-3">{formatChapterDuration(chapter.video_duration)}</span>
          <button className="btn btn-sm "><i className="bi bi-play-circle-fill color" data-bs-toggle="modal" data-bs-target="#video1"></i></button>
          </span>
          <div className="modal fade" id="video1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Video 1</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
                <div class="ratio ratio-16x9">
            {/* <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe> */}
            <ReactPlayer
      url={chapter.video}
      controls
      width="100%"
      height="auto"
    />
          </div>
      </div>
    
    </div>
  </div>
</div>
          </li>
        )}
          
        </ul>
      </div>}
<div className='row mb-3'>
      <h4 className='mt-5'>Related Courses </h4>
      {relatedCourseData.map((rc,index)=>
        <div className="col-md-4 col-sm-6 mb-5">
        <Link to={"/detail/"+rc.pk} target="_blank" >  
        <div className="preview-card mt-4">
            <div className="preview-card__wrp">
              <div className="preview-card__item d-flex flex-column align-items-center">
                <div className="preview-card__img">
                  <img  src={forImageURL+"media/"+rc.fields.featured_image} alt={rc.fields.title}  />
                </div>
                <div className="preview-card__content text-center">
                  <span className="preview-card__code">26 December 2019</span>
                  <div className="preview-card__title">{rc.fields.title}</div>
                
                  <Link to={"/detail/"+rc.pk} target="_blank" className="preview-card__button">READ MORE</Link>
                </div>
              </div>
            </div>
          </div></Link> 
        </div>
      )}
     
        </div>
    </div>
  )
}

export default CourseDetail