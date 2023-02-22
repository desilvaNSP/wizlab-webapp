import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { useDispatch, useSelector } from "react-redux";
import { ReactTableFullWidthStyles } from "../Custom/StyleComponents";
import { EditableInputCurrencyCell, EditableInputNumberCell } from "../Custom/Editable";
import { EnrollmentTable } from "../ClassManagement/Classes/Table/EnrollmentTable";
import { GetAllEnrollments, GetEnrollmentsById, UpdateEnrollmentById } from "../../Redux/Features/Enrollments/EnrollmentServicesSlice";
import { StartLoading, StopLoading } from "../../Redux/Features/Common/CommonServicesSlice";
import { useCookies } from "react-cookie";
import { GroupEnrollmentTable } from "./Table/GroupEnrollmentTable";

const EnrollmentUpdateComponent = ({ rowRecord }) => {

    const [callback, setCallback] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

    const updateEnrollment = (row) => {
        setIsLoading(true)
        var payload = {
            "enrollmentId": row?.original.id,
            "paymentDueDate": row?.original.paymentDueDate,
            "applicableFee": row?.original.applicableFee,
            "enrollmentStatus": 0
        }
        dispatch(UpdateEnrollmentById(payload, function (response, success) {
            setIsLoading(false)
            if (success) {
                setCallback(1)
            } else {
                setCallback(2)
            }
            setTimeout(function () {
                setCallback(0);
            }, 3000)
        }));
        //if some netwrok issue
        setTimeout(function () {
            if (callback != 0) {
                setCallback(0);
            }
        }, 20000)
    }

    var loaderClassName = isLoading ? "loader" : ""
    var messageClassName = "";
    if (callback == 1) {
        messageClassName = "isvalid"
    } else if (callback == 2) {
        messageClassName = "notvalid"
    } else {
        messageClassName = ""
    }

    return (
        <div className="payment-sumbit--container">
            <button
                onClick={() => updateEnrollment(rowRecord)}
                className="btn btn--primary"
                type="submit"
            >
                Update
            </button>
            <div class={loaderClassName}></div>
            <div class={messageClassName}></div>
        </div>
    )
}

const AllStudents = ({ }) => {

    const [instituteId, setInstituteId] = useCookies(['institute_id']);
    const [selectedKeyValue, setSelectedKeyValue] = useState("");
    const [data, setData] = useState([])
    const [loading, setLoading] = React.useState(false)
    const [tablePageSize, setTablePageSize] = React.useState(10)
    const [tablePageIndex, setTablePageIndex] = React.useState(0)
    const [pageCount, setPageCount] = React.useState(0)

    const hiddenColumns = ["id", "selection", "parentName"];

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);
    const enrollments = useSelector((state) => state.enrollments);

    useEffect(() => {
        if (enrollments.Enrollments.enrollments != null) {
            setData(enrollments.Enrollments?.enrollments)
            setPageCount(Math.ceil(enrollments.Enrollments?.totalNumberOfEntries / tablePageSize))
        }
    }, [enrollments.Enrollments])

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        var payload = {
            "instituteId": instituteId?.institute_id,
            "keyWord": selectedKeyValue,
            "pageSize": pageSize,
            "pageNumber": pageIndex + 1
        }
        setLoading(true)
        setTablePageSize(pageSize)
        dispatch(StartLoading("Getting enrollments"))
        dispatch(GetAllEnrollments(payload, function (response, success) {
            setLoading(false)
            dispatch(StopLoading())
        }));
    }, [])

    /**
     * Event handling for apply filters and retrive class data.
     */
    const handleApplyOnClick = () => {
        var payload = {
            "instituteId": instituteId?.institute_id,
            "keyWord": selectedKeyValue,
            "pageSize": tablePageSize,
            "pageNumber": tablePageIndex + 1
        }
        setLoading(true)
        dispatch(StartLoading("Getting enrollments", "GetAllEnrollments"))
        dispatch(GetAllEnrollments(payload, function (response, success) {
            setLoading(false)
            dispatch(StopLoading("GetAllEnrollments"))
        }));
    };

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex(ex: 9), columnId(ex: merchantName) and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value, validity) => {
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
    }


    /**
     * Update the state of selected transaction and show detail flag
     * @param {Object} row selected transaction
     * @param {Number} index index of transaction table
     */
    const showClassDetails = (row) => {
        window.open("classes/" + row.id)
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Phone Number',
                id: 'phoneNumber',
                disableFilters: false,
                accessor: data => {
                    return data.student?.parent?.phoneNumber;
                }
            },
            {
                Header: 'First Name',
                id: 'firstName',
                disableFilters: false,
                accessor: data => {
                    return data.student?.firstName;
                }
            },
            {
                Header: 'Middle Name',
                id: 'middleName',
                disableFilters: false,
                accessor: data => {
                    return data.student?.middleName;
                }
            },
            {
                Header: 'Last Name',
                id: 'lastName',
                disableFilters: false,
                accessor: data => {
                    return data.student?.lastName;
                }
            },
            {
                Header: 'Student Code',
                id: 'studentCode',
                disableFilters: false,
                accessor: data => {
                    return data.student?.studentCode;
                }
            },
            {
                Header: 'Parent Name',
                id: 'parentName',
                disableFilters: false,
                accessor: data => {
                    return data.student?.parent?.name;
                }
            },
            {
                Header: 'Class',
                id: 'class',
                disableFilters: false,
                accessor: data => {
                    return data.class?.classIdentifier;
                }
            },
            {
                Header: 'Subject',
                id: 'subject',
                disableFilters: false,
                accessor: data => {
                    return data.class?.subject?.title;
                }
            },
            {
                Header: 'Applicable Fee',
                accessor: 'applicableFee',
                disableFilters: true,
                width: "10%",
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputCurrencyCell initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData}></EditableInputCurrencyCell>
                    )
                }
            },
            {
                Header: 'Payment Due Date',
                accessor: 'paymentDueDate',
                disableFilters: true,
                width: "10%",
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputNumberCell initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData} max={31} min={1}></EditableInputNumberCell>
                    )
                }
            },
            {
                Header: 'Actions',
                accessor: 'update',
                disableFilters: true,
                width: "5%",
                Cell: ({ value: initialValue, row: row, column: { id } }) => {
                    return (
                        <EnrollmentUpdateComponent rowRecord={row}></EnrollmentUpdateComponent>
                    )
                }
            }
        ],
        []
    )

    return (
        <div className="classes-container">
            <div className='page-header'>
                Student Enrollments
            </div>
            <div className='classes-filter-box'>
                <div className='filter-box-row'>
                    <div className='filter-box-column' >
                        <span className='global-filter'>
                            <input
                                value={selectedKeyValue}
                                onChange={e => {
                                    setSelectedKeyValue(e.target.value);
                                    //onChange(e.target.value);
                                }}
                                placeholder={`Search by Phone number or Name`}
                                style={{
                                    border: '0', width: "100%"
                                }}
                            />
                        </span>
                    </div>
                    <div className='filter-box-column apply-filter'>
                        <button style={{
                            float: 'left'
                        }}
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
                <GroupEnrollmentTable
                    columns={columns}
                    data={data}
                    onRowSelect={(rows) => { }}
                    hiddenColumns={hiddenColumns}
                    rowSelection={true}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    updateMyData={updateMyData}
                    numberOfRecords={enrollments.Enrollments?.totalNumberOfEntries} />
            </ReactTableFullWidthStyles>
        </div>
    );
};

export default AllStudents;