# Deploying B-SEN to Vercel

This document explains how to deploy the B-SEN monorepo to Vercel (frontend + backend serverless functions).

Overview

- Frontend lives in `/frontend` (Vite React). Vercel will build and serve the static site.
- Backend Express app is wrapped by `serverless-http` and exposed under `/api` via `api/index.js`.
- `vercel.json` configures builds and routing so `/api/*` routes hit serverless functions and the rest is served by the frontend.

Files added/changed for Vercel

- `vercel.json` - tells Vercel how to build and route requests
- `api/index.js` - serverless wrapper that exports the Express app
- `package.json` (root) - dependencies and `build` script for Vercel
- `backend/server.js` - updated to export the Express app instead of always listening

Required environment variables (set these in the Vercel project settings -> Environment Variables):

- `MONGODB_URI` - connection string for MongoDB (e.g. `mongodb+srv://<user>:<pass>@cluster0.../bsen`)
- `SOROBAN_CONTRACT_ID` - deployed Soroban contract ID
- `STELLAR_SECRET_KEY` (optional) - if you expect server-side contract calls to sign transactions (NOT recommended for production)

How Vercel builds this repo

- Vercel will run `npm install` at repo root (it uses root `package.json`) and install serverless dependencies.
- The `@vercel/static-build` builder will run the `build` script in `frontend/package.json` (via the root `build` script configured to `cd frontend && npm run build`). The Vite output (dist) will be served as the site.
- The `api/index.js` file is deployed as a serverless function (Node) and will use the `serverless-http` wrapper to execute the Express app.

Important caveats and next steps

1. Soroban CLI usage

   - The existing backend uses a CLI wrapper (`backend/utils/sorobanInvoke.js`) to call `soroban` commands via `child_process.exec`.
   - Vercel serverless functions do not have the Soroban CLI installed. Those calls will fail.
   - Recommended migration: replace CLI invocation with a JS-based approach using `@stellar/stellar-sdk` / `soroban-client` and RPC calls to the Soroban testnet. That will work in serverless environments.

2. Long-running connections

   - Serverless functions are stateless and short-lived. Keep DB connections efficient: use connection pooling and reuse established Mongoose connections across invocations.
   - The current `backend/server.js` connects on import which is acceptable when wrapped, but consider optimizing with Mongoose connection caching for cold starts.

3. Secrets

   - DO NOT commit secrets (private keys) to the repository. Use Vercel env vars.

4. Local testing
   - To emulate Vercel locally you can use `vercel dev` (install Vercel CLI) from repo root. It will run both frontend and serverless functions locally.

Quick deploy steps

1. Create a new project on Vercel and connect your GitHub repository (or import the repository).
2. In Project Settings > Environment Variables, add the variables from above.
3. Add the following `vercel.json` is already included; Vercel will respect it.
4. Deploy. Vercel will build the frontend and publish the site; `/api/*` will be served by the serverless wrapper.

If you'd like, I can:

- Migrate the Soroban CLI invocations to the JS SDK so the contract calls work on Vercel
- Add Mongoose connection caching for reduced cold-start overhead
- Add CI / GitHub Actions to run builds and tests before deployment
