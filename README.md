#  자동차 경주 게임

##  프로젝트 구조 (Architecture)

### 파일 구조
```
src/
├── constants/
│   ├── constants.js      # 상수 정의 (8줄)
│   └── ErrorMessage.js   # 에러 메시지 관리 (10줄)
├── models/
│   └── Car.js           # 자동차 모델 (23줄)
├── validators/
│   └── Validator.js     # 검증 로직 (61줄)
├── views/
│   └── GameView.js      # 출력 관련 - View (39줄)
├── controllers/
│   └── GameController.js # 게임 컨트롤러 (62줄)
├── App.js              # 메인 애플리케이션 (35줄)
└── index.js            # 진입점 (5줄)
```

### 설계 원칙
- **SOLID**: 각 클래스가 단일 책임만 수행
- **MVC**: Model(Car), View(GameView), Controller(GameController)
- **indent depth**: 최대 2 (요구사항 준수)
- **함수 분리**: 한 가지 일만 수행

### 각 파일 역할

| 파일 | 역할 | 책임 | 라인 수 |
|------|------|------|---------|
| `constants.js` | 상수 관리 | 모든 상수값 중앙 관리 | 8 |
| `ErrorMessage.js` | 에러 메시지 | 에러 메시지 통합 관리 | 10 |
| `Validator.js` | 검증 로직 | 자동차 이름/이동 횟수 검증 | 47 |
| `Car.js` | 자동차 모델 | 자동차 데이터 및 전진 로직 | 23 |
| `GameView.js` | 출력 (View) | UI 출력 및 사용자 입력 | 40 |
| `GameController.js` | 게임 컨트롤러 | 게임 로직 제어 | 62 |
| `App.js` | 메인 앱 | 전체 흐름 orchestration | 35 |

### 핵심 디자인 패턴
1. **Repository Pattern**: ErrorMessage, constants.js - 데이터 중앙 관리
2. **Strategy Pattern**: Validator - 다양한 검증 전략 캡슐화
3. **MVC Pattern**: Car(Model), GameView(View), GameController(Controller)
4. **Facade Pattern**: App.js - 복잡한 시스템을 단순한 인터페이스로 제공

##  구현 계획 (Planning)

### 1단계: 기초 구조 설정 
- [x] 상수 정의 (`constants.js`)
- [x] 에러 메시지 관리 (`ErrorMessage.js`)
- [x] 입출력 뷰 설정 (`GameView.js`)

### 2단계: 데이터 모델 및 검증 
- [x] 자동차 모델 생성 (`Car.js`)
- [x] 검증 로직 구현 (`Validator.js`)
  - [x] 자동차 이름 유효성 검증
  - [x] 이동 횟수 유효성 검증

### 3단계: 게임 로직 구현 
- [x] 게임 컨트롤러 생성 (`GameController.js`)
- [x] 자동차 입력 및 파싱
- [x] 게임 라운드 진행
- [x] 우승자 판정

### 4단계: 통합 및 완성 
- [x] 메인 앱 통합 (`App.js`)
- [x] 테스트 통과 확인

##  구현 완료 기능

###  입력 및 검증
- 자동차 이름 입력 받기 (쉼표로 구분)
- 자동차 이름 유효성 검증 (5자 이하, 공백 체크)
- 시도 횟수 입력 받기
- 시도 횟수 유효성 검증 (숫자, 양수, 정수)

###  경주 게임 로직
- 자동차 객체 생성 및 관리
- 랜덤값에 따른 자동차 전진 판단 (0-9 범위, 4 이상일 때 전진)
- 각 차수별로 모든 자동차 상태 업데이트
- 차수별 실행 결과 출력

###  결과 계산 및 출력
- 최종 우승자 판정 (최대 전진 거리)
- 우승자 출력 (단독/공동)

##  예외 처리

### 자동차 이름 예외
- 빈 문자열 입력
- 이름 5자 초과 (예: "javaji" - 6자)
- 공백 포함 (앞/뒤/중간)
- 빈 이름 포함 (쉼표로 구분된 빈 값)

### 시도 횟수 예외
- 빈 문자열 입력
- 숫자가 아닌 입력 (예: "abc", "-")
- 0 이하의 숫자 입력 (예: "0", "-5")
- 소수점 입력 (예: "3.5")
- 공백 포함 (예: " 5 ")

## 도전한 문제와 해결 과정

### 문제 1: 거대한 App.js 파일 (178줄) - 단일 책임 원칙 위배

#### 원인
- 모든 로직이 한 파일에 집중
- 입력, 검증, 출력, 게임 로직이 한 곳에 섞임
- 코드 재사용성 및 테스트 어려움

#### 실패 사항
- 최초 구현 시 모든 기능을 App.js에 작성
- 함수들이 서로 얽혀있어 수정 시 전체 영향
- 특정 기능만 수정하려 해도 전체 파일을 봐야 함

