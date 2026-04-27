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

## 🎯 Hackathon Submission Details

### Chosen Vertical
**Civic Tech & AI for Social Good** 
ElectionIQ focuses on democratizing political data, increasing civic engagement, and ensuring transparent information access for citizens using Generative AI.

### Approach and Logic
Our approach is centered on **Unbiased Intelligence and Centralization**. Instead of users jumping between complicated portals or biased news sites, we centralized data into a single, intuitive interface. We use Google Gemini to act as a neutral "historian" and "advisor," ensuring that answers to civic queries and historical timelines are generated securely, transparently, and free from partisan spin. The logic is to provide instant, verified information—from voter eligibility checks to polling station locations—with minimal friction.

### How the Solution Works
1. **Interactive AI Chat:** Users ask questions about their voting rights or the electoral process. The Node/Express backend safely queries the Gemini API with structured prompts to guarantee neutral, factual responses.
2. **Eligibility & Location Engines:** Users enter their Date of Birth or Pincode. The frontend dynamically calculates age using JavaScript date logic, while the Nominatim OpenStreetMap API fetches live geolocation data to plot nearby polling booths on an integrated map.
3. **Historical Data Generation:** Users select a state and year. The frontend requests Gemini to generate a structured historical timeline, which is then dynamically rendered on the UI without needing a pre-populated static database.

### Assumptions Made
- We assume users have basic internet access to load the web app.
- For the "Near Poll Station Locator", we assume the Nominatim open-source API provides accurate geocoding for Indian pincodes and localities.
- We assume the Gemini model's training data provides accurate historical contexts up to its latest knowledge cutoff.
- The "Nearby Stations" list uses placeholder structured data derived from the user's searched locality to demonstrate the UX, assuming integration with the official Election Commission booth API would happen in a full production deployment.

### Evaluation Focus Areas Addressed
- **Code Quality:** Modular React component structure, clean routing, and centralized styling with Tailwind CSS.
- **Security:** API keys are securely managed via backend environment variables. The app is served over HTTPS via Firebase.
- **Efficiency:** The backend is stateless, ensuring fast responses. React handles DOM updates efficiently, avoiding cascading renders.
- **Testing:** Core functionalities (Eligibility logic, AI Chat, Location search) have been validated against edge cases (e.g., users under 18, ambiguous chat questions).
- **Accessibility:** High contrast dark-mode UI, clear typography (Figtree), and large touch targets for complete mobile responsiveness.
- **Google Services Integration:** Deep integration of **Google Gemini API** (Core AI Engine), **Firebase Hosting** (Frontend Deployment), and **Google Maps Embeds** (Location Visualization).

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
