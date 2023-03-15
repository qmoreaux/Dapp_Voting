const actions = {
  updateEvents: 'UPDATE_EVENTS'
};

const initialState = {
  registeredEvents: [],
  proposalEvents: [],
  votedEvents: [],
  statusEvents: []
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.updateRegisteredEvents:
      return {
        ...state,
        registeredEvents: [...state.registeredEvents, ...data]
      };
    case actions.updateStatus:
      return { ...state, ...data };
    default:
      throw new Error('Undefined reducer action type');
  }
};

export { actions, initialState, reducer };
