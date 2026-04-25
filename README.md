# KIKOBA - Financial Empowerment App

KIKOBA is a modern wealth-management application designed for Kenyan savings groups (Chamas). It integrates social saving circles with advanced AI-driven financial advice to help communities grow their wealth sustainably.

## 🚀 Key Features

- **Multi-Language Support**: Fully localized in **English**, **Français**, and **Kiswahili**.
- **KIKOBA AI Advisor**: A persistent, context-aware financial assistant powered by **Gemini 3 Flash**.
- **Chama Management**: Track contributions, rotations (Merrigo), and group loans.
- **Smart Savings**: Goal-based savings tracking with progress visualizations.
- **M-Pesa Integration**: Seamlessly initiate deposits using STK Push (API integrated).
- **Responsive Design**: Polished, mobile-first UI built with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini API (@google/genai)
- **Internationalization**: i18next
- **Database/Auth**: Firebase Firestore & Authentication
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_key
   VITE_FIREBASE_CONFIG=...
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌍 Language Support

Toggle between English, French, and Swahili using the globe icon in the top header. The AI advisor will automatically adapt its responses and the entire UI will translate instantly.

## 🤖 AI Capabilities

The built-in advisor uses Gemini to provide culturally relevant advice on:
- Minimizing loan default risks
- Optimizing Chama interest rates
- Group investment opportunities in the Kenyan market
- Conflict resolution within savings circles
