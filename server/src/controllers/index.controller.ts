import {convertNumberedArrayToGrid, solveGame, solveNextMove, TileColor, TileGrid} from "common";
import {NextFunction, Request, Response} from "express";


class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public solveGame = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const gridArr: number[][] = req.body.grid as any as number[][];
      const grid: TileGrid = convertNumberedArrayToGrid(gridArr);
      const colors: TileColor[] = solveGame(grid);

      res.status(200).json({colors: colors});
    } catch (error) {
      next(error);
    }
  };

  public solveNextMove = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const gridArr: number[][] = req.body.grid as any as number[][];
      const grid: TileGrid = convertNumberedArrayToGrid(gridArr);
      const color: TileColor = solveNextMove(grid);

      res.status(200).json({color: color});
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
