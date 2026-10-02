# RASSA Go-to-Market Readiness Audit

Date: 2026-09-26  
Scope: customer-facing landing page, onboarding, tutor experience, AI grounding, payments, Supabase security, build quality, and responsive smoke testing.

## Launch Decision

**Controlled demo: GO. Public paid launch tomorrow: NO-GO until the P0 items below are closed.**

Readiness score: **5/10**.

The product now demonstrates a credible learning loop: landing page -> onboarding -> dashboard -> tutor, and the tutor can answer from the RASSA lesson/slang/regional library. The commercial path is not yet production-safe because payment, authentication, legal trust, and production AI security are still incomplete.

## Findings

### P0: Payment currently has a demo bypass

`src/services/stripe.ts` falls back to setting the subscription tier in localStorage when `VITE_STRIPE_CHECKOUT_ENDPOINT` is missing or fails. A visitor can therefore appear subscribed without a real payment. This is acceptable for a private demo, but it must be blocked or clearly labelled before public paid traffic.

Action before paid launch:

- Configure and test the real Stripe Checkout endpoint and customer portal.
- Remove the silent upgrade fallback in production builds, or gate it behind an explicit demo flag.
- Test successful payment, cancellation, failed payment, refresh, and sign-out.

### P0: Auth and cloud sync are not connected to the product flow

`src/context/AppContext.tsx` uses `localStore` for profile, progress, vocabulary, subscription, and AI quota. Supabase is configured as an optional client, but the user journey does not currently authenticate or persist data to Supabase.

Action before promising multi-device access:

- Add sign-in/session handling.
- Connect profile, progress, vocabulary, and chat persistence.
- Verify two users cannot read or mutate each other's records.

### P0: Production AI key is exposed to the browser

`VITE_GEMINI_API_KEY` is read by client-side code in `src/services/ninnyAi.ts`. Any Vite `VITE_` variable is shipped to the browser. This allows key extraction and uncontrolled usage if deployed as-is.

Action before public AI usage:

- Move Gemini calls behind a server/API endpoint.
- Add server-side rate limits, spend limits, request logging, and abuse handling.
- Keep only a public endpoint identifier in the browser.

### P1: AI grounding gap was real and is now partially fixed

Before this audit, Ninny received only the last four chat messages and the selected role-play scenario. It did not receive the curriculum, slang, regional phrase, or lesson content from the app. This explains answers that felt disconnected from the product.

Implemented in this audit:

- Query-aware matching against `LESSONS_DATABASE`, `THAI_SLANG_COLLECTION`, and `REGIONAL_PHRASES_COLLECTION`.
- Matching RASSA context is supplied to Gemini.
- Offline fallback now returns the closest RASSA library match.
- Landing-page AI demo uses the same tutor logic as the full tutor.

Verification: “How do I say no plastic bag at 7-Eleven?” returned the RASSA 7-Eleven lesson; “Teach me 3 modern Thai slang words” returned matching RASSA slang content. Both flows had no console errors.

Remaining risk: the matcher is lightweight keyword retrieval, not a full semantic search or evaluation suite. Add a small golden-question test set before marketing claims about tutor accuracy.

### P1: Trust claims are not evidenced in the product

The landing page currently presents claims such as “10K+ Active Learners”, “Trusted by 100+ companies”, “4.9 App Store Rating”, and media logos. No evidence or links were found in the repository. Placeholder legal and social links also point to `#`.

Action before public launch:

- Replace unsupported claims with “Early access” or verified numbers.
- Remove media logos unless permission and proof exist.
- Publish real Privacy, Terms, Cookies, refund, and contact pages.

### P1: Engineering quality gate is red

- `npm run build`: **PASS**.
- `npm run lint`: **FAIL**, 24 errors, including explicit `any`, Fast Refresh export rules, and an impure `Math.random()` call in `src/components/ui/sidebar.tsx`.
- Production bundle: approximately **771 kB minified / 226 kB gzip**, with a Vite warning above the 500 kB chunk threshold.
- `npm audit`: audit endpoint failed in the environment, so dependency vulnerability status is **unverified**, not clean.

Action: make lint and dependency audit green before a wider release; split the largest client chunks after the first launch blocker pass.

### P1: Mobile overflow was found and fixed

The initial 390px smoke test measured `body.scrollWidth` 417px against a 391px viewport. Global horizontal overflow was added to `src/index.css`; the follow-up measured 376px against 391px with no console errors.

## Verification Evidence

- Page identity: `http://127.0.0.1:5173/`, title `Rassame - AI Thai Learning`.
- Landing page: meaningful content rendered; no framework overlay; no console errors.
- Onboarding: completed all three steps and reached the learner dashboard.
- Desktop: horizontal layout within viewport after the CSS fix.
- Mobile: 390px viewport, no horizontal overflow after the fix.
- Landing AI demo: grounded response verified with 7-Eleven query.
- Full tutor: grounded response verified with modern slang query.
- Production build: passed.
- Supabase policy fix: `user_progress`, `vocab_vault`, and `chat_messages` now use `auth.uid() = user_id`, `TO authenticated`, and `WITH CHECK` ownership protection.

## Tomorrow's Order of Operations

1. Run a private demo using the free preview and the grounded tutor flow.
2. Do not accept paid traffic until real Stripe Checkout is configured and tested end-to-end.
3. Remove or substantiate social proof and publish legal pages.
4. Move Gemini behind a server endpoint before sharing the public URL broadly.
5. Apply the Supabase policy changes to the real project and test with two accounts.
6. Create five golden AI questions covering food ordering, politeness, slang, regional Thai, and an out-of-scope question.
7. Fix lint, then split the largest bundle chunks as the next engineering pass.

## Files Changed In This Audit

- `src/services/ninnyAi.ts`: grounded retrieval from RASSA content and grounded offline fallback.
- `src/sections/AIChatDemo.tsx`: landing demo now calls the same tutor service.
- `src/supabase/schema.sql`: corrected row ownership policies.
- `src/index.css`: prevented mobile horizontal overflow.

## Google Cloud Agent Service Update (2026-10-01)

- ADC authentication: **PASS**.
- Project access: **PASS** for `rassame` / `733979547417`.
- ADC quota project: **PASS**, set to `rassame`.
- Backend health endpoint: **PASS** at local `/`.
- Google Cloud model smoke test: **BLOCKED by `BILLING_DISABLED`** on `aiplatform.googleapis.com`.

The backend now uses ADC through Vertex AI when no server-side `GEMINI_API_KEY` is present, defaults to `gemini-3.8-flash`, and reads `GOOGLE_CLOUD_LOCATION=global`. Enable billing on `rassame`, wait for propagation, then rerun the one-message smoke test before exposing the tutor publicly.
