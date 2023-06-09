import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { ReactTableFullWidthStyles } from '../Custom/StyleComponents'
import { NewInstrcutor } from "./NewInstrcutor";
import FilterDropdown from "../Custom/FilterDropdown";
import { useSelector, useDispatch } from "react-redux";
import { GetTeachers, StartLoading, StopLoading } from '../../Redux/Features/Common/CommonServicesSlice';
import { ClassTable } from "../ClassManagement/Classes/Table/ClassTable";

const Instructors = props => {

    const COURSE_SELECTION = "COURSE_SELECTION";
    const LEVEL_SELECTION = "LEVEL_SELECTION";
    const SUBJECT_SELECTION = "SUBJECT_SELECTION";

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedRowOnTable, setSelectedRowOnTable] = useState(null);
    const [showTeacherCreationPopup, setShowTeacherCreationPopup] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(false)
    const [tablePageIndex, setTablePageIndex] = React.useState(0)
    const [tablePageSize, setTablePageSize] = React.useState(10)
    const [pageCount, setPageCount] = React.useState(0)

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);

    useEffect(() => {
        if(common.Teachers?.teachers != null){
            setData(common.Teachers?.teachers)
            setPageCount(Math.ceil(common.Teachers?.totalNumberOfEntries / tablePageSize))
        }
    }, [common.Teachers?.teachers])

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        var payload = {
            "courseId": selectedCourse?.id,
            "levelId": selectedLevel?.id,
            "subjectId": selectedSubject?.id,
            "pageSize": pageSize,
            "pageNumber":  pageIndex + 1
          }

        setLoading(true)
        setTablePageSize(pageSize);
        dispatch(StartLoading("Loading Teachers..", "GetTeachers"))
        dispatch(GetTeachers(payload, function (response, success) {
            setLoading(false)
            dispatch(StopLoading("GetTeachers"))
        }));
    }, [])

    const triggerCreateNewTeacher = () => {
        setSelectedTeacher(null)
        setShowTeacherCreationPopup(true)
    }

    const triggerUpdateTeacher = () => {
        setSelectedTeacher(selectedRowOnTable)
        setShowTeacherCreationPopup(true)
    }

    const closeTeacherCreationPopup = () => {
        setShowTeacherCreationPopup(false)
    }

    /**
     * Event handling for apply filters and retrive class data.
     */
    const handleApplyOnClick = () => {
        var payload = {
            "courseId": selectedCourse?.id,
            "levelId": selectedLevel?.id,
            "subjectId": selectedSubject?.id,
            "pageSize": tablePageSize,
            "pageNumber":  tablePageIndex + 1
        }
        dispatch(StartLoading("Loading Teachers..", "GetTeachers"))
        dispatch(GetTeachers(payload, function (response, success) {
            if (success) {
                //success handle
            } else {
                //error handle
            }
            dispatch(StopLoading("GetTeachers"))
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
            default:
                break;
        }
    };

    const hiddenColumns = ["id"];

    const columns = React.useMemo(
        () => [
            {
                Header: 'Teacher/Lecturer',
                id: 'teacher',
                accessor: data => {
                    return data.firstName + " " + data.lastName;
                },
                disableFilters: true
            },
            {
                Header: 'Classes',
                id: 'classes',
                disableFilters: true,
                accessor: data => {
                    const results = data.classes == null || data.classes.length == 0 ? [] : data.classes;
                    if (results.length > 0) {
                        return results.map(function (each) {
                            return (<p className="celltag"><span className="celltag--valid">{each.classIdentifier}</span></p>)
                        })
                    } else {
                        return (<p className="celltag"><span className="celltag--invalid">Not Allocated Yet</span></p>)
                    }
                }
            },
            {
                Header: 'Phone Number',
                id: 'level',
                disableFilters: true,
                accessor: data => {
                    return data.phoneNumber
                }
            },
            {
                Header: 'Profile',
                id: 'subject',
                disableFilters: true,
                accessor: data => {
                    const results = data.subjects == null || data.subjects == "" ? [] : data.subjects.split(",");
                    if (results.length > 0) {
                        return results.map(function (each) {
                            return (<span className="celltag--valid">{each}</span>)
                        })
                    } else {
                        return (<span className="celltag--invalid">Not Allocated Yet</span>)
                    }
                }
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


    const teacherSelectionOnTable = (rows) => {
        if (rows.length > 0) {
            setSelectedRowOnTable(rows[0].original)
        } else {
            setSelectedRowOnTable(null)
        }
    }


    return (
        <div className="classes-container">
            <div className='page-header'>
                <div className="add-record" onClick={() => triggerCreateNewTeacher()}>
                    <img src="/assets/icons/icon-add.svg" alt="Create New Teacher" />
                    <span>Create Teacher</span>
                </div>
                <div className={selectedRowOnTable != null ? "add-record" : "add-record--disabled"} onClick={() => triggerUpdateTeacher()} >
                    <img src="/assets/icons/update.png" alt="Update Class" style={{ width: "20px", height: "20px" }} />
                    <span>Update Teacher</span>
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
                    onRowSelect={(rows) => { teacherSelectionOnTable(rows) }}
                    hiddenColumns={hiddenColumns}
                    rowSelection={true}
                    numberOfRecords={common.Teachers?.totalNumberOfEntries}
                />
                {/* <CommonTable columns={columns} data={common.Teachers} onRowSelect={(rows) => { teacherSelectionOnTable(rows)}} hiddenColumns={hiddenColumns} rowSelection={true} /> */}
            </ReactTableFullWidthStyles>
            {showTeacherCreationPopup &&
                <NewInstrcutor show={showTeacherCreationPopup} handleReload={() => { }} handleClose={closeTeacherCreationPopup} selectedTeacher={selectedTeacher}></NewInstrcutor>
            }
        </div>
    );
};

export default Instructors;