import React, { useState, useRef, useEffect } from 'react'

import { InfoConfirmModal } from '../../Custom/Modals';
import CustomDropdown from '../../Custom/CustomDropdown';
import { CustomInput } from '../../Custom/CustomInput';
import DropdownInput from '../../Custom/DropdownInput';
import { ReactTableFullWidthStyles } from '../../Custom/StyleComponents';
import { CommonTable } from '../../CommonTable/CommonTable';
import { format } from 'date-fns'
import { DateTimePicker } from '../../Custom/DateTimePicker';

export const NewSession = props => {
    const { handleReload, handleClose, show, selectedClass } = props

    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

    //const auth = useSelector((state) => state.auth);
    // calender popup default date and its state
    var formatDateTimeString = "yyyy-MM-dd'T'HH:mm:ss";
    var formatDateString = "yyyy-MM-dd";

    const [showInfoConfirmModal, setShowInfoConfirmModal] = useState(false);
    const [modalContents, setModalContents] = useState({
        "header": "",
        "content": ""
    });

    //var defaultTo = new Date(format(today, formatDateString) + "T" + "23:59:00")
    // var defaultFrom = new Date(format(today.setDate(today.getDate() - 7), formatDateString) + "T" + "00:00:00")
    var today = new Date();
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);


    const hiddenColumns = ["selection"];

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
 * Event handling for apply filters and retrive class data.
 */
    const handleApplyOnClick = () => {
        alert("load classes data")
    };


    /**
     * 
     * @param {Object} item selected item of the dropdown list
     * @param {String} key used to selected desired dropdown component
     */
    const resetThenSet = (item, key) => {

    };

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


    const columns = React.useMemo(
        () => [
            {
                Header: 'Identifier',
                accessor: 'identifier',
                disableFilters: true
            },
            {
                Header: 'Course/Program',
                accessor: 'course',
                disableFilters: true
            },
            {
                Header: 'Level/Grade',
                accessor: 'level',
                disableFilters: true
            },
            {
                Header: 'Subject',
                accessor: 'subject',
                disableFilters: false
            },
            {
                Header: 'Teacher/Lecturer',
                accessor: 'teacher',
                disableFilters: false
            },
            {
                Header: 'Class Fee',
                accessor: 'classFee',
                disableFilters: true
            }
        ],
        []
    )

    const data = [
        {
            "id": 1,
            "identifier": 'Konara Sinhala Class',
            "course": "G01-Sinhala",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "5-10",
            "classFee": "5-10"
        },
        {
            "id": 1,
            "identifier": 'Aruge Art Class',
            "course": "G01-Sinhala",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "5-10",
            "classFee": "5-10"
        },
        {
            "id": 1,
            "identifier": 'SajithPremadasa-Grade01-English',
            "course": "G01-English",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Sajith Premadasa",
            "classFee": "5-10"
        },
        {
            "id": 1,
            "identifier": 'Konara Sinhala Class',
            "course": "G01-Sinhala",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Konara",
            "classFee": "5-10"
        },
        {
            "id": 1,
            "identifier": 'Konara Sinhala Class',
            "course": "G01-Sinhala",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Konara",
            "classFee": "5-10"
        },
        {
            "id": 1,
            "identifier": 'Konara Sinhala Class',
            "course": "G01-Sinhala",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Konara",
            "classFee": "5-10"
        },
        {
            "course": "G01-Sinhala",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Konara",
            "classFee": "5-10"
        }
    ]

    /**
    * Props event handler which is used in calender component
    * @param {Date} val selected date information
    * @param {String} selection used to selected desired calender component
    */
    const onDateTimeChange = (val, selection) => {

    }


    return (
        <div className={showHideClassName}>
            <section className="modal-detail" ref={wrapperRef} onClick={e => e.stopPropagation()}>
                {showInfoConfirmModal && <InfoConfirmModal continueTo={continueConfirmModal} handleClose={closeConfirmModal} show={true} children={modalContents.content} heading={modalContents.header}></InfoConfirmModal>}
                <span className="close-icon modal-detail__close" onClick={handleClose}></span>
                <div className="modal-detail__header modal-detail__header" style={{ fontSize: "24px", fontWeight: 600 }}>
                    {selectedClass == null ? <span>Create Session</span> : <span>Update Session</span>}
                </div>
                <div className="modal-detail__content">
                    <div className='form-group'>
                        <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                            <div className='form-column'>
                                <label>First Select Class</label>
                            </div>
                            <div className='form-column'>

                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='classes-filter-box'>
                                <div className='filter-box-row'>
                                    <div className='filter-box-column'>
                                        <DropdownInput
                                            title="Course"
                                            list={[]}
                                            resetThenSet={resetThenSet}
                                            selection={1}
                                            defaultValue={false}
                                        />
                                    </div>
                                    <div className='filter-box-column'>
                                        <DropdownInput
                                            title="Level"
                                            list={[]}
                                            resetThenSet={resetThenSet}
                                            selection={1}
                                            defaultValue={false}
                                        />
                                    </div>
                                    <div className='filter-box-column'>
                                        <DropdownInput
                                            title="Subject"
                                            list={[]}
                                            resetThenSet={resetThenSet}
                                            selection={1}
                                            defaultValue={false}
                                        />
                                    </div>
                                    <div className='filter-box-column'>
                                        <DropdownInput
                                            title="Teacher"
                                            list={[]}
                                            resetThenSet={resetThenSet}
                                            selection={1}
                                            defaultValue={false}
                                        />
                                    </div>
                                    <div className='filter-box-column apply-filter'>
                                        <button
                                            onClick={() => handleApplyOnClick()}
                                            className="btn btn--primary"
                                            type="submit"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ReactTableFullWidthStyles>
                                <CommonTable columns={columns} data={data} onRowSelect={(rows) => { }} rowSelection={true} hiddenColumns={hiddenColumns} pagination={false} settings={false} globalsearch={false} downloadcsv={false} />
                            </ReactTableFullWidthStyles>
                            <div className='form-column'>

                            </div>
                        </div>
                        <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                            <div className='form-column'>
                                <label>Basic Information</label>
                            </div>
                            <div className='form-column'>

                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-column'>
                                <div className='item-name'>Start Time</div>
                                <div className='item-dropdown'>
                                    <DateTimePicker
                                        valid={fromDate < toDate ? true : false}
                                        title={""}
                                        initDateTime={toDate}
                                        onDateTimeChange={(dateTime, selection) => onDateTimeChange(dateTime, selection)}
                                    />
                                </div>
                            </div>
                            <div className='form-column'>
                                <div className='item-name'>Duration (Minitues)</div>
                                <div className='item-dropdown'>
                                    <CustomInput defaultList={[]} onItemChange={(item) => {
                                    }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
                                </div>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-column'>
                                <div className='item-name'>Auditorium<span style={{color:'red', fontSize:'10px'}}> (physical/virtual)</span></div>
                                <div className='item-dropdown'>
                                    <CustomDropdown defaultList={[]} onItemChange={(item) => {
                                    }} initValue={"1231"} required={true} editable={true} warningMessage={"Updating subject is not allowed"} />
                                </div>
                            </div>
                            <div className='form-column'>
                                <div className='item-name'>Virtual Link</div>
                                <div className='item-dropdown'>
                                    <CustomInput defaultList={[]} onItemChange={(item) => {
                                    }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-detail__footer">
                    <button className="btn btn--success" onClick={() => { }} disabled={() => { }}>
                        Create New Session
                    </button>
                </div>
            </section>
        </div>
    )
}