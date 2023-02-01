import React, { useState, useRef, useEffect } from 'react'
import { InfoConfirmModal } from '../Custom/Modals';
import { CustomInput } from '../Custom/CustomInput';

export const NewInstitute = props => {
    const { handleReload, handleClose, show, selectedClass } = props

    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

    //const auth = useSelector((state) => state.auth);

    const [showInfoConfirmModal, setShowInfoConfirmModal] = useState(false);
    const [modalContents, setModalContents] = useState({
        "header": "",
        "content": ""
    });

    // useDispatch() hook is equivalent of mapDispatchToProps.
    //const dispatch = useDispatch();

    // useEffect(() => {

    // }, [])

    /**
     * Event for close confirm modal
     */
    const closeConfirmModal = () => {
        setShowInfoConfirmModal(false)
    }

    /**
       * Event for continue confirm modal
       */
    const continueConfirmModal = () => {
        setShowInfoConfirmModal(false)
    }

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
        <div className={showHideClassName}>
            <section className="modal-detail" ref={wrapperRef} onClick={e => e.stopPropagation()}>
                {showInfoConfirmModal && <InfoConfirmModal continueTo={continueConfirmModal} handleClose={closeConfirmModal} show={true} children={modalContents.content} heading={modalContents.header}></InfoConfirmModal>}
                <span className="close-icon modal-detail__close" onClick={handleClose}></span>
                <div className="modal-detail__header modal-detail__header" style={{ fontSize: "24px", fontWeight: 600 }}>
                    {selectedClass == null ? <span>Create Teacher</span> : <span>Update Teacher</span>}
                </div>
                <div className="modal-detail__content">
                    <div className='form-group'>
                        <div className='form-group-col2'>
                            <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                                <div className='form-column'>
                                    <label>Basic Information</label>
                                </div>
                                <div className='form-column'>

                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>First Name</div>
                                    <div className='item-dropdown'>
                                        <CustomInput defaultList={[]} onItemChange={(item) => {
                                        }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Middle Name</div>
                                    <div className='item-dropdown'>
                                        <CustomInput defaultList={[]} onItemChange={(item) => {
                                        }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Last Name</div>
                                    <div className='item-dropdown'>
                                        <CustomInput defaultList={[]} onItemChange={(item) => {
                                        }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Mobile Number</div>
                                    <div className='item-dropdown'>
                                        <CustomInput defaultList={[]} onItemChange={(item) => {
                                        }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Permanant Address</div>
                                    <div className='item-dropdown'>
                                        <CustomInput defaultList={[]} onItemChange={(item) => {
                                        }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Education Qualitification</div>
                                    <div className='item-dropdown'>
                                        <CustomInput defaultList={[]} onItemChange={(item) => {
                                        }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='form-group-col2'>

                        </div>
                    </div>
                </div>
                <div className="modal-detail__footer">
                    <button className="btn btn--success" onClick={() => { }} disabled={() => { }}>
                        {selectedClass == null ? <span>Create Teacher</span> : <span>Update Teacher</span>}
                    </button>
                </div>
            </section>
        </div>
    )
}