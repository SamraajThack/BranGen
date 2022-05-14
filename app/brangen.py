import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

subject  = "coffee"
prompt = f"Generate upbeat branding snippet for{subject}"


response = openai.Completion.create(
    engine="text-davinci-001", prompt = prompt , max_tokens=32
)

print(response)


