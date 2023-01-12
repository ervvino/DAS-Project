// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const issuingAuthority = await hre.ethers.getContractFactory("IssuingAuthority");
  const issuingAuthorityContract = await issuingAuthority.deploy();

  await issuingAuthorityContract.deployed();

  console.log("Greeter deployed to:", issuingAuthorityContract.address);
};
greeissuingAuthorityter
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
