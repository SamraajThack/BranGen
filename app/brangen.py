from typing import List
import os
import openai
import argparse
import re


MAX_INPUT_LEN = 20

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    if validate_length(user_input):
        snippet_result = generate_branding_snippet(user_input)
        keywords_result = generate_keywords(user_input)
      

    else:
        raise ValueError(f"Input is too long, Must be under {MAX_INPUT_LEN}.")
    

def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LEN


def generate_branding_snippet(prompt: str) -> str:

    # Load API key from env
    openai.api_key = os.getenv("OPENAI_API_KEY")
    instruct_prompt = f"Generate upbeat branding snippet {prompt}: "
    print(instruct_prompt)
    # get the snippet from the the 3rd party API by providing prompt and instruction
    response = openai.Completion.create(
        engine="text-davinci-001", prompt=instruct_prompt, max_tokens=32
    )

    # extract text from reponse
    branding_text: str = response["choices"][0]["text"]
    #strip whitespce
    branding_text = branding_text.strip() 

    # add th ellipses if the sentence is not complete
    last_char = branding_text[-1]
    if last_char not in {".", "!", "?"}:
        branding_text += "..."
    
    print(f"Snippet: {branding_text}")
    return branding_text

def generate_keywords(prompt: str) -> List[str]:

    # Load API key from env
    openai.api_key = os.getenv("OPENAI_API_KEY")
    instruct_prompt = f"Generate related branding keywords for {prompt}: "
    print(instruct_prompt)
    # get keywords from the the 3rd party API by providing prompt and instruction
    response = openai.Completion.create(
        engine="text-davinci-001", prompt=instruct_prompt, max_tokens=32
    )

    # extract text from reponse
    keywords_text: str = response["choices"][0]["text"]
    #strip whitespce
    keywords_text = keywords_text.strip() 
    #split into array using regex
    keywords_array = re.split(",|\n|;|-", keywords_text)
    keywords_array =  [k.strip().lower() for k in keywords_array if len(k) > 0]

    print(f"Keywords: {keywords_array}")
    return keywords_array


if __name__ == "__main__":
    main()
