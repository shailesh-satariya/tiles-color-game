import {GameState, TileColor, TileGrid} from "common";
import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {Store} from "redux";
import {GameActions} from "../../redux/action-types";

import {RootState} from "../../redux/store";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";
import Game, {DisconnectedGame, GameProps} from "../game";

const grid: TileGrid | null = [];
const gameState: GameState = GameState.IN_PROGRESS;
const moves: TileColor[] = [];
const aiMoves: TileColor[] = [];
const initialGrid: TileGrid | null = null;

const defaultState: RootState = {...DefaultState, grid, gameState};

const defaultProps: GameProps = {
    grid, gameState, moves, aiMoves, initialGrid,
    solveGame: () => new Promise(resolve => {
    })
};

/**
 * Factory function to create a ShallowWrapper for the Game component.
 * @function setup
 *
 * @param {object} initialState - Initial state for this setup.
 *
 * @returns {ShallowWrapper}
 */
const setup = (initialState: RootState = defaultState): ShallowWrapper => {
    const store: Store<RootState, GameActions> = storeFactory(initialState);
    const props = {store};
    return shallow(<Game {...props} />).dive().dive();
}

/**
 * Factory function to create a ShallowWrapper for the DisconnectedGame component.
 * @function setup
 *
 * @param {GameProps} props
 *
 * @returns {ShallowWrapper}
 */
const setupDisconnected = (props: GameProps = defaultProps): ShallowWrapper => {
    return shallow(<DisconnectedGame {...props} />);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    describe("renders elements when grid is set and `gameState` is in progress", () => {

        beforeEach(() => {
            wrapper = setup();
        });

        test("renders component without an error", () => {
            const componentMinMaxSelect = findByTestAttr(wrapper, "component-game");

            expect(componentMinMaxSelect.length).toBe(1);
        });

        test("renders game grid without an error", () => {
            const gameGrid = findByTestAttr(wrapper, "game-grid");

            expect(gameGrid.length).toBe(1);
        });

        test("renders color picker without an error", () => {
            const colorPicker = findByTestAttr(wrapper, "color-picker");

            expect(colorPicker.length).toBe(1);
        });
    });

    test("game component does not show when grid is null", () => {
        const wrapper = setup({...defaultState, grid: null});

        expect(wrapper.isEmptyRender()).toBe(true);
    });
});

describe("success alert & solve game (compare) button render", () => {
    let wrapper: ShallowWrapper = setupDisconnected();

    test("does not render alert & solve game (compare) button when gameState is not SOLVED", () => {
        const successMessage = findByTestAttr(wrapper, "success-alert");

        expect(successMessage.length).toBe(0);

        const solveGameButton = findByTestAttr(wrapper, "solve-game-button");

        expect(solveGameButton.length).toBe(0);
    });

    test("renders alert & solve game (compare) button when gameState is SOLVED", () => {
        wrapper.setProps({gameState: GameState.SOLVED})
        const successMessage = findByTestAttr(wrapper, "success-alert");

        expect(successMessage.length).toBe(1);

        const solveGameButton = findByTestAttr(wrapper, "solve-game-button");

        expect(solveGameButton.length).toBe(1);
    });
});

describe("game history elements render", () => {
    let wrapper: ShallowWrapper = setupDisconnected();
    const selectors: string[] = ["your-history-label", "your-history", "ai-history-label", "ai-history"];

    test("does not render game history elements when gameState is not SOLVED or aiMoves is not set or initialGrid is not set", () => {
        for (const selector of selectors) {
            const element = findByTestAttr(wrapper, selector);

            expect(element.length).toBe(0);
        }
    });

    test("renders game history elements when gameState SOLVED and aiMoves, initialGrid are set", () => {
        wrapper.setProps({gameState: GameState.SOLVED, aiMoves: [TileColor.COLOR1, TileColor.COLOR2], initialGrid: []})
        for (const selector of selectors) {
            const element = findByTestAttr(wrapper, selector);

            expect(element.length).toBe(1);
        }
    });
});

describe("`solveGame` action creator", () => {
    let solveGameMock: jest.Mock;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        solveGameMock = jest.fn();

        wrapper = setupDisconnected({...defaultProps, gameState: GameState.SOLVED, solveGame: solveGameMock});

    });
    test("`solveNextMove` was called by `Solve next move` Button", () => {
        const solveGameButton = findByTestAttr(wrapper, "solve-game-button");
        solveGameButton.simulate("click");
        const solveGameCallCount: number = solveGameMock.mock.calls.length;
        expect(solveGameCallCount).toBe(1);
    });
});
