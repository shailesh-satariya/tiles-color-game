import {GameState, TileColor, TileGrid} from "common";
import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {Store} from "redux";
import {GameActions} from "../../redux/action-types";
import {RootState} from "../../redux/store";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";
import ColorPicker, {ColorPickerProps, DisconnectedColorPicker} from "../color-picker";

const colors: TileColor[] = [TileColor.COLOR1, TileColor.COLOR2, TileColor.COLOR3, TileColor.COLOR5];
const grid: TileGrid = [
    [{color: TileColor.COLOR2, traversed: true}, {color: TileColor.COLOR3, traversed: false}],
    [{color: TileColor.COLOR5, traversed: false}, {color: TileColor.COLOR1, traversed: false}],
];

const nextMove: TileColor | null = TileColor.COLOR3;
const gameState: GameState = GameState.IN_PROGRESS;

const defaultState: RootState = {...DefaultState, grid, colors, gameState};

const defaultProps: ColorPickerProps = {
    grid, colors, nextMove, gameState,
    addMove: (color: TileColor) => {
    },
};

/**
 * Factory function to create a ShallowWrapper for the ColorPicker component.
 * @function setup
 *
 * @param {RootState} initialState - Initial state for this setup.
 *
 * @returns {ShallowWrapper}
 */
const setup = (initialState: RootState = defaultState): ShallowWrapper => {
    const store: Store<RootState, GameActions> = storeFactory(initialState);
    const props = {store};
    return shallow(<ColorPicker {...props} />).dive().dive();
}

/**
 * Factory function to create a ShallowWrapper for the DisconnectedColorPicker component.
 * @function setup
 * @param {ColorPickerProps} props
 *
 * @returns {ShallowWrapper}
 */
const setupDisconnected = (props: ColorPickerProps = defaultProps): ShallowWrapper => {
    return shallow(<DisconnectedColorPicker {...props} />);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test("renders component without an error", () => {
        const componentColorPicker = findByTestAttr(wrapper, "component-color-picker");

        expect(componentColorPicker.length).toBe(1);
    });

    test("renders pickers without an error", () => {
        const colorPickers = findByTestAttr(wrapper, "color-picker");

        expect(colorPickers.length).toBe(4);
    });
});

describe("renders correct color picker enable disable state", () => {
    let wrapper: ShallowWrapper;

    describe("renders correct color picker enable disable state based on last selected color", () => {
        beforeEach(() => {
            wrapper = setup();
        });

        test("last move color picker is disabled", () => {
            const colorPickers = findByTestAttr(wrapper, "color-picker");

            expect(colorPickers.at(1).prop("disabled")).toBe(true);
        });

        test("other color pickers are not disabled", () => {
            const colorPickers = findByTestAttr(wrapper, "color-picker");

            expect(colorPickers.at(2).prop("disabled")).toBe(false);
        });
    });

    describe("renders correct color picker enable disable state based on gameState", () => {
        beforeEach(() => {
            wrapper = setupDisconnected();
        });

        test("color picker is enabled when gameState is `IN_PROGRESS`", () => {
            const colorPickers = findByTestAttr(wrapper, "color-picker");

            expect(colorPickers.at(2).prop("disabled")).toBe(false);
        });

        test("color picker is enabled when gameState is not `IN_PROGRESS`", () => {
            wrapper.setProps({gameState: GameState.AUTO_SOLVE});
            const colorPickers = findByTestAttr(wrapper, "color-picker");

            expect(colorPickers.at(2).prop("disabled")).toBe(true);
        });
    });
});

describe("renders correct color picker class", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup({...defaultState, nextMove: TileColor.COLOR3});
    });

    test("next move color picker has class `nex-move`", () => {
        const colorPickers = findByTestAttr(wrapper, "color-picker");

        expect(colorPickers.at(2).hasClass("next-move")).toBeTruthy();
    });

    test("other color pickers have class `nex-move`", () => {
        const colorPickers = findByTestAttr(wrapper, "color-picker");

        expect(colorPickers.at(1).hasClass("next-move")).not.toBeTruthy();
    });
});

test("`addMove` was called by picker which does not have previous color", () => {
    const addMoveMock: jest.Mock = jest.fn();
    const wrapper: ShallowWrapper = setupDisconnected({...defaultProps, addMove: addMoveMock});
    const colorPickers = findByTestAttr(wrapper, "color-picker");

    const colorPicker = colorPickers.at(2);
    colorPicker.simulate("click");
    expect(addMoveMock).toHaveBeenCalledWith(TileColor.COLOR3);
});
