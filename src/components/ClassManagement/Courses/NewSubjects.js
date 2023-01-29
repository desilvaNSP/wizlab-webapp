import React, { useState, useRef, useEffect } from 'react'
import { EditableInputTextCell } from '../../Custom/Editable';
import { ReactEditableTableFullWidthStyles } from '../../Custom/StyleComponents';
import { SubjectsTable } from './Table/SubjectsTable';

export const NewSubjects = props => {
    const { selectedLevel, selectedCourse } = props
    //const auth = useSelector((state) => state.auth);


    // useDispatch() hook is equivalent of mapDispatchToProps.
    //const dispatch = useDispatch();

    // useEffect(() => {

    // }, [])

    // listener for the add new row on the table.
    // added new row at the top of the table.
    const addNewRow = () => {
        // var newData = [
        //     {
        //         "id": "PENDING",
        //         "terminalId": 1,
        //         "networkAppVersionId": 0,
        //         "networkAppVersion": null,
        //         "networkAppInstallationTriggerTypeId": 1,
        //         "merchantNetworkProfileId": 0,
        //         "merchantNetworkProfile": null,
        //         "addedBy": auth.AdminUser,
        //         "modifiedBy": auth.AdminUser,
        //         "addedDate": "",
        //         "modifiedDate": "",
        //         "new": true
        //     }
        // ]
        // var newDataSet = [...newData, ...data]
        // setData(newDataSet);
    }

    const hiddenColumns = ["id"];

    const columns = React.useMemo(
        () => [
            {
                Header: 'Subject Code',
                accessor: 'subjectCode',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={() => { }} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            },
            {
                Header: 'Subject Name',
                accessor: 'subjectName',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={() => { }} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            },
            {
                Header: 'Level/Grade',
                accessor: 'level',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={() => { }} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            },
            {
                Header: 'Age Range',
                accessor: 'ageRange',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={() => { }} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            },
        ],
        []
    )

    const data = [
        {
            "subjectCode": "G01-Sinhala",
            "subjectName": "Sinhala",
            "level": "Grade 01",
            "ageRange": "5-10"
        },
        {
            "subjectCode": "G01-English",
            "subjectName": "English",
            "level": "Grade 01",
            "ageRange": "5-10"
        },
        {
            "subjectCode": "G02-Sinhala",
            "subjectName": "Sinhala",
            "level": "Grade 02",
            "ageRange": "5-10"
        }
    ]

    return (
        <div className='subject-container'>
            <div className='table-actions-box'>
                <div className="table-add-row" onClick={() => addNewRow()} title="Add Terminal Network">
                    <img src="assets/icons/icon-add.svg" alt="Add Terminal Network" />
                </div>
                <div className="table-add-row" onClick={() => { }} title="Reset Data">
                    <img src="assets/icons/icons-reset.png" alt="Reset Data" />
                </div>
            </div>
            <ReactEditableTableFullWidthStyles>
                <SubjectsTable columns={columns} data={data} onRowSelect={(rows) => { }} hiddenColumns={hiddenColumns} updateMyData={() => { }} skipPageReset={() => { }} />
            </ReactEditableTableFullWidthStyles>
        </div>
    )
}