import {GameState, TileColor} from "common";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {addMove} from "../redux/actions";
import {RootState} from "../redux/store";


const mapStateToProps = ({grid, colors, nextMove, gameState}: RootState) => ({
    grid, colors, nextMove, gameState
});

const connector = connect(mapStateToProps, {addMove});

export type ColorPickerProps = ConnectedProps<typeof connector>;

/**
 * Color picker component
 * @function DisconnectedColorPicker
 *
 * @param {ColorPickerProps} props
 * @constructor
 *
 * @return {JSX.Element}
 */
export const DisconnectedColorPicker = (props: ColorPickerProps): JSX.Element => {
    const {grid, colors, gameState, nextMove, addMove}: ColorPickerProps = props;
    const currentColor: TileColor | null = (grid && grid.length && grid[0].length) ? grid[0][0].color : null;

    return (
        <div data-test="component-color-picker" className="mt-1">
            {
                colors.map((color: TileColor, ti: number) => (
                    <React.Fragment key={ti}>
                        {
                            <button data-test={"color-picker"}
                                    className={`color-picker-button color${color}` + (nextMove === color ? " next-move" : "")}
                                    disabled={gameState !== GameState.IN_PROGRESS || color === currentColor}
                                    onClick={() => addMove(color)}/>
                        }
                    </React.Fragment>
                ))
            }
        </div>
    );
}

const ColorPicker = connector(DisconnectedColorPicker);

export default ColorPicker;
