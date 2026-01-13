from django.urls import path
from . import views

app_name = 'habits'

urlpatterns = [
    path('', views.habit_list, name='list'),
    path('create/', views.habit_create, name='create'),
]
