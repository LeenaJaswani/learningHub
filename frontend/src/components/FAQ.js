import React,{useEffect,useState} from 'react'
import './styles/styles.css'
import { Link,useParams } from "react-router-dom";
import axios from 'axios'



const FAQ = () => {
  const baseURL="http://localhost:8000/lhapi"
  const [faqData,setFaqData]=useState([]);

  useEffect(()=>{
    document.title='FAQS'
    try{
      axios.get(baseURL+"/faqs")
      .then((response)=>{
       
          setFaqData(response.data)
        
      })
    }catch(error){
      console.error(error)
    }

  },[])

  return (
    <div className="container mt-4">
      <h3 className='card-header'>FAQs</h3>
      <div className="accordion" id="accordionExample">
  {faqData && faqData.map((faq,index)=>
  <div className="accordion-item mt-2 mb-4">
    <h2 className="accordion-header">
      <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target={`#${faq.id}`} aria-expanded="true" aria-controls="collapseOne">
       {index+1}. {faq.question}
      </button>
    </h2>
    {/* {index==0 &&  */}
    <div id={faq.id} className="accordion-collapse collapse show " data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong> {faq.answer}</strong>
      </div>
    </div>
   
  </div>
)}
</div>
      
    </div>
  )
}

export default FAQ