import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { ClassesTable } from "./Table/ClassesTable";
import { ReactTableFullWidthStyles } from '../../Custom/StyleComponents'
import DropdownInput from "../../Custom/DropdownInput";
import { NewClass } from "./NewClass";

const Classes = props => {

    const [selectedClass, setSelectedClass] = useState(null)
    const [showClassCreationPopup, setShowClassCreationPopup] = useState(false)

    const hiddenColumns = ["id"];

    /**
     * 
     * @param {Object} item selected item of the dropdown list
     * @param {String} key used to selected desired dropdown component
     */
    const resetThenSet = (item, key) => {

    };

    const triggerStartNewClass = () => {
        console.log('test');
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
     * Update the state of selected transaction and show detail flag
     * @param {Object} row selected transaction
     * @param {Number} index index of transaction table
     */
    const showClassDetails = (row) => {
        window.open("classes/" + row.identifier)
    }

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
            "identifier": 'Konara Sinhala Class',
            "course": "G01-Sinhala",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "5-10",
            "classFee": "5-10"
        },
        {
            "identifier": 'Aruge Art Class',
            "course": "G01-Sinhala",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "5-10",
            "classFee": "5-10"
        },
        {
            "identifier": 'SajithPremadasa-Grade01-English',
            "course": "G01-English",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Sajith Premadasa",
            "classFee": "5-10"
        },
        {
            "identifier": 'Konara Sinhala Class',
            "course": "G01-Sinhala",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Konara",
            "classFee": "5-10"
        },
        {
            "identifier": 'Konara Sinhala Class',
            "course": "G01-Sinhala",
            "level": "Grade 01",
            "subject": "Sinhala",
            "teacher": "Konara",
            "classFee": "5-10"
        },
        {
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


    return (
        <div className="classes-container">
            <div className='page-header'>
                <div className="add-record" onClick={() => triggerStartNewClass()}>
                    <img src="/assets/icons/icon-add.svg" alt="Start New Class" />
                    <span>Start new Class</span>
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
                <ClassesTable columns={columns} data={data} onRowSelect={(rows) => { }} hiddenColumns={hiddenColumns} rowSelection={true} />
            </ReactTableFullWidthStyles>
            {showClassCreationPopup &&
                <NewClass show={showClassCreationPopup} handleReload={() => { }} handleClose={closeClassCreationPopup} selectedClass={selectedClass}></NewClass>
            }
        </div>
    );
};

export default Classes;