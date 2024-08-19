from django.core.management.base import BaseCommand
from .models import Insight
import google.generativeai as genai
import os

# Configure the Google Generative AI client
genai.configure(api_key=os.environ["G_API_KEY"])
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_daily_insight():
    # Generate insight using Google Generative AI
    response = model.generate(
        prompt="Generate a daily financial insight",
        max_tokens=150
    )
    # Extract title and content from the response
    title = response['choices'][0]['text'].split('\n')[0] # First line is the title
    content = response['choices'][0]['text']
    print(title)
    return title, content

class Command(BaseCommand):
    help = 'Generate and post daily financial insights'

    def handle(self, *args, **kwargs):
        title, content = generate_daily_insight()
        Insight.objects.create(title=title, content=content)
        self.stdout.write(self.style.SUCCESS('Successfully posted daily insight'))
