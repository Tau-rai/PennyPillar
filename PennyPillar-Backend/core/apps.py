"""Module for apps."""
from django.apps import AppConfig
from django_appscheduler.models import Job

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        # Register or verify job schedule
        Job.objects.get_or_create(
            name="Generate Daily Insight",
            task="core.cron.generate_daily_insight_task",
            schedule="daily",
            defaults={"enabled": True}
        )