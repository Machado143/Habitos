from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Habit
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
import os
from django.conf import settings
from django.contrib.auth import login as auth_login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@login_required
def habit_list(request):
    habits = Habit.objects.filter(user=request.user)
    return render(request, 'habits/habit_list.html', {'habits': habits})

@login_required
def habit_create(request):
    if request.method == 'POST':
        name = request.POST['name']
        frequency = request.POST['frequency']
        Habit.objects.create(
            user=request.user,
            name=name,
            frequency=frequency
        )
        return redirect('habits:list')

    return render(request, 'habits/habit_form.html')


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            # Cria sessão do Django (sessionid cookie)
            auth_login(request, user)
            return Response({"detail": "Login ok", "username": user.username}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Credenciais inválidas"}, status=status.HTTP_400_BAD_REQUEST)


def docs_list(request):
    """Lista arquivos estáticos em backend/docs/ para verificação rápida."""
    docs_dir = os.path.join(settings.BASE_DIR, '..', 'docs')
    docs_dir = os.path.abspath(docs_dir)
    files = []
    if os.path.isdir(docs_dir):
        for name in os.listdir(docs_dir):
            path = os.path.join(docs_dir, name)
            if os.path.isfile(path):
                files.append(name)
    return render(request, 'habits/docs_list.html', {'files': files, 'docs_dir': docs_dir})