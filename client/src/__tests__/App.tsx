import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {Store} from "redux";
import {GameState, TileGrid} from "../../../common/src/types";

import App, {AppProps, DisconnectedApp} from "../App";
import {GameActions} from "../redux/action-types";
import {RootState} from "../redux/store";
import {DefaultState, findByTestAttr, storeFactory} from "../test/utils";

const grid: TileGrid | null = [];

const defaultState: RootState = {...DefaultState, grid};

const defaultProps: AppProps = {
    gameState: GameState.NOT_STARTED, serverError: false, setNoServerError: () => {
    }
};

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 *
 * @param {RootState} initialState - Initial state for this setup.
 *
 * @returns {ShallowWrapper}
 */
const setup = (initialState: RootState = defaultState): ShallowWrapper => {
    const store: Store<RootState, GameActions> = storeFactory(initialState);
    const props = {store};
    return shallow(<App {...props} />).dive().dive();
}

/**
 * Factory function to create a ShallowWrapper for the DisconnectedApp component.
 * @function setup
 * @param {AppProps} props
 *
 * @returns {ShallowWrapper}
 */
const setupDisconnected = (props: AppProps = defaultProps): ShallowWrapper => {
    return shallow(<DisconnectedApp {...props} />);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    describe("renders elements when `gameState` is NOT_STARTED", () => {
        beforeEach(() => {
            wrapper = setup();
        });

        test("renders component without an error", () => {
            const componentApp = findByTestAttr(wrapper, "component-app");

            expect(componentApp.length).toBe(1);
        });

        test("renders header inputs without an error", () => {
            const headerInputs = findByTestAttr(wrapper, "header-inputs");

            expect(headerInputs.length).toBe(1);
        });

        test("does not render game", () => {
            const game = findByTestAttr(wrapper, "game");

            expect(game.length).toBe(0);
        });
    });

    describe("renders elements when `gameState` is IN_PROGRESS", () => {
        beforeEach(() => {
            wrapper = setup({...defaultState, gameState: GameState.IN_PROGRESS});
        });

        test("renders component without an error", () => {
            const componentApp = findByTestAttr(wrapper, "component-app");

            expect(componentApp.length).toBe(1);
        });

        test("renders header inputs without an error", () => {
            const headerInputs = findByTestAttr(wrapper, "header-inputs");

            expect(headerInputs.length).toBe(1);
        });

        test("renders game inputs without an error", () => {
            const game = findByTestAttr(wrapper, "game");

            expect(game.length).toBe(1);
        });
    });
});


describe("renders toast message element", () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = setupDisconnected();
    });

    test("does not render toast message", () => {
        const toastMessage = findByTestAttr(wrapper, "toast-message");

        expect(toastMessage.length).toBe(0);
    });

    test("renders toast message", () => {
        wrapper.setProps({serverError: true});
        const toastMessage = findByTestAttr(wrapper, "toast-message");

        expect(toastMessage.length).toBe(1);
    });
});

test("toast message onClose function", () => {
    const mockOnClose: jest.Mock = jest.fn();
    const wrapper = setupDisconnected({...defaultProps, serverError: true, setNoServerError: mockOnClose});
    const toastMessage = findByTestAttr(wrapper, "toast-message");
    (toastMessage.prop("onClose") as Function)();
    expect(mockOnClose).toHaveBeenCalled();
});
