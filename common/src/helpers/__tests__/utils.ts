import {Tile, TileColor, TileGrid, TileGridPosition} from "../../types";
import {
    convertGridToNumberedArray,
    convertNumberedArrayToGrid,
    createGrid,
    getColors,
    getNeighbours,
    getNeighboursPositions,
    getRandomColor,
    getRandomInteger,
    getTile,
    isTraversed,
    traverse
} from "../utils";

describe("getRandomInteger", () => {
    test("returns correct integer", () => {
        const min: number = 10;
        const max: number = 100;
        const random: number = getRandomInteger(min, max);

        expect(random).toBeGreaterThanOrEqual(min);
        expect(random).toBeLessThanOrEqual(max);
    });
});

describe("getColors", () => {
    test("returns correct color array when valid max number specified", () => {
        const maxColors: number = 5;
        const colors: TileColor[] = getColors(maxColors);
        expect(colors.length).toBe(maxColors);
    });

    test("returns correct color array when bigger number specified", () => {
        const maxColors: number = 50;
        const validColors: TileColor[] = ((Object.values(TileColor)).filter((v: any) => !isNaN(v))) as TileColor[];
        const colors: TileColor[] = getColors(maxColors);
        expect(colors).toEqual(validColors);
    });

    test("returns correct color array when valid max number specified", () => {
        const maxColors: number = 2;
        const colors: TileColor[] = getColors(maxColors);
        expect(colors.length).toBe(3);
    });
});

describe("getRandomColor", () => {
    test("returns a random color from a colors array", () => {
        const colors: TileColor[] = getColors(5);
        const color: TileColor = getRandomColor(colors);

        expect(colors.includes(color)).toBe(true);
    });
});

describe("createGrid, getTile", () => {
    let grid: TileGrid;
    const rows: number = 6;
    const columns: number = 6;
    const colors: TileColor[] = getColors(3);

    beforeEach(() => {
        grid = createGrid(rows, columns, colors);
    });

    describe("createGrid", () => {
        test("returns correct grid with correct size", () => {
            expect(grid.length).toBe(rows);
            expect(grid[0].length).toBe(columns);
        });

        test("returns correct grid with correct values", () => {
            expect(colors.includes(grid[0][0].color)).toBe(true);

            // The first tile must be traversed
            expect(grid[0][0].traversed).toBe(true);
        });
    });

    describe("getTile", () => {
        test("returns correct tile when correct position specified", () => {
            const tile: Tile | null = getTile(grid, getRandomInteger(0, rows - 1), getRandomInteger(0, columns - 1));

            expect(tile).not.toBe(null);
            expect(tile && colors.includes(tile.color)).toBe(true);
        });

        test("returns null when incorrect position specified", () => {
            const tile: Tile | null = getTile(grid, -1, 0);

            expect(tile).toBe(null);
        });
    });

    describe("getNeighbours", () => {
        test("returns neighbours when tile is not on any edge/corner", () => {
            const neighbours: Tile[] = getNeighbours(grid, 2, 2);
            expect(neighbours.length).toBe(4);
        });

        test("returns neighbours when tile is on edge, but not on corner", () => {
            const neighbours: Tile[] = getNeighbours(grid, 0, 2);
            expect(neighbours.length).toBe(3);
        });

        test("returns neighbours when tile is corner", () => {
            const neighbours: Tile[] = getNeighbours(grid, 0, 0);
            expect(neighbours.length).toBe(2);
        });
    });
});


describe("getNeighboursPositions", () => {
    test("returns correct neighbours positions", () => {
        const x: number = 6;
        const y: number = 4;

        const positions: TileGridPosition[] = getNeighboursPositions(x, y);

        expect(positions).toEqual([
            {x: 5, y: 4}, // Top
            {x: 6, y: 5}, // Right
            {x: 7, y: 4}, // Bottom
            {x: 6, y: 3} // Left
        ]);
    });
});

describe("traverse", () => {
    let grid: TileGrid;

    beforeEach(() => {
        grid = [
            [{color: TileColor.COLOR1, traversed: true}, {
                color: TileColor.COLOR3,
                traversed: false
            }, {color: TileColor.COLOR8, traversed: false}],
            [{color: TileColor.COLOR3, traversed: false}, {
                color: TileColor.COLOR5,
                traversed: false
            }, {color: TileColor.COLOR1, traversed: false}],
        ];
    });

    test("returns new changed grid when correct adjacent color to origin has been selected", () => {
        const newGrid: TileGrid = traverse(grid, TileColor.COLOR3);
        expect(newGrid).toEqual([
            [{color: TileColor.COLOR3, traversed: true}, {
                color: TileColor.COLOR3,
                traversed: true
            }, {color: TileColor.COLOR8, traversed: false}],
            [{color: TileColor.COLOR3, traversed: true}, {
                color: TileColor.COLOR5,
                traversed: false
            }, {color: TileColor.COLOR1, traversed: false}],
        ]);
    });

    test("returns new unchanged grid when not adjacent color to origin has been selected", () => {
        const newGrid: TileGrid = traverse(grid, TileColor.COLOR5);
        expect(newGrid).toEqual([
            [{color: TileColor.COLOR5, traversed: true}, {
                color: TileColor.COLOR3,
                traversed: false
            }, {color: TileColor.COLOR8, traversed: false}],
            [{color: TileColor.COLOR3, traversed: false}, {
                color: TileColor.COLOR5,
                traversed: false
            }, {color: TileColor.COLOR1, traversed: false}],
        ]);
    });

    test("returns new unchanged grid when same origin has been selected", () => {
        const newGrid: TileGrid = traverse(grid, TileColor.COLOR1);
        expect(newGrid).toEqual(grid);
    });
});

describe("isTraversed", () => {
    test("returns true when all tiles have been traversed", () => {
        const grid: TileGrid = [
            [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR1, traversed: true}],
            [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR1, traversed: true}],
        ];

        const bTraversed: boolean = isTraversed(grid);
        expect(bTraversed).toBe(true);
    });

    test("returns false when all tiles not have been traversed", () => {
        const grid: TileGrid = [
            [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR3, traversed: false}],
            [{color: TileColor.COLOR5, traversed: false}, {color: TileColor.COLOR1, traversed: false}],
        ];

        const bTraversed: boolean = isTraversed(grid);
        expect(bTraversed).toBe(false);
    });
});


describe("convertGridToNumberedArray & convertNumberedArrayToGrid", () => {
    const grid: TileGrid = [
        [
            {color: TileColor.COLOR3, traversed: true}, {
            color: TileColor.COLOR1,
            traversed: false
        }, {color: TileColor.COLOR2, traversed: false}
        ],
        [
            {color: TileColor.COLOR4, traversed: false}, {
            color: TileColor.COLOR1,
            traversed: false
        }, {color: TileColor.COLOR4, traversed: false}
        ],
        [
            {color: TileColor.COLOR1, traversed: false}, {
            color: TileColor.COLOR2,
            traversed: false
        }, {color: TileColor.COLOR2, traversed: false}
        ]
    ];

    const numberedArr: number[][] = [
        [3, 1, 2], [4, 1, 4], [1, 2, 2]
    ];

    test("convertGridToNumberedArray returns correct array 2d array", () => {
        const resultNumberedArr: number[][] = convertGridToNumberedArray(grid);
        expect(resultNumberedArr).toEqual(numberedArr);
    });

    test("convertGridToNumberedArray returns correct array 2d array", () => {
        const resultGrid: TileGrid = convertNumberedArrayToGrid(numberedArr);
        expect(resultGrid).toEqual(grid);
    });
});

