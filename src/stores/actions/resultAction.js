export const ADD_RESULT = "ADD_RESULT";

export function addResultAction(
  essais,
  interval,
  numberToGuess,
  date,
  name = "Joueur inconnu",
) {
  return {
    type: ADD_RESULT,
    payload: {
      essais,
      interval,
      numberToGuess,
      date,
      name,
    },
  };
}
