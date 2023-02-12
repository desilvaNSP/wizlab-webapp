import React, { useState, useRef, useEffect } from 'react'

import { InfoConfirmModal } from '../../Custom/Modals';
import CustomDropdown from '../../Custom/CustomDropdown';
import { CustomInput } from '../../Custom/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { CreateClass, ShowLoading, StopLoading, UpdateClass } from '../../../Redux/Features/Common/CommonServicesSlice';
import { DateSelectionPicker } from '../../Custom/DateSelectionPicker';

export const NewClass = props => {
    const { handleClose, show, selectedClass } = props

    const COURSE_SELECTION = "COURSE_SELECTION";
    const LEVEL_SELECTION = "LEVEL_SELECTION";
    const SUBJECT_SELECTION = "SUBJECT_SELECTION";
    const TEACHER_SELECTION = "TEACHER_SELECTION";

    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

    //const auth = useSelector((state) => state.auth);

    const [showInfoConfirmModal, setShowInfoConfirmModal] = useState(false);
    const [modalContents, setModalContents] = useState({
        "header": "",
        "content": ""
    });

    const [selectedCourse, setSelectedCourse] = useState(selectedClass?.subject?.level?.course);
    const [selectedLevel, setSelectedLevel] = useState(selectedClass?.subject?.level);
    const [selectedSubject, setSelectedSubject] = useState(selectedClass?.subject);
    const [selectedTeacher, setSelectedTeacher] = useState(selectedClass?.teacher);
    const [selectedClassFee, setSelectedClassFee] = useState(selectedClass?.classFee);
    const [selectedDueDate, setSelectedDueDate] = useState(selectedClass?.paymentDueDate);
    const [selectedClassIdentifier, setSelectedClassIdentifier] = useState(selectedClass?.classIdentifier);
    const [indentifiers, setIdentifiers] = useState([]);

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);
    
    useEffect(() => {
        var string = indentifiers.join('-');
        setSelectedClassIdentifier(string)
    }, [indentifiers])

    /**
     * 
     * @param {Object} item selected item of the dropdown list
     * @param {String} key used to selected desired dropdown component
     */
    const handleItemChange = (item, selection) => {
        switch (selection) {
            case COURSE_SELECTION:
                var courseObj = null
                common.Courses?.forEach((course, index) => {
                    if (course.id == item.id) {
                        courseObj = course;
                    }
                });
                var array = [courseObj.name]
                setIdentifiers(array)
                setSelectedCourse(courseObj !== null ? courseObj : null);
                setSelectedLevel(null)
                setSelectedSubject(null)
                break;
            case LEVEL_SELECTION:
                var levelObj = null
                selectedCourse?.levels.forEach((level, index) => {
                    if (level.id == item.id) {
                        levelObj = level;
                    }
                });
                var array = [...indentifiers]
                array.push(levelObj.desc);
                setIdentifiers(array)
                setSelectedLevel(levelObj !== null ? levelObj : null)
                break;
            case SUBJECT_SELECTION:
                var subjectObj = null
                selectedLevel?.subjects.forEach((subject, index) => {
                    if (subject.id == item.id) {
                        subjectObj = subject;
                    }
                });
                var array = [...indentifiers]
                array.push(subjectObj.title);
                setIdentifiers(array)
                setSelectedSubject(subjectObj !== null ? subjectObj : null)
                break;
            case TEACHER_SELECTION:
                var teacherObj = null
                common.Teachers?.forEach((teacher, index) => {
                    if (teacher.id == item.id) {
                        teacherObj = teacher;
                    }
                });
                var array = [...indentifiers]
                array.push(teacherObj.firstName);
                setIdentifiers(array)
                setSelectedTeacher(teacherObj !== null ? teacherObj : null);
                break;
            default:
                break;
        }
    };

    const updateClassFee = (value) => {
        setSelectedClassFee(value)
    }

    const updateClassIdentifier = (value) => {
        setSelectedClassIdentifier(value)
    }

    const updatePaymentDueDate = (value) => {
        setSelectedDueDate(value)
    }

    const getCoursesList = () => {
        let coursesList = [];
        common.Courses?.forEach((course, index) => {
            if (course != null) {
                let obj = {
                    id: course.id,
                    value: course.name,
                    code: course.id,
                    selected: false
                };
                coursesList.push(obj);
            }
        });
        return coursesList;
    }

    const getLevelsByCourse = () => {
        let levelList = [];
        selectedCourse?.levels?.forEach((level, index) => {
            if (level != null) {
                let obj = {
                    id: level.id,
                    value: level.desc,
                    code: level.id,
                    selected: false
                };
                levelList.push(obj);
            }
        });
        return levelList;
    }

    const getSubjectByCourseAndLevels = () => {
        let subjectList = [];
        selectedLevel?.subjects?.forEach((subject, index) => {
            if (subject != null) {
                let obj = {
                    id: subject.id,
                    value: subject.title,
                    code: subject.id,
                    selected: false
                };
                subjectList.push(obj);
            }
        });
        return subjectList;
    }


    const getTeachersList = () => {
        let teachersList = [];
        common.Teachers?.forEach((teacher, index) => {
            if (teacher != null) {
                let obj = {
                    id: teacher.id,
                    value: teacher.firstName + " " + teacher.lastName,
                    code: teacher.id,
                    selected: false
                };
                teachersList.push(obj);
            }
        });
        return teachersList;
    }

    //Trigger create new class service
    const createNewClass = () => {
        var payload = {
            "identifier": selectedClassIdentifier,
            "subjectId": selectedSubject.id,
            "classfee": selectedClassFee,
            "teacherId": selectedTeacher.id,
            "paymentDueDate": selectedDueDate
        }
        dispatch(ShowLoading("Creating New Class.."))
        dispatch(CreateClass(payload, function (response, success) {
            if (success) {

            } else {
                //error handle
            }
            dispatch(StopLoading())
        }));
    }

    const updateExistingClass = () => {
        var payload = {
            "id":selectedClass.id,
            "identifier": selectedClassIdentifier,
            "subjectId": selectedSubject.id,
            "classfee": selectedClassFee,
            "teacherId": selectedTeacher.id
        }
        dispatch(ShowLoading("Updating Class.."))
        dispatch(UpdateClass(payload, function (response, success) {
            if (success) {

            } else {
                //error handle
            }
            dispatch(StopLoading())
        }));
    }

    const courseFeeFieldValidation = (value, callback) => {
        callback(true, "");
    }

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
                    {selectedClass == null ? <span>Create New Class</span> : <span>Update Class</span>}
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
                                    <div className='item-name'>Course</div>
                                    <div className='item-dropdown'>
                                        <CustomDropdown
                                            defaultList={getCoursesList()}
                                            selection={COURSE_SELECTION}
                                            onItemChange={handleItemChange}
                                            initValue={selectedCourse?.id}
                                            editable={true}
                                        />
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Level/Grade</div>
                                    <div className='item-dropdown'>
                                        <CustomDropdown
                                            defaultList={getLevelsByCourse()}
                                            selection={LEVEL_SELECTION}
                                            onItemChange={handleItemChange}
                                            initValue={selectedLevel?.id}
                                            editable={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Subject</div>
                                    <div className='item-dropdown'>
                                        <CustomDropdown
                                            defaultList={getSubjectByCourseAndLevels()}
                                            selection={SUBJECT_SELECTION}
                                            onItemChange={handleItemChange}
                                            initValue={selectedSubject?.id}
                                            editable={true}
                                        />
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Course Fee</div>
                                    <div className='item-dropdown'>
                                        <CustomInput
                                            initialValue={selectedClassFee} type="number" updateInput={(value) => {
                                                console.log("updateClassFee", value)
                                                updateClassFee(value);
                                            }} fieldValidation={courseFeeFieldValidation} required={true} placeHolder="Please enter course fee in ruppees"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Payment Due Date</div>
                                    <div className='item-dropdown'>
                                        <DateSelectionPicker
                                            title={""}
                                            onDateSelect={(dateTime, selection) => updatePaymentDueDate(dateTime, selection)}
                                        />
                                    </div>
                                </div>
                                <div className='form-column'>
                                </div>
                            </div>
                            <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                                <div className='form-column'>
                                    <label>Allocate Instructor/Lecturer</label>
                                </div>
                                <div className='form-column'>

                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Instructor/Lecturer</div>
                                    <div className='item-dropdown'>
                                        <CustomDropdown
                                            defaultList={getTeachersList()}
                                            selection={TEACHER_SELECTION}
                                            onItemChange={handleItemChange}
                                            initValue={""}
                                            editable={true}
                                        />
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Indetifier<span style={{color:'yellowgreen'}}>(you can change!)</span></div>
                                    <div className='item-dropdown'>
                                        <CustomInput
                                            initialValue={selectedClassIdentifier} type="text" updateInput={(value) => {
                                                updateClassIdentifier(value);
                                            }} fieldValidation={courseFeeFieldValidation} required={true} placeHolder=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-detail__footer">
                    {selectedClass == null ? <button className="btn btn--success" onClick={() => { createNewClass() }}>
                        Create New Class
                    </button> :
                        <button className="btn btn--success" onClick={() => { updateExistingClass() }}>
                            Update Class
                        </button>
                    }

                </div>
            </section>
        </div>
    )
}