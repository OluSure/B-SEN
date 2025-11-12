# 🌟 B-SEN (Blockchain Skills Exchange Network) - MVP

## 🚀 Overview

B-SEN is a **full-stack decentralized application** built on the Stellar blockchain that enables users to:
- **Post gigs** - Offer skills and services
- **Browse opportunities** - Find work from clients
- **Accept gigs** - Commit to completing work
- **Build reputation** - Earn on-chain reputation scores
- **Earn XLM** - Get paid in Stellar lumens

---

## 🎯 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or connection string)
- Soroban CLI
- Freighter wallet browser extension

### Setup

#### 1. Clone & Install Dependencies
```bash
cd C:\Users\ICT026\Desktop\Hackathon\b-sen

# Frontend
cd frontend && npm install

# Backend  
cd ../backend && npm install
```

#### 2. Environment Variables

**Backend (`backend/.env`)**
```
MONGODB_URI=mongodb://127.0.0.1:27017/bsen
PORT=3000
SOROBAN_CONTRACT_ID=CDIQYWPQ4X7Y3OS7KXV7SUKSGYS57SVJRJNS3THZQVHM5ES2N4PZH3ZZ
```

**Frontend (`frontend/.env`)**
```
VITE_API_URL=http://localhost:3000
VITE_CONTRACT_ID=CDIQYWPQ4X7Y3OS7KXV7SUKSGYS57SVJRJNS3THZQVHM5ES2N4PZH3ZZ
VITE_STELLAR_NETWORK=testnet
```

#### 3. Start Services

**Terminal 1 - Backend**
```bash
cd backend
node server.js
# Server running on http://localhost:3000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# Frontend on http://localhost:5173
```

#### 4. Open in Browser
Visit **http://localhost:5173**

---

## 📂 Project Structure

```
b-sen/
├── frontend/                  # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/        # Navbar, shared components
│   │   ├── pages/             # Home, PostGig, MyGigs, WalletConnect
│   │   ├── App.jsx            # Router setup
│   │   ├── App.css            # Global animations
│   │   ├── index.css          # TailwindCSS imports
│   │   └── main.jsx           # React entry point
│   ├── package.json           # Dependencies
│   ├── vite.config.js         # Vite config
│   ├── tailwind.config.js     # Tailwind config
│   └── .env                   # Environment variables
│
├── backend/                   # Node.js + Express + MongoDB
│   ├── server.js              # Express app entry
│   ├── routes/
│   │   ├── gigs.js            # Gig CRUD endpoints
│   │   └── users.js           # User profile endpoints
│   ├── models/
│   │   ├── Gig.js             # Gig schema
│   │   └── User.js            # User schema
│   ├── utils/
│   │   └── sorobanInvoke.js   # Soroban contract wrapper
│   ├── package.json           # Dependencies
│   └── .env                   # Environment variables
│
├── contract/                  # Rust + Soroban
│   ├── src/
│   │   └── lib.rs             # Smart contract code
│   ├── Cargo.toml             # Rust dependencies
│   ├── .cargo/
│   │   └── config.toml        # Cargo config
│   └── target/
│       └── wasm32v1-none/
│           └── release/
│               └── b_sen_contract.wasm
│
├── README.md                  # Main project README
├── GETTING_STARTED.md         # Quick start guide
├── STATUS.md                  # Current status
├── UI_DESIGN.md               # UI/UX documentation
└── UI_COMPLETE.md             # Complete UI changes
```

---

## 🎨 Features

### Frontend
✅ **Home Page** - Browse and filter all gigs  
✅ **Post Gig** - Create new gigs with payment amount  
✅ **My Gigs** - Manage posted and accepted gigs  
✅ **Wallet** - Connect Freighter, view reputation  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Modern UI** - Glassmorphic, gradient, animated  

### Backend API
✅ **GET /api/gigs** - Fetch all gigs  
✅ **POST /api/gigs** - Create new gig  
✅ **POST /api/gigs/:id/accept** - Accept a gig  
✅ **POST /api/gigs/:id/complete** - Mark gig complete  
✅ **GET /api/gigs/my-gigs** - Fetch user's gigs  
✅ **GET /api/users/:address** - Get user profile  
✅ **GET /api/users/:address/reputation** - Get reputation  

### Smart Contract (Soroban)
✅ **create_job** - Create a new job on-chain  
✅ **complete_job** - Mark job complete & increment reputation  
✅ **get_reputation** - Fetch worker's reputation score  

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **React Router 7** - Routing
- **Tailwind CSS 4** - Styling
- **Vite 7** - Build & dev server
- **PostCSS** - CSS processing

### Backend
- **Node.js 20** - Runtime
- **Express 4** - Web framework
- **MongoDB 7** - Database
- **Mongoose 7** - ODM
- **Stellar SDK** - Blockchain interaction

### Blockchain
- **Soroban** - Smart contract platform
- **Stellar Testnet** - Test network
- **Rust** - Contract language
- **Freighter** - Wallet

---

## 🚀 Usage Flow

### 1. **Connect Wallet**
- Go to Wallet page
- Click "Connect Freighter"
- Approve in Freighter extension
- Public key stored in localStorage

### 2. **Post a Gig**
- Go to Post Gig page
- Fill in title, description, payment amount
- (Optional) Add target worker address
- Click "Publish Gig"
- Gig saved to MongoDB
- Backend attempts contract invocation

### 3. **Browse Gigs**
- Go to Home page
- See all posted gigs in cards
- Filter by status (All, Open, In Progress, Completed)
- Click "Apply" to accept a gig

