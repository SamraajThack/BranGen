import os
import openai
import argparse


def main():
    print("Running BranGen")

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    result = generate_branding_snippet(user_input)
    print(result)
    


def generate_branding_snippet(prompt: str):

    # Load API key from env
    openai.api_key = os.getenv("OPENAI_API_KEY")
    instruct_prompt = f"Generate upbeat branding snippet for {prompt} "

    # get the snippet from the the 3rd party API by providing instruction
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
   
    return branding_text


if __name__ == "__main__":
    main()
