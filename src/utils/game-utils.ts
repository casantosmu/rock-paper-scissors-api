import { HandNames, ResultsTypes } from "../types/interfaces";

const getPlayResult = (
  playersHand: HandNames,
  opponentsHand: HandNames
): ResultsTypes => {
  if (playersHand === opponentsHand) {
    return "draw";
  }

  if (
    (playersHand === "paper" && opponentsHand === "rock") ||
    (playersHand === "rock" && opponentsHand === "scissors") ||
    (playersHand === "scissors" && opponentsHand === "paper")
  ) {
    return "win";
  }

  return "lose";
};

export default getPlayResult;
