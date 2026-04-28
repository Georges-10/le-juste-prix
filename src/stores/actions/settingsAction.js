export const SET_INTERVAL = "SET_INTERVAL";

export const updateNumbersIntervalAction = (start, end) => {
  return {
    type: SET_INTERVAL,
    payload: {
      start,
      end,
    },
  };
};
