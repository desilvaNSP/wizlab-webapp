import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { CommonTable } from "../CommonTable/CommonTable";
import { ClassesTable } from "../ClassManagement/Classes/Table/ClassesTable";
import { ReactTableFullWidthStyles } from '../Custom/StyleComponents'
import { NewInstrcutor } from "./NewInstrcutor";
import FilterDropdown from "../Custom/FilterDropdown";
import { useSelector, useDispatch } from "react-redux";
import { GetTeachers, ShowLoading, StopLoading } from '../../Redux/Features/Common/CommonServicesSlice';

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
            setPageCount(Math.ceil(common.Teachers?.teachers?.totalNumberOfEntries / tablePageSize))
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
        //dispatch(ShowLoading("Loading Classes.."))
        dispatch(GetTeachers(payload, function (response, success) {
            setLoading(false)
            //dispatch(StopLoading())
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
        dispatch(ShowLoading("Loading Teachers.."))
        dispatch(GetTeachers(payload, function (response, success) {
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
                disableFilters: false
            },
            {
                Header: 'Course/Program',
                id: 'course',
                accessor: data => {
                    const results = data.course == null || data.course == "" ? [] : data.course.split(",");
                    if (results.length > 0) {
                        return results.map(function (each) {
                            return (<span className="celltag--valid">{each}</span>)
                        })
                    } else {
                        return (<span className="celltag--invalid">Not Allocated Yet</span>)
                    }
                },
                disableFilters: true
            },
            {
                Header: 'Level/Grade',
                id: 'level',
                accessor: data => {
                    const results = data.level == null || data.level == "" ? [] : data.level.split(",");
                    if (results.length > 0) {
                        return results.map(function (each) {
                            return (<span className="celltag--valid">{each}</span>)
                        })
                    } else {
                        return (<span className="celltag--invalid">Not Allocated Yet</span>)
                    }
                },
                disableFilters: true
            },
            {
                Header: 'Subject',
                id: 'subject',
                accessor: data => {
                    const results = data.subject == null || data.subject == "" ? [] : data.subject.split(",");
                    if (results.length > 0) {
                        return results.map(function (each) {
                            return (<span className="celltag--valid">{each}</span>)
                        })
                    } else {
                        return (<span className="celltag--invalid">Not Allocated Yet</span>)
                    }
                },
                disableFilters: false
            }
        ],
        []
    )

    // const columns = React.useMemo(
    //     () => [
    //         {
    //             Header: 'Teacher/Lecturer',
    //             accessor: data => {
    //                 return data.teacher?.firstName + " " + data.teacher?.lastName
    //             },
    //             disableFilters: false
    //         },
    //         {
    //             Header: 'Course/Program',
    //             id: 'course',
    //             accessor: data => {
    //                 const results = data.course == null || data.course == "" ? [] : data.course.split(",");
    //                 if (results.length > 0) {
    //                     return results.map(function (each) {
    //                         return (<span className="celltag--valid">{each}</span>)
    //                     })
    //                 } else {
    //                     return (<span className="celltag--invalid">Not Allocated Yet</span>)
    //                 }
    //             },
    //             disableFilters: true
    //         },
    //         {
    //             Header: 'Level/Grade',
    //             id: 'level',
    //             accessor: data => {
    //                 const results = data.level == null || data.level == "" ? [] : data.level.split(",");
    //                 if (results.length > 0) {
    //                     return results.map(function (each) {
    //                         return (<span className="celltag--valid">{each}</span>)
    //                     })
    //                 } else {
    //                     return (<span className="celltag--invalid">Not Allocated Yet</span>)
    //                 }
    //             },
    //             disableFilters: true
    //         },
    //         {
    //             Header: 'Subject',
    //             id: 'subject',
    //             accessor: data => {
    //                 const results = data.subject == null || data.subject == "" ? [] : data.subject.split(",");
    //                 if (results.length > 0) {
    //                     return results.map(function (each) {
    //                         return (<span className="celltag--valid">{each}</span>)
    //                     })
    //                 } else {
    //                     return (<span className="celltag--invalid">Not Allocated Yet</span>)
    //                 }
    //             },
    //             disableFilters: false
    //         }
    //     ],
    //     []
    // )

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
            {common.IsLoading &&
                <div className="main-loader"  >
                    <img src="/assets/images/loading.svg" alt="loader" />
                    <div className="main-loader__txt">{common.LoadingMessage}</div>
                </div>
            }
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
            <ClassesTable
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    onRowSelect={(rows) => { teacherSelectionOnTable(rows) }}
                    hiddenColumns={hiddenColumns}
                    rowSelection={true}
                    numberOfRecords={common.Teachers?.teachers?.totalNumberOfEntries}
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