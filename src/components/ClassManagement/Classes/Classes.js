import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { ClassesTable } from "./Table/ClassesTable";
import { ReactTableFullWidthStyles } from '../../Custom/StyleComponents'
import DropdownInput from "../../Custom/DropdownInput";
import { NewClass } from "./NewClass";
import { useDispatch, useSelector } from "react-redux";

const Classes = props => {

    const COURSE_SELECTION = "COURSE_SELECTION";
    const LEVEL_SELECTION = "LEVEL_SELECTION";
    const SUBJECT_SELECTION = "SUBJECT_SELECTION";
    const TEACHER_SELECTION = "TEACHER_SELECTION";

    const [selectedClass, setSelectedClass] = useState(null)
    const [showClassCreationPopup, setShowClassCreationPopup] = useState(false)

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);

    const triggerStartNewClass = () => {
        setShowClassCreationPopup(true)
    }

    const closeClassCreationPopup = () => {
        setShowClassCreationPopup(false)
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
        switch (key) {
            case COURSE_SELECTION:
                setSelectedCourse(item !== null ? item : null);
                break;
            case LEVEL_SELECTION:
                setSelectedLevel(item !== null ? item : null)
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
                Header: 'Identifier',
                accessor: 'identifier',
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

    const getCoursesList = () => {
        let coursesList = [];
        common.Courses?.forEach((course, index) => {
            let obj = {
                id: course.id,
                title: course.name,
                description: course.name,
                code: course.id
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
                title: level.desc,
                description: level.desc,
                code: level.id
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
                title: subject.title,
                description: selectedLevel.desc + "-" + subject.title,
                code: subject.id
            };
            subjectList.push(obj);
        });
        return subjectList;
    }

    return (
        <div className="classes-container">
            <div className='page-header'>
                <div className="add-record" onClick={() => triggerStartNewClass()}>
                    <img src="/assets/icons/icon-add.svg" alt="Start New Class" />
                    <span>Create new Class</span>
                </div>
                <div className="add-record" onClick={() => triggerStartNewClass()} >
                    <img src="/assets/icons/update.png" alt="Update Class" style={{ width: "20px", height: "20px" }} />
                    <span>Update Class</span>
                </div>
            </div>
            <div className='classes-filter-box'>
                <div className='filter-box-row'>
                    <div className='filter-box-column'>
                        <DropdownInput
                            title="Course"
                            list={getCoursesList()}
                            resetThenSet={resetThenSet}
                            selection={COURSE_SELECTION}
                            defaultValue={false}
                        />
                    </div>
                    <div className='filter-box-column'>
                        <DropdownInput
                            title="Level"
                            list={[getLevelsByCourse()]}
                            resetThenSet={resetThenSet}
                            selection={LEVEL_SELECTION}
                            defaultValue={false}
                        />
                    </div>
                    <div className='filter-box-column'>
                        <DropdownInput
                            title="Subject"
                            list={getSubjectByCourseAndLevels()}
                            resetThenSet={resetThenSet}
                            selection={SUBJECT_SELECTION}
                            defaultValue={false}
                        />
                    </div>
                    <div className='filter-box-column'>
                        <DropdownInput
                            title="Teacher"
                            list={[]}
                            resetThenSet={resetThenSet}
                            selection={TEACHER_SELECTION}
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
                <ClassesTable columns={columns} data={data} onRowSelect={(rows) => { }} hiddenColumns={hiddenColumns} rowSelection={true} />
            </ReactTableFullWidthStyles>
            {showClassCreationPopup &&
                <NewClass show={showClassCreationPopup} handleReload={() => { }} handleClose={closeClassCreationPopup} selectedClass={selectedClass}></NewClass>
            }
        </div>
    );
};

export default Classes;