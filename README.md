# RASSA

RASSA is a London-launched learning platform for English-speaking learners who want practical Thai language and cultural confidence.

The first commercial product is **RASSA Thai**, supported by **Ninny AI**: a warm Thai tutor who explains Thai in clear English, teaches real-life phrases, corrects mistakes gently, and provides cultural context.

## Product Promise

> Learn practical Thai. Speak with confidence.

RASSA teaches what to say, how to say it, and when to use it in real situations such as food stalls, markets, taxis, hotels, introductions, and everyday conversation.

## Phase 1 Scope

- Thai foundations: pronunciation, tones, script, greetings, numbers, and core grammar
- Everyday Thai: requests, shopping, food, transport, directions, and social conversation
- Travel Thai: airports, hotels, restaurants, taxis, and useful local phrases
- Thai politeness: khráp, khâ, forms of address, wai etiquette, and social context
- Spoken Thai: natural daily phrases, selected slang, and regional expressions
- Ninny AI: English explanations, translation, correction, role-play, and practice
- Progress tracking, saved vocabulary, free preview, and paid access points
- Voice input through Groq Whisper and browser-based teacher pronunciation

## Subscription Positioning

| Plan | Price | Access |
| --- | ---: | --- |
| Free Preview | GBP 0 | Selected lessons and limited AI practice |
| Monthly | GBP 19.60/month | Full Thai curriculum and extended Ninny AI access |
| Yearly | GBP 190.60/year | Full access with annual billing value |

## System Architecture

```text
React + TypeScript + Vite frontend
          |
          +-- RASSA lesson and knowledge library
          +-- Browser microphone capture
          +-- Browser speech synthesis
          |
FastAPI agent service
          |
          +-- Groq Whisper: audio to text
          +-- Google Gemini / Vertex AI: tutor response
          +-- Supabase: auth, progress, saved vocabulary, chat data
          +-- Stripe: checkout and subscription management
```

## Repository Layout

```text
app/
  src/
    components/       Learning views and tutor UI
    data/              Curriculum, slang, and regional Thai content
    services/          AI, transcription, Stripe, and data services
    context/           Application state and voice helpers
    sections/          Landing page sections
  agent_service.py    Server-side AI and transcription API
  requirements.txt    Python backend dependencies
  .env.example        Environment variable template
  docs/               Audit and launch-readiness documents
```

## Requirements

- Node.js 20 or newer
- Python 3.11 or newer
- A modern browser with microphone support for voice input
- Supabase is optional for local demo mode
- Google Cloud billing is required for live Vertex AI calls

## Local Setup

From this directory:

```powershell
npm install
Copy-Item .env.example .env
```

Add secrets to `.env`. Keep this file local and never commit it.

### Start the Agent Service

Create or activate the repository virtual environment, then install backend dependencies:

```powershell
..\.venv\Scripts\python.exe -m pip install -r requirements.txt
..\.venv\Scripts\python.exe -m uvicorn agent_service:app --reload --port 8000
```

Health check:

```text
http://127.0.0.1:8000/
```

### Start the Frontend

In a second terminal:

```powershell
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Environment Variables

The important server-side values are:

```env
GOOGLE_CLOUD_PROJECT_ID=rassame
GOOGLE_CLOUD_LOCATION=global
GEMINI_MODEL=gemini-3.8-flash
GROQ_API_KEY=
GROQ_TRANSCRIPTION_MODEL=whisper-large-v3-turbo
```

`GROQ_API_KEY`, `GEMINI_API_KEY`, Google credentials, Supabase service keys, and Stripe secrets must remain server-side. Do not rename them with the `VITE_` prefix.

The frontend uses:

```env
VITE_AGENT_API_URL=http://127.0.0.1:8000
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_STRIPE_CHECKOUT_ENDPOINT=
```

## Voice Flow

1. Select the microphone button in the tutor interface.
2. Speak naturally in English or Thai.
3. Stop recording.
4. The recording is sent to `/api/v1/agent/transcribe`.
5. Groq Whisper returns text to the chat input.
6. Send the text to Ninny AI for an English explanation and Thai guidance.

Ninny teacher responses use Groq English TTS (`canopylabs/orpheus-v1-english`) with the `hannah` voice by default. Thai pronunciation buttons use a Thai browser voice separately. The browser voice is only a fallback when server-generated teacher audio is unavailable.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Agent service health check |
| POST | `/api/v1/agent/chat` | Server-side tutor response |
| POST | `/api/v1/agent/transcribe` | Audio upload to Groq Whisper transcription |
| POST | `/api/v1/agent/speak` | Generate English teacher audio with Groq TTS |

## Safety and Quality Rules

Ninny AI should:

- Explain Thai in clear, natural English by default.
- Include Thai script, romanisation, meaning, politeness, and cultural context when useful.
- Correct learners gently and avoid stereotypes.
- Avoid definitive medical, legal, visa, tax, financial, and emergency advice.
- Never reveal API keys, private user data, or internal business information.
- State when a qualified teacher or professional is needed.

## Go-to-Market Readiness

Before public paid traffic:

1. Enable and verify Google Cloud billing for project `rassame`, or use a supported paid AI backend.
2. Move all production AI calls behind the server-side agent service.
3. Configure live Stripe products, checkout, webhook verification, refunds, and customer portal.
4. Add production CORS origins, authentication, rate limits, spend limits, and structured logs.
5. Test microphone permissions and transcription on Chrome, Safari, and mobile.
6. Publish privacy, terms, acceptable-use, and refund policies.
7. Run a small free-preview pilot and measure activation, lesson completion, AI usage, audio success, conversion intent, and support issues.

## AWS Deployment

The repository includes `amplify.yml` for the Vite frontend and `Dockerfile` for the FastAPI agent service.

### Frontend: AWS Amplify

1. Connect the GitHub repository in AWS Amplify Hosting.
2. Set the app root to `app` if the repository is checked out from the monorepo root.
3. Use the included `amplify.yml` build settings.
4. Add `VITE_AGENT_API_URL` with the public App Runner URL.
5. Add Supabase public URL and anon key if cloud sync is enabled.

### Backend: AWS App Runner

1. Create an App Runner service from the GitHub repository or a container image.
2. Build from the included `Dockerfile`.
3. Set the application port to `8000`.
4. Store `GROQ_API_KEY`, `GROQ_TRANSCRIPTION_MODEL`, `GROQ_TTS_MODEL`, `GROQ_TTS_VOICE`, `GEMINI_API_KEY`, and Google Cloud values in AWS Secrets Manager.
5. Configure the production Amplify URL in the FastAPI CORS allow-list before public launch.
6. Copy the App Runner service URL into Amplify as `VITE_AGENT_API_URL` and redeploy.

Set `CORS_ORIGINS` in App Runner to the deployed Amplify URL, for example `https://main.xxxxx.amplifyapp.com`.

See [docs/rassa-blueprint-implementation-status.md](docs/rassa-blueprint-implementation-status.md) and [docs/go-to-market-readiness-audit-2026-09-26.md](docs/go-to-market-readiness-audit-2026-09-26.md) for the current launch assessment.

## Development Checks

```powershell
npm run lint
npm run build
..\.venv\Scripts\python.exe -m py_compile agent_service.py
```

## Product Direction

Phase 1 focuses on practical Thai. Later phases can expand into Thailand travel and culture, food and wellness, real instructors, communities, and Thailand business learning. AI supports those human relationships; it does not replace qualified teachers or real-world experience.
