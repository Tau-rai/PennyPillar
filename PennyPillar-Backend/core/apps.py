"""Module for apps."""
from django.apps import AppConfig

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    def ready(self):
        """Ensure the signals are imported when the app is ready. """
        import core.signals