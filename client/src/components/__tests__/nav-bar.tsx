import {GameState, TileColor, TileGrid} from "common";
import {shallow, ShallowWrapper} from "enzyme"
import React from "react";
import {Store} from "redux";
import {GameActions} from "../../redux/action-types";
import {RootState} from "../../redux/store";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";

import NavBar, {DisconnectedNavBar, NavBarProps} from "../nav-bar";

interface ButtonStates {
    name: string;
    states: {
        [key in GameState]: boolean
    }
}

interface ButtonStatesSet {
    [key: string]: ButtonStates
}

const defaultState: RootState = DefaultState;

const defaultProps: NavBarProps = {
    initialGrid: null,
    colors: [],
    moves: [],
    gameState: GameState.IN_PROGRESS,
    newGame: (gird: TileGrid, colors: TileColor[]) => {
    },
    solveNextMove: () => new Promise(resolve => {
    }),
    autoSolve: () => new Promise(resolve => {
    })
};

/**
 * Factory function to create a ShallowWrapper for the NavBar component.
 * @function setup
 *
 * @param {RootState} initialState - Initial state for this setup.
 *
 * @returns {ShallowWrapper}
 */
const setup = (initialState: RootState = defaultState): ShallowWrapper => {
    const store: Store<RootState, GameActions> = storeFactory(initialState);
    const props = {store};
    return shallow(<NavBar {...props} />).dive().dive();
}

/**
 * Factory function to create a ShallowWrapper for the DisconnectedNavBar component.
 * @function setup
 *
 * @param {NavBarProps} props
 *
 * @returns {ShallowWrapper}
 */
const setupDisconnected = (props: NavBarProps = defaultProps): ShallowWrapper => {
    return shallow(<DisconnectedNavBar {...props} />);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test("renders component without an error", () => {
        const componentMinMaxSelect = findByTestAttr(wrapper, "component-header-inputs");

        expect(componentMinMaxSelect.length).toBe(1);
    });

    test("renders header input rows without an error", () => {
        const headerInputRows = findByTestAttr(wrapper, "header-inputs-rows");

        expect(headerInputRows.length).toBe(1);
    });

    test("renders header input columns without an error", () => {
        const headerInputColumns = findByTestAttr(wrapper, "header-inputs-columns");

        expect(headerInputColumns.length).toBe(1);
    });

    test("renders header input colors without an error", () => {
        const headerInputColors = findByTestAttr(wrapper, "header-inputs-colors");

        expect(headerInputColors.length).toBe(1);
    });

    test("renders `Start game` button without an error", () => {
        const newGameButton = findByTestAttr(wrapper, "new-game-button");

        expect(newGameButton.length).toBe(1);
    });

    test("renders `Restart game` button without an error", () => {
        const restartGameButton = findByTestAttr(wrapper, "restart-game-button");

        expect(restartGameButton.length).toBe(1);
    });

    test("renders `Solve next move` button without an error", () => {
        const solveNextMoveButton = findByTestAttr(wrapper, "solve-next-move-button");

        expect(solveNextMoveButton.length).toBe(1);
    });

    test("renders `Solve game` button without an error", () => {
        const solveGameButton = findByTestAttr(wrapper, "solve-game-button");

        expect(solveGameButton.length).toBe(1);
    });

    test("renders nav bar collapse button without an error", () => {
        const navbarCollapseBtn = findByTestAttr(wrapper, "navbar-collapse-btn");

        expect(navbarCollapseBtn.length).toBe(1);
    });
});

