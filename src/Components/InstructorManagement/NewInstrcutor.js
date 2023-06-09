import React, { useState, useRef, useEffect } from 'react'
import { InfoConfirmModal } from '../Custom/Modals';
import { CustomInput } from '../Custom/CustomInput';
import { CreateTeacher, StartLoading, StopLoading, UpdateTeacher } from '../../Redux/Features/Common/CommonServicesSlice';
import { useDispatch } from 'react-redux';

export const NewInstrcutor = props => {

    const { handleClose, show, selectedTeacher } = props

    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

    //const auth = useSelector((state) => state.auth);

    const [showInfoConfirmModal, setShowInfoConfirmModal] = useState(false);
    const [modalContents, setModalContents] = useState({
        "header": "",
        "content": ""
    });

    const [selectedFirstName, setSelectedFirstName] = useState(selectedTeacher?.firstName);
    const [selectedMiddleName, setSelectedMiddleName] = useState(selectedTeacher?.middleName);
    const [selectedLastName, setSelectedLastName] = useState(selectedTeacher?.lastName);
    const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(selectedTeacher?.phoneNumber);
    const [selectedEducationQualification, setSelectedEducationQualification] = useState(selectedTeacher?.education);
    const [selectedSubjects, setSelectedSubjects] = useState(selectedTeacher?.subjects);

    const dispatch = useDispatch();
    //const common = useSelector((state) => state.common);

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

    const instructorFieldValidation = (value, callback) => {
        if(value.trim() == ""){
            callback(false, "This field is required");
        } else {
            callback(true, "");
        }
    }

    //First name
    const updateFirstName = (value) => {
        setSelectedFirstName(value)
    }

    //Middle name
    const updateMiddleName = (value) => {
        setSelectedMiddleName(value)
    }

    //Last name
    const updateLastName = (value) => {
        setSelectedLastName(value)
    }

    //Mobile number
    const updatePhoneNumber = (value) => {
        setSelectedPhoneNumber(value)
    }

    //Education qualification
    const updateEducationQualification= (value) => {
        setSelectedEducationQualification(value)
    }

    //Subjects
    const updateSubjects = (value) => {
        setSelectedSubjects(value)
    }

    //Trigger create new teacher service
    const createNewTeacher = () => {
        var payload = {
            "firstname": selectedFirstName,
            "middlename": selectedMiddleName,
            "lastname": selectedLastName,
            "phonenumber": selectedPhoneNumber,
            "education": selectedEducationQualification,
            "subjects": selectedSubjects
        }
        dispatch(StartLoading("Creating New Teacher..","CreateTeacher"))
        dispatch(CreateTeacher(payload, function (response, success) {
            if (success) {

            } else {
                //error handle
            }
            handleClose()
            dispatch(StopLoading("CreateTeacher"))
        }));
    }

    //Trigger update teacher service
    const updateExistingTeacher = () => {
        var payload = {
            "id":selectedTeacher.id,
            "firstname": selectedFirstName,
            "middlename": selectedMiddleName,
            "lastname": selectedLastName,
            "phonenumber": selectedPhoneNumber,
            "education": selectedEducationQualification,
            "subjects": selectedSubjects
        }
        dispatch(StartLoading("Updating Teacher..", "UpdateTeacher"))
        dispatch(UpdateTeacher(payload, function (response, success) {
            if (success) {

            } else {
                //error handle
            }
            handleClose()
            dispatch(StopLoading("UpdateTeacher"))
        }));
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-detail" ref={wrapperRef} onClick={e => e.stopPropagation()}>
                {showInfoConfirmModal && <InfoConfirmModal continueTo={continueConfirmModal} handleClose={closeConfirmModal} show={true} children={modalContents.content} heading={modalContents.header}></InfoConfirmModal>}
                <span className="close-icon modal-detail__close" onClick={handleClose}></span>
                <div className="modal-detail__header modal-detail__header" style={{ fontSize: "24px", fontWeight: 600 }}>
                    {selectedTeacher == null ? <span>Create Teacher</span> : <span>Update Teacher</span>}
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
                                        <CustomInput initialValue={selectedFirstName} type="text" disable={selectedTeacher == null ? false : true } updateInput={(value) => {
                                            updateFirstName(value)
                                        }} fieldValidation={instructorFieldValidation} required={true} placeHolder="First Name"></CustomInput>
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Middle Name</div>
                                    <div className='item-dropdown'>
                                        <CustomInput initialValue={selectedMiddleName} type="text" disable={selectedTeacher == null ? false : true } updateInput={(value) => {
                                            updateMiddleName(value)
                                        }} required={false} placeHolder="Middle Name"></CustomInput>
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Last Name</div>
                                    <div className='item-dropdown'>
                                        <CustomInput initialValue={selectedLastName} type="text" disable={selectedTeacher == null ? false : true } updateInput={(value) => {
                                            updateLastName(value)
                                        }} fieldValidation={instructorFieldValidation} required={true} placeHolder="Last Name"></CustomInput>
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Mobile Number</div>
                                    <div className='item-dropdown'>
                                        <CustomInput initialValue={selectedPhoneNumber} type="text" disable={false} updateInput={(value) => {
                                            updatePhoneNumber(value)
                                        }} fieldValidation={instructorFieldValidation} required={true} placeHolder="Mobile Number"></CustomInput>
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Education Qualification</div>
                                    <div className='item-dropdown'>
                                        <CustomInput initialValue={selectedEducationQualification} type="text" disable={false} updateInput={(value) => {
                                            updateEducationQualification(value)
                                        }} fieldValidation={instructorFieldValidation} required={true} placeHolder="Education Qualification"></CustomInput>
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Subjects</div>
                                    <div className='item-dropdown'>
                                        <CustomInput initialValue={selectedSubjects} type="text" disable={false} updateInput={(value) => {
                                            updateSubjects(value)
                                        }} fieldValidation={instructorFieldValidation} required={true} placeHolder="Subjects"></CustomInput>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal-detail__footer">
                    {selectedTeacher == null ?
                        <button className="btn btn--success" onClick={() => createNewTeacher()} >
                            Create Teacher
                        </button> :
                        <button className="btn btn--success" onClick={() => updateExistingTeacher()}>
                            Update Teacher
                        </button>
                    }

                </div>
            </section>
        </div>
    )
}