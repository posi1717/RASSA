import os
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from groq import Groq

# โหลด API Key จากไฟล์ .env
load_dotenv()

app = FastAPI(title="RASSAME Agent Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ดึง API Key จากสภาพแวดล้อม
gemini_api_key = os.getenv("GEMINI_API_KEY")
project_id = os.getenv("GOOGLE_CLOUD_PROJECT_ID", "rassame")
model_name = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")
location = os.getenv("GOOGLE_CLOUD_LOCATION", "global")
groq_api_key = os.getenv("GROQ_API_KEY")
groq_transcription_model = os.getenv("GROQ_TRANSCRIPTION_MODEL", "whisper-large-v3-turbo")

# Prefer ADC through Vertex AI for Google Cloud deployments; an explicit
# server-side key remains available for local development without exposing it
# to the browser.
client = (
    genai.Client(api_key=gemini_api_key)
    if gemini_api_key
    else genai.Client(vertexai=True, project=project_id, location=location)
)
groq_client = Groq(api_key=groq_api_key) if groq_api_key else None

TUTOR_SYSTEM_PROMPT = """คุณคือ Kru Rassamee (ครูรัศมี) ครูสอนภาษาไทยและภาษาอังกฤษประจำแพลตฟอร์ม RASSAME
บุคลิก: สุภาพ ใจดี อดทน และเป็นกันเอง

หน้าที่ของคุณ:
1. สนทนากับผู้เรียนอย่างเป็นธรรมชาติ
2. หากผู้เรียนพิมพ์หรือพูดผิด ให้ช่วยแก้ไขประโยคให้ถูกต้องอย่างอ่อนโยน
3. ตอบกระชับ เข้าใจง่าย เหมาะสำหรับการโต้ตอบในแอปพลิเคชัน
"""

class ChatRequest(BaseModel):
    user_id: str
    message: str

@app.get("/")
def root():
    return {"status": "online", "message": "RASSAME Agent Service is running"}

@app.post("/api/v1/agent/chat")
async def chat_with_agent(req: ChatRequest):
    try:
        prompt = f"{TUTOR_SYSTEM_PROMPT}\n\nผู้เรียนพูดว่า: '{req.message}'"
        
        response = client.models.generate_content(
            model=model_name,
            contents=prompt
        )
        
        return {
            "status": "success",
            "reply": response.text,
            "project_id": project_id,
            "location": location,
            "model": model_name,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/v1/agent/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    """Convert a browser recording into text without exposing the Groq key."""
    if groq_client is None:
        raise HTTPException(status_code=503, detail="GROQ_API_KEY is not configured")

    if not file.filename:
        raise HTTPException(status_code=400, detail="Audio filename is required")

    try:
        audio_bytes = await file.read()
        if not audio_bytes:
            raise HTTPException(status_code=400, detail="Audio file is empty")

        transcription = groq_client.audio.transcriptions.create(
            file=(file.filename, audio_bytes),
            model=groq_transcription_model,
            response_format="json",
        )
        return {
            "status": "success",
            "text": transcription.text,
            "model": groq_transcription_model,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Groq transcription failed: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("agent_service:app", host="127.0.0.1", port=8000, reload=True)
