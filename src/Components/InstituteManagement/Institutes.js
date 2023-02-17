import React, { useState } from "react";
import { useSelector } from "react-redux";
import 'react-tabs/style/react-tabs.css';
import { CommonTable } from "../CommonTable/CommonTable";
import FilterDropdown from "../Custom/FilterDropdown";
import { ReactTableFullWidthStyles } from '../Custom/StyleComponents'
import { NewInstitute } from "./NewInstitute";

const Institutes = props => {

    const [selectedClass, setSelectedClass] = useState(null)
    const [showClassCreationPopup, setShowClassCreationPopup] = useState(false)

    const hiddenColumns = ["id"];

    const common = useSelector((state) => state.common);
    /**
     * 
     * @param {Object} item selected item of the dropdown list
     * @param {String} key used to selected desired dropdown component
     */
    const resetThenSet = (item, key) => {

    };

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


    return (
        <div className="classes-container">
            {common.IsLoading &&
                <div className="main-loader"  >
                    <img src="assets/images/loading.svg" alt="loader" />
                    <div className="main-loader__txt">{common.LoadingMessage}</div>
                </div>
            }
            <div className='page-header'>
                <div className="add-record" onClick={() => triggerStartNewClass()}>
                    <img src="/assets/icons/icon-add.svg" alt="Start New Class" />
                    <span>Create Institute</span>
                </div>
                <div className="add-record" onClick={() => triggerStartNewClass()} >
                    <img src="/assets/icons/update.png" alt="Update Class" style={{ width: "20px", height: "20px" }} />
                    <span>Update Institute</span>
                </div>
            </div>
            <div className='classes-filter-box'>
                <div className='filter-box-row'>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            defaultList={[]}
                            onItemChange={(item) => {
                            }}
                            initValue={""}
                            editable={true} />
                    </div>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            defaultList={[]}
                            onItemChange={(item) => {
                            }}
                            initValue={"Teacher"}
                            editable={false} />
                    </div>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            defaultList={[]}
                            onItemChange={(item) => {
                            }}
                            initValue={"Teacher"}
                            editable={false} />
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
                <CommonTable columns={columns} data={data} onRowSelect={(rows) => { }} hiddenColumns={hiddenColumns} rowSelection={true} />
            </ReactTableFullWidthStyles>
            {showClassCreationPopup &&
                <NewInstitute show={showClassCreationPopup} handleReload={() => { }} handleClose={closeClassCreationPopup} selectedClass={selectedClass}></NewInstitute>
            }
        </div>
    );
};

export default Institutes;