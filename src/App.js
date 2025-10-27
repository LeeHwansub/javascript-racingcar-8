import { GameController } from "./controllers/GameController.js";

/**
 * 메인 애플리케이션
 * 애플리케이션 진입점 역할
 */
class App {
  async run() {
    const controller = new GameController();
    await controller.run();
  }
}

export default App;
