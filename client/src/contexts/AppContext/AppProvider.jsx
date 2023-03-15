import React, { useReducer, useCallback, useEffect } from 'react';
import { reducer, actions, initialState } from './state';
import useEth from '../EthContext/useEth';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const eth = useEth();
  const contract = eth.state.contract;

  // const getOldEvents = useCallback(
  //   async (eventName, name) => {
  //     let events = await contract.getPastEvents(eventName, {
  //       fromBlock: 'earliest',
  //       toBlock: 'latest'
  //     });
  //     dispatch({
  //       type: actions.updateRegisteredEvents,
  //       data: events
  //     });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   },
  //   [contract]
  // );

  const getEvents = useCallback(async () => {
    await contract.events
      .VoterRegistered({ fromBlock: 'earliest' })
      .on('data', (event) => {
        console.log(`New event of type  received : ${JSON.stringify(event)}`);
        // dispatch({
        //   type: actions.updateRegisteredEvents,
        //   data: { events, event }
        // });
      })
      .on('changed', (changed) => console.log(`Event  changed: ${changed}`))
      .on('error', (err) => console.error(`Error with event : ${err}`))
      .on('connected', (str) => console.log(`Connnected with : ${str}`));
  }, [contract]);

  useEffect(() => {
    if (contract && contract.events) {
      // getOldEvents('VoterRegistered', 'registeredEvents');
      getEvents();
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
