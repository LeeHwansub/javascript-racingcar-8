import { MissionUtils } from "@woowacourse/mission-utils";
import { MIN_ADVANCE_NUMBER, MAX_ADVANCE_NUMBER } from "../constants/constants.js";

/**
 * 자동차 모델 (MVC - Model)
 */
export class Car {
  constructor(name) {
    this.name = name;
    this.position = 0;
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
}

