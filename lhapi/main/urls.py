from django.urls import path
from . import views
urlpatterns=[
    # instructor
    path('instructor/',views.InstructorList.as_view()),
    path('instructor/<int:pk>',views.InstructorDetail.as_view()),
      path('instructor-forgot-password/',views.instructor_forgot_password),
     path('instructor/dashboard/<int:pk>',views.InstructorDashboard.as_view()),
    path('instructor-login/',views.instructor_login),
        path('instructor-change-pswd/<int:instructor_id>',views.instructor_change_pswd),
   
   path('verify-instructor/<int:instructor_id>',views.verify_instructor_via_otp),
    # category
    path('category/',views.CategoryList.as_view()),
    # course
    path('course/',views.CourseList.as_view()),
     path('popular-courses/',views.CourseRatingList.as_view()),
     path('course/<int:pk>',views.CourseDetail.as_view()),
       path('update-views/<int:course_id>',views.update_view),
     
    path('instructor-courses/<int:instructor_id>',views.InstructorCourseList.as_view()),
     path('instructor-course-detail/<int:pk>',views.InstructorCourseDetail.as_view()),
      path('top-instructors/',views.InstructorList.as_view()),
  path('search-courses/<str:searchQuery>',views.CourseList.as_view()),
    #chapter
     path('chapter/',views.ChapterList.as_view()),
        path('chapter/<int:pk>',views.ChapterDetail.as_view()),
        
      path('course-chapter/<int:course_id>',views.CourseChapterList.as_view()),
  #student
     path('student/',views.StudentList.as_view()), 
     path('student-login/',views.student_login),
          path('student/dashboard/<int:pk>',views.StudentDashboard.as_view()),
           path('student/<int:pk>',views.StudentDetail.as_view()),
            path('student-change-pswd/<int:student_id>',views.student_change_pswd),
             path('myinstructors/<int:student_id>',views.MyInstructorList.as_view()),
             path('verify-student/<int:student_id>',views.verify_student_via_otp),
             path('student-forgot-password/',views.student_forgot_password),
  #courseenroll 
      path('student-course-enroll/',views.StudentCourseEnroll.as_view()),
       path('enroll-status/<int:student_id>/<int:course_id>',views.enroll_status),
         path('enroll-students/<int:course_id>',views.EnrolledStudentList.as_view()),
          path('all-enroll-students/<int:instructor_id>',views.EnrolledStudentList.as_view()),
           path('enroll-courses/<int:student_id>/',views.EnrolledStudentList.as_view()),
  # recommendedd-courses
   path('recommended-courses/<int:recc_student_id>',views.CourseList.as_view()),
 #favorite course
 path('add-favorite-course/',views.StudentFavoriteCourseList.as_view()),
 path('remove-favorite-course/<int:course_id>/<int:student_id>',views.remove_favorite_course),
 path('favorite-status/<int:student_id>/<int:course_id>',views.favorite_status),
   path('favorite-courses/<int:student_id>/',views.StudentFavoriteCourseList.as_view()),

  #course rating
   path('course-rating/',views.CourseRatingList.as_view()), 
     path('rating-status/<int:student_id>/<int:course_id>',views.rating_status),
     
     
    #  quiz
 path('instructor-quiz-detail/<int:pk>',views.InstructorQuizDetail.as_view()),
  path('quiz/',views.QuizList.as_view()),
  path('quiz-detail/<int:pk>',views.QuizDetail.as_view()),
   path('instructor-quiz/<int:instructor_id>',views.InstructorQuizList.as_view()),
    path('quiz-question/<int:quiz_id>',views.QuizQuestionList.as_view()),
        path('question/<int:pk>',views.QuestionDetail.as_view()),

  path('quiz-assign-course/',views.CourseQuizList.as_view()),

 path('quiz-assign-status/<int:quiz_id>/<int:course_id>',views.quiz_assign_status),
 path('assigned-quiz/<int:course_id>',views.CourseQuizList.as_view()),
 path('quiz-question/<int:quiz_id>/<int:limit>',views.QuizQuestionList.as_view()),
  path('attempt-quiz/',views.AttemptQuizList.as_view()),
   path('quiz-question/<int:quiz_id>/next-question/<int:question_id>',views.QuizQuestionList.as_view()),
  path('quiz-attempt-status/<int:quiz_id>/<int:student_id>',views.quiz_attempt_status),
  path('attempted-quiz/<int:quiz_id>',views.AttemptQuizList.as_view()),
  path('quiz-result/<int:quiz_id>/<int:student_id>',views.quiz_result),

  path('study-materials/<int:course_id>',views.CourseStudyMaterialList.as_view()),
     path('study-material/<int:pk>',views.StudyMaterialDetail.as_view()),
      # path('study-material/',views.CourseStudyMaterialList.as_view()),
       path('student/study-materials/<int:course_id>',views.CourseStudyMaterialList.as_view()),
 path('faqs/',views.FAQ.as_view()),
 
#  message
path('send-message/<int:instructor_id>/<int:student_id>',views.send_message),
path('get-messages/<int:instructor_id>/<int:student_id>',views.Messages.as_view()),
path('broadcast-message/<int:instructor_id>',views.broadcast_message),

]
