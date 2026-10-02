import { Application } from "#/application.js";

class Server {
  private readonly application: Application;

  constructor() {
    this.application = new Application();
  }

  async bootstrap(): Promise<void> {
    try {
      await this.application.start(3000);

      this.application.instance.log.info(
        "Server is running on http://localhost:3000"
      );
    } catch (error) {
      this.application.instance.log.error(error);
      process.exit(1);
    }
  }
}

const server = new Server();

server.bootstrap();