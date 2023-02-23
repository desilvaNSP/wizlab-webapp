import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { ReactTableFullWidthStyles } from '../../Custom/StyleComponents'
import { NewClass } from "./NewClass";
import FilterDropdown from "../../Custom/FilterDropdown";
import { useSelector, useDispatch } from "react-redux";
import { GetClasses, StartLoading, StopLoading } from "../../../Redux/Features/Common/CommonServicesSlice";
import { ClassTable } from "./Table/ClassTable";

const Classes = props => {

    const COURSE_SELECTION = "COURSE_SELECTION";
    const LEVEL_SELECTION = "LEVEL_SELECTION";
    const SUBJECT_SELECTION = "SUBJECT_SELECTION";
    const TEACHER_SELECTION = "TEACHER_SELECTION";

    const [selectedClass, setSelectedClass] = useState(null)
    const [selectedRowOnTable, setSelectedRowOnTable] = useState(null)
    const [showClassCreationPopup, setShowClassCreationPopup] = useState(false)

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(false)
    const [tablePageIndex, setTablePageIndex] = React.useState(0)
    const [tablePageSize, setTablePageSize] = React.useState(10)
    const [pageCount, setPageCount] = React.useState(0)

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);

    useEffect(() => {
        if(common.Classes != null){
            setData(common.Classes?.classes)
            setPageCount(Math.ceil(common.Classes?.totalNumberOfEntries / tablePageSize))
        }
    }, [common.Classes])

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        var payload = {
            "courseId": selectedCourse?.id,
            "levelId": selectedLevel?.id,
            "subjectId": selectedSubject?.id,
            "teacherId": selectedTeacher?.id,
            "pageSize": pageSize,
            "pageNumber":  pageIndex + 1
          }

        setLoading(true)
        setTablePageSize(pageSize);
        dispatch(StartLoading("Loading Classes..", "GetClasses"))
        dispatch(GetClasses(payload, function (response, success) {
            setLoading(false)
            dispatch(StopLoading("GetClasses"))
        }));
    }, [])

    const triggerStartNewClass = () => {
        setSelectedClass(null)
        setShowClassCreationPopup(true)
    }

    const triggerUpdateClass = () => {
        setSelectedClass(selectedRowOnTable)
        setShowClassCreationPopup(true)
    }

    const closeClassCreationPopup = () => {
        setShowClassCreationPopup(false)
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
            "pageSize": tablePageSize,
            "pageNumber":  tablePageIndex + 1
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
            default:
                break;
        }
    };

    /**
     * Update the state of selected transaction and show detail flag
     * @param {Object} row selected transaction
     * @param {Number} index index of transaction table
     */
    const showClassDetails = (row) => {
        window.open("classes/" + row.id)
    }

    const hiddenColumns = ["id"];

    const columns = React.useMemo(
        () => [
            {
                Header: 'Class Name',
                accessor: 'classIdentifier',
                disableFilters: true,
                Cell: row => {
                    return (
                        <React.Fragment>
                            <a className="datatable--link" onClick={() => showClassDetails(row.row.original)}>{row.cell.value}</a>
                        </React.Fragment>
                    )
                }
            },
            {
                Header: 'Course/Program',
                accessor: 'course',
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

    const classSelectionOnTable = (rows) => {
        if (rows.length > 0) {
            setSelectedRowOnTable(rows[0].original)
        } else {
            setSelectedRowOnTable(null)
        }
    }

    return (
        <div className="classes-container">
            <div className='page-header'>
                <div className="add-record" onClick={() => triggerStartNewClass()}>
                    <img src="/assets/icons/icon-add.svg" alt="Start New Class" />
                    <span>Create new Class</span>
                </div>
                <div className={selectedRowOnTable != null ? "add-record" : "add-record--disabled"} onClick={() => triggerUpdateClass()} >
                    <img src="/assets/icons/update.png" alt="Update Class" style={{ width: "20px", height: "20px", marginRight: "8px" }} />
                    <span>Update Class</span>
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
                <ClassTable
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    onRowSelect={(rows) => { classSelectionOnTable(rows) }}
                    hiddenColumns={hiddenColumns}
                    rowSelection={true}
                    numberOfRecords={common.Classes?.totalNumberOfEntries}
                />
            </ReactTableFullWidthStyles>
            {showClassCreationPopup &&
                <NewClass show={showClassCreationPopup} handleReload={() => { }} handleClose={closeClassCreationPopup} selectedClass={selectedClass}></NewClass>
            }
        </div>
    );
};

export default Classes;