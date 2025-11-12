#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, contracterror, Address, Env};

#[contracttype]
#[derive(Clone)]
pub struct JobData {
    pub client: Address,
    pub worker: Address,
    pub amount: i128,
    pub completed: bool,
}

#[contract]
pub struct BSENContract;

#[contractimpl]
impl BSENContract {
    // Create a new job entry (stores job data on-chain). Returns job id (u32).
    pub fn create_job(env: Env, client: Address, worker: Address, amount: i128) -> u32 {
        // job counter is stored under key 0u32 in persistent storage
        let counter_key: u32 = 0u32;
        let mut count: u32 = env.storage().persistent().get(&counter_key).unwrap_or(0u32);
        count += 1u32;

        let job = JobData {
            client: client.clone(),
            worker: worker.clone(),
            amount,
            completed: false,
        };

        // store job under its id
        env.storage().persistent().set(&count, &job);
        // update counter
        env.storage().persistent().set(&counter_key, &count);

        count
    }

    // Mark job as complete and increment worker reputation
    pub fn complete_job(env: Env, job_id: u32, caller: Address) -> Result<(), ContractError> {
        let job_opt: Option<JobData> = env.storage().persistent().get(&job_id);
        let mut job = match job_opt {
            Some(j) => j,
            None => return Err(ContractError::NotFound),
        };

        // Only client can mark job complete
        if job.client != caller {
            return Err(ContractError::Unauthorized);
        }

        if job.completed {
            return Err(ContractError::AlreadyCompleted);
        }

        job.completed = true;
        env.storage().persistent().set(&job_id, &job);

        // increment reputation for worker (keyed by Address)
        let rep_key = job.worker.clone();
        let current_rep: i32 = env.storage().persistent().get(&rep_key).unwrap_or(0i32);
        env.storage().persistent().set(&rep_key, &(current_rep + 1));

        Ok(())
    }

    // Read worker reputation
    pub fn get_reputation(env: Env, worker: Address) -> i32 {
        env.storage().persistent().get(&worker).unwrap_or(0i32)
    }
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum ContractError {
    NotFound = 1,
    Unauthorized = 2,
    AlreadyCompleted = 3,
}