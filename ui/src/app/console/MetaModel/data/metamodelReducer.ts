const ACTIONS = {
  SET_MODELS: "SET_MODELS",
  SET_NODE: "SET_NODE"
};

const initialState = {
  models: [],
  node: null
};

const REDUCER = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_MODELS:
      return {
        ...state,
        models: action.models
      };
    case ACTIONS.SET_NODE :
      return {
        ...state,
        node: action.node
      };
    default:
      return state;
  }
};

export { ACTIONS, REDUCER };
