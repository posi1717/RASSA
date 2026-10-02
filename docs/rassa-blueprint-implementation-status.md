# RASSA Blueprint Implementation Status

Updated: 2026-10-02

## Phase 1 Product Fit

The current product is aligned with the Blueprint's first commercial phase:

- English-speaking learners can browse practical Thai lessons and real-life scenarios.
- Ninny AI is grounded with the RASSA lesson, slang, and regional phrase libraries.
- The tutor is English-first and teaches Thai script, romanisation, politeness, and cultural context.
- The app includes progress, saved vocabulary, free and paid plan presentation, and Stripe integration points.
- Browser microphone capture now sends recordings to the server-side Groq Whisper transcription endpoint.
- Teacher replies can be spoken with an English female adult voice when the browser provides one; Thai pronunciation remains separate.

## Launch Blockers

1. Google Cloud project `rassame` needs billing enabled before Vertex AI responses can be used.
2. Public deployment must not expose `VITE_GEMINI_API_KEY`; production AI calls should go through the server endpoint.
3. Stripe checkout and webhook verification need a live test in Stripe test mode before paid traffic.
4. Add production CORS origins, authentication, rate limits, request logging, and spend limits to the agent service.
5. Review privacy policy, terms, refund policy, and microphone/audio retention wording before launch.

## Recommended Go-to-Market Test

Launch a small free preview first: one beginner lesson, one travel scenario, microphone transcription, and a short Ninny AI trial. Measure account activation, first lesson completion, first AI interaction, audio success rate, and free-to-paid intent before expanding the catalogue.
