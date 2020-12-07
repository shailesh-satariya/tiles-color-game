import { Tile, TileColor, TileGrid, TileGridPosition } from "../types";
/**
 * All valid colors as numbers
 */
declare const AllColors: TileColor[];
/**
 * Returns a random number between a given range
 * @function getRandomInteger
 *
 * @param {number} min
 * @param {number} max
 *
 * @return {number}
 */
declare const getRandomInteger: (min: number, max: number) => number;
/**
 * Gets colors array
 * @function getColors
 *
 * @param {number} maxColors
 *
 * @return {TileColor[]}
 */
declare const getColors: (maxColors: number) => TileColor[];
/**
 * returns a random color from an array of colors
 * @function getRandomColor
 *
 * @param {TileColor[]} colors
 *
 * @return {TileColor}
 */
declare const getRandomColor: (colors: TileColor[]) => TileColor;
/**
 * Creates grid for new game
 * @function createGrid
 *
 * @param {number} rows
 * @param {number} columns
 * @param {TileColor[]} colors
 *
 * @return {TileGrid}
 */
declare const createGrid: (rows: number, columns: number, colors: TileColor[]) => TileGrid;
/**
 * Clones the given grid
 * @function cloneGrid
 *
 * @param {TileGrid} grid
 *
 * @return {TileGrid}
 */
declare const cloneGrid: (grid: TileGrid) => TileGrid;
/**
 * Gets tile at given position
 * @function getTile
 * @param {TileGrid} grid
 * @param {number} x
 * @param {number} y
 *
 * @return {Tile | null}
 */
declare const getTile: (grid: TileGrid, x: number, y: number) => Tile | null;
/**
 * returns neighbours position
 * @function getNeighboursPositions
 *
 * @param {number} x
 * @param {number} y
 *
 * @return {TileGridPosition[]}
 */
declare const getNeighboursPositions: (x: number, y: number) => TileGridPosition[];
/**
 * Gets neighbours of given position
 * @function getNeighbours
 *
 * @param {TileGrid} grid
 * @param {number} x
 * @param {number} y
 *
 * @return {Tile | null}
 */
declare const getNeighbours: (grid: TileGrid, x: number, y: number) => Tile[];
/**
 * Traversed the grid with give color
 * @function traverse
 *
 * @param {TileGrid} grid
 * @param {TileColor} color
 *
 * @return {TileGrid}
 */
declare const traverse: (grid: TileGrid, color: TileColor) => TileGrid;
/**
 * Checks whether grid is fully traversed on not
 * @function isTraversed
 *
 * @param {TileGrid} grid
 *
 * @return {boolean}
 */
declare const isTraversed: (grid: TileGrid) => boolean;
/**
 * Converts TileGrid to 2D numbered Array
 * @function convertGridToNumberedArray
 *
 * @param {TileGrid} grid
 *
 * @return {number[][]}
 */
declare const convertGridToNumberedArray: (grid: TileGrid) => number[][];
/**
 * Converts 2D numbered Array to TileGrid
 * @function convertNumberedArrayToGrid
 *
 * @param {number[][]} gridArr
 *
 * @return {TileGrid}
 */
declare const convertNumberedArrayToGrid: (gridArr: number[][]) => TileGrid;
export { AllColors, cloneGrid, getRandomInteger, createGrid, traverse, getRandomColor, getColors, isTraversed, getNeighboursPositions, getNeighbours, getTile, convertGridToNumberedArray, convertNumberedArrayToGrid };
