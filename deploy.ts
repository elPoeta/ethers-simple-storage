import { ethers } from "ethers";
import * as fs from "fs-extra";

const main = async () => {
  //connect with ganache
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "4c0271da680adce05c6f5b75a9ab3e2447e78d294444c6a0c2041ee5fc1aaf55",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  const txReceipt = await contract.deployTransaction.wait(1);
  console.log(txReceipt);
};

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
