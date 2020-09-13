import React, { useEffect } from "react";
import ReactModal from 'react-modal';
import cx from "classnames";

import { ReactComponent as CloseIcon } from "../../svg/cross.svg";

import "./Modal.scss";

ReactModal.setAppElement('#root');

const Modal = ({
    className,
    children,
    onRequestClose = () => {},
    ...props
}) => {
    useEffect(() => {
        function closeSidebar(e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                e.stopPropagation();
                onRequestClose();
            }
        }

        document.addEventListener("keydown", closeSidebar, false);

        return () => {
            document.removeEventListener("keydown", closeSidebar, false);
        };
     }, [onRequestClose]);

    return (
        <ReactModal
            overlayClassName={{
                base: "modal__overlay",
                afterOpen: "modal__overlay--open",
                beforeClose: "modal__overlay--close"
            }}
            closeTimeoutMS={200}
            appElement={document.getElementById("#root")}
            onRequestClose={onRequestClose}
            className={cx("modal", className)} {...props}>
            <div className="modal__content">
                {children}
            </div>
            <button
                onClick={onRequestClose}
                className="modal__close">
                <CloseIcon/>
            </button>
        </ReactModal>
    );
};

export default Modal;
