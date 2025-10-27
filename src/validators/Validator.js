import { ErrorMessage } from "../constants/ErrorMessage.js";
import { MAX_CAR_NAME_LENGTH, MIN_MOVEMENT_COUNT, SEPARATOR } from "../constants/constants.js";

/**
 * 검증 로직 담당 (단일 책임 원칙)
 */
export class Validator {
  static isValidCarName(name) {
    const trimmedName = name.trim();
    
    if (trimmedName.length === 0) {
      return false;
    }
    
    if (trimmedName.length > MAX_CAR_NAME_LENGTH) {
      return false;
    }
    
    if (trimmedName !== name) {
      return false;
    }
    
    return true;
  }

  static validateCarNames(carNames) {
    if (carNames.length === 0) {
      throw new Error(ErrorMessage.EMPTY_CAR_NAMES);
    }
    
    for (const name of carNames) {
      if (!Validator.isValidCarName(name)) {
        throw new Error(ErrorMessage.INVALID_CAR_NAME_LENGTH);
      }
    }
  }

  static validateMovementCount(input) {
    const trimmedInput = input.trim();
    
    if (trimmedInput.length === 0) {
      throw new Error(ErrorMessage.EMPTY_MOVEMENT_COUNT);
    }
    
    if (trimmedInput !== input) {
      throw new Error(ErrorMessage.INVALID_NUMBER_FORMAT);
    }
    
    if (isNaN(Number(trimmedInput))) {
      throw new Error(ErrorMessage.INVALID_NUMBER_FORMAT);
    }
    
    const number = Number(trimmedInput);
    
    if (number < MIN_MOVEMENT_COUNT || !Number.isInteger(number)) {
      throw new Error(ErrorMessage.INVALID_MOVEMENT_COUNT);
    }
    
    return number;
  }
}

