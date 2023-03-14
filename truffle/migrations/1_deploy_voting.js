const Voting = artifacts.require('Voting');

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(Voting, { from: accounts[0] });
    const votingInstance = await Voting.deployed();
    await votingInstance.addVoter(accounts[0]);
};
