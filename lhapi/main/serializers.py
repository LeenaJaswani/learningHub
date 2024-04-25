from rest_framework import serializers
from django.core.mail import send_mail
from main.models import (Instructor,Student,Chat,StudyMaterial,AttemptQuiz,CourseRating,StudentFavoriteCourse,
                         CourseCategory,CourseQuiz,Course,Chapter,StudentCourseEnrollment,Quiz,QuizQuestion,FAQ)
import ffmpeg
from datetime import timedelta
from django.contrib.auth.hashers import make_password
class InstructorSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)
    class Meta:
        model=Instructor
        
        fields=['id','full_name','email','password','bio','login_via_otp','total_instructor_courses','otp_digit','qualification','contact_no','skills','instructor_courses','skill_list','profile_image']
    # def create(self, validated_data):
    #     validated_data['password'] = make_password(validated_data['password'])
    #     return super().create(validated_data)
    def __init__(self,*args,**kwargs):
            super(InstructorSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=1
                
    def create(self,validate_data):
        email=self.validated_data["email"]
        otp_digit=self.validated_data["otp_digit"]
        instance =super(InstructorSerializer,self).create(validate_data)
        
        send_mail(
                'Verify Account',
                'Please verify your account',
                'aashimaa1202@gmail.com',
                [email],
                fail_silently=False,
                html_message="<p>Your OTP is: <b>"+otp_digit+"</b></p>"
            )
        return instance
    
    
class InstructorDashboardSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)
    class Meta:
        model=Instructor
        
        fields=['total_instructor_courses','total_instructor_chapters','total_instructor_students']
   

class CourseCategorySerializer(serializers.ModelSerializer):
        
        class Meta:
            model=CourseCategory
            fields=['id','title','description','total_category_courses']
            
class CourseSerializer(serializers.ModelSerializer):
        total_course_duration = serializers.SerializerMethodField()
        class Meta:
            model=Course
            fields=['id','category','instructor','title','total_course_duration','description','featured_image','technologies','course_chapters','related_videos','tech_list','total_enrolled_students','course_rating','course_views']
        def __init__(self,*args,**kwargs):
            super(CourseSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=1
        def get_total_course_duration(self, obj):
            total_duration = timedelta()
            for chapter in obj.course_chapters.all():
                if chapter.video_duration:
                    total_duration += timedelta(seconds=chapter.video_duration)
            return str(total_duration)
class ChapterSerializer(serializers.ModelSerializer):
        video_duration = serializers.SerializerMethodField()
        class Meta:
            model=Chapter
            fields=['id','course','title','description','video','notes','video_duration']
        def get_video_duration(self, obj):
            return self.convert_seconds_to_hours_minutes_seconds(obj.video_duration)

        def convert_seconds_to_hours_minutes_seconds(self, seconds):
            if seconds is not None:
                duration = timedelta(seconds=seconds)
                return str(duration)
            return None
            
class StudentSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)
    class Meta:
        model=Student
        
        fields=['id','full_name','email','password','qualification','login_via_otp','interested_categories','bio','contact_no','profile_image','otp_digit']
    # def create(self, validated_data):
    #     validated_data['password'] = make_password(validated_data['password'])
    #     return super().create(validated_data)
    def __init__(self,*args,**kwargs):
            super(StudentSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=1
                
    def create(self,validate_data):
        email=self.validated_data["email"]
        otp_digit=self.validated_data["otp_digit"]
        instance =super(StudentSerializer,self).create(validate_data)
        
        send_mail(
                'Verify Account',
                'Please verify your account',
                'aashimaa1202@gmail.com',
                [email],
                fail_silently=False,
                html_message="<p>Your OTP is: <b>"+otp_digit+"</b></p>"
            )
        return instance            
    
class StudentCourseEnrollSerializer(serializers.ModelSerializer):
        
        class Meta:
            model=StudentCourseEnrollment
            fields=['id','course','student',"enrolled_time"]
        def __init__(self,*args,**kwargs):
            super(StudentCourseEnrollSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=3
        
class CourseRatingSerializer(serializers.ModelSerializer):
        
        class Meta:
            model=CourseRating
            fields=['id','course','student',"review_time","rating","review"]
        def __init__(self,*args,**kwargs):
            super(CourseRatingSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=2
            
            
class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
        
        class Meta:
            model=StudentFavoriteCourse
            fields=['id','course','student','status']
        def __init__(self,*args,**kwargs):
            super(StudentFavoriteCourseSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=2



class StudentDashboardSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)
    class Meta:
        model=Student
        
        fields=['total_enrolled_courses','total_favorite_courses']
   
   
   
   
class QuizSerializer(serializers.ModelSerializer):
    # assignStatus = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ['id', 'instructor', 'title', 'description', 'add_time']

    # def get_assignStatus(self, obj):
    #     return CourseQuiz.objects.filter(quiz=obj).count()
        def __init__(self,*args,**kwargs):
            super(QuizSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=2
        
                
                
class QuizQuestionSerializer(serializers.ModelSerializer):
        
        class Meta:
            model=QuizQuestion
            fields=['id','quiz','question','ans1','ans2','ans3','ans4','correct_ans']
        def __init__(self,*args,**kwargs):
            super(QuizQuestionSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=1
                
                
                
                self.Meta.depth=1
class CourseQuizSerializer(serializers.ModelSerializer):
        
        class Meta:
            model=CourseQuiz
            fields=['id','course','quiz',"add_time"]
        def __init__(self,*args,**kwargs):
            super(CourseQuizSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=2


class AttemptQuizSerializer(serializers.ModelSerializer):
        
        class Meta:
            model=AttemptQuiz
            fields=['id','student','question',"correct_ans","add_time"]
        def __init__(self,*args,**kwargs):
            super(AttemptQuizSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=2
        
        
class StudyMaterialSerializer(serializers.ModelSerializer):
        
        class Meta:
            model=StudyMaterial
            fields=['id','course','title','description','upload','remarks']
        
        
class FAQSerializer(serializers.ModelSerializer):
        
        class Meta:
            model=FAQ
            fields=['id','question','answer']
            
            
class ChatSerializer(serializers.ModelSerializer):
        
        class Meta:
            model=Chat
            fields=['id','instructor','student',"sender","message","msg_time"]
        def __init__(self,*args,**kwargs):
            super(ChatSerializer,self).__init__(*args,**kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method=="GET":
                self.Meta.depth=1
        def to_representation(self,instance):
            timeformat=super(ChatSerializer,self).to_representation(instance)
            timeformat['msg_time']=instance.msg_time.strftime("%Y-%m-%d %H:%M")
            return timeformat