from django.contrib import admin
from main.models import (
    Instructor,CourseRating,Student,StudentCourseEnrollment,CourseCategory,Course,Chapter,
    Notification,AttemptQuiz,StudyMaterial,StudentFavoriteCourse,Quiz,QuizQuestion,CourseQuiz,FAQ,Chat)
# Register your models here.
admin.site.register(Instructor)
admin.site.register(Student)
admin.site.register(CourseCategory)
admin.site.register(Course)
admin.site.register(Chapter) 
admin.site.register(StudentCourseEnrollment) 
admin.site.register(CourseRating)
admin.site.register(StudentFavoriteCourse)
admin.site.register(Notification)
admin.site.register(Quiz)
admin.site.register(CourseQuiz)
admin.site.register(QuizQuestion)
admin.site.register(AttemptQuiz)
admin.site.register(StudyMaterial)
admin.site.register(FAQ)
admin.site.register(Chat) 