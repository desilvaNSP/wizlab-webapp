import React, { useEffect, useRef, useState } from "react";

const InfoConfirmModal = props => {
    const { handleClose, continueTo, show, children, heading, commentRequired = false } = props;
    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

    const [comment, setComment] = useState("")
    /**
     * Hook that alerts clicks outside of the passed ref
     */
    const useOutsideAlerter = (ref, thatProps) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    thatProps.handleClose();
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const onCommentChange = e => {
        e.stopPropagation();
        setComment(e.target.value)
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props);

    return (
        <div className={showHideClassName} style={{ zIndex: 2500 }}>
            <section className="modal-main" ref={wrapperRef} style={{width:"25%"}}>
                <span className="close-icon modal-main__close" onClick={handleClose}></span>
                <div className="modal-main__header modal-main__header--danger">
                    {heading}
                </div>
                <div className="modal-main__content">
                    <div className="row">
                        {children}
                    </div>
                    {commentRequired &&
                        <div className="row">
                            <textarea rows="4" cols="50" maxlength="50" onChange={onCommentChange} placeholder="Enter comments here...">
                            </textarea>
                        </div>}
                </div>
                <div className="modal-main__footer">
                    <button className="btn btn--success" onClick={() => {
                        continueTo(comment)
                    }}>
                        Yes
                    </button>
                    <button className="btn btn--danger" onClick={handleClose}>
                        No
                    </button>
                </div>
            </section>
        </div>
    );
};


const InformationModal = props => {
    const { handleClose, show, children, heading } = props;
    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    const useOutsideAlerter = (ref, thatProps) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    thatProps.handleClose();
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props);

    return (
        <div className={showHideClassName} style={{ zIndex: 2500 }}>
            <section className="modal-main" ref={wrapperRef}>
                <span className="close-icon modal-main__close" onClick={handleClose}></span>
                <div className="modal-main__header modal-main__header--success">
                    {heading}
                </div>
                <div className="modal-main__content">
                    {children}
                </div>
                <div className="modal-main__footer">
                    <button className="btn btn--success" onClick={handleClose}>
                        Understand
                    </button>
                </div>
            </section>
        </div>
    );
};

export {
    InfoConfirmModal,
    InformationModal
} 