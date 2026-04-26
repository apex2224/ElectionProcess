# 🇮🇳 ElectionIQ | The Sovereign Intelligence

**Live Demo**: [https://testing-f5157.web.app](https://testing-f5157.web.app)

ElectionIQ is an AI-powered civic intelligence platform designed to educate, empower, and assist Indian citizens in understanding their democratic rights and the electoral process. 

---

## 🛑 The Problem We Are Solving

The Indian electoral process is vast, complex, and deeply rooted in decades of history across 28 states and 8 union territories. For a common citizen—especially first-time voters—accessing clear, unbiased, and consolidated information is a daunting task.
*   **Scattered Information**: Historical election data, timelines, and political shifts are buried in clunky government websites, massive Wikipedia articles, or biased media portals.
*   **Misinformation & Confusion**: With the rise of deepfakes and fake news, voters often lack a verified "source of truth" to ask simple questions about their voting rights, EVM security, or candidate eligibility.
*   **Lack of Civic Engagement**: Traditional civics education is often dry, leading to voter apathy and a lack of awareness regarding powerful tools like **NOTA** (None of the Above).

## 💡 The ElectionIQ Solution

We built **ElectionIQ** to democratize access to political history and civic knowledge using the power of Generative AI. By acting as a strict, unbiased "Sovereign Intelligence Engine", ElectionIQ transforms how citizens interact with their democracy.

### Core Benefits & Impact:
*   **Empowers the Voter**: Instantly answers any election-related query, from how to register to vote, to explaining the anti-defection law.
*   **Unbiased Historical Context**: Allows users to dynamically generate the political timeline of *any* Indian state or the Lok Sabha from **1951 to 2026**.
*   **Promotes Free & Fair Voting**: Actively advocates that voting is a fundamental duty. The platform educates users to never vote under pressure, and explicitly highlights the power of the NOTA button if no candidate is deemed fit.

---

## ✨ Key Features

1. **The Sovereign Intelligence Advisor (AI Chat)**
   * A glassmorphic, interactive chat interface powered by Gemini 2.5 Flash.
   * Can analyze historical trends, explain EVM protocols, and answer civic queries in real-time.
   * Features localized chat history previews and secure session purging.

2. **Dynamic AI Historical Timeline Engine**
   * Select any region (National or specific State) and any year (1951-2026).
   * The AI acts as a political historian, generating an accurate chronological timeline of that specific election cycle, including polling phases and the resulting Chief Minister / Prime Minister.

3. **Civic Knowledge Protocol (AI Quiz)**
   * Tests user's grasp on the electoral process through AI-curated inquiries.
   * Gamified UI with a progress bar and instant "Intelligence Quotient" feedback.

4. **Live State Results Tracker**
   * A persistent footer dropdown providing simulated/live electoral awareness to users across the platform.

5. **Premium Aesthetic & UX**
   * Built with a modern dark-mode UI, glassmorphism effects, localized Indian voting imagery, and typography driven by the elegant *Figtree* font.

---

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS v4, Firebase Hosting
*   **Backend**: Node.js, Express.js, Google Cloud Run
*   **AI Integration**: Google Gemini API (`gemini-2.5-flash` model)
*   **Authentication**: Firebase Auth (Google Sign-in)
*   **Routing**: React Router DOM

---

## 🚀 Running Locally

### Prerequisites
* Node.js (v18+)
* A Google Gemini API Key
* Firebase Project Setup (for Auth)

### 1. Setup the Backend
```bash
cd backend
npm install
# Create a .env file and add your PORT and GEMINI_API_KEY
npm run dev
```

### 2. Setup the Frontend
```bash
cd frontend
npm install
# Create a .env file and add VITE_API_URL (pointing to your backend, e.g., http://localhost:5000)
# Add your Firebase config to src/firebase.js
npm run dev
```

---
*“Vote Dena Hamari Duty Hai. Apne adhikar ka azaad istemaal karein. Jai Hind, Jai Bharat 🇮🇳”*
