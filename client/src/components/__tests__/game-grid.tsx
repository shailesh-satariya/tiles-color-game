import {TileColor} from "common";
import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test/utils";

import GameGrid, {GameGridProps} from "../game-grid";


const defaultProps: GameGridProps = {
    grid: [
        [{color: TileColor.COLOR1, traversed: true}, {color: TileColor.COLOR3, traversed: false}],
        [{color: TileColor.COLOR5, traversed: false}, {color: TileColor.COLOR1, traversed: false}],
    ]
}

/**
 * Factory function to create a ShallowWrapper for the GameGrid component.
 * @function setup
 *
 * @param {GameGridProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: GameGridProps = defaultProps): ShallowWrapper => {
    return shallow(<GameGrid {...props} />);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    })

    test("renders component without an error", () => {
        const componentGameGrid = findByTestAttr(wrapper, "component-game-grid");

        expect(componentGameGrid.length).toBe(1);
    });

    test("renders grid tiles without an error", () => {
        const componentGridTiles = findByTestAttr(wrapper, "grid-tile");

        expect(componentGridTiles.length).toBe(4);
    });
});

describe("grid-tile class test", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    })

    test("first grid tile has class traversed", () => {
        const componentGridTiles = findByTestAttr(wrapper, "grid-tile");

        expect(componentGridTiles.first().hasClass("traversed")).toBeTruthy();
        expect(componentGridTiles.first().hasClass("untraversed")).not.toBeTruthy();
    });

    test("last grid tile has class untraversed", () => {
        const componentGridTiles = findByTestAttr(wrapper, "grid-tile");

        expect(componentGridTiles.last().hasClass("untraversed")).toBeTruthy();
        expect(componentGridTiles.last().hasClass("traversed")).not.toBeTruthy();
    });
});
