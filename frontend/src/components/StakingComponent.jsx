import React from "react";
import { useWeb3 } from "../hooks/useWeb3";
import { useStaking } from "../hooks/useStaking";

const StakingComponent = () => {
    const { provider, account, connectWallet } = useWeb3();
    const { stakeAmount, setStakeAmount, transactionStatus, handleStake, handleUnstake } = useStaking(provider, account);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Staking Platform</h1>
                {!account ? (
                    <button
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <div>
                        <p className="text-center text-gray-700 mb-4">Connected Account: <span className="font-medium">{account}</span></p>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            placeholder="Enter amount to stake"
                        />
                        <div className="flex space-x-4">
                            <button
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                                onClick={handleStake}
                            >
                                Stake
                            </button>
                            <button
                                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                                onClick={handleUnstake}
                            >
                                Unstake
                            </button>
                        </div>
                        {transactionStatus && (
                            <p className="text-center text-gray-500 mt-4">{transactionStatus}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StakingComponent;
