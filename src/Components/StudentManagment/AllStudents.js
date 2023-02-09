import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { useDispatch, useSelector } from "react-redux";
import { ReactTableFullWidthStyles } from "../Custom/StyleComponents";
import { EditableInputCurrencyCell, EditableInputNumberCell } from "../Custom/Editable";
import { EnrollmentTable } from "../ClassManagement/Classes/Table/EnrollmentTable";
import { GetAllEnrollments, GetEnrollmentsById, UpdateEnrollmentById } from "../../Redux/Features/Enrollments/EnrollmentServicesSlice";
import { StartLoading, StopLoading } from "../../Redux/Features/Common/CommonServicesSlice";
import { useCookies } from "react-cookie";

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

    const [data, setData] = useState([])
    const [instituteId, setInstituteId] = useCookies(['institute_id']);

    const hiddenColumns = ["id", "parentName"];

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);
    const enrollments = useSelector((state) => state.enrollments);

    useEffect(() => {
        if (enrollments.Enrollments != null) {
            setData(enrollments.Enrollments)
        }
    }, [enrollments.Enrollments])

    useEffect(() => {
        var payload = {
            "instituteId": instituteId?.institute_id,
            "keyWord": "",
            "pageSize": 10,
            "pageNumber": 1
        }
        dispatch(StartLoading("Get All Students"))
        dispatch(GetAllEnrollments(payload, function (data, success) {
            if (success) {

            } else {
                //error handle
            }
            dispatch(StopLoading());
        }));
    }, []);

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
                Header: 'Phone Number',
                id: 'phoneNumber',
                disableFilters: false,
                accessor: data => {
                    return data.student?.parent?.phoneNumber;
                }
            },
            {
                Header: 'Patent Name',
                id: 'parentName',
                disableFilters: false,
                accessor: data => {
                    return data.student?.parent?.name;
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

    console.log("data", data)

    return (
        <div className="classes-container">
            {common.IsLoading &&
                <div className="main-loader"  >
                    <img src="assets/images/loading.svg" alt="loader" />
                    <div className="main-loader__txt">{common.LoadingMessage}</div>
                </div>
            }
            <div className='page-header'>
                Students
            </div>
            {/* <div className='classes-filter-box'>
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
            </div> */}
            <ReactTableFullWidthStyles>
                <EnrollmentTable columns={columns} data={data} onRowSelect={(rows) => { }} hiddenColumns={hiddenColumns} rowSelection={true} updateMyData={updateMyData} />
            </ReactTableFullWidthStyles>
        </div>
    );
};

export default AllStudents;