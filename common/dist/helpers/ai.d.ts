import { TileColor, TileGrid } from "../types";
/**
 * Gets remaining untraversed tiles count value
 * @function getHeuristic
 *
 * @param {TileGrid} grid
 *
 * @return {number}
 */
declare const getHeuristic: (grid: TileGrid) => number;
/**
 * Gets remaining untraversed tiles count value for given color
 * @function getHeuristicColor
 *
 * @param {TileGrid} grid
 * @param {TileColor} color
 *
 * @return {number}
 */
declare const getHeuristicColor: (grid: TileGrid, color: TileColor) => number;
/**
 * Solves the game and returns the color moves
 * @function solveGame
 *
 * @param {TileGrid} grid
 *
 * @return {TileColor[]}
 */
declare const solveGame: (grid: TileGrid) => TileColor[];
/**
 * Solves next color move
 * @function solveNextMove
 *
 * @param {TileGrid} grid
 *
 * @return {TileColor|null}
 */
declare const solveNextMove: (grid: TileGrid) => TileColor | null;
export { solveGame, solveNextMove, getHeuristic, getHeuristicColor };
