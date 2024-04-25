from django.shortcuts import render, get_object_or_404
from django.db.models import Q 
from django.db.models import Count, Max
from django.core.mail import send_mail
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .serializers import (
    InstructorSerializer,StudyMaterialSerializer,InstructorDashboardSerializer,CourseCategorySerializer,QuizQuestionSerializer,
    CourseQuizSerializer,ChatSerializer,AttemptQuizSerializer,CourseSerializer,QuizSerializer,ChapterSerializer,FAQSerializer,StudentFavoriteCourseSerializer,StudentSerializer,StudentDashboardSerializer,StudentCourseEnrollSerializer,CourseRatingSerializer)
from random import randint
from rest_framework import permissions
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from . import models
from django.core.exceptions import ObjectDoesNotExist 
# Create your views here.
    

class StandardResultsSetPagination(PageNumberPagination):
    page_size=4
    page_size_query_param='page_size'
    max_page_size= 4


class InstructorList(generics.ListCreateAPIView):
    queryset=models.Instructor.objects.all()
    serializer_class=InstructorSerializer
    pagination_class=StandardResultsSetPagination
    def get_queryset(self):
        if 'top' in self.request.GET:
            sql="SELECT *, COUNT(c.id) as total_course FROM main_instructor as i INNER JOIN main_course as c ON c.instructor_id=i.id GROUP BY  i.id ORDER BY total_course DESC LIMIT 4"
            return models.Instructor.objects.raw(sql)
        if 'all' in self.request.GET:
            sql="SELECT *, COUNT(c.id) as total_course FROM main_instructor as i INNER JOIN main_course as c ON c.instructor_id=i.id GROUP BY  i.id ORDER BY total_course DESC"
            return models.Instructor.objects.raw(sql)
    
class InstructorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Instructor.objects.all()
    serializer_class=InstructorSerializer
    
class InstructorDashboard(generics.RetrieveAPIView):
    queryset=models.Instructor.objects.all()
    serializer_class=InstructorDashboardSerializer
    
@csrf_exempt
def instructor_login(request):
    email=request.POST['email']
    password=request.POST['password']
    
    otp_digit=randint(100000,999999)
    try:
        instructorData=models.Instructor.objects.get(email=email,
                                                password=password
                                                 )
    except models.Instructor.DoesNotExist:
        instructorData=None
    if instructorData:
        
        if not instructorData.verify_status:
            send_mail(
                    'Verify Account',
                    'Please verify your account',
                    'aashimaa1202@gmail.com',
                    [instructorData.email],
                    fail_silently=False,
                    html_message="<p>Your OTP is: <b>"+str(otp_digit)+"</b></p>"
                )
            instructorData.otp_digit=otp_digit
            instructorData.save()
            return JsonResponse({"bool":False,'instructor_id':instructorData.id,'msg':'Account is not verified'})
            
        else:
            if instructorData.login_via_otp:
                
                send_mail(
                    'Verify Account',
                    'Please verify your account',
                    'aashimaa1202@gmail.com',
                    [instructorData.email],
                    fail_silently=False,
                    html_message="<p>Your OTP is: <b>"+str(otp_digit)+"</b></p>"
                )
                instructorData.otp_digit=otp_digit
                instructorData.save()
                return JsonResponse({"bool":True,'instructor_id':instructorData.id,'login_via_otp':True})
            else:
                return JsonResponse({"bool":True,'instructor_id':instructorData.id,'login_via_otp':False})
                
    else:
        return JsonResponse({"bool":False,'msg':'Invalid Email or Password'})
    
@csrf_exempt
def verify_instructor_via_otp(request,instructor_id):
    otp_digit=request.POST.get('otp_digit')
    verify=models.Instructor.objects.filter(id=instructor_id,otp_digit=otp_digit).first()
    
    if verify:
        models.Instructor.objects.filter(id=instructor_id,otp_digit=otp_digit).update(verify_status=True)
       
           
        return JsonResponse({"bool":True,'instructor_id':verify.id})
        
    else:
        return JsonResponse({"bool":False,"msg":"Please Enter 6 Digit Valid OTP"})

    
