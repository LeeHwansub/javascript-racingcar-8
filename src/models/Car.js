import { MissionUtils } from "@woowacourse/mission-utils";
import { MIN_ADVANCE_NUMBER, MAX_ADVANCE_NUMBER } from "../constants/constants.js";

/**
 * 자동차 모델 (MVC - Model)
 */
export class Car {
  static idCounter = 0;

  constructor(name) {
    this.name = name;
    this.position = 0;
    this.id = ++Car.idCounter; // 고유 ID 할당
  }

  /**
   * ID 카운터 리셋 (테스트용)
   */
  static resetIdCounter() {
    Car.idCounter = 0;
  }

  /**
   * 전진 여부 판단
   * 0~9 랜덤값 중 4 이상이면 전진
   */
  shouldAdvance() {
    const randomNumber = MissionUtils.Random.pickNumberInRange(0, MAX_ADVANCE_NUMBER);
    return randomNumber >= MIN_ADVANCE_NUMBER;
  }

  move() {
    if (this.shouldAdvance()) {
      this.position += 1;
    }
  }

  /**
   * 고유 식별자 반환 (이름이 중복되어도 구분 가능)
   * @returns {string} 고유 식별자
   */
  getUniqueIdentifier() {
    return `${this.name}#${this.id}`;
  }

  /**
   * 디스플레이용 이름 반환 (중복 시 ID 포함)
   * @param {Car[]} allCars - 모든 자동차 배열
   * @returns {string} 디스플레이용 이름
   */
  getDisplayName(allCars = []) {
    const duplicateNames = allCars.filter(car => car.name === this.name);
    if (duplicateNames.length > 1) {
      return this.getUniqueIdentifier();
    }
    return this.name;
  }
}

