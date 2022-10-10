import configs from "../configs/configs";
import { HandNames } from "../types/interfaces";

const { gameSettings } = configs;

const isValidHandName = (handName: string) =>
  gameSettings.handNames.includes(handName as HandNames);

export default isValidHandName;
