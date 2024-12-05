import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useWeb3() {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3Provider = new ethers.BrowserProvider(window.ethereum);
                await web3Provider.send("eth_requestAccounts", []); // Request wallet connection
                setProvider(web3Provider);

                const accounts = await web3Provider.listAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0].address);
                }
            } catch (error) {
                console.error("Failed to connect wallet:", error);
            }
        } else {
            alert("Please install MetaMask to connect your wallet!");
        }
    };

    return { provider, account, connectWallet };
}
