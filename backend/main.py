from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types
import os
import tempfile
import json

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="BharatOne AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:8081",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:8081",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    language: str = "English"


@app.get("/")
def home():
    return {
        "message": "Welcome to BharatOne AI Backend 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "Backend is running successfully!"
    }


@app.post("/chat")
def chat(request: ChatRequest):
    try:
        prompt = f"""
You are BharatOne AI, an AI assistant for Smart Villages and Smart Cities.

Always answer in {request.language}.

Rules:
- If language is English, reply only in English.
- If language is Hindi, reply only in Hindi.
- If language is Marathi, reply only in Marathi.
- Be polite, clear, and helpful.
- Format your answers using Markdown whenever useful.

User Question:
{request.message}
"""

        response = client.models.generate_content(
           model="gemini-2.5-flash",
           contents=prompt,
        )

        return {
            "reply": response.text
        }

    except Exception as e:
        return {
            "reply": f"Error: {str(e)}"
        }
    

@app.post("/analyze-crop")
async def analyze_crop(image: UploadFile = File(...)):
    try:
        image_bytes = await image.read()

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=image.content_type,
                ),
                """
You are an expert agricultural AI.

Analyze the uploaded crop image carefully.

Return ONLY valid JSON.

Do not use markdown.
Do not use ```json.
Do not explain anything.

Return exactly this format:

{
  "crop": "",
  "disease": "",
  "confidence": "",
  "severity": "",
  "affected_area": "",
  "treatment": "",
  "organic_solution": "",
  "fertilizer": "",
  "irrigation": ""
}
""",
            ],
        )

        return json.loads(response.text)
    
    except Exception as e:
        return {
            "error": str(e)
        }