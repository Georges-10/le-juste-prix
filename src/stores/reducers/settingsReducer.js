import { SET_INTERVAL } from "../actions/settingsAction";

const initialState = {
  interval: {
    start: 0,
    end: 1000,
  },
};

export default function settingsReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case SET_INTERVAL:
      return {
        ...state,
        interval: {
          start: action.payload.start,
          end: action.payload.end,
        },
      };
    default:
      return state;
  }
}
