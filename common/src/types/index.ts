export enum GameState {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    AUTO_SOLVE = "AUTO_SOLVE",
    SOLVED = "SOLVED",
    AUTO_SOLVED = "AUTO_SOLVED"
}

export type TileGrid = TileRow[];
export type TileRow = Tile[];

export interface Tile {
    color: TileColor;
    traversed: boolean;
}

export enum TileColor {
    COLOR1 = 1,
    COLOR2 = 2,
    COLOR3 = 3,
    COLOR4 = 4,
    COLOR5 = 5,
    COLOR6 = 6,
    COLOR7 = 7,
    COLOR8 = 8
}

export interface TileGridPosition {
    x: number;
    y: number;
}
