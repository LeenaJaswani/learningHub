import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const CourseChapters = () => {
    const [chapterData,setChapterData]=useState([]);
    const [totalChapters,setTotalChapters]=useState(0);
    // const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
   const {courseId}=useParams()
  
    useEffect(()=>{
      document.title='My Courses'
      try{
        axios.get(baseURL+"/course-chapter/"+courseId)
        .then((response)=>{
            setTotalChapters(response.data.length)
            setChapterData(response.data)
           
          
        })
      }catch(error){
        console.error(error)
      }
    },[])
    console.log(chapterData)


    // delete chapter
        const handleDelete=(chapterId)=>{
            Swal.fire({
                title: 'Confirm',
                text: 'Are You Sure You want to delete this chapter',
                icon: 'info',
                confirmButtonText: 'Continue',
                showCancelButton:true,
                showCloseButton: true,
                height:100,
                width:350,
            
              })
              .then((result)=>{
                if(result.isConfirmed){
                    try{
                        axios.delete(baseURL+'/chapter/'+chapterId)
                        .then((response)=>{
                            // console.log(response);
                            // setTotalChapters(response.data.length);
                            // setChapterData(response.data)
                            Swal.fire('Success','Chapter Deleted')
                            try{
                                axios.get(baseURL+"/course-chapter/"+courseId)
                                .then((response)=>{
                                    setTotalChapters(response.data.length)
                                    setChapterData(response.data)
                                   
                                  
                                })
                              }catch(error){
                                console.error(error)
                              }
                        });
                      
                    }catch(error){
                        Swal.fire('error','Something went Wrong')
                    }
                }else{
                    Swal.fire('error','Something went Wrong')
                }
              })
        }
    return (
        <div className="container mt-4">
    
          <div className="row">
            <aside className='col-md-3'>
                     
            
            <InstructorSidebar/>
            </aside>
            <section className='col-md-9 '>
            <div className="card cv ">
                
        <div className="card-body ms-4">
        <h3 className="card-header bg-transparent border-0">  Chapters ({totalChapters}) <Link to={`/add-chapter/`+courseId}> 
                    <button className="btn btn-dark btn-sm ms-2 float-end">Add Chapter</button>
                    </Link></h3>
     
         
        <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
    <colgroup width="20"></colgroup>
                    <colgroup width="153"></colgroup>
                    <colgroup width="700"></colgroup>

                    <colgroup width="419"></colgroup>
                    <thead>
                    <tr>
                    {/* <td>Image</td> */}
                    <td>Chapter</td>
                    {/* <td>Description</td> */}
                    <td>Video</td>
                    <td>Notes</td>
                    <td>Action</td>
                    </tr>
                    </thead>
                    <tbody >
                      {chapterData.map((chapter,index)=>
                    <tr key={chapter.id} >
                    <td > <Link to={"/update-chapter/"+chapter.id}> {chapter.title}</Link></td>
                    <td className='text-center'>
                        <video width="200" controls>
                                        <source src={chapter.video.url} type="video/mp4"/>
                                        <source src={chapter.video.url} type="video/ogg"/>
                                        Your browser does not support HTML video.
                                        </video>
                    </td>
                    <td >{chapter.notes}</td>

                    <td> 
                    <Link to={"/update-chapter/"+chapter.id}> 
                     <button className="btn  btn-secondary">
                        <i className="bi bi-pencil-square"></i></button>
                        </Link>
                    {/* <Link to={"/delete-chapter/"+chapter.id}>  */}
                    <button className="btn btn-danger ms-2 " onClick={()=>handleDelete(chapter.id)}><i className="bi bi-trash-fill danger"></i></button>
                    {/* </Link> */}

                    </td>
                    </tr>
                      )}

                    </tbody>
    </table>
        </div>
      </div>
            </section>
          </div>
       
     
      </div>
      )
}

export default CourseChapters