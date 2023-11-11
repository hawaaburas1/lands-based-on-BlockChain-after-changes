var lands = artifacts.require("./lands.sol");
module.exports = function(deployer) {
  deployer.deploy(lands);
};
