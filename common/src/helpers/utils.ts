import {Tile, TileColor, TileGrid, TileGridPosition, TileRow} from "../types";


/**
 * All valid colors as numbers
 */
const AllColors: TileColor[] = ((Object.values(TileColor)).filter((v: any) => !isNaN(v))) as TileColor[];

/**
 * Returns a random number between a given range
 * @function getRandomInteger
 *
 * @param {number} min
 * @param {number} max
 *
 * @return {number}
 */
const getRandomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
}


/**
 * Gets colors array
 * @function getColors
 *
 * @param {number} maxColors
 *
 * @return {TileColor[]}
 */
const getColors = (maxColors: number): TileColor[] => {
    return AllColors.slice(0, Math.max(3, Math.min(AllColors.length, maxColors)));
}

/**
 * returns a random color from an array of colors
 * @function getRandomColor
 *
 * @param {TileColor[]} colors
 *
 * @return {TileColor}
 */
const getRandomColor = (colors: TileColor[]): TileColor => {
    return colors[Math.floor(Math.random() * colors.length)];
}

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
const createGrid = (rows: number, columns: number, colors: TileColor[]): TileGrid => {
    const grid: TileGrid = Array.from({length: rows}).map((): Tile[] =>
        Array.from({length: columns}).map((): Tile => ({
            color: colors[Math.floor(Math.random() * colors.length)],
            traversed: false
        }))
    );

    return traverse(grid, grid[0][0].color);
}

/**
 * Clones the given grid
 * @function cloneGrid
 *
 * @param {TileGrid} grid
 *
 * @return {TileGrid}
 */
const cloneGrid = (grid: TileGrid): TileGrid => grid.map((row: TileRow): TileRow =>
    row.map(({color, traversed}: Tile): Tile => ({color, traversed}))
);

/**
 * Gets tile at given position
 * @function getTile
 * @param {TileGrid} grid
 * @param {number} x
 * @param {number} y
 *
 * @return {Tile | null}
 */
const getTile = (grid: TileGrid, x: number, y: number): Tile | null => {
    return grid[x] && grid[x][y] ? grid[x][y] : null;
};

/**
 * returns neighbours position
 * @function getNeighboursPositions
 *
 * @param {number} x
 * @param {number} y
 *
 * @return {TileGridPosition[]}
 */
const getNeighboursPositions = (x: number, y: number): TileGridPosition[] =>
    [
        {x: x - 1, y: y}, // Top
        {x: x, y: y + 1}, // Right
        {x: x + 1, y: y}, // Bottom
        {x: x, y: y - 1} // Left
    ];

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
const getNeighbours = (grid: TileGrid, x: number, y: number): Tile[] => {
    const positions: TileGridPosition[] = getNeighboursPositions(x, y);

    return positions.reduce((tiles: Tile[], position: TileGridPosition) => {
        const tile: Tile | null = getTile(grid, position.x, position.y);
        if (tile) {
            tiles.push(tile);
        }

        return tiles;
    }, []);
}

/**
 * Traversed the grid with give color
 * @function traverse
 *
 * @param {TileGrid} grid
 * @param {TileColor} color
 *
 * @return {TileGrid}
 */
const traverse = (grid: TileGrid, color: TileColor): TileGrid => {
    let clonedGrid: TileGrid = cloneGrid(grid);

    const visited: Record<string, boolean> = {};
    const checkForTraverse = (x: number, y: number): void => {
        const key: string = `${x}-${y}`;

        if (visited[key]) {
            return;
        }

        visited[key] = true;

        const tile: Tile | null = getTile(grid, x, y);
        if (!tile) {
            return;
        }

        if ((tile.color === color) !== tile.traversed) {
            gridTraverse(x, y);
        }
    };

    const gridTraverse = (x: number, y: number): void => {
        const tile: Tile | null = getTile(clonedGrid, x, y);
        if (!tile) {
            return;
        }

        if (tile.color === color) {
            tile.traversed = true;
        }

        if (tile.traversed) {
            tile.color = color;
        }

        const positions: TileGridPosition[] = getNeighboursPositions(x, y);
        for (const position of positions) {
            checkForTraverse(position.x, position.y);
        }
    };

    checkForTraverse(0, 0);

    return clonedGrid;
};


/**
 * Checks whether grid is fully traversed on not
 * @function isTraversed
 *
 * @param {TileGrid} grid
 *
 * @return {boolean}
 */
const isTraversed = (grid: TileGrid): boolean => {
    for (const row of grid) {
        for (const tile of row) {
            if (!tile.traversed) {
                return false;
            }
        }
    }

    return true;
};

/**
 * Converts TileGrid to 2D numbered Array
 * @function convertGridToNumberedArray
 *
 * @param {TileGrid} grid
 *
 * @return {number[][]}
 */
const convertGridToNumberedArray = (grid: TileGrid): number[][] => grid.map((row: TileRow): number[] =>
    row.map((tile: Tile): number => (tile.color as number))
);

/**
 * Converts 2D numbered Array to TileGrid
 * @function convertNumberedArrayToGrid
 *
 * @param {number[][]} gridArr
 *
 * @return {TileGrid}
 */
const convertNumberedArrayToGrid = (gridArr: number[][]): TileGrid => {
    const grid: TileGrid = gridArr.map((row: number[]): Tile[] =>
        row.map((color: number): Tile => ({
            color: (color as any as TileColor),
            traversed: false
        }))
    );

    return traverse(grid, grid[0][0].color);
};

export {
    AllColors,
    cloneGrid,
    getRandomInteger,
    createGrid,
    traverse,
    getRandomColor,
    getColors,
    isTraversed,
    getNeighboursPositions,
    getNeighbours,
    getTile,
    convertGridToNumberedArray,
    convertNumberedArrayToGrid
};
