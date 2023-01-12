const hre = require("hardhat");

// Returns the Ether balance of a given address.
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx ++;
  }
}

async function main() {
  // Get the example accounts we'll be working with.
  const [owner] = await hre.ethers.getSigners();

  // We get the contract to deploy.
  const IssuingAuthority = await hre.ethers.getContractFactory("IssuingAuthority");
  const issuingAuthority = await IssuingAuthority.deploy();

  // Deploy the contract.
  await issuingAuthority.deployed();
  console.log("issuingAuthority deployed to:", issuingAuthority.address);

  // Check balances before the creation.
  const addresses = [owner.address, issuingAuthority.address];
  console.log("== start ==");
  //await printBalances(addresses);

  // Create 2 diplomas
  await issuingAuthority.connect(owner).createDiploma(true, "hashhier1");
  await issuingAuthority.connect(owner).createDiploma(true, "hashhier2");

  // Check balances after the coffee purchase.
  console.log("== created 2 diplomas ==");
  //await printBalances(addresses);

  // Check validity of the 2 contracts
  const dipl1 = await issuingAuthority.verifyDiploma("hashhier1");
  const dipl2 = await issuingAuthority.verifyDiploma("hashhier2");

  // Check out the diplomas.
  console.log("== diplomas ==");
  dipldate1 = new Date(dipl1.timestamp*1000);
  dipldate2 = new Date(dipl2.timestamp*1000);
  console.log(`Content of diploma1: Authority ${dipl1.authorityWalletId}, DateTime ${dipldate1}, Fingerprint ${dipl1.documentFingerprint}, Validity ${dipl1.validity}`);
  console.log(`Content of diploma2: Authority ${dipl2.authorityWalletId}, DateTime ${dipldate2}, Fingerprint ${dipl2.documentFingerprint}, Validity ${dipl2.validity}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
