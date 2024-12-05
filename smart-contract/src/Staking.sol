// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    address public admin;
    uint256 public apyRate = 10; // APY rate in percentage
    uint256 public penaltyRate = 5; // Penalty rate in percentage

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 reward;
        uint256 tenure; // in seconds
    }

    mapping(address => Stake) public stakes;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setAPYRate(uint256 _apyRate) external onlyAdmin {
        apyRate = _apyRate;
    }

    function setPenaltyRate(uint256 _penaltyRate) external onlyAdmin {
        penaltyRate = _penaltyRate;
    }

    function calculateReward(uint256 amount, uint256 tenure) public view returns (uint256) {
        return (amount * apyRate * tenure) / (365 days * 100);
    }

    function stake(uint256 amount, uint256 tenure) external {
        require(stakes[msg.sender].amount == 0, "Already staking");
        stakes[msg.sender] = Stake(amount, block.timestamp, calculateReward(amount, tenure), tenure);
    }

    function unstake() external {
        Stake memory userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No active stake");

        uint256 penalty = (block.timestamp < userStake.startTime + userStake.tenure) 
            ? (userStake.amount * penaltyRate) / 100 
            : 0;

        uint256 finalAmount = userStake.amount - penalty + userStake.reward;
        stakes[msg.sender] = Stake(0, 0, 0, 0);

        // Logic to return tokens (e.g., ERC20 transfer)
    }

    function getStake(address staker) external view returns (Stake memory) {
        return stakes[staker];
    }
}
