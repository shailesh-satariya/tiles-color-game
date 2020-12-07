import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test/utils";
import ToastMessage, {ToastMessageProps} from "../toast-message";

const defaultProps: ToastMessageProps = {
    header: "Error!",
    body: "Server error!",
    onClose: () => {
    }
};

/**
 * Factory function to create a ShallowWrapper for the ToastMessage component.
 * @function setup
 *
 * @param {ToastMessageProps} props
 *
 * @return {ShallowWrapper}
 */
const setup = (props: ToastMessageProps = defaultProps): ShallowWrapper => {
    return shallow(<ToastMessage {...props} />);
}

describe("render", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test("renders component", () => {
        const componentToastMessage = findByTestAttr(wrapper, "component-toast-message");

        expect(componentToastMessage.length).toBe(1);
    });

    test("renders header", () => {
        const header = findByTestAttr(wrapper, "toast-header");

        expect(header.length).toBe(1);
    });

    test("renders body", () => {
        const body = findByTestAttr(wrapper, "toast-body");

        expect(body.length).toBe(1);
    });

    test("renders close button", () => {
        const closeBtn = findByTestAttr(wrapper, "toast-close-button");

        expect(closeBtn.length).toBe(1);
    });
});


test("toast message onClose function", () => {
    const mockOnClose: jest.Mock = jest.fn();
    const wrapper = setup({...defaultProps, onClose: mockOnClose});
    const closeBtn = findByTestAttr(wrapper, "toast-close-button");
    closeBtn.simulate("click");
    expect(mockOnClose).toHaveBeenCalled();
});
