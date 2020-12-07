import request from "supertest";
import App from "../app";
import {CreateGameDto} from "../dtos/game.dto";
import IndexRoute from "../routes/index.route";

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe("Testing Index", () => {
  const grid: number[][] = [
    [3, 1, 2],
    [4, 1, 4],
    [1, 2, 2]
  ];

  describe("[GET] /", () => {
    it("response statusCode 200", () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);

      return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
    });
  });

  describe("[POST] /solve-game", () => {
    test("response statusCode 200 / with data", async () => {
      const data: CreateGameDto = {grid};

      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);
      const response = request(app.getServer()).post(`${indexRoute.path}/solve-game`).send(data);

      return response.expect(200, {colors:  [ 1, 2, 1, 4 ]});
    });

    test("response statusCode 400 with invalid data", async () => {
      const data: CreateGameDto = {
        grid: [[1, 2, 3], [3, 4, 5], [1, 2, 4, 5]]
      };

      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);
      const response = request(app.getServer()).post(`${indexRoute.path}/solve-game`).send(data);

      return response.expect(400, {message: "grid must be a valid 2d integer array"});
    });
  });

  describe("[POST] /solve-next-move", () => {
    test("response statusCode 200 / with data", async () => {
      const data: CreateGameDto = {grid};

      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);
      const response = request(app.getServer()).post(`${indexRoute.path}/solve-next-move`).send(data);

      return response.expect(200, {color: 1});
    });
  });
});
