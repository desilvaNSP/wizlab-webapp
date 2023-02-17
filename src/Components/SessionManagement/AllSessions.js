import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";
import { GetSessions, StartLoading, StopLoading } from "../../Redux/Features/Common/CommonServicesSlice";
import { ReactTableFullWidthStyles } from '../Custom/StyleComponents'
import * as dateFns from "date-fns";
import { NewSession } from "../ClassManagement/Classes/NewSession";
import EventLayout from "../ClassManagement/Classes/EventLayout";
import FilterDropdown from "../Custom/FilterDropdown";
import { DateTimePicker } from "../Custom/DateTimePicker";
import { SessionsTable } from "./Table/SessionsTable";
import { format } from "date-fns/esm";

const AllSessions = ({ }) => {

    const COURSE_SELECTION = "COURSE_SELECTION";
    const LEVEL_SELECTION = "LEVEL_SELECTION";
    const SUBJECT_SELECTION = "SUBJECT_SELECTION";
    const TEACHER_SELECTION = "TEACHER_SELECTION";
    const STARTDATE_SELECTION = "STARTDATE_SELECTION";
    const ENDDATE_SELECTION = "ENDDATE_SELECTION";

    var formatDateString = "yyyy-MM-dd";

    const [data, setData] = useState([])
    const [showSessionCreationPopup, setShowSessionCreationPopup] = useState(false)
    const [selectedSession, setSelectedSession] = useState([])
    const [selectedRowOnTable, setSelectedRowOnTable] = useState(null)

    var today = new Date();
    var defaultStartDate = new Date(format(today, formatDateString) + "T" + "00:00:00")
    var defaultEndDate = new Date(format(today.setDate(today.getDate() + 7), formatDateString) + "T" + "23:59:00")

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [startDate, setStartDate] = useState(defaultStartDate)
    const [endDate, setEndDate] = useState(defaultEndDate)

    const [loading, setLoading] = React.useState(false)
    const [tablePageSize, setTablePageSize] = React.useState(10)
    const [pageCount, setPageCount] = React.useState(0)

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        var payload = {
            "courseId": selectedCourse?.id,
            "levelId": selectedLevel?.id,
            "subjectId": selectedSubject?.id,
            "teacherId": selectedTeacher?.id,
            "startDate": startDate,
            "endDate": endDate,
            "pageSize": pageSize,
            "pageNumber": pageIndex + 1
        }
        setTablePageSize(pageSize)
        dispatch(StartLoading("Retrieving all sessions"))
        dispatch(GetSessions(payload, function (data, success) {
            if (success) {
                setData(data.sessions)
                setPageCount(Math.ceil(data.totalNumberOfEntries / tablePageSize))
            }
            dispatch(StopLoading())
        }));
    }, [])

    const triggerStartSession = () => {
        setSelectedSession(null)
        setShowSessionCreationPopup(true)
    }

    const triggerUpdateClass = () => {
        setSelectedSession(selectedRowOnTable);
        setShowSessionCreationPopup(true)
    }

    const closeSessionCreationPopup = () => {
        setShowSessionCreationPopup(false)
    }

    const selectSession = (rows) => {
        // if any transaction is not set, then set null to selectedTransaction state.
        if (rows.length > 0) {
            setSelectedRowOnTable(rows[0].original)
        } else {
            setSelectedRowOnTable(null)
        }
    }

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex(ex: 9), columnId(ex: merchantName) and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value, validity) => {
        var dataUpdated = data.map((row, index) => {
            if (index === rowIndex) {
                var updatedRow = {
                    ...data[rowIndex],
                    [columnId]: value,
                    ["updated"]: true
                }
                return updatedRow
            }
            return row
        })
        setData(dataUpdated)
    }


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
                setSelectedCourse(courseObj !== null ? courseObj : null);
                break;
            case LEVEL_SELECTION:
                var levelObj = null
                selectedCourse?.levels.forEach((level, index) => {
                    if (level.id == item.id) {
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
            default:
                break;
        }
    };

    /**
    * Props event handler which is used in calender component
    * @param {Date} val selected date information
    * @param {String} selection used to selected desired calender component
    */
    const onDateTimeChange = (val, selection) => {
        switch (selection) {
            case STARTDATE_SELECTION:
                setStartDate(val)
                break;
            case ENDDATE_SELECTION:
                setEndDate(val)
                break;
            default:
                break;
        }
    }

    /**
     * Event handling for apply filters and retrive class data.
     */
    const handleApplyOnClick = () => {
        var payload = {
            "courseId": selectedCourse?.id,
            "levelId": selectedLevel?.id,
            "subjectId": selectedSubject?.id,
            "teacherId": selectedTeacher?.id,
            "startDate": startDate,
            "endDate": endDate,
            "pageSize": tablePageSize,
            "pageNumber": 1
        }
        dispatch(StartLoading("Retrieving all sessions"))
        dispatch(GetSessions(payload, function (data, success) {
            if (success) {
                setData(data.sessions)
                setPageCount(Math.ceil(data.totalNumberOfEntries / tablePageSize))
            }
            dispatch(StopLoading())
        }));
    };


    const hiddenColumns = ["id"];

    var formatDate = "yyyy-MM-dd HH:mm:ss";


    const columns = React.useMemo(
        () => [
            {
                Header: 'Class Room',
                id: 'classIdentifier',
                accessor: data => {
                    return data.classRoom?.desc
                },
                disableFilters: true
            },
            {
                Header: 'Class Room',
                id: 'classRoomId',
                accessor: data => {
                    return data.classRoom?.desc
                },
                disableFilters: true
            },
            {
                Header: 'Room Capacity',
                id: 'capacity',
                accessor: data => {
                    return data.classRoom?.capacity
                },
                disableFilters: true
            },
            {
                Header: 'Start Time',
                id: 'startTime',
                accessor: data => {
                    return dateFns.format(new Date(data.startTime), formatDate)
                },
                disableFilters: true
            },
            {
                Header: 'Duration',
                accessor: 'duration',
                disableFilters: true
            },
            {
                Header: 'Link',
                accessor: 'link',
                disableFilters: false
            }
        ],
        []
    )

    return (
        <div className="classes-container">
            {common.IsLoading &&
                <div className="main-loader"  >
                    <img src="/assets/images/loading.svg" alt="loader" />
                    <div className="main-loader__txt">{common.LoadingMessage}</div>
                </div>
            }
            <div className='page-header'>
                <div className="add-record" onClick={() => triggerStartSession()}>
                    <img src="/assets/icons/icon-add.svg" alt="Start New Class" />
                    <span>Create Session</span>
                </div>
                <div className={selectedRowOnTable != null ? "add-record" : "add-record--disabled"} onClick={() => triggerUpdateClass()} >
                    <img src="/assets/icons/update.png" alt="Update Class" style={{ width: "20px", height: "20px", marginRight: "8px" }} />
                    <span>Update Session</span>
                </div>
            </div>
            <div className='classes-filter-box'>
                <div className='filter-box-row'>
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
                </div>
                <div className='filter-box-row'>
                    <div className='filter-box-column'>
                        <DateTimePicker
                            title={"Start Date"}
                            initDateTime={startDate}
                            selection={STARTDATE_SELECTION}
                            onDateTimeChange={(dateTime, selection) => onDateTimeChange(dateTime, selection)}
                        />
                    </div>
                    <div className='filter-box-column'>
                        <DateTimePicker
                            title={"End Date"}
                            initDateTime={endDate}
                            selection={ENDDATE_SELECTION}
                            onDateTimeChange={(dateTime, selection) => onDateTimeChange(dateTime, selection)}
                        />
                    </div>
                    <div className='filter-box-column'>
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
            <Tabs>
                <TabList>
                    <Tab>Table View</Tab>
                    <Tab>Grid View</Tab>
                </TabList>
                <TabPanel>
                    <div className="classes-container">
                        <div className='page-header'>
                            Sessions
                        </div>
                        <ReactTableFullWidthStyles>
                            <SessionsTable
                                columns={columns}
                                data={data}
                                onRowSelect={selectSession}
                                hiddenColumns={hiddenColumns}
                                rowSelection={true}
                                fetchData={fetchData}
                                loading={loading}
                                pageCount={pageCount}
                                updateMyData={updateMyData}
                                numberOfRecords={pageCount} />
                        </ReactTableFullWidthStyles>
                    </div>
                </TabPanel>
                <TabPanel>
                    <EventLayout data={data}></EventLayout>
                </TabPanel>
            </Tabs>
            {showSessionCreationPopup &&
                <NewSession show={showSessionCreationPopup} handleReload={() => { }} handleClose={closeSessionCreationPopup} selectedSession={selectedSession}></NewSession>
            }
        </div>
    );
};

export default AllSessions;