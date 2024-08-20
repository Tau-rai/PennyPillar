# core/scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_events
from core.tasks import generate_daily_insight

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")

    # Schedule the job using a textual reference
    scheduler.add_job(
        generate_daily_insight,
        trigger='interval',
        days=1,
        id='generate_daily_insight',
        replace_existing=True
    )

    register_events(scheduler)
    scheduler.start()
    print("Scheduler started...")
