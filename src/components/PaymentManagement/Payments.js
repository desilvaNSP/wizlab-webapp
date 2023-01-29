import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import DropdownInput from "../Custom/DropdownInput"
import { CommonTable } from "../CommonTable/CommonTable";
import { ReactEditableTableFullWidthStyles } from "../Custom/StyleComponents";
import { EditableInputTextCell } from "../Custom/Editable";
import { SelectActiveInactiveColumnFilter } from "../Custom/Filters";

const Payments = props => {

    const hiddenColumns = ["id"];

    const columns = React.useMemo(
        () => [
            {
                Header: 'Mobile Number',
                accessor: 'mobile',
                disableFilters: true
            },
            {
                Header: 'Student Code',
                accessor: 'studentno',
                disableFilters: true
            },
            {
                Header: 'Student Name',
                accessor: 'studentname',
                disableFilters: true
            },
            {
                Header: 'Month',
                accessor: 'month',
                disableFilters: true
            },
            {
                Header: 'Due Date',
                accessor: 'duedate',
                disableFilters: true
            },
            {
                Header: 'Class',
                accessor: 'class',
                disableFilters: true
            },
            {
                Header: 'Due Amount',
                accessor: 'dueamount',
                disableFilters: true
            },
            {
                Header: 'Pending Amount',
                accessor: 'pendigamount',
                disableFilters: false
            },
            {
                Header: 'Paying Amount',
                id: 'pay',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={()=> {}} dropList={null}  autoComplete={false}></EditableInputTextCell>
                    )
                }
            },
            {
                Header: 'Status',
                accessor: 'status',
                Filter: ({column: { filterValue, setFilter, preFilteredRows, id }}) => {
                    return (
                        <SelectActiveInactiveColumnFilter filterValue={filterValue} setFilter={setFilter} preFilteredRows={preFilteredRows}  id={id}></SelectActiveInactiveColumnFilter>
                    )
                },
                filter: 'includes',
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

    /**
     * 
     * @param {Object} item selected item of the dropdown list
     * @param {String} key used to selected desired dropdown component
     */
    const resetThenSet = (item, key) => {

    };

    /**
     * Event handling for apply filters and retrive class data.
     */
    const handleApplyOnClick = () => {
        alert("load classes data")
    };

    return (
        <div className="classes-container">
            <div className='page-header'>

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
            <ReactEditableTableFullWidthStyles>
                <CommonTable columns={columns} data={data} onRowSelect={(rows) => { }} hiddenColumns={hiddenColumns} rowSelection={true} />
            </ReactEditableTableFullWidthStyles>
        </div>
    );
};

export default Payments;