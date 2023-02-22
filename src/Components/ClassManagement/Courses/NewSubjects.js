import React, { useEffect, useState } from 'react'
import { EditableInputTextCell } from '../../Custom/Editable';
import { ReactEditableTableFullWidthStyles } from '../../Custom/StyleComponents';
import { SubjectsTable } from './Table/SubjectsTable';
import closeIcon from '../../Custom/icons/close-icon.svg'
import { DeleteSubjectById, StartLoading, StopLoading } from '../../../Redux/Features/Common/CommonServicesSlice';
import { useDispatch } from 'react-redux';
import { InfoConfirmModal } from '../../Custom/Modals';

export const NewSubjects = props => {
    const { selectedCourse, selectedLevel, levelInex, updateLevel } = props

    const [data, setData] = useState(selectedLevel.subjects)

    const [showInfoConfirmModal, setShowInfoConfirmModal] = useState(false);
    const [showResetAllConfirmModal, setShowResetAllConfirmModal] = useState(false);
    const [modalContents, setModalContents] = useState({
        "header": "",
        "content": ""
    });
    const [currentDeleteRow, setCurrentDeleteRow] = useState(false);

    const dispatch = useDispatch();

    // useEffect(() =>{
    //     if(selectedLevel != null){
    //         var newItems = data.filter((item) => { return item.new});
    //         setData([...selectedLevel.subjects, ...newItems])
    //     }
    // },[selectedLevel])

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
        var newDataSet = [...data, ...newData]
        setData(newDataSet);
    }





    const closeConfirmModal = () => {
        setShowInfoConfirmModal(false)
    }

    const continueConfirmModal = () => {
        setShowInfoConfirmModal(false)
        dispatch(StartLoading("Deleting Subject..", "DeleteSubjectById"))
        var payload = {
            "id": currentDeleteRow.original.id,
            "courseId": selectedCourse.id
        }
        dispatch(DeleteSubjectById(payload, (response, success) => {
            dispatch(StopLoading("DeleteSubjectById"))
        }));
    }

    const deleteRecord = (row) => {
        if (row.original.new) {
            revertNewlyAddedRow(row.index)
        } else if (row.original.new == undefined && row.original.new == null) {
            setModalContents({
                "header": "Delete Subject : " + row.original.title,
                "content": "Are you sure?"
            })
            setShowInfoConfirmModal(true)
            setCurrentDeleteRow(row)
        }
    }

    const revertNewlyAddedRow = (removeIndex) => {
        var newData = data.filter((value, index) => {
            return index != removeIndex
        })
        setData(newData)
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
            ...selectedLevel,
            ["subjects"]: dataUpdated
        }, levelInex)
    }

    const hiddenColumns = ["id"];


    const columns = [
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
                        <img src={closeIcon} />
                    </div>
                )
            }
        }
    ];

    return (
        <div className='subject-container'>
            {showInfoConfirmModal && <InfoConfirmModal continueTo={continueConfirmModal} handleClose={closeConfirmModal} show={true} children={modalContents.content} heading={modalContents.header}></InfoConfirmModal>}
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