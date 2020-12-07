import {mount, ReactWrapper, shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test/utils";
import MinMaxSelect, {MinMaxSelectProps} from "../min-max-select";

const defaultProps: MinMaxSelectProps = {
    min: 3,
    max: 10,
    value: 6,
    label: "Foo",
    onChange: () => {
    }
}

/**
 * Factory function to create a ShallowWrapper for the MinMaxSelect component.
 * @function setup
 *
 * @param {MinMaxSelectProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: MinMaxSelectProps = defaultProps): ShallowWrapper => {
    return shallow(<MinMaxSelect {...props} />);
}

/**
 * Factory function to create a ReactWrapper for the MinMaxSelect component.
 * @function setup
 * @param {MinMaxSelectProps} props
 *
 * @return {ReactWrapper}
 */
const setupMount = (props: MinMaxSelectProps = defaultProps): ReactWrapper => {
    return mount(<MinMaxSelect {...props} />);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    })

    test("renders component without an error", () => {
        const componentMinMaxSelect = findByTestAttr(wrapper, "component-min-max-select");

        expect(componentMinMaxSelect.length).toBe(1);
    });

    test("renders label without an error", () => {
        const selectLabel = findByTestAttr(wrapper, "select-label");

        expect(selectLabel.length).toBe(1);
    });

    test("renders select without an error", () => {
        const selectElement = findByTestAttr(wrapper, "select-element");

        expect(selectElement.length).toBe(1);
    });
});

test("renders select option without an error", () => {
    const wrapper = setupMount();
    const selectElement = findByTestAttr(wrapper, "select-option");

    expect(selectElement.length).toBe(8);
});

test("calls `onChange` prop when select value is changed", () => {
    const onChangeMock = jest.fn();
    const props: MinMaxSelectProps = {...defaultProps, onChange: onChangeMock}

    const wrapper = setup(props);

    // simulate click on select on change
    const value: number = 8;
    const selectElement = findByTestAttr(wrapper, "select-element");
    const event: React.ChangeEvent<HTMLSelectElement> = {target: {value: `${value}`}} as React.ChangeEvent<HTMLSelectElement>;
    selectElement.simulate("change", event);

    // expect the mock to have been called once
    expect(onChangeMock).toHaveBeenCalledWith(value);
});

