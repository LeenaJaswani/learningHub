import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import '../styles/styles.css';
import axios from 'axios'

const TakeQuiz = () => {
  useEffect(() => {
    document.title = 'My Courses'
  })

  const { quizId } = useParams()
  const [questionData, setQuestionData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [noMoreQuestions, setNoMoreQuestions] = useState(false);
  const baseURL = "http://localhost:8000/lhapi"
  const studentId = localStorage.getItem('studentId')

  useEffect(() => {
    try {
      axios.get(baseURL + "/quiz-question/" + quizId + "/1")
        .then((response) => {
          setQuestionData(response.data)
        })
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleRadioChange = (questionId, answerId, correctAnswer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: answerId,
    }));
    submitAnswer(questionId, correctAnswer);
  };

  const submitAnswer = (question_id, correct_ans) => {
    const answerFormData = new FormData();

    answerFormData.append("student", studentId)
    answerFormData.append("question", question_id)
    answerFormData.append("quiz", quizId)
    answerFormData.append("correct_ans", correct_ans)

    try {
      axios.post(baseURL + "/attempt-quiz/", answerFormData, {})
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            try {
              axios.get(baseURL + "/quiz-question/" + quizId + "/next-question/" + question_id)
                .then((response) => {
                  if (response.data.length > 0) {
                    setQuestionData(response.data);
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  } else {
                    // Display a message that there are no more questions
                    setQuestionData([]);
                    setCurrentQuestionIndex(0);
                    setNoMoreQuestions(true);
                  }
                });
            } catch (error) {
              console.error(error);
            }
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className='col-md-3'>
          <StudentSidebar />
        </aside>
        <div className='col-md-9  d-flex flex justify-content-center'>
          <section className='d-flex flex-column align-items-center justify-content-center ms-3' style={{ position: "fixed" }}>
            <div className=" d-flex flex-column align-items-center justify-content-center ">
              <h4>Quiz Title</h4>
              {noMoreQuestions ? (
                <div>
                  <h5>No more questions</h5>
                </div>
              ) : (
                questionData.map((q, index) => (
                  <div className="tab-content" key={q.id}>
                    <div className="tab" id="quiz" role="tabpanel">
                      <div className="card  mb-4 " style={{ border: " 1px solid #5161ce" }}>
                        <div className="d-flex justify-content-between align-items-center card-header  text-white " id="h1" style={{ backgroundColor: "#5161ce" }}>
                          <span>Question {currentQuestionIndex + 1}</span>
                          <button type="button" data-bs-toggle="collapse" data-bs-target={`#q${q.id}`} aria-expanded="false" aria-controls={`q${q.id}`} className="btn btn-outline-light">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </button>
                        </div>
                        <div id={`q${q.id}`} className="collapse show" aria-labelledby="h1">
                          <div className="card-body">
                            <p>{q.question}</p>
                            <div className="form-check">
                              <input
                                onClick={() => handleRadioChange(q.id, q.ans1, q.correct_ans)}
                                className="form-check-input"
                                type="radio"
                                name={`q${q.id}`}
                                id={`q${q.id}_${q.ans1}`}
                                value={q.ans1}
                                style={{
                                  backgroundColor: selectedAnswers[q.id] === q.ans1 ? '#5161ce' : 'lightgrey',
                                }}
                              />
                              <label className="form-check-label" htmlFor={`q${q.id}_${q.ans1}`}>
                                {q.ans1}
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                onClick={() => handleRadioChange(q.id, q.ans2, q.correct_ans)}
                                className="form-check-input"
                                type="radio"
                                name={`q${q.id}`}
                                id={`q${q.id}_${q.ans2}`}
                                value={q.ans2}
                                style={{
                                  backgroundColor: selectedAnswers[q.id] === q.ans2 ? '#5161ce' : 'lightgrey',
                                }}
                              />
                              <label className="form-check-label" htmlFor={`q${q.id}_${q.ans2}`}>
                                {q.ans2}
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                onClick={() => handleRadioChange(q.id, q.ans3, q.correct_ans)}
                                className="form-check-input"
                                type="radio"
                                name={`q${q.id}`}
                                id={`q${q.id}_${q.ans3}`}
                                value={q.ans3}
                                style={{
                                  backgroundColor: selectedAnswers[q.id] === q.ans3 ? '#5161ce' : 'lightgrey',
                                }}
                              />
                              <label className="form-check-label" htmlFor={`q${q.id}_${q.ans3}`}>
                                {q.ans3}
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                onClick={() => handleRadioChange(q.id, q.ans4, q.correct_ans)}
                                className="form-check-input"
                                type="radio"
                                name={`q${q.id}`}
                                id={`q${q.id}_${q.ans4}`}
                                value={q.ans4}
                                style={{
                                  backgroundColor: selectedAnswers[q.id] === q.ans4 ? '#5161ce' : 'lightgrey',
                                }}
                              />
                              <label className="form-check-label" htmlFor={`q${q.id}_${q.ans4}`}>
                                {q.ans4}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TakeQuiz