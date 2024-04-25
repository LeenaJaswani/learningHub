import React from 'react'
import Home from './Home'
import About from './About'
import Navbar from './Navbar'
import Footer from './Footer'

import CourseDetail from './CourseDetail';

import  {Routes,Route} from 'react-router-dom'
import StudentLogin from './Student/StudentLogin'
import StudentSignup from './Student/StudentSignup'
import InstructorLogin from './Instructor/InstructorLogin'
import InstructorSignup from './Instructor/InstructorSignup'
import StudentDashboard from './Student/StudentDashboard'
import InstructorDashboard from './Instructor/InstructorDashboard'
import StudentMyCourses from './Student/StudentMyCourses'
import InstructorMyCourses from './Instructor/InstructorMyCourses'
import MyStudents from './Instructor/MyStudents'
import AddCourses from './Instructor/AddCourses'
import FavouriteCourses from './Student/FavoriteCourses'
import RecommendedCourses from './Student/RecommendedCourses'
import StudentProfileSettings from './Student/StudentProfileSettings'
import StudentChangePassword from './Student/ChangePassword'
import InstructorChangePassword from './Instructor/InstructorChangePassword'
import InstructorProfileSettings from './Instructor/InstructorProfileSettings'
import InstructorDetail from './InstructorDetail'
import AllCourses from './AllCourses'
import CourseChapters from './Instructor/CourseChapters'
import UpdateChapter from './Instructor/UpdateChapter'
import PopularCourses from './PopularCourses'
import TopInstructors from './TopInstructors'
import CategoryCourses from './CategoryCourses'
import InstructorLogout from './Instructor/InstructorLogout'
import Student from './Student/StudentLogout'
import AddChapters from './Instructor/AddChapters'
import UpdateCourse from './Instructor/UpdateCourse'
import InstructorSkillCourses from './InstructorSkillCourses'
import StudentLogout from './Student/StudentLogout'
import EnrolledStudents from './Instructor/EnrolledStudents'
import AddQuiz from './Instructor/AddQuiz'
import InstructorQuizzes from './Instructor/InstructorQuizzes'
import UpdateQuiz from './Instructor/UpdateQuiz'
import UpdateQuestion from './Instructor/UpdateQuestion'
import AddQuestions from './Instructor/AddQuestions'
import QuizQuestions from './Instructor/QuizQuestions'
import AssignQuiz from './Instructor/AssignQuiz'
import CourseQuiz from './Student/CourseQuiz'
import TakeQuiz from './Student/TakeQuiz'
import Search from './Search'
import StudyMaterial from './Instructor/StudyMaterial'
import UpdateStudyMaterial from './Instructor/UpdateStudyMaterial'
import AddStudyMaterial from './Instructor/AddStudyMaterial'
import StudyMaterialStudent from './Student/StudyMaterialStudent'
import AttemptedStudents from './Instructor/AttemptedStudents'
import Category from './Category'
import FAQ from './FAQ'
import VerifyInstructor from './Instructor/VerifyInstructor'
import VerifyStudent from './Student/VerifyStudent'
import InstructorForgotPassword from './Instructor/InstructorForgotPassword'
import StudentForgotPassword from './Student/StudentForgotPassword'
import MyInstructors from './Student/MyInstructors'
const Main = () => {
  const studentLoginStatus = localStorage.getItem('studentLoginStatus');
  const instructorLoginStatus = localStorage.getItem('instructorLoginStatus');


  return (
    <>
  <Navbar/>
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/faqs" element={<FAQ/>}/>
    <Route path="/detail/:courseId" element={<CourseDetail/>}/>
    <Route path="/search/:searchQuery" element={<Search/>}/>
    <Route path="/instructor-detail/:instructorId" element={<InstructorDetail/>}/>
    <Route path="/allcourses" element={<AllCourses/>}/>
  
    <Route path="/popular-courses" element={<PopularCourses/>}/>
    <Route path="/top-instructors" element={<TopInstructors/>}/>
    <Route path="/category" element={<Category/>}/>
    <Route path="/course/:categoryId/:categorySlug" element={<CategoryCourses/>}/>
    <Route path="/student-login" element={<StudentLogin/>}/>
    <Route path="/instructor-login" element={<InstructorLogin/>}/>
   {/* student */}
   {studentLoginStatus === 'true'  &&
   <>

   <Route path="/student/study-materials/:courseId" element={<StudyMaterialStudent/> } />
    
    <Route path="/student-signup" element={<StudentSignup/> } />
    <Route path="/student-mycourses" element={<StudentMyCourses /> } />
    <Route path="/student-dashboard" element={<StudentDashboard /> } />
    <Route path="/myinstructors" element={<MyInstructors /> } />
    <Route path="/student-forgot-password" element={<StudentForgotPassword /> } />
    <Route path="/favcourses" element={<FavouriteCourses /> } />
    <Route path="/recommendedcourses" element={<RecommendedCourses /> } />
    <Route path="/student-psettings" element={<StudentProfileSettings /> } />
    <Route path="/student-change-pswd/:studentId" element={<StudentChangePassword /> } />
    <Route path="/verify-student/:studentId" element={<VerifyStudent /> } />
    <Route path="/student-logout"element={<StudentLogout /> } />
    <Route path="/course-quiz/:courseId" element={<CourseQuiz/> } />
    <Route path="/take-quiz/:quizId" element={<TakeQuiz /> } />
    </>
}
{/* instructor */}
{instructorLoginStatus === 'true' &&
<>
   
    <Route path="/verify-instructor/:instructorId" element={<VerifyInstructor />} />
    <Route path="/instructor-signup" element={<InstructorSignup/>} />
    <Route path="/instructor-forgot-password" element={<InstructorForgotPassword />} />
    <Route path="/instructor-logout" element={<InstructorLogout />} />
    <Route path="/instructor-mycourses" element={<InstructorMyCourses />} />
    <Route path="/mystudents" element={<MyStudents />} />
    <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
    <Route path="/addcourses" element={<AddCourses />} />
    <Route path="/addquiz" element={<AddQuiz />} />
    <Route path="/attempted-students/:quizId" element={<AttemptedStudents />} />
    <Route path="/iquiz" element={<InstructorQuizzes/>}/>
    <Route path="/addquiz-question/:quizId" element={<AddQuestions/>} />
    <Route path="/quiz-questions/:quizId" element={<QuizQuestions/>} />
    <Route path="/assign-quiz/:courseId" element={<AssignQuiz />} />
   
    <Route path="/instructor-psettings" element={<InstructorProfileSettings />} />
    <Route path="/add-chapter/:courseId" element={<AddChapters />} />
    <Route path="/course-chapters/:courseId" element={<CourseChapters />} />
    <Route path="/study-materials/:courseId" element={<StudyMaterial />} />
    <Route path="/add-study/:courseId" element={<AddStudyMaterial />} />
    <Route path="/update-study/:studyId" element={<UpdateStudyMaterial />} />
    <Route path="/update-chapter/:chapterId" element={<UpdateChapter/>} />
    <Route path="/update-course/:courseId" element={<UpdateCourse/>}/>
    <Route path="/update-quiz/:quizId" element={<UpdateQuiz />} />
    <Route path="/instructor-change-pswd/:instructorId" element={<InstructorChangePassword/>}/>
    <Route path="/update-question/:questionId" element={<UpdateQuestion/>}/>
    <Route path="/instructor-skill/:skill_slug/:instructorId" element={<InstructorSkillCourses />} />
    <Route path="/enrolled-students/:courseId"element={<EnrolledStudents />} />
    </>
  }
     
      
        
      </Routes>
 
  <Footer/>

  </>
  )
}

export default Main