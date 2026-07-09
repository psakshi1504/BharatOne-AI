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

        # Vercel Frontend
        "https://bharat-one-ai.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    language: str = "English"

class SchemeRequest(BaseModel):
    state: str
    occupation: str
    age: int
    gender: str
    category: str
    income: int
class ComplaintRequest(BaseModel):
    issue: str


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
    
@app.post("/government-schemes")
def government_schemes(request: SchemeRequest):
    try:
        prompt = f"""
You are BharatOne AI, an expert on Indian Government Schemes.

Based on the user's profile, recommend ONLY the most relevant government schemes.

User Profile:

State: {request.state}
Occupation: {request.occupation}
Age: {request.age}
Gender: {request.gender}
Category: {request.category}
Annual Income: ₹{request.income}

IMPORTANT RULES

Recommend ONLY 5-6 schemes.

Each scheme should have:

- name
- category
- eligibility
- benefits
- documents
- apply_link

Rules for writing:

Eligibility:
Maximum 20 words.

Benefits:
Maximum 20 words.

Documents:
Return only comma-separated document names.

Use simple language.

Do NOT write long paragraphs.

Do NOT repeat information.

Return ONLY valid JSON.

Example:

[
  {{
    "name":"PM Kisan Samman Nidhi",
    "category":"Farmer Welfare",
    "eligibility":"Landholding farmers in Maharashtra",
    "benefits":"₹6000/year in 3 installments",
    "documents":"Aadhaar, Bank Passbook, 7/12 Extract",
    "apply_link":"https://pmkisan.gov.in"
  }}
]
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        clean_text = response.text.strip()

        if clean_text.startswith("```json"):
            clean_text = clean_text.replace("```json", "", 1)

        if clean_text.endswith("```"):
            clean_text = clean_text[:-3]

        clean_text = clean_text.strip()

        return json.loads(clean_text)

    except Exception as e:
        return {
            "error": str(e)
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
You are an expert agricultural scientist and plant disease specialist.

Analyze the uploaded crop image carefully.

Your job is to identify:

1. Crop name
2. Disease (if any)
3. Confidence percentage
4. Severity
5. Affected area
6. Best treatment
7. Organic solution
8. Fertilizer recommendation
9. Irrigation advice

IMPORTANT RULES:

• Return ONLY valid JSON.
• Do NOT use Markdown.
• Do NOT use ```json.
• Do NOT explain anything outside the JSON.

If the crop is HEALTHY:

- disease = "Healthy"
- severity = "Low"
- affected_area = "None"
- treatment = "No treatment required. Continue regular monitoring."
- organic_solution = "Maintain healthy soil with compost or vermicompost."
- fertilizer = "Continue the recommended fertilizer schedule."
- irrigation = "Continue normal irrigation according to crop stage."

If a disease is detected:

- Identify ONLY the most probable disease.
- Give practical treatment advice.
- Suggest an organic alternative whenever possible.
- Recommend fertilizer based on the crop's condition.
- Recommend irrigation changes if needed.

If you are NOT confident:

- Mention the most likely disease.
- Keep confidence below 70%.

Severity Rules:

Healthy = Low

Minor symptoms = Low

Visible spread = Moderate

Severe infection = High

Confidence must always be written like:

"95%"

Return EXACTLY this JSON format:

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
    
@app.post("/analyze-complaint")
async def analyze_complaint(image: UploadFile = File(...)):
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
You are an expert municipal complaint detection AI.

Analyze the uploaded image carefully.

Identify:

1. issue
2. confidence
3. severity
4. department
5. resolution
6. title
7. description

Return ONLY valid JSON.

Example:

{
  "issue":"Pothole",
  "confidence":"96%",
  "severity":"Moderate",
  "department":"Public Works",
  "resolution":"3-5 Days",
  "title":"Large pothole on road",
  "description":"Large pothole causing inconvenience to vehicles."
}
"""
            ],
        )

        text = response.text.strip()

        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        return {
            "error": str(e)
        }