@csrf_exempt
def instructor_forgot_password(request):
    email=request.POST.get('email')
    verify=models.Instructor.objects.filter(email=email).first()
    
    if verify:
        # otp_digit=randint(100000,999999)
        link=f"http://localhost:3000/instructor-change-pswd/{verify.id}/"
        send_mail(
                    'Reset Password',
                    'Please find the link to reset your Password',
                    'aashimaa1202@gmail.com',
                    [email],
                    fail_silently=False,
                    html_message="<p>Your Password reset link is: <b>"+link+"</b></p>"
                )
        
        return JsonResponse({"bool":True,"msg":"Please check your email"})
        
    else:
        return JsonResponse({"bool":False,"msg":"Invalid Email"})


class CategoryList(generics.ListCreateAPIView):
    queryset=models.CourseCategory.objects.all()
    serializer_class=CourseCategorySerializer
    pagination_class= StandardResultsSetPagination
    

class CourseList(generics.ListCreateAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
    pagination_class=StandardResultsSetPagination
    
    def get_queryset(self):
       qs=super().get_queryset()
       if 'result' in self.request.GET:
           limit=int(self.request.GET['result'])
           qs=models.Course.objects.all().order_by('-id')[:limit]
       
       if 'category' in self.request.GET:
            category=self.request.GET['category']
            category=models.CourseCategory.objects.filter(id=category).first()
            qs=models.Course.objects.filter(category=category)
       if 'skill' in self.request.GET and 'instructor' in self.request.GET:
            skill=self.request.GET['skill']
            instructor=self.request.GET['instructor']
            instructor=models.Instructor.objects.filter(id=instructor).first()
            qs=models.Course.objects.filter(technologies__icontains=skill, instructor=instructor)
       if 'searchQuery' in self.kwargs:
            search=self.kwargs['searchQuery']
            if search:
                qs= models.Course.objects.filter(Q(title__icontains=search) |  Q(technologies__icontains=search)) 
            
                
            
       
       elif 'recc_student_id' in self.kwargs:
           
            student_id=self.kwargs['recc_student_id']
            student=models.Student.objects.get(pk=student_id)
            print(student.interested_categories)
            queries=[Q(technologies__iendswith=value) for value in student.interested_categories]
            query=queries.pop()
            for i in queries:
                query|=i
            qs= models.Course.objects.filter(query)
            return qs
            
       return qs
   
  
class CourseDetail(generics.RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    
    
class InstructorCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
    
    
  
class InstructorCourseList(generics.ListAPIView):
    
    serializer_class=CourseSerializer
    def get_queryset(self):
       instructor_id=self.kwargs['instructor_id']
       instructor=models.Instructor.objects.get(pk=instructor_id)
       return models.Course.objects.filter(instructor=instructor)
       
       
#chapters
class ChapterList(generics.ListCreateAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer
    
class ChapterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
 
    
  
    
          
class CourseChapterList(generics.ListCreateAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer
    def get_queryset(self):
       course_id=self.kwargs['course_id']
       course=models.Course.objects.get(pk=course_id)
       return models.Chapter.objects.filter(course=course)
       
       
       
#Student
class StudentList(generics.ListCreateAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer
    
class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer
    
@csrf_exempt
def student_login(request):
    email=request.POST['email']
    password=request.POST['password']
    otp_digit=randint(100000,999999)
    try:
        studentData=models.Student.objects.get(email=email,
                                                password=password
                                                 )
    except models.Student.DoesNotExist:
        studentData=None
    if studentData:
        if not studentData.verify_status:
            send_mail(
                    'Verify Account',
                    'Please verify your account',
                    'aashimaa1202@gmail.com',
                    [studentData.email],
                    fail_silently=False,
                    html_message="<p>Your OTP is: <b>"+str(otp_digit)+"</b></p>"
                )
            studentData.otp_digit=otp_digit
            studentData.save()
            return JsonResponse({"bool":False,'student_id':studentData.id,'msg':'Account is not verified'})
            
        else:
            if studentData.login_via_otp:
                
                send_mail(
                    'Verify Account',
                    'Please verify your account',
                    'aashimaa1202@gmail.com',
                    [studentData.email],
                    fail_silently=False,
                    html_message="<p>Your OTP is: <b>"+str(otp_digit)+"</b></p>"
                )
                studentData.otp_digit=otp_digit
                studentData.save()
                return JsonResponse({"bool":True,'student_id':studentData.id,'login_via_otp':True})
            else:
                return JsonResponse({"bool":True,'student_id':studentData.id,'login_via_otp':False})
            
    else:
        return JsonResponse({"bool":False,'msg':'Invalid Email or Password'})

@csrf_exempt
def verify_student_via_otp(request,student_id):
    otp_digit=request.POST.get('otp_digit')
    verify=models.Student.objects.filter(id=student_id,otp_digit=otp_digit).first()
    
    if verify:
        
        
        # if verify.login_via_otp:
            models.Student.objects.filter(id=student_id,otp_digit=otp_digit).update(verify_status=True)
            return JsonResponse({"bool":True,'student_id':verify.id})
    
    else:
        return JsonResponse({"bool":False,"msg":"Please Enter Valid 6 Digit OTP"})
  
@csrf_exempt
def student_forgot_password(request):
    email=request.POST.get('email')
    verify=models.Student.objects.filter(email=email).first()
    
    if verify:
        # otp_digit=randint(100000,999999)
        link=f"http://localhost:3000/student-change-pswd/{verify.id}/"
        send_mail(
                    'Reset Password',
                    'Please find the link to reset your Password',
                    'aashimaa1202@gmail.com',
                    [email],
                    fail_silently=False,
                    html_message="<p>Your Password reset link is: <b>"+link+"</b></p>"
                )
        
        return JsonResponse({"bool":True,"msg":"Please check your email"})
        
    else:
        return JsonResponse({"bool":False,"msg":"Invalid Email"})


class StudentCourseEnroll(generics.ListCreateAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer
    
    
    # enroll-status
    
def enroll_status(request,student_id,course_id):
    
    
    student=models.Student.objects.filter(
            id=student_id ).first()
    course=models.Course.objects.filter(
            id=course_id ).first()
    enroll_status=models.StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    if enroll_status:
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})
    
# enrolled students
class EnrolledStudentList(generics.ListAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course=course)
        elif 'instructor_id' in self.kwargs:
           
            instructor_id=self.kwargs['instructor_id'] 
            instructor=models.Instructor.objects.get(pk=instructor_id)
           
            return models.StudentCourseEnrollment.objects.filter(course__instructor=instructor).distinct()
            
        elif 'student_id' in self.kwargs:
           
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(student=student).distinct()
        



# ratecourse
class CourseRatingList(generics.ListCreateAPIView):
    queryset=models.CourseRating.objects.all()
    serializer_class=CourseRatingSerializer
    pagination_class=StandardResultsSetPagination

    def get_queryset(self):
        if 'popular' in self.request.GET:
           sql="SELECT *, AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c ON cr.course_id=c.id GROUP BY  c.id ORDER BY avg_rating DESC LIMIT 4"
           return models.CourseRating.objects.raw(sql)
        if 'all' in self.request.GET:
           sql="SELECT *, AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c ON cr.course_id=c.id GROUP BY  c.id ORDER BY avg_rating DESC"
           return models.CourseRating.objects.raw(sql)
        return models.CourseRating.objects.filter(course__isnull=False).order_by('-rating')
def rating_status(request,student_id,course_id):
    
    
    student=models.Student.objects.filter(
            id=student_id ).first()
    course=models.Course.objects.filter(
            id=course_id ).first()
    rating_status=models.CourseRating.objects.filter(course=course,student=student).count()
    if rating_status:
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})
    
    
#ichangepswd
@csrf_exempt
def instructor_change_pswd(request,instructor_id):
   
    password=request.POST['password']
    try:
        instructorData=models.Instructor.objects.get(id=instructor_id)
    except models.Instructor.DoesNotExist:
        instructorData=None
    if instructorData:
        models.Instructor.objects.filter(id=instructor_id).update(password=password)
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})