### 4. **Accept a Gig**
- Click "Apply" on any gig
- Your wallet address becomes the worker
- Gig status changes to "in-progress"
- Added to your "My Gigs" accepted list

### 5. **Complete a Gig**
- Go to "My Gigs" page
- Click "Mark Complete" on in-progress gig
- Backend calls contract complete_job
- Reputation increases (if on-chain)
- Status changes to "completed"

### 6. **View Reputation**
- Go to Wallet page
- See reputation score
- Currently from MongoDB (TODO: fetch from contract)

---

## 📊 Database Schema

### Gig Model
```javascript
{
  title: String,
  description: String,
  paymentAmount: Number,
  clientAddress: String,
  workerAddress: String,
  status: 'open' | 'in-progress' | 'completed',
  contractId: String,
  contractResult: String,
  createdAt: Date
}
```

### User Model
```javascript
{
  address: String,
  reputation: Number,
  createdAt: Date
}
```

---

## 🤝 Smart Contract Details

**Contract ID:** `CDIQYWPQ4X7Y3OS7KXV7SUKSGYS57SVJRJNS3THZQVHM5ES2N4PZH3ZZ`

**Network:** Soroban Testnet

**Functions:**

### create_job
```rust
pub fn create_job(
    env: Env,
    client: Address,
    worker: Address,
    amount: i128
) -> u32
```
Creates a job and returns job ID.

### complete_job
```rust
pub fn complete_job(
    env: Env,
    job_id: u32,
    caller: Address
) -> Result<(), ContractError>
```
Marks job complete and increments worker reputation.

### get_reputation
```rust
pub fn get_reputation(env: Env, worker: Address) -> i32
```
Returns worker's on-chain reputation score.

---

## 🔐 Security Notes

⚠️ **Current Implementation:**
- Server-side contract invocation via soroban CLI
- Wallet keys used for deployment only
- Not storing user funds (no escrow yet)

✅ **Recommended for Production:**
- Browser-side signing with Freighter
- JS SDK for contract interaction
- Proper escrow contract logic
- JWT authentication
- Rate limiting
- Input validation
- Error handling

---

## 📝 Environment Variables

### Backend
```
MONGODB_URI=<connection_string>
PORT=<port>
SOROBAN_CONTRACT_ID=<contract_id>
STELLAR_SECRET_KEY=<optional>
STELLAR_NETWORK=testnet
```

### Frontend
```
VITE_API_URL=<backend_url>
VITE_CONTRACT_ID=<contract_id>
VITE_STELLAR_NETWORK=testnet
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Frontend loads without errors
- [ ] Navbar navigation works
- [ ] Connect wallet in Wallet page
- [ ] Post a gig successfully
- [ ] See gig in Home page
- [ ] Filter gigs by status
- [ ] Accept a gig
- [ ] View in My Gigs (Accepted tab)
- [ ] Mark gig complete (in Posted tab)
- [ ] Disconnect wallet

### API Testing
```bash
# Get all gigs
curl http://localhost:3000/api/gigs

# Get user reputation
curl http://localhost:3000/api/users/GCPJHMAL.../reputation

# Create gig (requires POST)
# Accept gig (requires POST)
```

---

## 📚 Documentation Files

- **GETTING_STARTED.md** - Quick start & features
- **STATUS.md** - Current status & progress
- **UI_DESIGN.md** - UI/UX detailed design specs
- **UI_REDESIGN_SUMMARY.md** - UI changes summary
- **UI_COMPLETE.md** - Complete UI overview

---

## 🚀 Next Steps

### Phase 1: Optimization
- [ ] Move to JS SDK (replace CLI invocation)
- [ ] Implement browser-side signing
- [ ] Add proper error handling
- [ ] Add input validation

### Phase 2: Features
- [ ] Real escrow logic
- [ ] Payment verification
- [ ] On-chain reputation fetch
- [ ] User profiles
- [ ] Messaging system
- [ ] Reviews/ratings

### Phase 3: Scaling
- [ ] Mainnet deployment
- [ ] Production hardening
- [ ] Analytics & monitoring
- [ ] Mobile app
- [ ] Premium features

---

## 📞 Troubleshooting

### Frontend won't load
- Ensure Vite dev server running (`npm run dev`)
- Check http://localhost:5173
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)

### API calls failing
- Verify backend running (`node server.js`)
- Check http://localhost:3000/api/gigs
- Verify MongoDB connection
- Check backend terminal for errors

### Wallet not connecting
- Install Freighter: https://www.freighter.app/
- Ensure Freighter account funded on testnet
- Allow pop-ups in browser
- Check browser console for Freighter errors

### Contract calls failing
- Verify soroban CLI installed
- Check contract ID in .env
- Verify Stellar testnet connection
- Check backend terminal for contract errors

---

## 📖 Resources

- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Stellar Docs:** https://developers.stellar.org
- **Soroban Docs:** https://soroban.stellar.org
- **Freighter:** https://www.freighter.app/

---

## 📄 License

MIT License - Feel free to use and modify for your projects!

---

## 🎉 Summary

**B-SEN** is a complete MVP demonstrating:

✅ Full-stack web application (React + Node + MongoDB)  
✅ Blockchain integration (Soroban smart contract)  
✅ Web3 wallet connectivity (Freighter)  
✅ Modern UI/UX (Glassmorphic, animated)  
✅ Responsive design (mobile to desktop)  
✅ Database persistence  
✅ RESTful API  

**Perfect for:**
- Portfolio projects
- Hackathon submissions
- Learning blockchain development
- Building on Stellar
- Teaching Web3 concepts

---

**🚀 Get started with B-SEN today!**

Visit http://localhost:5173 and start exchanging skills! 🌟
