# B-SEN MVP - Local Development Running

## ✅ Servers Status

### Backend API

- **URL:** http://localhost:3000
- **Status:** Running (Node.js + Express + MongoDB)
- **MongoDB:** Connected to `mongodb://127.0.0.1:27017/bsen`
- **Contract ID:** `CDIQYWPQ4X7Y3OS7KXV7SUKSGYS57SVJRJNS3THZQVHM5ES2N4PZH3ZZ`

### Frontend

- **URL:** http://localhost:5173
- **Status:** Running (Vite + React + TailwindCSS)
- **API Base:** Points to http://localhost:3000

---

## 🚀 Quick Start - Testing the App

### 1. Open the Frontend

Navigate to **http://localhost:5173** in your browser.

### 2. Connect Freighter Wallet

- Click **"Wallet"** in the navigation bar
- Click **"Connect Freighter"** button
- Approve the connection in your Freighter extension
- Your public key will be displayed and stored in localStorage
- ✅ You'll see your reputation from the database

### 3. Post a Gig

- Click **"Post Gig"** in the navigation bar
- Fill in:
  - **Title:** e.g., "Fix bug in React app"
  - **Description:** e.g., "Need someone to debug component rendering"
  - **Payment Amount:** e.g., 100 (XLM)
  - **Worker Address:** Paste a Stellar address (can be fake for testing)
- ✅ The gig will be saved to MongoDB
- ✅ Backend will attempt to create the job on-chain via Soroban contract (using soroban CLI)

### 4. Browse & Accept Gigs

- Click **"Home"** to see all posted gigs
- Click **"Apply"** on any gig to accept it
- Your connected wallet address will be recorded as the worker
- ✅ Gig status changes to `in-progress`

### 5. View Your Gigs

- Click **"My Gigs"** to see gigs you posted and accepted
- Posted gigs: gigs where you were the client
- Accepted gigs: gigs where you accepted the work

---

## 🔗 API Endpoints

### Gigs

- `GET /api/gigs` — Fetch all gigs
- `POST /api/gigs` — Create new gig (requires `clientAddress`)
- `POST /api/gigs/:id/accept` — Accept a gig (set worker, status='in-progress')
- `POST /api/gigs/:id/complete` — Mark gig completed (calls contract `complete_job`)
- `GET /api/gigs/my-gigs?address=<STELLAR_ADDRESS>` — Get user's posted & accepted gigs

### Users

- `GET /api/users/:address` — Get/create user profile
- `GET /api/users/:address/reputation` — Get user's reputation (currently from DB)

---

## 📝 Notes

### Current Limitations

1. **Contract Invocation:** Backend uses `soroban` CLI to invoke contract functions
   - Requires `soroban` CLI to be installed and in PATH on the server machine
   - This is a demo approach; production should use JS SDK or client-side signing
2. **Wallet Signing:** Currently server-side only
   - Recommended future: Move to browser-side with Freighter signing for true decentralized flow
3. **Reputation:** Currently stored in MongoDB only
   - TODO: Read from on-chain contract storage

### Testing without Real Soroban Calls

If `soroban` CLI is not available on your system and contract invocations fail:

- Gigs will still be created and stored in MongoDB
- The frontend will display any contract errors but won't block the flow
- You can mock contract responses by editing `backend/utils/sorobanInvoke.js`

---

## 🔧 Environment Files

### Backend (`.env` in `/backend`)

```
MONGODB_URI=mongodb://127.0.0.1:27017/bsen
PORT=3000
SOROBAN_CONTRACT_ID=CDIQYWPQ4X7Y3OS7KXV7SUKSGYS57SVJRJNS3THZQVHM5ES2N4PZH3ZZ
# Optional: Set if you want server-side signing for contract calls
# STELLAR_SECRET_KEY=SDYL5XXNQH4JPJFRFWFVELMYPJROJIJRVGS6AOVRD2NFXBPDFYKHKWRI
```

### Frontend (`.env` in `/frontend`)

```
VITE_API_URL=http://localhost:3000
VITE_CONTRACT_ID=CDIQYWPQ4X7Y3OS7KXV7SUKSGYS57SVJRJNS3THZQVHM5ES2N4PZH3ZZ
VITE_STELLAR_NETWORK=testnet
```

---

## 📊 Smart Contract Details

**Deployed Contract ID:** `CDIQYWPQ4X7Y3OS7KXV7SUKSGYS57SVJRJNS3THZQVHM5ES2N4PZH3ZZ`

**Available Functions:**

- `create_job(client: Address, worker: Address, amount: i128) -> u32`

  - Creates a job in the contract storage
  - Returns a job ID

- `complete_job(job_id: u32, caller: Address) -> Result<(), ContractError>`

  - Marks a job as completed
  - Increments worker's on-chain reputation

- `get_reputation(worker: Address) -> i32`
  - Retrieves worker's on-chain reputation score

---

## 🐛 Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running on `localhost:27017`
- On Windows: Start MongoDB with `mongod.exe` or check services

### Soroban CLI Not Found

- Install: `cargo install --locked soroban-cli`
- Verify: `soroban --version`

### Port Already in Use

- Backend (3000): `taskkill /PID <PID> /F` to free port
- Frontend (5173): Vite will automatically use next available port

### Freighter Not Detected

- Ensure Freighter browser extension is installed: https://www.freighter.app/
- Make sure you're on a Stellar testnet account in Freighter

---

## ✨ Next Steps to Enhance

1. **Replace CLI with JS SDK:**

   - Use `@stellar/stellar-sdk` with `SorobanClient` to invoke contracts from backend
   - More portable and production-ready

2. **Client-Side Signing:**

   - Move contract invocations to frontend using Freighter
   - Use `window.freighter.signTransaction()` to sign escrow and payment transactions
   - More decentralized and user-controlled

3. **On-Chain Reputation:**

   - Call `get_reputation()` contract function to fetch worker reputation
   - Display on frontend user profile

4. **Add Escrow Logic:**

   - Implement actual XLM payment flow using Soroban escrow
   - Lock funds when gig is accepted, release on completion

5. **Authentication:**
   - Add session management / JWT tokens
   - Tie requests to authenticated Stellar addresses

---

## 📞 Need Help?

Check the README files in each folder:

- `/frontend/README.md` — Frontend setup
- `/backend/README.md` — Backend setup (create if needed)
- `/contract/README.md` — Contract build & deploy info
