const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy('ninja');
    await domainContract.waitForDeployment();  
    //console.log(domainContract);
    console.log("Contract deployed to:", domainContract.target);

    let txn = await domainContract.register("mortal",  {value: hre.ethers.parseEther('0.1')});
  await txn.wait();

  console.log("DomainContract Registration completed!");

  const address = await domainContract.getAddress("mortal");
  console.log("Owner of domain mortal:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.target);
  console.log("Contract balance:", hre.ethers.formatEther(balance));


    
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