#### 어려웠던 점
1. **구조 설계**: 어떤 기준으로 파일을 나눌지 고민
2. **의존성 관리**: 파일 간 import 체인 관리
3. **테스트 연결**: 분리 후 기존 테스트가 동작하지 않을 수 있음

#### 해결 방안 (상세)
1. **SOLID 원칙 적용**
   - Single Responsibility: 각 클래스가 하나의 책임만
   - 파일 8개로 분리 (App.js: 178줄 → 35줄, 80% 감소)

2. **계층 분리**
   - 입력/검증: `Validator.js` (검증만 담당)
   - 데이터 모델: `Car.js` (자동차 상태만 관리)
   - 출력: `GameView.js` (UI만 담당)
   - 로직: `GameController.js` (게임 흐름만 제어)
   - 상수: `constants.js` (값만 정의)
   - 에러: `ErrorMessage.js` (메시지만 정의)

3. **MVC 패턴 적용**
   - Model: `Car.js` - 자동차 데이터
   - View: `GameView.js` - 출력
   - Controller: `GameController.js` - 제어

4. **결과**
   - 코드 가독성 향상 (각 파일 평균 30줄)
   - 수정 영향 최소화 (한 파일만 수정)
   - 테스트 용이성 향상 (모듈별 독립 테스트)

### 문제 2: 에러 메시지 중복 관리

#### 원인
- 에러 메시지가 여러 곳에 하드코딩
- "자동차 이름은 5자 이하만 가능합니다." 같은 메시지가 여러 곳에 반복
- 메시지 변경 시 여러 파일 수정 필요

#### 해결 방안
1. `ErrorMessage.js` 클래스 생성
   ```javascript
   export class ErrorMessage {
     static EMPTY_CAR_NAMES = "[ERROR] 자동차 이름을 입력해주세요.";
     static INVALID_CAR_NAME_LENGTH = "[ERROR] 자동차 이름은 5자 이하만 가능합니다.";
     // ...
   }
   ```

2. 중앙 집중식 관리
   - 모든 에러 메시지를 한 곳에서 관리
   - 변경 시 한 파일만 수정

3. 타입 안정성
   - static 속성으로 IDE 자동완성 지원
   - 오타 방지

### 문제 3: MissionUtils Console API 사용법 오류

#### 에러 메시지
```
Error: arguments must be 1
    at MissionUtils.Console.readLineAsync
```

#### 원인
- `readLineAsync()` 메서드가 1개의 인자만 받는데, 메시지를 먼저 출력하고 다시 전달하는 중복 로직

#### 해결 과정
1. **에러 발생**: `GameView.js`에서 `print()`와 `readLineAsync()`를 분리했을 때 문제
2. **원인 파악**: readLineAsync의 인자 전달 방식 확인
3. **해결**
   ```javascript
   // 수정 전 (에러)
   const input = await GameView.readLine(message);
   GameView.print(message); // 중복 출력
   
   // 수정 후
   static async readLine(query) {
     MissionUtils.Console.print(query); // 먼저 출력
     const input = await MissionUtils.Console.readLineAsync(query);
     return input;
   }
   ```

### 문제 4: 랜덤값 범위 오류

#### 원인
- 요구사항: 0~9 사이 랜덤값, 4 이상일 때 전진
- 구현: Random.pickNumberInRange(4, 9) - 잘못된 범위

#### 해결
```javascript
// 수정 전 (잘못됨)
const randomNumber = MissionUtils.Random.pickNumberInRange(
  MIN_ADVANCE_NUMBER,  // 4
  MAX_ADVANCE_NUMBER   // 9
);
// → 4~9 사이만 선택 (요구사항: 0~9)

// 수정 후 (올바름)
const randomNumber = MissionUtils.Random.pickNumberInRange(0, MAX_ADVANCE_NUMBER);
// → 0~9 사이 선택 후, 4 이상인지 판단
return randomNumber >= MIN_ADVANCE_NUMBER;
```

### 문제 5: 검증 로직 분산

#### 문제
- 자동차 이름 검증과 이동 횟수 검증이 여러 곳에 산재
- 중복 로직 존재

#### 해결 방안
1. `Validator` 클래스 생성
2. 모든 검증 로직 통합
   - `isValidCarName()`: 단일 이름 검증
   - `validateCarNames()`: 이름 배열 검증
   - `validateMovementCount()`: 이동 횟수 검증

3. 검증 규칙 정리
   - 자동차 이름: 5자 이하, 공백 없음, 빈 문자열 아님
   - 이동 횟수: 숫자, 정수, 1 이상, 공백 없음

##  최종 결과

### 코드 메트릭
- **총 라인 수**: 230줄 (8개 파일)
- **App.js**: 35줄 (기존 178줄 → 80% 감소)
- **평균 파일 크기**: ~30줄
- **indent depth**: 최대 2 (요구사항 준수)
- **테스트 통과**: 2/2 (100%)

### 테스트 결과
```
✓ 기능 테스트
✓ 예외 테스트
