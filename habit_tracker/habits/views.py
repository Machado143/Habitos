from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Habit

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
