import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { ReactEditableTableFullWidthStyles } from "../Custom/StyleComponents";
import { EditableInputTextCell } from "../Custom/Editable";
import { RowDetailTable } from "./Table/RowDetailTable";
import upIcon from '../Custom/icons/up.svg'
import downIcon from '../Custom/icons/down.svg'
import './Payments.css'
import FilterDropdown from "../Custom/FilterDropdown";

const Payments = props => {

    const hiddenColumns = ["id"];

    const columns = React.useMemo(
        () => [
            {
                // Make an expander cell
                Header: () => null, // No header
                id: 'expander', // It needs an ID
                Cell: ({ row }) => (
                    // Use Cell to render an expander for each row.
                    // We can use the getToggleRowExpandedProps prop-getter
                    // to build the expander.
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? <img src={upIcon} alt='up'></img> : <img src={downIcon} alt='down'></img>}
                    </span>
                ),
            },
            {
                Header: 'Phone Number',
                accessor: 'phoneNumber',
                disableFilters: true
            },
            {
                Header: 'Student Code',
                accessor: 'studentCode',
                disableFilters: true
            },
            {
                Header: 'Student Name',
                accessor: 'studentName',
                disableFilters: true
            },
            {
                Header: 'Month',
                accessor: 'month',
                disableFilters: true
            },
            {
                Header: 'Due Date',
                accessor: 'paymentDueDate',
                disableFilters: true
            },
            {
                Header: 'Class',
                accessor: 'classIdentifier',
                disableFilters: true
            },
            {
                Header: 'Due Amount',
                accessor: 'dueAmount',
                disableFilters: true
            },
            {
                Header: 'Pending Amount',
                accessor: 'pendingAmount',
                disableFilters: false
            },
            {
                Header: 'Paying Amount',
                id: 'paidAmount',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputTextCell initialValue={initialValue} row={row} columnId={id} updateMyData={() => { }} dropList={null} autoComplete={false}></EditableInputTextCell>
                    )
                }
            },
            {
                Header: 'Is Fully Paid',
                accessor: 'isFullyPaid',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <div className="payment--save">
                            <input className='custom-checkbox' type="checkbox" onChange={() => { }} onBlur={() => { }} checked={true} disabled={false} />
                            <button
                                onClick={() => handleApplyOnClick()}
                                className="btn btn--primary"
                                type="submit"
                            >
                                Pay
                            </button>
                        </div>
                    )
                }
            }
        ],
        []
    )

    const data = [
        {
            "phoneNumber": "0714268785",
            "studentCode": "SC001",
            "studentName": "Ape Putha",
            "month": 6,
            "paymentDueDate": 15,
            "classIdentifier": "Sajithge English Class",
            "dueAmount": 1000,
            "paidAmount": 200,
            "pendingAmount": 800,
            "isFullyPaid": true,
            "paymentStatusId": 0,
            "payments": [
                {
                    "id": 1,
                    "amount": 200,
                    "paymentDate": "2023-06-01 10:08:11.06",
                    "monthlyPaymentId": 1
                }
            ]
        },
        {
            "phoneNumber": "0714268785",
            "studentCode": "SC001",
            "studentName": "Ape Putha",
            "month": 6,
            "paymentDueDate": 15,
            "classIdentifier": "Sajithge English Class",
            "dueAmount": 1000,
            "paidAmount": 200,
            "pendingAmount": 800,
            "isFullyPaid": true,
            "paymentStatusId": 0,
            "payments": [
                {
                    "id": 1,
                    "amount": 200,
                    "paymentDate": "2023-06-01 10:08:11.06",
                    "monthlyPaymentId": 1
                }
            ]
        },
        {
            "phoneNumber": "0714268785",
            "studentCode": "SC001",
            "studentName": "Ape Putha",
            "month": 6,
            "paymentDueDate": 15,
            "classIdentifier": "Sajithge English Class",
            "dueAmount": 1000,
            "paidAmount": 200,
            "pendingAmount": 800,
            "isFullyPaid": true,
            "paymentStatusId": 0,
            "payments": [
                {
                    "id": 1,
                    "amount": 200,
                    "paymentDate": "2023-06-01 10:08:11.06",
                    "monthlyPaymentId": 1
                }
            ]
        },
        {
            "phoneNumber": "0714268785",
            "studentCode": "SC001",
            "studentName": "Ape Putha",
            "month": 6,
            "paymentDueDate": 15,
            "classIdentifier": "Sajithge English Class",
            "dueAmount": 1000,
            "paidAmount": 200,
            "pendingAmount": 800,
            "isFullyPaid": true,
            "paymentStatusId": 0,
            "payments": [
                {
                    "id": 1,
                    "amount": 200,
                    "paymentDate": "2023-06-01 10:08:11.06",
                    "monthlyPaymentId": 1
                }
            ]
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

    // Create a function that will render our row sub components
    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <DetailComponent></DetailComponent>
        ),
        []
    )

    const DetailComponent = (props) => {
        return (
            <div className='detail-container container'>
                <div className='cont-row'>
                    <div className='cont-3-column col-1'>
                    </div>
                    <div className='cont-3-column col-2'>
                        <div>
                            <label>Status : </label>
                            <span>Woooooow</span>
                        </div>
                    </div>
                    <div className='cont-3-column col-3'>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="classes-container">
            <div className='page-header'>Monthly Settlement</div>
            <div className='classes-filter-box'>
                <div className='filter-box-row'>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            defaultList={[]}
                            onItemChange={(item) => {
                                console.log(item)
                            }}
                            initValue={"Teacher"}
                            required={true}
                            editable={true}
                            warningMessage={"Updating course is not allowed"} />
                    </div>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            defaultList={[]}
                            onItemChange={(item) => {
                                console.log(item)
                            }}
                            initValue={"Teacher"}
                            required={true}
                            editable={true}
                            warningMessage={"Updating course is not allowed"} />
                    </div>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            defaultList={[]}
                            onItemChange={(item) => {
                                console.log(item)
                            }}
                            initValue={"Teacher"}
                            required={true}
                            editable={true}
                            warningMessage={"Updating course is not allowed"} />
                    </div>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            defaultList={[]}
                            onItemChange={(item) => {
                                console.log(item)
                            }}
                            initValue={"Teacher"}
                            required={true}
                            editable={true}
                            warningMessage={"Updating course is not allowed"} />
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
                <RowDetailTable
                    columns={columns}
                    data={data}
                    hiddenColumns={hiddenColumns}
                    renderRowSubComponent={renderRowSubComponent} />
            </ReactEditableTableFullWidthStyles>
        </div>
    );
};

export default Payments;