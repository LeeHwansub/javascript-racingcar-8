import { ErrorMessage } from "../constants/ErrorMessage.js";
import { MAX_CAR_NAME_LENGTH, MIN_MOVEMENT_COUNT } from "../constants/constants.js";

/**
 * 검증 로직 담당
 */
export class Validator {
  /**
   * 자동차 이름 배열 전체를 검증
   * @param {string[]} carNames - 검증할 자동차 이름 배열
   */
  static validateCarNames(carNames) {
    if (carNames.length === 0) {
      throw new Error(ErrorMessage.EMPTY_CAR_NAMES);
    }
    
    // 모든 이름이 빈 문자열인지 확인
    const hasNonEmptyName = carNames.some(name => name.trim().length > 0);
    if (!hasNonEmptyName) {
      throw new Error(ErrorMessage.EMPTY_CAR_NAMES);
    }
    
    // 중복 이름은 허용하되, 나중에 구분할 수 있도록 처리
    
    for (const carName of carNames) {
      const trimmedCarName = carName.trim();
      
      // 빈 이름이 포함된 경우 (쉼표로 구분된 빈 값)
      if (trimmedCarName.length === 0 && carName.length > 0) {
        throw new Error(ErrorMessage.EMPTY_CAR_NAME_IN_LIST);
      }
      
      // 빈 문자열 자체
      if (carName.length === 0) {
        throw new Error(ErrorMessage.EMPTY_CAR_NAME_IN_LIST);
      }
      
      // 앞뒤 공백이 있는 경우
      if (trimmedCarName !== carName) {
        throw new Error(ErrorMessage.INVALID_CAR_NAME_SPACE);
      }
      
      // 이름 중간에 공백이 있는 경우
      if (carName.includes(' ')) {
        throw new Error(ErrorMessage.INVALID_CAR_NAME_SPACE);
      }
      
      // 이름 길이가 5자를 초과하는 경우
      if (carName.length > MAX_CAR_NAME_LENGTH) {
        throw new Error(ErrorMessage.INVALID_CAR_NAME_LENGTH);
      }
    }
  }

  /**
   * 이동 횟수 입력을 검증하고 숫자로 변환하여 반환
   * @param {string} movementCountInput - 검증할 이동 횟수 입력값
   * @returns {number} 검증된 이동 횟수
   */
  static validateMovementCount(movementCountInput) {
    const trimmedMovementCount = movementCountInput.trim();
    
    if (trimmedMovementCount.length === 0) {
      throw new Error(ErrorMessage.EMPTY_MOVEMENT_COUNT);
    }
    
    if (trimmedMovementCount !== movementCountInput) {
      throw new Error(ErrorMessage.INVALID_MOVEMENT_COUNT_SPACE);
    }
    
    if (isNaN(Number(trimmedMovementCount))) {
      throw new Error(ErrorMessage.INVALID_NUMBER_FORMAT);
    }
    
    const movementCount = Number(trimmedMovementCount);
    
    if (!Number.isInteger(movementCount)) {
      throw new Error(ErrorMessage.INVALID_MOVEMENT_COUNT_DECIMAL);
    }
    
    if (movementCount === 0) {
      throw new Error(ErrorMessage.INVALID_MOVEMENT_COUNT_ZERO);
    }
    
    if (movementCount < 0) {
      throw new Error(ErrorMessage.INVALID_MOVEMENT_COUNT_NEGATIVE);
    }
    
    if (movementCount < MIN_MOVEMENT_COUNT) {
      throw new Error(ErrorMessage.INVALID_MOVEMENT_COUNT_NEGATIVE);
    }
    
    return movementCount;
  }
}

