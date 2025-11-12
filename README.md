# Blockchain Skills Exchange Network (B-SEN)

A decentralized skills marketplace built on Stellar Soroban for low-income communities.

## 🚀 Features

- Connect Stellar wallet (Freighter)
- Post and browse gigs
- Secure escrow payments via smart contracts
- On-chain reputation system

## 🛠 Tech Stack

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Blockchain: Stellar Soroban smart contract
- Database: MongoDB
- Blockchain SDK: Stellar SDK + Soroban SDK
- Web3 connection: Freighter wallet

## 📁 Project Structure

```
/b-sen
├── /frontend         # React + Vite app
├── /backend          # Node.js + Express server
└── /contract         # Soroban smart contract (Rust)
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js v16+
- Rust toolchain
- MongoDB
- Freighter wallet browser extension

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Smart Contract Setup

```bash
cd contract
cargo build
```

## 🔑 Environment Variables

Create `.env` files in both frontend and backend directories. See `.env.example` files for required variables.

## 📝 License

MIT