describe("state controlled input fields", () => {
    let wrapper: ShallowWrapper;
    let originalUseState = React.useState;
    const mockSetState: jest.Mock<number> = jest.fn();

    beforeEach(() => {
        mockSetState.mockClear();
        React.useState = jest.fn(() => [5, mockSetState]) as any;
        wrapper = setup();
    });

    afterEach(() => {
        React.useState = originalUseState;
    });

    test("state rows updates when input rows value changes", () => {
        const n: number = 8;
        const headerInputRows = findByTestAttr(wrapper, "header-inputs-rows");
        (headerInputRows.prop("onChange") as Function)(n);
        expect(mockSetState).toHaveBeenCalledWith(n);
    });

    test("state rows updates when input columns value changes", () => {
        const n: number = 3;
        const headerInputColumns = findByTestAttr(wrapper, "header-inputs-columns");
        (headerInputColumns.prop("onChange") as Function)(n);
        expect(mockSetState).toHaveBeenCalledWith(n);
    });

    test("state rows updates when input colors value changes", () => {
        const n: number = 4;
        const headerInputColors = findByTestAttr(wrapper, "header-inputs-colors");
        (headerInputColors.prop("onChange") as Function)(n);
        expect(mockSetState).toHaveBeenCalledWith(n);
    });
});

describe("restart game button enable disable state", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        // set up Input, with startGameMock as a prop
        wrapper = setupDisconnected({...defaultProps, gameState: GameState.IN_PROGRESS});
    });


    test("restart game button is disabled when there are no moves", () => {
        wrapper.setProps({moves: []});
        const restartGameButton = findByTestAttr(wrapper, "restart-game-button");

        expect(restartGameButton.prop("disabled")).toBe(true);
    });

    test("restart button is enabled when there are some moves", () => {
        wrapper.setProps({moves: [TileColor.COLOR1]});
        const restartGameButton = findByTestAttr(wrapper, "restart-game-button");

        expect(restartGameButton.prop("disabled")).not.toBe(true);
    });
});


describe("buttons enable disable state", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        // set up Input, with startGameMock as a prop
        wrapper = setupDisconnected({...defaultProps, moves: [TileColor.COLOR1]});

    });

    const buttons: ButtonStatesSet = {
        "new-game-button": {
            name: "Start game",
            states: {
                NOT_STARTED: true,
                IN_PROGRESS: true,
                AUTO_SOLVE: false,
                SOLVED: true,
                AUTO_SOLVED: true
            }
        },
        "restart-game-button": {
            name: "Restart game",
            states: {
                NOT_STARTED: false,
                IN_PROGRESS: true,
                AUTO_SOLVE: false,
                SOLVED: true,
                AUTO_SOLVED: true
            }
        },
        "solve-next-move-button": {
            name: "Solve next move",
            states: {
                NOT_STARTED: false,
                IN_PROGRESS: true,
                AUTO_SOLVE: false,
                SOLVED: false,
                AUTO_SOLVED: false
            }
        },
        "solve-game-button": {
            name: "Solve game",
            states: {
                NOT_STARTED: false,
                IN_PROGRESS: true,
                AUTO_SOLVE: false,
                SOLVED: false,
                AUTO_SOLVED: false
            }
        }
    }

    let buttonKey: string;
    for (buttonKey in buttons) {
        if (!buttons.hasOwnProperty(buttonKey)) {
            continue;
        }

        const buttonId: string = buttonKey;
        const buttonStates: ButtonStates = buttons[buttonId];
        const nameKey: string = buttonStates.name;
        const states: Record<GameState, boolean> = buttonStates.states;

        describe(`"${nameKey}" button enable disable state`, () => {
            let stateKey: GameState;
            for (stateKey in states) {
                if (!states.hasOwnProperty(stateKey)) {
                    continue;
                }

                const name: string = nameKey;
                const state: GameState = stateKey;
                const enabled: boolean = states[state];
                const buttonState: string = enabled ? "enabled" : "disabled";
                test(`"${name}" button is ${buttonState} when gameState is ${state}`, () => {
                    wrapper.setProps({gameState: state});
                    const button = findByTestAttr(wrapper, buttonId);

                    expect(button.prop("disabled")).toBe(!enabled);
                });
            }
        });
    }
});

