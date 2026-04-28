import { ADD_RESULT } from "../actions/resultAction";

const initialState = {
  results: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESULT:
      return {
        ...state,
        results: [action.payload, ...state.results],
      };
    default:
      return state;
  }
};