#favouritecourse   
class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset=models.StudentFavoriteCourse.objects.all()
    serializer_class=StudentFavoriteCourseSerializer
    def get_queryset(self):
        
        if 'student_id' in self.kwargs:
           
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentFavoriteCourse.objects.filter(student=student).distinct()
        

    
def favorite_status(request,student_id,course_id):
    
    
    student=models.Student.objects.filter(
            id=student_id ).first()
    course=models.Course.objects.filter(
            id=course_id ).first()
    favorite_status=models.StudentFavoriteCourse.objects.filter(course=course,student=student).first()
    if favorite_status :
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})
    

def remove_favorite_course(request,student_id,course_id):
    
    
    student=models.Student.objects.filter(
            id=student_id ).first()
    course=models.Course.objects.filter(
            id=course_id ).first()
    favorite_status=models.StudentFavoriteCourse.objects.filter(course=course,student=student).delete()
    if favorite_status:
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})
    
    
    
class StudentDashboard(generics.RetrieveAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentDashboardSerializer
    
    
# schangepassword
@csrf_exempt
def student_change_pswd(request,student_id):
   
    password=request.POST['password']
    try:
        studentData=models.Student.objects.get(id=student_id)
    except models.Student.DoesNotExist:
        studentData=None
    if studentData:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})


