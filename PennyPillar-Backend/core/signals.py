# core/signals.py
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from core import scheduler
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create a UserProfile when a new User is created."""
    if created:
        UserProfile.objects.create(user=instance, email=instance.email, username=instance.username)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Ensure the UserProfile is saved when the User is saved."""
    # Handle the case where the UserProfile does not exist
    profile, created = UserProfile.objects.get_or_create(user=instance)
    profile.save()

@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    """Update the UserProfile with the user's credentials after the User is saved."""
    # Get the related UserProfile, or create one if it doesn't exist
    profile, _ = UserProfile.objects.get_or_create(user=instance)
    
    # Update profile fields if the User already exists
    profile.email = instance.email
    profile.username = instance.username
    profile.save()


@receiver(post_migrate)
def start_scheduler(sender, **kwargs):
    """Starts the apscheduler job"""
    scheduler.start()
