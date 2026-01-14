from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Habit
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework import parsers
from .serializers import HabitSerializer
import os
from django.conf import settings
from django.contrib.auth import login as auth_login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.http import HttpResponseForbidden


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


@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from django.contrib.auth import logout
        logout(request)
        return Response({"detail": "Logout ok"}, status=status.HTTP_200_OK)


class HabitListAPI(APIView):
    """GET: lista hábitos do usuário autenticado; POST: cria novo hábito."""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [parsers.JSONParser]

    def get(self, request):
        habits = Habit.objects.filter(user=request.user).order_by('-created_at')
        serializer = HabitSerializer(habits, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = HabitSerializer(data=data)
        if serializer.is_valid():
            # criar com user vinculado
            habit = Habit.objects.create(
                user=request.user,
                name=serializer.validated_data['name'],
                frequency=serializer.validated_data['frequency']
            )
            return Response(HabitSerializer(habit).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


@ensure_csrf_cookie
def get_csrf(request):
    """Endpoint simples para garantir que o cookie CSRF seja enviado ao cliente.
    Use em SPAs: o frontend deve fazer GET em /api/csrf/ (com credentials) antes de POSTs autenticados.
    """
    return JsonResponse({'detail': 'CSRF cookie set'})


@csrf_exempt
def create_user_dev(request):
    """Endpoint de apoio para criar usuários em ambiente de desenvolvimento.
    Somente habilitado quando `DEBUG` é True.
    Recebe JSON: {"username":"...","password":"..."}
    """
    if not settings.DEBUG:
        return HttpResponseForbidden('Not allowed')

    if request.method != 'POST':
        return JsonResponse({'detail': 'Only POST allowed'}, status=405)

    try:
        import json
        data = json.loads(request.body.decode('utf-8') or '{}')
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return JsonResponse({'detail': 'username and password required'}, status=400)

        User = get_user_model()
        if User.objects.filter(username=username).exists():
            return JsonResponse({'detail': 'User exists'}, status=200)

        user = User.objects.create_user(username=username, password=password)
        return JsonResponse({'detail': 'User created', 'username': user.username}, status=201)
    except Exception as e:
        return JsonResponse({'detail': str(e)}, status=500)