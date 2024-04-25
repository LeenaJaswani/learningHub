import React,{useEffect,useState} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import InstructorSidebar from './InstructorSidebar'
import '../styles/styles.css';
import axios from 'axios'
import Swal from 'sweetalert2'
const QuizQuestions = () => {
    const [questionData,setQuestionData]=useState([]);
    const [totalQuestions,setTotalQuestions]=useState(0);
    // const navigate = useNavigate();
    const baseURL="http://localhost:8000/lhapi"
   const {quizId}=useParams()
  
    useEffect(()=>{
      document.title='My Courses'
      try{
        axios.get(baseURL+"/quiz-question/"+quizId)
        .then((response)=>{
            setTotalQuestions(response.data.length)
            setQuestionData(response.data)
           
          
        })
      }catch(error){
        console.error(error)
      }
    },[])
    console.log(questionData)


    // delete quiz
        const handleDelete=(questionId)=>{
            Swal.fire({
                title: 'Confirm',
                text: 'Are You Sure You want to delete this quiz',
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
                        axios.delete(baseURL+'/question/'+questionId)
                        .then((response)=>{
                            // console.log(response);
                            // setTotalQuestions(response.data.length);
                            // setQuestionData(response.data)
                            Swal.fire('Success','Question Deleted')
                            try{
                                axios.get(baseURL+"/quiz-question/"+quizId)
                                .then((response)=>{
                                    setTotalQuestions(response.data.length)
                                    setQuestionData(response.data)
                                   
                                  
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
        <h3 className="card-header bg-transparent border-0">  Questions ({totalQuestions}) <Link to={`/addquiz-question/`+quizId}> 
                    <button className="btn btn-dark btn-sm ms-2 float-end">Add Question</button>
                    </Link></h3>
     
         
        <table id="example" class="table table-striped table-bordered text-center" cellspacing="0" width="100%">
    
                    
                    <colgroup width="700"></colgroup>

                    <colgroup width="419"></colgroup>
                    <thead>
                    <tr>
                   
                    <td>Question</td>
                
                  
                   
                    <td>Action</td>
                    </tr>
                    </thead>
                    <tbody >
                      {questionData.map((q,index)=>
                    <tr key={q.id} >
                    <td > <Link to={"/update-question/"+q.id}> {q.question}</Link></td>
                
                   

                    <td> 
                    <Link to={"/update-question/"+q.id}> 
                     <button className="btn  btn-secondary">
                        <i className="bi bi-pencil-square"></i></button>
                        </Link>
                    {/* <Link to={"/delete-question/"+question.id}>  */}
                    <button className="btn btn-danger ms-2 " onClick={()=>handleDelete(q.id)}><i className="bi bi-trash-fill danger"></i></button>
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

export default QuizQuestions