# IOTA Tangle Game - Lucky Number Prediction 🎲

Welcome to the **Simple Blockchain Game using IOTA Tangle**. This is a simulation DApp (Decentralized Application) that allows players to participate in a number prediction game, where all results and transaction history are designed to be stored transparently on the IOTA Tangle network.

## 📖 Introduction

This project illustrates how a decentralized game operates without traditional intermediary servers. Instead of saving scores to a standard Database (SQL/Mongo), we "write" the results onto the **IOTA Tangle** - a distributed ledger with no transaction fees (feeless).

The interface is designed in a modern **Cyberpunk Neon** style, providing a futuristic technological feel.

## ✨ Key Features

1.  **Crypto Wallet Simulation (IOTA Wallet):**
    * Users can connect a virtual wallet.
    * Displays wallet address and balance (MIOTA).
2.  **Game Smart Contract Mechanism:**
    * Players select a number between 1 and 100.
    * The system generates a random result.
    * **Winning Rule:** If the actual number falls within a range of **±5** of the predicted number -> Win (Double the wager).
3.  **Transparent History (Tangle History):**
    * Every gameplay turn generates a (simulated) `Message ID` representing a record on the Tangle.
    * Displays a public list of wins and losses.
4.  **AI Commentary (Google Gemini Integration):**
    * Uses AI to provide humorous, sarcastic, or congratulatory commentary based on match results in real-time.
5.  **Interactive Interface (UI/UX):**
    * Beautiful Neon/Glow effects.
    * Responsive (mobile/desktop compatible).
    * Intuitive status notifications.

## 🛠 Tech Stack

* **Frontend:** React (v19), TypeScript.
* **Styling:** Tailwind CSS (Custom Theme: Zinc & IOTA Neon).
* **AI Integration:** Google GenAI SDK (Gemini 2.5 Flash).
* **Icons:** Lucide React.
* **Blockchain Simulation:** `iotaService.ts` (Simulates network latency and transaction validation).

## 🚀 Installation and Running

### Prerequisites
* Node.js (version 18 or higher).
* An API Key from Google AI Studio (for the AI commentary feature).

### Steps

1.  **Clone the project:**
    ```bash
    git clone [https://github.com/Huynbbi09/IOTA-Tangle-Game-.git](https://github.com/Huynbbi09/IOTA-Tangle-Game-.git)
    cd IOTA-Tangle-GameGame
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Key:**
    * Create an `.env` file or set the environment variable:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the project:**
    ```bash
    npm run dev
    ```
    Access the browser at `http://localhost:3001/` (or the corresponding port).

## 📂 Folder Structure

```text
/
├── index.html              # Entry point, Tailwind configuration
├── index.tsx               # React root
├── App.tsx                 # Main interface and game logic
├── types.ts                # Data type definitions (TypeScript Interfaces)
├── services/
│   ├── iotaService.ts      # Simulates Blockchain & Smart Contract logic
│   └── geminiService.ts    # Google Gemini AI connection
├── components/
│   ├── WalletButton.tsx    # Button to connect wallet and display balance
│   └── HistoryList.tsx     # Table displaying match history
└── metadata.json           # Project information
