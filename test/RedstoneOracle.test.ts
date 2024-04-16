import hre,{ ethers, deployments, w3f } from "hardhat";
import { expect } from "chai";
import { RedstoneOracle } from "../typechain";
import { before } from "mocha";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import {
  Web3FunctionResultV2,
  Web3FunctionUserArgs,
} from "@gelatonetwork/web3-functions-sdk";
import { Web3FunctionHardhat } from "@gelatonetwork/web3-functions-sdk/hardhat-plugin";
import { WrapperBuilder } from "@redstone-finance/evm-connector";


describe.only("RedstoneOracle Tests", function () {
  this.timeout(0);

  let owner: SignerWithAddress;

  let oracle: RedstoneOracle;
  let oracleAddress: string;

  before(async function () {
    await deployments.fixture();
    await time.increaseTo(Math.floor(Date.now() / 1000));

    [owner] = await hre.ethers.getSigners();
    oracleAddress = (await deployments.get("RedstoneOracle")).address;
    oracle = await ethers.getContractAt("RedstoneOracle",oracleAddress) as RedstoneOracle;
  
  });

  it("Update oracle price on first execution", async () => {
  
    const wrappedOracle = WrapperBuilder.wrap(oracle).usingDataService(
      {
        dataFeeds: ["ETH"],
      },
    );

    await wrappedOracle.updatePrice()

  });


});
