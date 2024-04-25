import React,{useEffect,useState,useRef} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import './styles/styles.css'
import axios from 'axios'


const Message = (props) => {
  const [messageData,setMessageData]=useState([]);
  // const navigate = useNavigate();
  const baseURL="http://localhost:8000/lhapi"
  const instructorId=localStorage.getItem('instructorId')
  console.log(instructorId)
  const messagesEndRef = useRef(null);
 // console.log(instructorId)
 useEffect(() => {
  document.title = 'Messages';
  const getMessages = async () => {
    try {
      const response = await axios.get(`${baseURL}/get-messages/${props.instructor_id}/${props.student_id}`);
      setMessageData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch messages initially
  getMessages();

 
  const intervalId = setInterval(getMessages, 500);

  
  return () => clearInterval(intervalId);
}, [props.instructor_id, props.student_id]);
useEffect(() => {
  // Scroll to the bottom of the chat after messageData changes
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messageData]);

// const getMessages=()=>{
//     try{
//         axios.get(baseURL+'/get-messages/'+props.instructor_id+'/'+props.student_id).then((resposne)=>{
//             setMessageData(resposne.data)
//             const objDiv=document.getElementById("msgList")
//             objDiv.scrollTop=objDiv.scrollHeight
//         })

//     }catch(error){
//         console.log(error)
//     }
// }
  return (
  <>
    {/* <p><span className='btn btn-sm btn-secondary' onClick={getMessages} title='Refresh'> <i class="bi bi-arrow-clockwise"></i></span></p> */}
  <div id="msgList" >
  {messageData.map((obj,index) =>
    <div className="row">
  

       {obj.sender==="student" &&
            
                        <div className="chat-message-left pb-4" >
                        <div>


                        <div className="text-muted small text-nowrap mt-2">
                        <span className='mt-3'>
                        {obj.msg_time}
                        </span>
                        </div>
                        </div>
                        <div className="flex-shrink-1  rounded py-2 px-3 mr-3 messages">
                      
                            {obj.message}
                        
                        <br />

                        </div>
                        </div>}
              



                        {obj.sender=="instructor" &&
            
            <div className="chat-message-right pb-4" >
            <div>


            <div className="text-muted small text-nowrap mt-2">
            <span className='mt-3'>
            {obj.msg_time}
            </span>
            </div>
            </div>
            <div className="flex-shrink-1  rounded py-2 px-3 mr-3 messages">
           
                {obj.message}
            
            <br />

            </div>
            </div>}
             </div>  
            )}
            <div ref={messagesEndRef}/>
            </div>
             </>
  )
}

export default Message