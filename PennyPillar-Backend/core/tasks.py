# core/tasks.py
from core.management.commands.generate_daily_insight import Command

def generate_daily_insight():
    command = Command()
    command.handle()