class QuizList(generics.ListCreateAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer
    
    
    
class InstructorQuizList(generics.ListAPIView):
    
    serializer_class=QuizSerializer
    def get_queryset(self):
       instructor_id=self.kwargs['instructor_id']
       instructor=models.Instructor.objects.get(pk=instructor_id)
       return models.Quiz.objects.filter(instructor=instructor)
       
       
       
class InstructorQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer
    
    
class QuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer
    
    
class QuizQuestionList(generics.ListCreateAPIView):
    queryset=models.QuizQuestion.objects.all()
    serializer_class=QuizQuestionSerializer
    def get_queryset(self):
       
            
        quiz_id=self.kwargs['quiz_id']
        quiz=models.Quiz.objects.get(pk=quiz_id)
        if 'limit' in self.kwargs:
            return models.QuizQuestion.objects.filter(quiz=quiz).order_by("id")[:1]
        elif 'question_id' in self.kwargs:
            current_question=self.kwargs['question_id']
           
            return models.QuizQuestion.objects.filter(quiz=quiz,id__gt=current_question).order_by("id")[:1]
        else:
            return models.QuizQuestion.objects.filter(quiz=quiz)
       
       
       
      
class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer
    
    
class CourseQuizList(generics.ListCreateAPIView):
    queryset=models.CourseQuiz.objects.all()
    serializer_class=CourseQuizSerializer
    
    def get_queryset(self):
       if 'course_id' in self.kwargs:
           
            course_id=self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)
            return models.CourseQuiz.objects.filter(course=course)
        
    
def quiz_assign_status(request,quiz_id,course_id):
   
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    assignStatus=models.CourseQuiz.objects.filter(course=course,quiz=quiz).count()
    # print(assignStatus,"\n",quiz,course)
    if assignStatus:
        
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})
class AttemptQuizList(generics.ListCreateAPIView):
    queryset=models.AttemptQuiz.objects.all()
    serializer_class=AttemptQuizSerializer
    def get_queryset(self):
        if 'quiz_id' in self.kwargs:
           
            quiz_id=self.kwargs['quiz_id']
            quiz=models.Quiz.objects.get(pk=quiz_id)
            
            return models.AttemptQuiz.objects.raw(f'SELECT * FROM main_attemptquiz where quiz_id={int(quiz_id)}  GROUP by student_id')

            #
    
def quiz_attempt_status(request,quiz_id,student_id):
   
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    student=models.Student.objects.filter(id=student_id).first()
    attemptStatus=models.AttemptQuiz.objects.filter(student=student,question__quiz=quiz).count()
    # print(attemptStatus,"\n",quiz,course)
    if attemptStatus>0:
        
        return JsonResponse({"bool":True})
    else:
        return JsonResponse({"bool":False})
