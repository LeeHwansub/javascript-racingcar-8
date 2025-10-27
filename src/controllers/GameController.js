import { Car } from "../models/Car.js";
import { GameView } from "../views/GameView.js";
import { Validator } from "../validators/Validator.js";
import { SEPARATOR } from "../constants/constants.js";

/**
 * 게임 컨트롤러 (MVC - Controller)
 * 전체 게임 흐름을 관리하고 조율하는 역할
 */
export class GameController {
  async getCarNamesInput() {
    const message = "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)";
    const input = await GameView.readLine(message);
    return input;
  }

  async getMovementCountInput() {
    const message = "시도할 횟수는 몇 회인가요?";
    const input = await GameView.readLine(message);
    return input;
  }

  parseCarNames(input) {
    const carNames = input.split(SEPARATOR);
    return carNames;
  }

  createCars(carNames) {
    const cars = carNames.map((name) => new Car(name));
    return cars;
  }

  playRound(cars) {
    for (const car of cars) {
      car.move();
    }
    GameView.printRoundResult(cars);
  }

  playGame(cars, movementCount) {
    GameView.printGameHeader();
    
    for (let i = 0; i < movementCount; i++) {
      this.playRound(cars);
    }
  }

  /**
   * 우승자 찾기
   * 최대 position을 가진 모든 자동차 반환 (공동 우승 가능)
   */
  findWinners(cars) {
    let maxPosition = 0;
    
    for (const car of cars) {
      if (car.position > maxPosition) {
        maxPosition = car.position;
      }
    }
    
    const winners = cars.filter((car) => car.position === maxPosition);
    return winners;
  }

  /**
   * 전체 게임 실행 흐름 관리
   */
  async run() {
    // 자동차 이름 입력 및 검증
    const carNamesInput = await this.getCarNamesInput();
    const carNames = this.parseCarNames(carNamesInput);
    Validator.validateCarNames(carNames);
    
    // 이동 횟수 입력 및 검증
    const movementCountInput = await this.getMovementCountInput();
    const movementCount = Validator.validateMovementCount(movementCountInput);
    
    // 자동차 생성
    const cars = this.createCars(carNames);
    
    // 경주 진행
    this.playGame(cars, movementCount);
    
    // 우승자 판정 및 출력
    const winners = this.findWinners(cars);
    GameView.printWinners(winners);
  }
}

