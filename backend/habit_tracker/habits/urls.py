from django.urls import path
from django.views.generic import RedirectView
from . import views

app_name = 'habits'

urlpatterns = [
    path('', views.habit_list, name='list'),
    path('create/', views.habit_create, name='create'),
    path('api/login/', views.LoginView.as_view(), name='api-login'),
    # Redirect legacy /docs/ to Swagger UI
    path('docs/', RedirectView.as_view(url='/api/schema/swagger-ui/'), name='docs'),
]
