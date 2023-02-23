import React, { useState, useRef, useEffect } from 'react'

import { InfoConfirmModal } from '../../Custom/Modals';
import { CustomInput } from '../../Custom/CustomInput';
import { ReactTableFullWidthStyles } from '../../Custom/StyleComponents';
import { CommonTable } from '../../CommonTable/CommonTable';
import { DateTimePicker } from '../../Custom/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { GetClasses, StartLoading, StopLoading } from '../../../Redux/Features/Common/CommonServicesSlice';
import FilterDropdown from '../../Custom/FilterDropdown';
import { ClassTable } from './Table/ClassTable';
import { CreateSession, UpdateSession } from '../../../Redux/Features/Sessions/SessionServicesSlice';
import CustomDropdown from '../../Custom/CustomDropdown';

export const NewSession = (props) => {
    const { handleClose, show, classId, selectedSession } = props

    //var defaultTo = new Date(format(today, formatDateString) + "T" + "23:59:00")
    // var defaultFrom = new Date(format(today.setDate(today.getDate() - 7), formatDateString) + "T" + "00:00:00")
    var today = new Date();

    const [showInfoConfirmModal, setShowInfoConfirmModal] = useState(false);
    const [modalContents, setModalContents] = useState({
        "header": "",
        "content": ""
    });

    console.log("selectedSession", selectedSession)

    const COURSE_SELECTION = "COURSE_SELECTION";
    const LEVEL_SELECTION = "LEVEL_SELECTION";
    const SUBJECT_SELECTION = "SUBJECT_SELECTION";
    const TEACHER_SELECTION = "TEACHER_SELECTION";
    const CLASSROOM_SELECTION = "CLASSROOM_SELECTION";

    const [selectedClass, setSelectedClass] = useState(selectedSession != null ? selectedSession.class : null);
    const [newClass, setNewClass] = useState(null);
    const [startTime, setStartTime] = useState(selectedSession != null ? new Date(selectedSession.startTime) : today);
    const [duration, setDuration] = useState(selectedSession != null ? selectedSession.duration : null);
    const [virtualLink, setVirtualLink] = useState(selectedSession != null ? selectedSession.link : null);
    const [classRoom, setClassRoom] = useState(selectedSession != null ? selectedSession.classRoom : null);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(false)
    const [tablePageIndex, setTablePageIndex] = React.useState(0)
    const [tablePageSize, setTablePageSize] = React.useState(10)
    const [pageCount, setPageCount] = React.useState(0)

    const hiddenColumns = ["selection"];
    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";


    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);

    const SelectClassById = () => {
        var selectedClass = null;
        var filteredClass = common.Classes?.classes?.filter(function (val) {
            return val.id == classId;
        });
        if (filteredClass.length > 0) {
            selectedClass = filteredClass[0]
        }
        return selectedClass;
    }

    useEffect(() => {
        let filteredClass = SelectClassById();
        if (filteredClass != null) {
            setSelectedClass(filteredClass)
        }
    }, [classId])


    useEffect(() => {
        if (common.Classes != null) {
            setData(common.Classes?.classes)
            setPageCount(Math.ceil(common.Classes?.totalNumberOfEntries / tablePageSize))
        }
    }, [common.Classes])

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        if (selectedClass == null) {
            var payload = {
                "courseId": selectedCourse?.id,
                "levelId": selectedLevel?.id,
                "subjectId": selectedSubject?.id,
                "teacherId": selectedTeacher?.id,
                "pageSize": pageSize,
                "pageNumber": pageIndex + 1
            }

            setLoading(true)
            setTablePageSize(pageSize);
            dispatch(StartLoading("Loading Classes..", "GetClasses"))
            dispatch(GetClasses(payload, function (response, success) {
                setLoading(false)
                dispatch(StopLoading("GetClasses"))
            }));
        }
    }, [selectedClass])

    /**
     * Event handling for apply filters and retrive class data.
     */
    const handleApplyOnClick = () => {
        var payload = {
            "courseId": selectedCourse?.id,
            "levelId": selectedLevel?.id,
            "subjectId": selectedSubject?.id,
            "teacherId": selectedTeacher?.id,
            "pageSize": tablePageSize,
            "pageNumber": tablePageIndex + 1
        }
        dispatch(StartLoading("Loading Classes.."))
        dispatch(GetClasses(payload, function (response, success) {
            if (success) {
                //success handle
            } else {
                //error handle
            }
            dispatch(StopLoading())
        }));
    };

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
                    if (course.id == item?.id) {
                        courseObj = course;
                    }
                });
                setSelectedCourse(courseObj !== null ? courseObj : null);
                break;
            case LEVEL_SELECTION:
                var levelObj = null
                selectedCourse?.levels.forEach((level, index) => {
                    if (level.id == item?.id) {
                        levelObj = level;
                    }
                });
                setSelectedLevel(levelObj !== null ? levelObj : null)
                break;
            case SUBJECT_SELECTION:
                setSelectedSubject(item !== null ? item : null)
                break;
            case TEACHER_SELECTION:
                setSelectedTeacher(item !== null ? item : null)
                break;
            case CLASSROOM_SELECTION:
                setClassRoom(item !== null ? item : null)
                break;
            default:
                break;
        }
    };

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

    /**
    * Props event handler which is used in calender component
    * @param {Date} val selected date information
    * @param {String} selection used to selected desired calender component
    */
    const onDateTimeChange = (val, selection) => {
        setStartTime(val)
    }

    const selectClassProfile = (rows) => {
        // if any transaction is not set, then set null to selectedTransaction state.
        if (rows.length > 0) {
            var selectedClass = rows[0].original;
            setNewClass(selectedClass)
        }
    }

    const selectClassRoom = (rows) => {
        // if any transaction is not set, then set null to selectedTransaction state.
        if (rows.length > 0) {
            var selectedClassRoom = rows[0].original;
            setClassRoom(selectedClassRoom)
        }
    }

    //Trigger create new class service
    const createNewSession = () => {
        var payload = {
            "classId": newClass.id,
            "startTime": startTime,
            "duration": duration,
            "classRoomId": classRoom?.id,
            "link": virtualLink
        }
        dispatch(StartLoading("Creating New Session..", "CreateSession"))
        dispatch(CreateSession(payload, function (response, success) {
            if (success) {

            } else {
                //error handle
            }
            dispatch(StopLoading("CreateSession"));
            handleClose();
        }));
    }

    const updateExistingSession = () => {
        var payload = {
            "id": selectedSession.id,
            "startTime":startTime,
            "duration": duration,
            "classRoomId": classRoom?.id,
            "link": virtualLink
        }

        dispatch(StartLoading("Updating Session..", "UpdateSession"))
        dispatch(UpdateSession(payload, function (response, success) {
            if (success) {

            } else {
                //error handle
            }
            handleClose()
            dispatch(StopLoading("UpdateSession"))
        }));
    }



    const classColumns = React.useMemo(
        () => [
            {
                Header: 'Class Name',
                id: 'classIdentifier',
                disableFilters: true,
                accessor: data => {
                    return data.classIdentifier
                },
            },
            {
                Header: 'Course/Program',
                id: 'course',
                disableFilters: true,
                accessor: data => {
                    return data.subject?.level?.course?.name
                },
            },
            {
                Header: 'Level/Grade',
                id: 'level',
                disableFilters: true,
                accessor: data => {
                    return data.subject?.level?.desc
                },
            },
            {
                Header: 'Subject',
                id: 'subject',
                accessor: data => {
                    return data.subject?.title
                },
                disableFilters: true
            },
            {
                Header: 'Teacher/Lecturer',
                id: 'teacher',
                accessor: data => {
                    return data.teacher?.firstName + " " + data.teacher?.lastName
                },
                disableFilters: false
            },
            {
                Header: 'Class Fee',
                accessor: 'classFee',
                disableFilters: true
            },
            {
                Header: 'Payment Due Date',
                accessor: 'paymentDueDate',
                disableFilters: true
            }
        ],
        []
    )

    const getCoursesList = () => {
        let coursesList = [];
        common.Courses?.forEach((course, index) => {
            let obj = {
                id: course.id,
                value: course.name,
                code: course.id,
                selected: false
            };
            coursesList.push(obj);
        });
        return coursesList;
    }

    const getLevelsByCourse = () => {
        let levelList = [];
        selectedCourse?.levels.forEach((level, index) => {
            let obj = {
                id: level.id,
                value: level.desc,
                code: level.id,
                selected: false
            };
            levelList.push(obj);
        });
        return levelList;
    }

    const getSubjectByCourseAndLevels = () => {
        let subjectList = [];
        selectedLevel?.subjects.forEach((subject, index) => {
            let obj = {
                id: subject.id,
                value: subject.title,
                code: subject.id,
                selected: false
            };
            subjectList.push(obj);
        });
        return subjectList;
    }

    const getTeachersList = () => {
        let teachersList = [];
        common.Teachers?.teachers?.forEach((teacher, index) => {
            let obj = {
                id: teacher.id,
                value: teacher.firstName + " " + teacher.lastName,
                code: teacher.id,
                selected: false
            };
            teachersList.push(obj);
        });
        return teachersList;
    }

    const getAuditoriumsList = () => {
        let auditoriumList = [];
        console.log(common.ClassRooms)
        common.ClassRooms?.forEach((room, index) => {
            if (room != null) {
                var virtual = room.isVirtual ? "[VIRTUAL]" : "[PHYSICAL]"
                let obj = {
                    id: room.id,
                    value: room.desc + "[cap:" + room.capacity + "]" + virtual,
                    code: room.id,
                    selected: false
                };
                auditoriumList.push(obj);
            }
        });
        return auditoriumList;
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Auditorium No/Code',
                accessor: 'desc',
                disableFilters: true
            },
            {
                Header: 'Capacity',
                accessor: 'capacity',
                disableFilters: true
            },
            {
                Header: 'Physical/Virtual',
                id: 'isVirtual',
                disableFilters: true,
                accessor: data => {
                    if (data.isVirtual) {
                        return (<span className="celltag--invalid">VIRTUAL</span>)
                    } else {
                        return (<span className="celltag--valid">PHYSICAL</span>)
                    }
                }
            },
            {
                Header: 'Address',
                accessor: 'address',
                disableFilters: true
            }
        ],
        []
    )

    const noNeedFieldValidation = (value, callback) => {
        callback(true, "");
    }

    const updateVirtualLink = (value) => {
        setVirtualLink(value);
    }

    const updateDuration = (value) => {
        setDuration(value)
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-detail" ref={wrapperRef} onClick={e => e.stopPropagation()}>
                {showInfoConfirmModal && <InfoConfirmModal continueTo={continueConfirmModal} handleClose={closeConfirmModal} show={true} children={modalContents.content} heading={modalContents.header}></InfoConfirmModal>}
                <span className="close-icon modal-detail__close" onClick={handleClose}></span>
                <div className="modal-detail__header modal-detail__header" style={{ fontSize: "24px", fontWeight: 600 }}>
                    {selectedSession == null ? <span>Create Session</span> : <span>Update Session</span>}
                </div>
                <div className="modal-detail__content">
                    <div className='form-group'>
                        <div className='form-group-col'>
                            {selectedClass == null ? <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                                <div className='form-column'>
                                    <label><span style={{ fontWeight: 'bold' }}>Step 01: </span>First Select The Class</label>
                                </div>
                                <div className='form-column'>

                                </div>
                            </div> : <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                                <div className='form-column'>
                                    <label><span style={{ fontWeight: 'bold' }}>Selected Class: </span>{selectedClass.classIdentifier}</label>
                                </div>
                                <div className='form-column'>

                                </div>
                            </div>
                            }
                            {selectedClass == null &&
                                <><div className='filter-box-row'>
                                    <div className='filter-box-column'>
                                        <FilterDropdown
                                            title="Course"
                                            selection={COURSE_SELECTION}
                                            defaultList={getCoursesList()}
                                            onItemChange={handleItemChange}
                                            initValue={""}
                                            editable={true} />
                                    </div>
                                    <div className='filter-box-column'>
                                        <FilterDropdown
                                            title="Level"
                                            selection={LEVEL_SELECTION}
                                            defaultList={getLevelsByCourse()}
                                            onItemChange={handleItemChange}
                                            initValue={""}
                                            editable={true} />
                                    </div>
                                    <div className='filter-box-column'>
                                        <FilterDropdown
                                            title="Subject"
                                            selection={SUBJECT_SELECTION}
                                            defaultList={getSubjectByCourseAndLevels()}
                                            onItemChange={handleItemChange}
                                            initValue={""}
                                            editable={true} />
                                    </div>
                                    <div className='filter-box-column'>
                                        <FilterDropdown
                                            title="Teacher"
                                            selection={TEACHER_SELECTION}
                                            defaultList={getTeachersList()}
                                            onItemChange={handleItemChange}
                                            initValue={""}
                                            editable={true} />
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
                                    <ReactTableFullWidthStyles>
                                        <ClassTable
                                            columns={classColumns}
                                            data={data}
                                            fetchData={fetchData}
                                            loading={loading}
                                            pageCount={pageCount}
                                            onRowSelect={(rows) => { selectClassProfile(rows) }}
                                            hiddenColumns={hiddenColumns}
                                            rowSelection={true}
                                            numberOfRecords={common.Classes?.totalNumberOfEntries}
                                        />
                                    </ReactTableFullWidthStyles>
                                </>
                            }

                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='form-group-col2' style={{ border: "1px solid #efefef", background: "#efefef" }}>
                            <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                                <div className='form-column'>
                                    <label><span style={{ fontWeight: 'bold' }}>Step 02: </span>Basic Information</label>
                                </div>
                                <div className='form-column'>

                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Start Time</div>
                                    <div className='item-dropdown'>
                                        <DateTimePicker
                                            title={""}
                                            initDateTime={startTime}
                                            onDateTimeChange={(dateTime, selection) => onDateTimeChange(dateTime, selection)}
                                        />
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Duration (Minitues)</div>
                                    <div className='item-dropdown'>
                                        <CustomInput
                                            initialValue={duration} type="number" updateInput={(value) => {
                                                updateDuration(value);
                                            }} fieldValidation={noNeedFieldValidation} required={true} placeHolder="Please enter class duration"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Virtual Link</div>
                                    <div className='item-dropdown'>
                                        <CustomInput
                                            initialValue={virtualLink} type="text" updateInput={(value) => {
                                                updateVirtualLink(value);
                                            }} fieldValidation={noNeedFieldValidation} required={true} placeHolder="Please paste online session link here"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='form-group-col2' style={{ border: "1px solid #efefef", background: "#efefef" }}>
                            <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                                <div className='form-column'>
                                    <label><span style={{ fontWeight: 'bold' }}>Step 03: </span>Select Auditorium</label>
                                </div>
                                <div className='form-column'>

                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Auditorium/Class Room</div>
                                    <div className='item-dropdown'>
                                        <CustomDropdown
                                            defaultList={getAuditoriumsList()}
                                            selection={CLASSROOM_SELECTION}
                                            onItemChange={handleItemChange}
                                            initValue={classRoom?.id}
                                            editable={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-detail__footer">
                    {selectedSession == null ? <button className="btn btn--success" onClick={() => { createNewSession() }}>
                        Create New Session
                    </button> : <button className="btn btn--success" onClick={() => { updateExistingSession() }}>
                        Update Session
                    </button>}
                </div>
            </section>
        </div>
    )
}