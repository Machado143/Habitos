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
from django.contrib.auth import logout as django_logout
from django.views.decorators.http import require_POST
from django.shortcuts import redirect


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
                description=serializer.validated_data.get('description', ''),
                frequency=serializer.validated_data['frequency']
            )
            return Response(HabitSerializer(habit).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HabitDetailAPI(APIView):
    """PATCH: atualiza hábito; DELETE: remove hábito."""
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [parsers.JSONParser]

    def patch(self, request, pk):
        try:
            habit = Habit.objects.get(pk=pk, user=request.user)
        except Habit.DoesNotExist:
            return Response({'detail': 'Não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
        # Atualiza campos permitidos
        if 'completed' in request.data:
            habit.completed = request.data['completed']
        if 'name' in request.data:
            habit.name = request.data['name']
        if 'description' in request.data:
            habit.description = request.data['description']
        if 'frequency' in request.data:
            habit.frequency = request.data['frequency']
        
        habit.save()
        return Response(HabitSerializer(habit).data)

    def delete(self, request, pk):
        try:
            habit = Habit.objects.get(pk=pk, user=request.user)
            habit.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Habit.DoesNotExist:
            return Response({'detail': 'Não encontrado'}, status=status.HTTP_404_NOT_FOUND)


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


class MeView(APIView):
    """Retorna informações do usuário autenticado pela sessão.
    
    Usado pelo frontend para verificar se já existe sessão válida
    (ex: usuário logou pelo Django admin).
    """
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]  # Permite acesso, mas retorna null se não autenticado

    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                'username': request.user.username,
                'id': request.user.id,
                'is_staff': request.user.is_staff,
            })
        return Response(None, status=status.HTTP_200_OK)


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


@require_POST
def logout_and_redirect(request):
    """Logout via form and redirect back to portal.

    Use this endpoint from server-rendered forms so the user is redirected
    to a friendly page instead of receiving a JSON response from the API.
    """
    django_logout(request)
    # Redirect to the portal home
    return redirect('/')