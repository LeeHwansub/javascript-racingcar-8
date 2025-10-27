import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

/**
 * 사용자 입력 모킹 함수
 * @param {string[]} inputs - 입력할 값들의 배열
 */
const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

/**
 * 랜덤값 모킹 함수
 * @param {number[]} numbers - 반환할 랜덤값들의 배열
 */
const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

/**
 * 출력 로그를 추적하는 스파이 객체 생성
 * @returns {jest.SpyInstance} 콘솔 출력 스파이
 */
const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 경주", () => {
  describe("기능 테스트", () => {
    test("단일 라운드에서 단독 우승자 결정", async () => {
      // given: 전진하는 자동차와 멈추는 자동차 설정
      const MOVING_FORWARD = 4;
      const STOP = 3;
      const inputs = ["pobi,woni", "1"];
      const logs = ["pobi : -", "woni : ", "최종 우승자 : pobi"];
      const logSpy = getLogSpy();

      mockQuestions(inputs);
      mockRandoms([MOVING_FORWARD, STOP]);

      // when: 게임 실행
      const app = new App();
      await app.run();

      // then: 예상된 출력이 정확히 호출되었는지 확인
      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });

    test("여러 라운드 경주 진행", async () => {
      // given: 3라운드 진행 설정
      const MOVING_FORWARD = 4;
      const STOP = 3;
      const inputs = ["pobi,jun", "3"];
      const logs = [
        "pobi : -",   // 라운드 1: pobi 전진
        "jun : ",     // 라운드 1: jun 멈춤
        "pobi : -",   // 라운드 2: pobi 전진 (누적 2)
        "jun : ",     // 라운드 2: jun 멈춤 (누적 0)
        "pobi : -",   // 라운드 3: pobi 전진 (누적 3)
        "jun : ",     // 라운드 3: jun 멈춤 (누적 0)
        "최종 우승자 : pobi"
      ];
      const logSpy = getLogSpy();

      mockQuestions(inputs);
      // pobi는 항상 전진, jun은 항상 멈춤
      mockRandoms([MOVING_FORWARD, STOP, MOVING_FORWARD, STOP, MOVING_FORWARD, STOP]);

      // when: 게임 실행
      const app = new App();
      await app.run();

      // then: 각 라운드별 결과와 최종 우승자 확인
      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });

    test("공동 우승자 결정", async () => {
      // given: 두 자동차가 같은 거리만큼 전진
      const MOVING_FORWARD = 4;
      const inputs = ["pobi,jun", "2"];
      const logs = [
        "pobi : -",
        "jun : -",
        "pobi : --",
        "jun : --",
        "최종 우승자 : pobi, jun"
      ];
      const logSpy = getLogSpy();

      mockQuestions(inputs);
      // 두 자동차 모두 항상 전진
      mockRandoms([MOVING_FORWARD, MOVING_FORWARD, MOVING_FORWARD, MOVING_FORWARD]);

      // when: 게임 실행
      const app = new App();
      await app.run();

      // then: 공동 우승자가 쉼표로 구분되어 출력되는지 확인
      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });

    test("3대의 자동차가 다른 거리 이동", async () => {
      // given: 3대의 자동차 경주
      const MOVING_FORWARD = 4;
      const STOP = 3;
      const inputs = ["pobi,woni,jun", "3"];
      const logs = [
        // 라운드 1: pobi 전진, woni 멈춤, jun 전진 → pobi:1, woni:0, jun:1
        "pobi : -",
        "woni : ",
        "jun : -",
        // 라운드 2: pobi 멈춤, woni 전진, jun 전진 → pobi:1, woni:1, jun:2
        "pobi : -",
        "woni : -",
        "jun : --",
        // 라운드 3: pobi 전진, woni 전진, jun 전진 → pobi:2, woni:2, jun:3
        "pobi : --",
        "woni : --",
        "jun : ---",
        "최종 우승자 : jun"
      ];
      const logSpy = getLogSpy();

      mockQuestions(inputs);
      // 라운드 1: pobi 전진(4), woni 멈춤(3), jun 전진(4)
      // 라운드 2: pobi 멈춤(3), woni 전진(4), jun 전진(4)
      // 라운드 3: pobi 전진(4), woni 전진(4), jun 전진(4)
      mockRandoms([
        MOVING_FORWARD, STOP, MOVING_FORWARD,
        STOP, MOVING_FORWARD, MOVING_FORWARD,
        MOVING_FORWARD, MOVING_FORWARD, MOVING_FORWARD
      ]);

      // when: 게임 실행
      const app = new App();
      await app.run();

      // then: 각 자동차의 위치와 공동 우승자 확인
      logs.forEach((log) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
      });
    });
  });

  describe("예외 처리 테스트", () => {
    describe("자동차 이름 검증", () => {
      test("자동차 이름이 5자 초과인 경우", async () => {
        // given: 6자 이름 입력
        const inputs = ["pobi,javaji"];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 자동차 이름은 5자 이하만 가능합니다.");
      });

      test("빈 문자열 입력", async () => {
        // given: 빈 문자열 입력
        const inputs = [""];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 자동차 이름을 입력해주세요.");
      });

      test("자동차 이름에 공백이 포함된 경우", async () => {
        // given: 공백이 포함된 이름 입력
        const inputs = ["po bi"];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 자동차 이름에 공백이 포함될 수 없습니다.");
      });

      test("자동차 이름 앞뒤에 공백이 있는 경우", async () => {
        // given: 앞뒤 공백이 포함된 이름 입력
        const inputs = [" pobi "];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 자동차 이름에 공백이 포함될 수 없습니다.");
      });

      test("빈 이름이 포함된 경우", async () => {
        // given: 쉼표로 구분된 빈 값 입력
        const inputs = ["pobi,,jun"];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 빈 자동차 이름이 포함되어 있습니다.");
      });
    });

    describe("이동 횟수 검증", () => {
      test("빈 문자열 입력", async () => {
        // given: 자동차 이름은 정상, 이동 횟수는 빈 문자열
        const inputs = ["pobi,jun", ""];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 시도할 횟수를 입력해주세요.");
      });

      test("숫자가 아닌 값 입력", async () => {
        // given: 숫자가 아닌 문자 입력
        const inputs = ["pobi,jun", "abc"];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 숫자만 입력해주세요.");
      });

      test("음수 입력", async () => {
        // given: 음수 입력
        const inputs = ["pobi,jun", "-5"];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 시도 횟수는 1 이상이어야 합니다.");
      });

      test("0 입력", async () => {
        // given: 0 입력
        const inputs = ["pobi,jun", "0"];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 시도 횟수는 0보다 커야 합니다.");
      });

      test("소수점 입력", async () => {
        // given: 소수 입력
        const inputs = ["pobi,jun", "3.5"];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 시도 횟수는 정수여야 합니다.");
      });

      test("이동 횟수에 공백 포함", async () => {
        // given: 공백이 포함된 숫자 입력
        const inputs = ["pobi,jun", " 5 "];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 시도 횟수에 공백이 포함될 수 없습니다.");
      });

      test("특수문자 입력", async () => {
        // given: 특수문자 입력
        const inputs = ["pobi,jun", "@"];
        mockQuestions(inputs);

        // when: 앱 실행
        const app = new App();
        
        // then: 에러 발생 확인
        await expect(app.run()).rejects.toThrow("[ERROR] 숫자만 입력해주세요.");
      });
    });
  });
});
