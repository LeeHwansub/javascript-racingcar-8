import { MissionUtils } from "@woowacourse/mission-utils";

/**
 * 출력 관련 (MVC - View)
 * 모든 메서드가 static으로 View는 상태를 가지지 않음
 */
export class GameView {
  static print(message) {
    MissionUtils.Console.print(message);
  }

  static async readLine(query) {
    MissionUtils.Console.print(query);
    const input = await MissionUtils.Console.readLineAsync("> ");
    return input;
  }

  static printCarStatus(car) {
    const dashes = "-".repeat(car.position);
    const status = `${car.name} : ${dashes}`;
    GameView.print(status);
  }

  static printRoundResult(cars) {
    for (const car of cars) {
      GameView.printCarStatus(car);
    }
    GameView.print("");
  }

  static printGameHeader() {
    GameView.print("");
    GameView.print("실행 결과");
  }

  static printWinners(winners) {
    const winnerNames = winners.map((winner) => winner.name);
    const winnerNamesString = winnerNames.join(", ");
    GameView.print(`최종 우승자 : ${winnerNamesString}`);
  }
}

