# Hackathon Deployment Guide (Zero-Mistake Path)

You requested **zero compromises and zero mistakes** for this hackathon submission. Your code is now fully linted (0 errors), thoroughly tested, built for production, and pushed to your GitHub repository.

Because you do not have the Google Cloud CLI (`gcloud`) installed locally, the safest, fastest, and most foolproof way to deploy your backend is using **Google Cloud Shell** directly in your browser.

Here is your exact, step-by-step path to victory:

## Step 1: Secure Your Backend (Google Cloud Run)
We will deploy the Express Backend to Cloud Run using Google's free browser terminal.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and log in.
2. Select your project from the top dropdown menu (the one with ID `8628759166241034946`).
3. In the top-right corner, click the **Activate Cloud Shell** icon (it looks like `>_`). A terminal will open at the bottom of the screen.
4. Run the following commands in that terminal (copy and paste):

```bash
# Clone your repository
git clone https://github.com/apex2224/ElectionProcess.git

# Navigate to the backend folder
cd ElectionProcess/backend

# Deploy directly to Cloud Run
gcloud run deploy electioniq-engine --source . --region us-central1 --allow-unauthenticated --set-env-vars="GEMINI_API_KEY=PLACE_YOUR_REAL_API_KEY_HERE"
```
*(Make sure to replace `PLACE_YOUR_REAL_API_KEY_HERE` with your actual Gemini API key before hitting Enter!)*

5. Once deployment completes, **copy the Service URL** it gives you (e.g., `https://electioniq-engine-xxxxx-uc.a.run.app`).

---

## Step 2: Connect and Deploy Frontend (Firebase Hosting)
Now that your backend is alive on the internet, we tell the frontend where to find it.

1. On your local machine (in VS Code/Antigravity), open the file:
   `frontend/.env`
2. Change the `VITE_API_URL` to the URL you copied from Cloud Run:
   ```env
   VITE_API_URL=https://electioniq-engine-xxxxx-uc.a.run.app
   ```
3. Run the following command in your local Antigravity/PowerShell terminal to build the final production assets:
   ```powershell
   cd frontend
   npm run build
   ```
4. Finally, deploy the frontend to Firebase Hosting:
   ```powershell
   cd ..
   firebase deploy --only hosting
   ```

Your platform is now fully deployed, globally scaled, and securely connected to Gemini AI. 🚀
Good luck with the hackathon!
