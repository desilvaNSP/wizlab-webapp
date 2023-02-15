import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { CommonTable } from "../CommonTable/CommonTable";
import FilterDropdown from "../Custom/FilterDropdown";
import { ReactTableFullWidthStyles } from '../Custom/StyleComponents'
import { NewInstrcutor } from "./NewInstrcutor";
import { useSelector } from "react-redux";

const Instructors = props => {

    const COURSE_SELECTION = "COURSE_SELECTION";
    const LEVEL_SELECTION = "LEVEL_SELECTION";
    const SUBJECT_SELECTION = "SUBJECT_SELECTION";

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null)
    const [selectedRowOnTable, setSelectedRowOnTable] = useState(null)
    const [showTeacherCreationPopup, setShowTeacherCreationPopup] = useState(false)

    const common = useSelector((state) => state.common);

    const hiddenColumns = ["id"];

    const triggerStartNewTeacher = () => {
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
        alert("load teacher data")
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
                console.log("selectedCourse MM", selectedCourse)
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

    const columns = React.useMemo(
        () => [
            {
                Header: 'Teacher/Lecturer',
                accessor: 'teacher',
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



    const data = [
        {
            "course": "Year 05 Schoolarship Program",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Sandun Priyanka"
        },
        {
            "course": "Year 05 Schoolarship Program",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Asitha Gunathilaka"
        },
        {
            "course": "Year 05 Schoolarship Program",
            "level": "",
            "subject": "",
            "teacher": "Sajith Premadasa"
        },
        {
            "course": "Year 05 Schoolarship Program, IT Program",
            "level": "Grade 01",
            "subject": "Sinhala, Tamil",
            "teacher": "Konarage Lasitha",
        },
        {
            "course": "Year 05 Schoolarship Program, IT Program",
            "level": "Grade 01",
            "subject": "Sinhala, Maths",
            "teacher": "Suriyapperumage Laaahiruni",
        },
        {
            "course": "",
            "level": "",
            "subject": "",
            "teacher": "Surya Kumar Yadav",
        },
        {
            "course": "Year 05 Schoolarship Program",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Buddhika Puthaa"
        }
    ]


    const teacherSelectionOnTable = (rows) => {
        if (rows.length > 0) {
            console.log(rows[0].original)
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
                <div className="add-record" onClick={() => triggerStartNewTeacher()}>
                    <img src="/assets/icons/icon-add.svg" alt="Start New Class" />
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
                <CommonTable columns={columns} data={common.Teachers} onRowSelect={(rows) => { teacherSelectionOnTable(rows)}} hiddenColumns={hiddenColumns} rowSelection={true} />
            </ReactTableFullWidthStyles>
            {showTeacherCreationPopup &&
                <NewInstrcutor show={showTeacherCreationPopup} handleReload={() => { }} handleClose={closeTeacherCreationPopup} selectedTeacher={selectedTeacher}></NewInstrcutor>
            }
        </div>
    );
};

export default Instructors;