def quiz_result(request, quiz_id, student_id):
    quiz = models.Quiz.objects.filter(id=quiz_id).first()
    student = models.Student.objects.filter(id=student_id).first()

    
    total_questions = models.QuizQuestion.objects.filter(quiz=quiz).count()

    
    total_attempted_questions = models.AttemptQuiz.objects.filter(quiz=quiz, student=student).count()
    attempted_questions=models.AttemptQuiz.objects.filter(quiz=quiz, student=student)
    total_correct_answers=0
    for attempt in attempted_questions:
        if attempt.correct_ans==attempt.question.correct_ans:
            total_correct_answers+=1
    return JsonResponse({
        'total_questions': total_questions,
        'total_attempted_questions': total_attempted_questions,
        'total_correct_answers':total_correct_answers
    })
    
class CourseStudyMaterialList(generics.ListCreateAPIView):
    queryset=models.StudyMaterial.objects.all()
    serializer_class=StudyMaterialSerializer
    def get_queryset(self):
       course_id=self.kwargs['course_id']
       course=models.Course.objects.get(pk=course_id)
       return models.StudyMaterial.objects.filter(course=course)
       
      
class StudyMaterialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.StudyMaterial.objects.all()
    serializer_class=StudyMaterialSerializer
    
def update_view(request,course_id):
    queryset=models.Course.objects.filter(pk=course_id).first()
    queryset.course_views+=1
    queryset.save()
    return JsonResponse({"views":queryset.course_views})     


class FAQ(generics.ListCreateAPIView):
    queryset=models.FAQ.objects.all()
    serializer_class=FAQSerializer
    
    
class MyInstructorList(generics.ListAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
    def get_queryset(self):
        if "student_id" in self.kwargs:
            student_id=self.kwargs['student_id']
            sql=f"SELECT * FROM main_course as c,main_studentcourseenrollment as e, main_instructor as t WHERE c.instructor_id AND e.course_id=c.id AND e.student_id={student_id} GROUP by c.instructor_id"
            
            qs=models.Course.objects.raw(sql)
            return qs
@csrf_exempt
def send_message(request, instructor_id, student_id):
    try:
        instructor = models.Instructor.objects.get(id=instructor_id)
        student = models.Student.objects.get(id=student_id)
    except ObjectDoesNotExist:
        return JsonResponse({"bool": False, "msg": "Instructor or student does not exist"})

    message = request.POST.get("message")
    sender = request.POST.get("sender")

    
    if not message:
        return JsonResponse({"bool": False, "msg": "Message is required"})

    
    if not sender:
        return JsonResponse({"bool": False, "msg": "Sender is required"})

    
    message_response = models.Chat.objects.create(
        instructor=instructor,
        student=student,
        message=message,
        sender=sender
    )

    if message_response:
        msgs=models.Chat.objects.filter(instructor=instructor,student=student).count()
        return JsonResponse({"bool": True, "msg": "Message Sent",'total_msgs':msgs})
    else:
        return JsonResponse({"bool": False, "msg": "Some Error Occurred"})


class Messages(generics.ListAPIView):
   
    queryset=models.Chat.objects.all()
    serializer_class=ChatSerializer
    def get_queryset(self):
       
            
        instructor_id=self.kwargs['instructor_id']
        student_id=self.kwargs['student_id']
        instructor=models.Instructor.objects.get(pk=instructor_id)
        student=models.Student.objects.get(pk=student_id)
        return models.Chat.objects.filter(student=student,instructor=instructor).exclude(message="")
       
       
@csrf_exempt
def broadcast_message(request, instructor_id):
   
    instructor = models.Instructor.objects.get(id=instructor_id)
    

    message = request.POST.get("message")
    sender = request.POST.get("sender")
    enrolledStudents= models.StudentCourseEnrollment.objects.filter(course__instructor=instructor).distinct()

    for enrolled in enrolledStudents:
       
   
            message_response = models.Chat.objects.create(
                instructor=instructor,
                student=enrolled.student,
                message=message,
                sender=sender
            )

    if message_response:
        return JsonResponse({"bool": True, "msg": "Message Sent"})
    else:
        return JsonResponse({"bool": False, "msg": "Some Error Occurred"})
