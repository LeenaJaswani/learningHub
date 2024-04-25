import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'

const InstructorQuizzes = () => {
  const [quizData,setQuizData]=useState([]);
  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const instructorId=localStorage.getItem('instructorId')
  console.log(instructorId)
  
  useEffect(()=>{
    document.title='My Quizzes'
    try{
      axios.get(baseURL+"/instructor-quiz/"+instructorId)
      .then((response)=>{
       
          setQuizData(response.data)
       
        
      })
    }catch(error){
      console.error(error)
    }
  },[])
  console.log(quizData)

  // delete quiz
 
  const handleDelete = (quizId) => {
    Swal.fire({
        title: 'Confirm',
        text: 'Are You Sure You want to delete this quiz',
        icon: 'info',
        confirmButtonText: 'Continue',
        showCancelButton: true,
        showCloseButton: true,
        height: 100,
        width: 350,
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                axios.delete(baseURL+'/quiz-detail/'+quizId)
                .then(() => {
                   
                    setQuizData(prevQuizs => prevQuizs.filter(quiz => quiz.id !== quizId));
                    Swal.fire('Success', 'Quiz Deleted');
                });
            } catch (error) {
                Swal.fire('error', 'Something went Wrong');
            }
        } else {
            Swal.fire('error', 'Something went Wrong');
        }
    });
};

  return (
    <div className="container mt-4">

      <div className="row">
        <aside className='col-md-3'>
                 
        
        <InstructorSidebar/>
        </aside>
        <section className='col-md-9'>
        <div className="card cv ">
            
    <div className="card-body ms-4">
    <h3 className="card-header bg-transparent border-0">My Quizzes</h3>
    <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
                   
                    <colgroup width="150"></colgroup>
                    <colgroup width="120"></colgroup>
                    <colgroup width="800"></colgroup>

                   
                    <thead>
                    <tr>
                    {/* <td>Image</td> */}
                    <td>Name</td>
                    <td>Questions</td>
                   

                    <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                      {quizData.map((quiz,index)=>
                    <tr>
                    <td>
                     
                      <Link to={"/quiz-questions/"+quiz.id}>
                      
                        {quiz.title}</Link></td>
                     
                    <td><Link to="/">{quiz.total_questions}</Link>123</td>

                    <td>  
                    <button className="btn btn-danger ms-2 " onClick={()=>handleDelete(quiz.id)}><i className="bi bi-trash-fill danger"></i></button>
                    
                 
                    <Link to={`/addquiz-question/`+quiz.id}> 
                    <button className="btn btn-dark btn-block ms-2 ">Add Question</button>
                    </Link>
                        
                    <Link to={"/update-quiz/"+quiz.id}> 
                    <button className="btn btn-secondary ms-2 ">Update Quiz</button>
                    </Link>

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

export default InstructorQuizzes