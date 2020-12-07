import React from "react";

export interface ToastMessageProps {
    header: string;
    body: string;
    onClose: () => void;
}

/**
 * ToastMessage component - renders toast message
 * @function ToastMessage
 *
 * @param {ToastMessageProps} props
 * @constructor
 *
 * @return {JSX.Element}
 */
const ToastMessage = (props: ToastMessageProps) => {
    const {header, body, onClose}: ToastMessageProps = props;

    return (
        <div data-test="component-toast-message" className="toast show fade bg-danger text-white" role="alert"
             aria-live="assertive" aria-atomic="true"
             style={{position: "fixed", right: "5px", bottom: "5px", minWidth: "200px", zIndex: 1}}>
            <div className="toast-header bg-danger text-white">
                <strong data-test="toast-header" className="mr-auto">{header}</strong>
                <button data-test="toast-close-button" type="button" className="ml-2 mb-1 close text-white"
                        data-dismiss="toast"
                        aria-label="Close" onClick={() => onClose()}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div data-test="toast-body" className="toast-body">
                {body}
            </div>
        </div>
    );
};

export default ToastMessage;
