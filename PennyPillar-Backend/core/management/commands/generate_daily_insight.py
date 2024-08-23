from django.core.management.base import BaseCommand
from core.models import Insight
import google.generativeai as genai
import os

class Command(BaseCommand):
    help = 'Generate a daily financial insight using Google Generative AI'

    def handle(self, *args, **kwargs):
        # Configure the Google Generative AI client
        genai.configure(api_key=os.environ["G_API_KEY"])
        model = genai.GenerativeModel('gemini-1.5-flash')

        def generate_daily_insight():
            # Generate insight using Google Generative AI
            try:
                response = model.generate_content(
                    "Generate a daily financial insight",
                )
                
                
                # Extract the generated content
                generated_text = response.candidates[0].content.parts[0].text
                
                # Extract title and content from the response
                title = generated_text.split('\n')[0]  # First line as the title
                content = generated_text
                print(f"Generated Insight: {title}")
                return title, content
            except Exception as e:
                print(f"Error generating insight: {e}")
                return None, None

        # Call the function to generate the insight
        title, content = generate_daily_insight()

        if title and content:
            # Save the insight to your Django model (assuming you have an Insight model)
            Insight.objects.create(title=title, content=content)
