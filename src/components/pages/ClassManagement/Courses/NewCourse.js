import React, { useState, useRef, useEffect } from 'react'
import { InfoConfirmModal } from '../../../custom/Modals';
import { CustomTagInput } from '../../../custom/CustomTagInput';
import { CustomInput } from '../../../custom/CustomInput';
import { EditableInputTextCell } from '../../../custom/Editable';
import { ReactEditableTableFullWidthStyles } from '../../../custom/StyleComponents';
import makeData from '../MakeData'
import { SubjectsTable } from './Table/SubjectsTable';

export const NewCourse = props => {
    const { handleReload, handleClose, show, selectedCourse } = props

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

    // listener for the add new row on the table.
    // added new row at the top of the table.
    const addNewRow = () => {
        // var newData = [
        //     {
        //         "id": "PENDING",
        //         "terminalId": 1,
        //         "networkAppVersionId": 0,
        //         "networkAppVersion": null,
        //         "networkAppInstallationTriggerTypeId": 1,
        //         "merchantNetworkProfileId": 0,
        //         "merchantNetworkProfile": null,
        //         "addedBy": auth.AdminUser,
        //         "modifiedBy": auth.AdminUser,
        //         "addedDate": "",
        //         "modifiedDate": "",
        //         "new": true
        //     }
        // ]
        // var newDataSet = [...newData, ...data]
        // setData(newDataSet);
    }

    const hiddenColumns = ["id"];

    const columns = React.useMemo(
        () => [
            {
                Header: 'Subject Code',
                accessor: 'subjectCode',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={() => { }} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            }, 
            {
                Header: 'Subject Name',
                accessor: 'subjectName',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={() => { }} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            }, 
            {
                Header: 'Level/Grade',
                accessor: 'level',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={() => { }} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            }, 
            {
                Header: 'Age Range',
                accessor: 'ageRange',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={() => { }} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            },
        ],
        []
    )

    const data = [
        {
            "subjectCode": "G01-Sinhala",
            "subjectName": "Sinhala",
            "level": "Grade 01",
            "ageRange": "5-10"
        },
        {
            "subjectCode": "G01-English",
            "subjectName": "English",
            "level": "Grade 01",
            "ageRange": "5-10"
        },
        {
            "subjectCode": "G02-Sinhala",
            "subjectName": "Sinhala",
            "level": "Grade 02",
            "ageRange": "5-10"
        },
        {
            "subjectCode": "G03-English",
            "subjectName": "English",
            "level": "Grade 03",
            "ageRange": "5-10"
        },
        
        {
            "subjectCode": "G04-Maths",
            "subjectName": "Maths",
            "level": "Grade 04",
            "ageRange": "5-10"
        },
        
        {
            "subjectCode": "G04-English",
            "subjectName": "English",
            "level": "Grade 04",
            "ageRange": "5-10"
        },
        {
            "subjectCode": "G04-Art",
            "subjectName": "Art",
            "level": "Grade 04",
            "ageRange": "5-10"
        }
    ]

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props);

    return (
        <div className={showHideClassName}>
            <section className="modal-detail" ref={wrapperRef} onClick={e => e.stopPropagation()}>
                {showInfoConfirmModal && <InfoConfirmModal continueTo={continueConfirmModal} handleClose={closeConfirmModal} show={true} children={modalContents.content} heading={modalContents.header}></InfoConfirmModal>}
                <span className="close-icon modal-detail__close" onClick={handleClose}></span>
                <div className="modal-detail__header modal-detail__header" style={{ fontSize: "24px", fontWeight: 600 }}>
                    {selectedCourse == null ? <span>Start New Course</span> : <span>Update Course</span>}
                </div>
                <div className="modal-detail__content">
                    <div className='form-group'>
                        <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                            <div className='form-column'>
                                <label>Basic Information</label>
                            </div>
                            <div className='form-column'>

                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-column'>
                                <div className='item-name'>Course Name</div>
                                <div className='item-dropdown'>
                                    <CustomInput initialValue={""} type="text" disable={false} updateInput={(value) => { }} fieldValidation={() => { }} required={true} placeHolder="Course Name"></CustomInput>
                                </div>
                            </div>
                            <div className='form-column'>
                                <div className='item-name'>Levels/Grades</div>
                                <div className='item-dropdown'>
                                    <CustomTagInput initialValue={""} disable={false} fieldValidation={() => { }} required={true} updateTags={(value) => { }}></CustomTagInput>
                                </div>
                            </div>
                        </div>
                        <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                            <div className='form-column'>
                                <label>Subjects/Modules</label>
                            </div>
                            <div className='form-column'>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-column'>
                                <div className='table-actions-box'>
                                    <div className="table-add-row" onClick={() => addNewRow()} title="Add Terminal Network">
                                        <img src="assets/icons/icon-add.svg" alt="Add Terminal Network" />
                                    </div>
                                    <div className="table-add-row" onClick={() => { }} title="Reset Data">
                                        <img src="assets/icons/icons-reset.png" alt="Reset Data" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReactEditableTableFullWidthStyles>
                        <SubjectsTable columns={columns} data={data} onRowSelect={(rows) => { }} hiddenColumns={hiddenColumns} updateMyData={() => { }} skipPageReset={() => { }} />
                    </ReactEditableTableFullWidthStyles>
                </div>
                <div className="modal-detail__footer">
                    <button className="btn btn--success" onClick={() => { }} disabled={() => { }}>
                        Start New Course
                    </button>
                </div>
            </section>
        </div>
    )
}