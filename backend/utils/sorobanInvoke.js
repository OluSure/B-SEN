const { exec } = require('child_process')
const path = require('path')

// Utility to invoke soroban CLI for the deployed contract.
// This wrapper builds a command and returns a Promise with the CLI stdout/stderr.

function buildArgString(argsObj = {}) {
  return Object.entries(argsObj)
    .map(([k, v]) => `--${k} ${v}`)
    .join(' ')
}

function invokeFunction(fnName, argsObj = {}, options = {}) {
  return new Promise((resolve, reject) => {
    const contractId = process.env.SOROBAN_CONTRACT_ID
    if (!contractId) return reject(new Error('SOROBAN_CONTRACT_ID not set'))

    const source = options.source || process.env.STELLAR_SECRET_KEY || options.sourceAccount
    if (!source) return reject(new Error('No source account provided (secret key)'))

    const argString = buildArgString(argsObj)
    // Build command using soroban CLI implicit contract invoke
    const cmd = `soroban contract invoke --network testnet --id ${contractId} --source-account ${source} ${fnName} ${argString}`

    exec(cmd, { maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        return reject({ err, stdout, stderr })
      }
      resolve({ stdout: stdout || '', stderr: stderr || '' })
    })
  })
}

module.exports = { invokeFunction }
