const actions = {
  updateEvents: 'UPDATE_EVENTS',
  setOwner: 'SET_OWNER',
  updateStatus: 'UPDATE_STATUS',
  updateWhitelisted: 'UPDATE_WHITELISTED'
};

const initialState = {
  registeredEvents: [],
  proposalEvents: [],
  votedEvents: [],
  statusEvents: [],
  status: 0,
  whitelisted: false
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.updateRegisteredEvents:
      return {
        ...state,
        [data.stateName]: [...state[data.stateName], ...data.events]
      };

    case actions.updateStatus:
      return { ...state, status: data };
    case actions.setOwner:
      return { ...state, owner: data };
    case actions.updateWhitelisted:
      return { ...state, whitelisted: data };

    default:
      throw new Error('Undefined reducer action type');
  }
};

export { actions, initialState, reducer };
