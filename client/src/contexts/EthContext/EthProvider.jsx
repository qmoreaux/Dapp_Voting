import React, { useReducer, useCallback, useEffect } from 'react';
import Web3 from 'web3';
import EthContext from './EthContext';
import { reducer, actions, initialState } from './state';

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
      const accounts = await web3.eth.requestAccounts();
      const networkID = await web3.eth.net.getId();
      const deployTransaction = await web3.eth.getTransaction(artifact.networks[networkID].transactionHash);
      const deployBlock = deployTransaction.blockNumber;
      const currentBlock = await web3.eth.getBlockNumber();
      const { abi } = artifact;
      let address, contract;
      try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
      } catch (err) {
        console.error(err);
      }
      dispatch({
        type: actions.init,
        data: { artifact, web3, accounts, networkID, contract, deployBlock, currentBlock }
      });
    }
  }, []);

  const tryInit = async () => {
    try {
      const artifact = require('../../contracts/Voting.json');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      init(artifact);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const events = ['chainChanged', 'accountsChanged'];
    const handleChange = () => {
      init(state.artifact);
    };

    if (window.ethereum) {
      events.forEach((e) => window.ethereum.on(e, handleChange));
      return () => {
        events.forEach((e) => window.ethereum.removeListener(e, handleChange));
      };
    }
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        tryInit,
        dispatch
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
