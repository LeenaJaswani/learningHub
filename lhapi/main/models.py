from django.db import models
from django.core import serializers
from django.core.mail import send_mail
from moviepy.editor import VideoFileClip
import cv2
import os
from django.conf import settings

# Create your models here.
from datetime import timedelta
import ffmpeg
# Instructor
class Instructor(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.EmailField(max_length=100,unique=True)
    password=models.CharField(max_length=100,blank=True,null=True)
    qualification=models.CharField(max_length=100)
    contact_no=models.CharField(max_length=100)
    skills=models.TextField()
    profile_image=models.ImageField(upload_to='instructor_images/',null=True)
    bio=models.TextField(null=True)
    verify_status=models.BooleanField(default=False)
    otp_digit=models.CharField(max_length=10,null=True)
    login_via_otp=models.BooleanField(default=False)
    def __str__(self):
        return self.full_name+" "+str(self.id)
    def skill_list(self):
        skill_list=self.skills.split(",")
        return skill_list
    def total_instructor_courses(self):
        total_instructor_courses=Course.objects.filter(instructor=self).count()
        return  total_instructor_courses
    def total_instructor_chapters(self):
        total_instructor_chapters=Chapter.objects.filter(course__instructor=self).count()
        return total_instructor_chapters
    def total_instructor_students(self):
        total_instructor_students=StudentCourseEnrollment.objects.filter(course__instructor=self).count()
        return total_instructor_students
   
    

    
    
#Course
class CourseCategory(models.Model):
    title=models.CharField(max_length=400)
    description=models.TextField()
    class Meta:
        verbose_name_plural="Course Categories"
    def __str__(self):
        return self.title+" " +str(self.id)
    def total_category_courses(self):
        return Course.objects.filter(category=self).count()
    
class Course(models.Model):
    category=models.ForeignKey(CourseCategory,on_delete=models.CASCADE,related_name="category_courses")
    instructor=models.ForeignKey(Instructor,on_delete=models.CASCADE,related_name="instructor_courses")
    title=models.CharField(max_length=400)
    description=models.TextField()
    technologies=models.TextField(null=True)
    featured_image=models.ImageField(upload_to='course_images/',null=True)
    course_views = models.PositiveIntegerField(default=0)
    
    
    def __str__(self):
        return self.title+" " +str(self.id)
    def related_videos(self):
        
        related_videos=Course.objects.filter(technologies__icontains=self.technologies)
        return serializers.serialize('json',related_videos)

    def tech_list(self):
        tech_list=self.technologies.split(",")
        return tech_list
    def total_enrolled_students(self):
        total_enrolled_students=StudentCourseEnrollment.objects.filter(course=self).count( )
        return total_enrolled_students
    def course_rating(self):
        course_rating=CourseRating.objects.filter(course=self).aggregate(average_rating=models.Avg('rating'))
        return course_rating['average_rating']
#Student
class Student(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.EmailField(max_length=100,unique=True)
    password=models.CharField(max_length=100,blank=True,null=True)
    qualification=models.CharField(max_length=100)
    contact_no=models.CharField(max_length=100)
    bio=models.TextField(null=True)
    interested_categories=models.TextField()
    profile_image=models.ImageField(upload_to='student_images/',null=True)
    verify_status=models.BooleanField(default=False)
    otp_digit=models.CharField(max_length=10,null=True)
    login_via_otp=models.BooleanField(default=False)
    
    def __str__(self):
        return self.full_name+" " +str(self.id)
    def total_enrolled_courses(self):
        total_enrolled_courses=StudentCourseEnrollment.objects.filter(student=self).count()
        return  total_enrolled_courses
    def total_favorite_courses(self):
        total_favorite_courses=StudentFavoriteCourse.objects.filter(student=self).count()
        return total_favorite_courses
  
    

class Chapter(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='course_chapters')
    
    title=models.CharField(max_length=400)
    description=models.TextField()
    notes=models.TextField(null=True)
    video=models.FileField(upload_to='course_images/chapter_videos',null=True)
    video_duration = models.FloatField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.video:
            # Calculate video duration and save it
            self.video_duration = self.calculate_video_duration()
        super().save(*args, **kwargs)
    
    def calculate_video_duration(self):
        try:
            print("Calculating video duration...")
            video_name = str(self.video).split("/")[-1]  # Extracting just the video file name
            video_path = os.path.join(settings.MEDIA_ROOT, "course_images", "chapter_videos", video_name)
            video_path = video_path.replace('\\', '/')
            print("Video path:", video_path)
            
            if os.path.exists(video_path):
                print("Video file exists at the specified path.")
                video_clip = VideoFileClip(video_path)
                duration = video_clip.duration
                video_clip.close()
                print("Video duration calculated successfully:", duration)
                return duration
            else:
                print("Video file not found at the specified path.")
                return None
        except Exception as e:
            print(f"Error calculating video duration: {e}")
            return None
    def __str__(self):
        return self.title+"-"+str(self.id)
    


    
    
#Student Enrollment
class StudentCourseEnrollment(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='enrolled_courses')
    student=models.ForeignKey(Student,on_delete=models.CASCADE,related_name='enrolled_students')
    enrolled_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.course.title +" - " + self.student.full_name + " at "+ str(self.enrolled_time)
    
# rate  course 
class CourseRating(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    review_time=models.DateTimeField(auto_now_add=True)
    rating=models.PositiveBigIntegerField(default=0)
    review=models.TextField(null=True)
    def __str__(self):
        return self.course.title +" - " + self.student.full_name+" rated "+ str(self.rating) + " at "+ str(self.review_time)
    
# favo course

class StudentFavoriteCourse(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    status=models.BooleanField(default=False)
    def __str__(self):
        return self.course.title +" - " + self.student.full_name+" rated "+ str(self.status) 
    
# notifictaion
class Notification(models.Model):
    
    instructor=models.ForeignKey(Instructor,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    notif_subject=models.CharField(max_length=500,verbose_name='Notification Subject',null=True)
    notif_for=models.CharField(max_length=500,verbose_name='Notification For')    
    notif_created_time=models.DateTimeField(auto_now_add=True)
    notifread_status=models.BooleanField(default=False,verbose_name='Notification Status')
    def __str__(self):
        return self.instructor.full_name +" - " + self.student.full_name+" is "+ str(self.notifread_status) 
    
# quiz questions

class Quiz(models.Model):
    
    instructor=models.ForeignKey(Instructor,on_delete=models.CASCADE,null=True)
    title=models.CharField(max_length=500)
    description=models.TextField()    
    add_time=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title +" "+str(self.id)
   
   

    
class QuizQuestion(models.Model):
    
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    question=models.TextField()
    ans1=models.TextField(null=True,blank=True)   
    ans2=models.TextField(null=True,blank=True)    
    ans3=models.TextField(null=True,blank=True)
    ans4=models.TextField(null=True,blank=True)   
    correct_ans=models.TextField(null=True,blank=True) 
    add_time=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.quiz.title+" "+self.question+" "+str(self.id)
    
class CourseQuiz(models.Model):
    instructor=models.ForeignKey(Instructor,on_delete=models.CASCADE,null=True)
    course=models.ForeignKey(Course,on_delete=models.CASCADE)
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE)
    add_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.quiz.title+" "+str(self.id)
    
    
class AttemptQuiz(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
    question=models.ForeignKey(QuizQuestion,on_delete=models.CASCADE)
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    correct_ans=models.CharField(max_length=500,null=True)
    add_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.question.question+" "+str(self.id)
    
    
   
class StudyMaterial(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='course_study_material')
    
    title=models.CharField(max_length=400)
    description=models.TextField()
    remarks=models.TextField(null=True)
    upload=models.FileField(upload_to='course/course_study_materials/',null=True,max_length=600)
    def __str__(self):
        return self.title+" " +str(self.id)
    
class FAQ(models.Model):
    question=models.TextField()
    answer=models.TextField()
    def __str__(self):
        return self.question+" "+str(self.id)
    
    
class Chat(models.Model):
    instructor=models.ForeignKey(Instructor,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    sender=models.CharField(max_length=200)
    message=models.TextField()
    
    msg_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.sender+" to "+ self.receiver+" --> " +str(self.id)
    