from fastapi import FastAPI, HTTPException
from brangen import generate_branding_snippet, generate_keywords
from mangum import Mangum

app = FastAPI()
handler = Mangum(app)
MAX_INPUT_LEN = 20


@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}


@app.get("/generate_keyword")
async def generate_keyword_api(prompt: str):
    keywords = generate_keywords(prompt)
    return {"snippet": None, "keywords": keywords}


@app.get("/generate_snippet_and_keywords")
async def generate_snippet_api(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": keywords}


def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LEN:
        raise HTTPException(
            status_code=400, detail=f"Input length is too long, must be under {MAX_INPUT_LEN} characters")
