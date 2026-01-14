from django.db import models
from django.contrib.auth.models import User

class Habit(models.Model):
    FREQUENCY_CHOICES = [
        ('D', 'Diário'),
        ('W', 'Semanal'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)  # Descrição opcional
    frequency = models.CharField(max_length=1, choices=FREQUENCY_CHOICES)
    completed = models.BooleanField(default=False)  # Status de conclusão
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class HabitLog(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    date = models.DateField()
    completed = models.BooleanField(default=True)

    class Meta:
        unique_together = ('habit', 'date')

    def __str__(self):
        return f"{self.habit.name} - {self.date}"