describe("`Solve next move` button enable disable state", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setupDisconnected();
    });

    test("`Solve next move` button is enabled when gameState is IN_PROGRESS", () => {
        const solveNextMoveButton = findByTestAttr(wrapper, "solve-next-move-button");
        expect(solveNextMoveButton.prop("disabled")).not.toBeTruthy();
    });

    test("`Solve next move` button is disabled when gameState is NOT IN_PROGRESS", () => {
        wrapper.setProps({gameState: GameState.SOLVED});

        const solveNextMoveButton = findByTestAttr(wrapper, "solve-next-move-button");
        expect(solveNextMoveButton.prop("disabled")).toBeTruthy();
    });
});

describe("`Solve game` button enable disable state", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setupDisconnected();
    });

    test("`Solve next move` button is enabled when gameState is not NOT_STARTED", () => {
        const solveGameButton = findByTestAttr(wrapper, "solve-game-button");
        expect(solveGameButton.prop("disabled")).not.toBeTruthy();
    });

    test("`Solve next move` button is disabled when gameState is NOT NOT_STARTED", () => {
        wrapper.setProps({gameState: GameState.NOT_STARTED});
        const solveGameButton = findByTestAttr(wrapper, "solve-game-button");
        expect(solveGameButton.prop("disabled")).toBeTruthy();
    });
});


describe("`newGame` action creator", () => {
    let startGameMock: jest.Mock;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        // create a mock function for `newGame`
        startGameMock = jest.fn();

        // set up Component, with startGameMock as a prop
        wrapper = setupDisconnected({
            ...defaultProps,
            newGame: startGameMock,
            initialGrid: []
        });

    });
    test("`newGame` was called by `Start game button`", () => {
        // simulate click on restart game button
        const newGameButton = findByTestAttr(wrapper, "new-game-button");
        newGameButton.simulate("click");
        const newGameCallCount: number = startGameMock.mock.calls.length;
        expect(newGameCallCount).toBe(1);
    });

    test("`restartGame` was called by `Restart game button`", () => {
        // simulate click on restart game button
        const restartGameButton = findByTestAttr(wrapper, "restart-game-button");
        restartGameButton.simulate("click");
        const restartGameCallCount: number = startGameMock.mock.calls.length;
        expect(restartGameCallCount).toBe(1);
    });
});

describe("`solveNextMove` action creator", () => {
    let solveNextMoveMock: jest.Mock;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        solveNextMoveMock = jest.fn();
        wrapper = setupDisconnected({...defaultProps, solveNextMove: solveNextMoveMock});
    });
    test("`solveNextMove` was called by `Solve next move` Button", () => {
        const solveNextMoveButton = findByTestAttr(wrapper, "solve-next-move-button");
        solveNextMoveButton.simulate("click");
        const solveNextMoveCallCount: number = solveNextMoveMock.mock.calls.length;
        expect(solveNextMoveCallCount).toBe(1);
    });
});

describe("`solveGame` action creator", () => {
    let solveGameMock: jest.Mock;
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        solveGameMock = jest.fn();
        wrapper = setupDisconnected({...defaultProps, autoSolve: solveGameMock});
    });
    test("`solveNextMove` was called by `Solve next move` Button", () => {
        const solveGameBtn = findByTestAttr(wrapper, "solve-game-button");
        solveGameBtn.simulate("click");
        const solveGameBtnCallCount: number = solveGameMock.mock.calls.length;
        expect(solveGameBtnCallCount).toBe(1);
    });
});

describe("nav bar collapse btn click action", () => {
    let collapseMock: jest.Mock = jest.fn();
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        React.useState = jest.fn(() => [false, collapseMock]);
        wrapper = setup();
    });
    test("`solveNextMove` was called by `Solve next move` Button", () => {
        const navbarCollapseBtn = findByTestAttr(wrapper, "navbar-collapse-btn");
        navbarCollapseBtn.simulate("click");
        expect(collapseMock).toHaveBeenCalledWith(true);
    });
});
