import React, { useReducer, useCallback, useEffect } from 'react';

import { reducer, actions, initialState } from './state';
import AppContext from './AppContext';
import useEth from '../EthContext/useEth';

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { statusEvents, registeredEvents } = state;

  const eth = useEth();
  const {
    state: { contract, accounts }
  } = eth;

  const getOldEvents = useCallback(
    async (eventName, stateName) => {
      let events = await contract.getPastEvents(eventName, {
        fromBlock: 'earliest',
        toBlock: 'latest'
      });
      dispatch({
        type: actions.updateRegisteredEvents,
        data: { events, stateName }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [contract]
  );

  const getEvents = useCallback(
    async (eventName, stateName) => {
      await contract.events[eventName]({ fromBlock: 'earliest' })
        .on('data', (event) => {
          console.log(
            `New event of type ${eventName}  received : ${JSON.stringify(
              event
            )}`
          );
          dispatch({
            type: actions.updateRegisteredEvents,
            data: { events: [event], stateName }
          });
        })
        .on('changed', (changed) => console.log(`Event  changed: ${changed}`))
        .on('error', (err) => console.error(`Error with event : ${err}`))
        .on('connected', (str) => console.log(`Connnected with : ${str}`));
    },
    [contract]
  );

  const updateOwner = useCallback(async (owner) => {
    dispatch({
      type: actions.setOwner,
      data: owner
    });
  }, []);

  const getStatus = useCallback(async () => {
    try {
      const status = await contract.methods
        .workflowStatus()
        .call({ from: accounts[0] });
      dispatch({
        type: actions.updateStatus,
        data: parseInt(status)
      });
    } catch (error) {
      dispatch({
        type: actions.setAlerts,
        data: {
          message: error.message,
          severity: 'error'
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  useEffect(() => {
    let whitelisted = registeredEvents.find(
      (event) => event.returnValues.voterAddress === accounts[0]
    );
    dispatch({
      type: actions.updateWhitelisted,
      data: whitelisted
    });
  }, [accounts, registeredEvents]);

  useEffect(() => {
    if (contract && accounts) {
      getStatus();
    }
  }, [contract, accounts, getStatus, statusEvents]);

  useEffect(() => {
    const tryGetOwner = async () => {
      try {
        let owner = await contract.methods.owner().call({ from: accounts[0] });
        updateOwner(owner);
      } catch (error) {
        dispatch({
          type: actions.setAlerts,
          data: {
            message: error.message,
            severity: 'error'
          }
        });
      }
    };
    if (contract && accounts) {
      tryGetOwner();
    }
  }, [contract, accounts, updateOwner]);

  useEffect(() => {
    if (contract && contract.events) {
      getOldEvents('VoterRegistered', 'registeredEvents');
      getEvents('VoterRegistered', 'registeredEvents');

      getOldEvents('ProposalRegistered', 'proposalEvents');
      getEvents('ProposalRegistered', 'proposalEvents');

      getOldEvents('Voted', 'votedEvents');
      getEvents('Voted', 'votedEvents');

      getOldEvents('WorkflowStatusChange', 'statusEvents');
      getEvents('WorkflowStatusChange', 'statusEvents');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
