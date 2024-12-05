import { useState } from "react";
import { ethers } from "ethers";
import stakingABI from "../StakingABI.json";

export function useStaking(provider, account) {
    const [stakeAmount, setStakeAmount] = useState("");
    const [transactionStatus, setTransactionStatus] = useState("");

    // Replace with your deployed contract address
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    let stakingContract = null;

    // Ensure provider and account are valid
    if (provider) {
        const signer = provider.getSigner(); // Use signer to interact with the contract
        stakingContract = new ethers.Contract(contractAddress, stakingABI, signer);
    }

    const handleStake = async () => {
        if (!stakeAmount) {
            setTransactionStatus("Please enter an amount to stake.");
            return;
        }

        try {
            setTransactionStatus("Staking in progress...");
            const tx = await stakingContract.stake(ethers.parseEther(stakeAmount), 30 * 24 * 60 * 60); // Example: 30 days tenure
            await tx.wait();
            setTransactionStatus("Staking successful!");
        } catch (error) {
            setTransactionStatus(`Error: ${error.message}`);
        }
    };

    const handleUnstake = async () => {
        try {
            setTransactionStatus("Unstaking in progress...");
            const tx = await stakingContract.unstake();
            await tx.wait();
            setTransactionStatus("Unstaking successful!");
        } catch (error) {
            setTransactionStatus(`Error: ${error.message}`);
        }
    };

    return {
        stakeAmount,
        setStakeAmount,
        transactionStatus,
        handleStake,
        handleUnstake,
    };
}
