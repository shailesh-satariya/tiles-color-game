import {TileColor, TileGrid} from "common";
import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test/utils";
import GameHistory, {GameHistoryProps} from "../game-history";


const grid: TileGrid = [
    [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR3, traversed: false}],
    [{color: TileColor.COLOR5, traversed: false}, {color: TileColor.COLOR1, traversed: false}],
];

const moves: TileColor[] = [TileColor.COLOR3, TileColor.COLOR1, TileColor.COLOR5];

const defaultProps: GameHistoryProps = {grid, moves};

/**
 * Factory function to create a ShallowWrapper for the GameHistory component.
 * @function setup
 *
 * @param {GameHistoryProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: GameHistoryProps = defaultProps): ShallowWrapper => {
    return shallow(<GameHistory {...props} />);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    })

    test("renders component without an error", () => {
        const componentGameHistory = findByTestAttr(wrapper, "component-game-history");

        expect(componentGameHistory.length).toBe(1);
    });

    test("renders grids without an error", () => {
        const historyGrids = findByTestAttr(wrapper, "history-grid");

        expect(historyGrids.length).toBe(4);
    });

    test("renders color tiles without an error", () => {
        const historyTiles = findByTestAttr(wrapper, "history-tile");

        expect(historyTiles.length).toBe(3);
    });
});
