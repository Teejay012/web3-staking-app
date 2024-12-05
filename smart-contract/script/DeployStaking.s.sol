// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Script } from "forge-std/Script.sol";
import { Staking } from "../src/Staking.sol";
import { console } from "forge-std/console.sol";

contract DeployStaking is Script {
    function run() public {
        vm.startBroadcast();
        Staking staking = new Staking();
        vm.stopBroadcast();
        console.log("Staking contract deployed to:", address(staking));
    }
}
