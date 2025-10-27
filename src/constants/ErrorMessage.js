// 에러 메시지 관리
export class ErrorMessage {
  // 자동차 이름 관련 에러
  static EMPTY_CAR_NAMES = "[ERROR] 자동차 이름을 입력해주세요.";
  static INVALID_CAR_NAME_LENGTH = "[ERROR] 자동차 이름은 5자 이하만 가능합니다.";
  static INVALID_CAR_NAME_SPACE = "[ERROR] 자동차 이름에 공백이 포함될 수 없습니다.";
  static EMPTY_CAR_NAME_IN_LIST = "[ERROR] 빈 자동차 이름이 포함되어 있습니다.";
  
  // 이동 횟수 관련 에러
  static EMPTY_MOVEMENT_COUNT = "[ERROR] 시도할 횟수를 입력해주세요.";
  static INVALID_NUMBER_FORMAT = "[ERROR] 숫자만 입력해주세요.";
  static INVALID_MOVEMENT_COUNT_NEGATIVE = "[ERROR] 시도 횟수는 1 이상이어야 합니다.";
  static INVALID_MOVEMENT_COUNT_ZERO = "[ERROR] 시도 횟수는 0보다 커야 합니다.";
  static INVALID_MOVEMENT_COUNT_DECIMAL = "[ERROR] 시도 횟수는 정수여야 합니다.";
  static INVALID_MOVEMENT_COUNT_SPACE = "[ERROR] 시도 횟수에 공백이 포함될 수 없습니다.";
}


