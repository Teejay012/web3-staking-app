// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Test } from "forge-std/Test.sol";
import { Staking } from "../src/Staking.sol";

contract StakingTest is Test {
    Staking staking;

    function setUp() public {
        staking = new Staking();
    }

    function testSetAPYRate() public {
        staking.setAPYRate(20);
        assertEq(staking.apyRate(), 20);
    }

    function testStake() public {
        staking.stake(1000, 30 days);
        
        // Access the stake properly using the 'stakes' mapping
        Staking.Stake memory userStake = staking.stakes(address(this));
        
        // Assert the stake amount is correct
        assertEq(userStake.amount, 1000);
        assertEq(userStake.tenure, 30 days);
    }

    function testUnstakeWithPenalty() public {
        staking.stake(1000, 30 days);
        
        // Simulate time passing to apply penalty
        vm.warp(block.timestamp + 15 days);
        
        // Unstake the amount
        staking.unstake();

        // Access the stake after unstaking
        Staking.Stake memory userStake = staking.stakes(address(this));
        
        // Check if the stake amount is 0 after unstaking
        assertEq(userStake.amount, 0);
    }
}
