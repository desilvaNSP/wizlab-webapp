import React, { useState } from 'react'
import { EditableInputTextCell } from '../../Custom/Editable';
import { ReactEditableTableFullWidthStyles } from '../../Custom/StyleComponents';
import { SubjectsTable } from './Table/SubjectsTable';
import closeIcon from '../../Custom/icons/close-icon.svg'

export const NewSubjects = props => {
    const { selectedLevel, levelInex, updateLevel } = props
    const [data, setData] = useState(selectedLevel.subjects)

    // listener for the add new row on the table.
    // added new row at the top of the table.
    const addNewRow = () => {
        var newData = [
            {
                "subjectCode": "",
                "title": "",
                "medium": "",
                "credits": "",
                "new": true
            }
        ]
        var newDataSet = [...newData, ...data]
        setData(newDataSet);
    }

    const deleteRecord = (row) => {
        console.log(row)
    }


    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex(ex: 9), columnId(ex: merchantName) and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        var dataUpdated = data.map((row, index) => {
            if (index === rowIndex) {
                var updatedRow = {
                    ...data[rowIndex],
                    [columnId]: value,
                    ["updated"]: true
                }
                return updatedRow
            }
            return row
        })
        setData(dataUpdated)
        updateLevel({
            "desc": selectedLevel.desc,
            "subjects": dataUpdated
        }, levelInex)
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
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            },
            {
                Header: 'Subject Name',
                accessor: 'title',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            },
            {
                Header: 'Medium',
                accessor: 'medium',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            },
            {
                Header: 'Credits',
                accessor: 'credits',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell type='number' initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData} dbUpdate={false} isLink={true} linkClickEvent={() => { }}></EditableInputTextCell>
                    )
                }
            },
            {
                Header: '',
                id: 'deleteOption',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <div className="table-row--delete" onClick={() => { deleteRecord(row) }}>
                            <img src={closeIcon}/>
                        </div>
                    )
                }
            }
        ],
        []
    )

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
                <SubjectsTable columns={columns} data={data} onRowSelect={(rows) => { }} hiddenColumns={hiddenColumns} updateMyData={updateMyData} skipPageReset={() => { }} />
            </ReactEditableTableFullWidthStyles>
        </div>
    )
}