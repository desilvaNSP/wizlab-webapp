import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import makeData from '../MakeData'
import { CommonTable } from "../Table/CommonTable";
import { ReactTableFullWidthStyles } from '../../../custom/StyleComponents'
import DropdownInput from "../../../custom/DropdownInput";
import { NewCourse } from "./NewCourse";

const Courses = props => {

    const [selectedClass, setSelectedClass] = useState(null)
    const [showClassCreationPopup, setShowClassCreationPopup] = useState(false)

    const hiddenColumns = ["id"];

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Profile Progress',
                        accessor: 'progress',
                    },
                ],
            },
        ],
        []
    )

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

    const data = React.useMemo(() => makeData(20), [])

    return (
        <div className="classes-container">
            <div className='page-header'>
                <div className="add-record" onClick={() => triggerStartNewClass()}>
                    <img src="/assets/icons/icon-add.svg" alt="Start New Course" />
                    <span>Start New Course</span>
                </div>
                <div className="add-record" onClick={() => triggerStartNewClass()} >
                    <img src="/assets/icons/update.png" alt="Update Course" style={{width:"20px", height:"20px"}}/>
                    <span>Update Course</span>
                </div>
            </div>
            <div className='classes-filter-box'>
                <div className='filter-box-row'>
                    <div className='filter-box-column'>
                        <DropdownInput
                            title="Category"
                            list={[]}
                            resetThenSet={resetThenSet}
                            selection={1}
                            defaultValue={false}
                        />
                    </div>
                    <div className='filter-box-column'>
                        <DropdownInput
                            title="Age Range"
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
                <CommonTable columns={columns} data={data} onRowSelect={(rows) => { }} hiddenColumns={hiddenColumns} rowSelection={true} />
            </ReactTableFullWidthStyles>
            {showClassCreationPopup &&
                <NewCourse show={showClassCreationPopup} handleReload={() => { }} handleClose={closeClassCreationPopup} selectedClass={selectedClass}></NewCourse>
            }
        </div>
    );
};

export default Courses;