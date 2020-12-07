import {Router} from "express";
import IndexController from "../controllers/index.controller";
import {CreateGameDto} from "../dtos/game.dto";
import Route from "../interfaces/routes.interface";
import validationMiddleware from "../middlewares/validation.middleware";

class IndexRoute implements Route {
  public path = "";
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.indexController.index);
    this.router.post(`${this.path}/solve-next-move`, validationMiddleware(CreateGameDto, "body"), this.indexController.solveNextMove);
    this.router.post(`${this.path}/solve-game`, validationMiddleware(CreateGameDto, "body"), this.indexController.solveGame);
  }
}

export default IndexRoute;
