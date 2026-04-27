# 🇮🇳 ElectionIQ | The Sovereign Intelligence

**Live Demo**: [https://testing-f5157.web.app](https://testing-f5157.web.app)

ElectionIQ is an AI-powered civic intelligence platform designed to educate, empower, and assist Indian citizens in understanding their democratic rights, verifying their eligibility, and navigating the electoral process with ease.

---

## 🛑 Why We Built This Project

The Indian electoral process is a massive, complex machinery involving over 900 million eligible voters across 28 states and 8 union territories. For many citizens—especially first-time voters—accessing clear, unbiased, and actionable information is incredibly difficult. 

We built **ElectionIQ** to solve several critical pain points in the current civic tech landscape:

1. **Information Overload & Inaccessibility**: Important information (like checking eligibility, finding polling stations, or understanding the polling day process) is often buried in clunky, hard-to-navigate government websites. ElectionIQ centralizes this into a beautiful, intuitive interface.
2. **Combating Misinformation**: In an era of deepfakes and biased media, voters need a neutral, verified "source of truth." Our AI assistant acts as an unbiased intelligence engine to answer queries directly without political spin.
3. **Voter Apathy & Lack of Awareness**: Many young citizens feel disconnected from the political process. By gamifying civic knowledge, providing dynamic historical timelines, and educating users on rights like **NOTA** (None of the Above), we aim to boost voter turnout and engagement.
4. **Empowering the Sovereign Individual**: Ultimately, democracy works best when voters are informed. We built this platform to put powerful data and AI directly into the hands of the citizen, empowering them to make independent, educated choices.

---

## ✨ Key Features

1. **The Sovereign Intelligence Advisor (AI Chat)**
   - A glassmorphic, interactive chat interface powered by Gemini 2.5 Flash.
   - Instantly answers civic queries, explains EVM protocols, and analyzes historical trends without bias.

2. **Voter Eligibility Engine 🆕**
   - A robust tool allowing users to input their Date of Birth and citizenship details.
   - Calculates exact age dynamically to verify if the user meets the constitutional requirement of being 18+ to vote.

3. **Near Poll Station Locator 🆕**
   - Integrated with the **Nominatim (OpenStreetMap) API** for real-time location suggestions.
   - Helps users find polling stations near their Pincode, City, or Locality, accompanied by a dynamic interactive map.

4. **Dynamic AI Historical Timeline**
   - Select any region (National or specific State) and any year (1951-2026).
   - The AI acts as a political historian, generating an accurate chronological timeline of that specific election cycle.

5. **Polling Day Guide 🆕**
   - A dedicated section on the homepage detailing the step-by-step process of voting (Verification, Inking, EVM usage).
   - Includes critical Do's and Don'ts to ensure voters are prepared before heading to the booth.

6. **Civic Knowledge Protocol (AI Quiz)**
   - Tests user's grasp on the electoral process through AI-curated inquiries with instant "Intelligence Quotient" feedback.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS v4, Framer Motion (Animations)
- **Backend**: Node.js, Express.js
- **AI Integration**: Google Gemini API (`gemini-2.5-flash` model)
- **Maps API**: Nominatim OpenStreetMap API, Google Maps Embeds
- **Deployment**: Firebase Hosting (Frontend), Google Cloud Run (Backend)

---

## 🚀 Running Locally

### Prerequisites

- Node.js (v18+)
- A Google Gemini API Key
- Firebase Project Setup

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

_“Vote Dena Hamari Duty Hai. Apne adhikar ka azaad istemaal karein. Jai Hind, Jai Bharat 🇮🇳”_
