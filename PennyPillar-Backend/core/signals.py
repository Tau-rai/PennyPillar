# core/signals.py
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from core import scheduler

@receiver(post_migrate)
def start_scheduler(sender, **kwargs):
    scheduler.start()
