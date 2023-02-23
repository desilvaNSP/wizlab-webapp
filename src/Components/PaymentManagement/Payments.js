import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { ReactEditableTableFullWidthStyles } from "../Custom/StyleComponents";
import { EditableCheckBoxCell, EditableInputCurrencyCell, EditableInputNumberCell, EditableInputTextCell } from "../Custom/Editable";
import upIcon from '../Custom/icons/up.svg'
import downIcon from '../Custom/icons/down.svg'
import './Payments.css'
import FilterDropdown from "../Custom/FilterDropdown";
import { useDispatch, useSelector } from "react-redux";
import { MonthPicker } from "../Custom/MonthPicker";
import { PaymentUpdate, SearchPayments } from "../../Redux/Features/Payment/PaymentServicesSlice";
import { StartLoading, StopLoading } from "../../Redux/Features/Common/CommonServicesSlice";
import { useCookies } from "react-cookie";
import { format } from "date-fns";
import { PaymentTable } from "./Table/PaymentTable";

const PaymentSubmitComponent = ({ rowRecord }) => {

    const [callback, setCallback] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

    const payPayment = (row) => {
        setIsLoading(true)
        var payload = {
            "enrollmentId": row.original?.enrollmentId,
            "year": row.original?.year,
            "month": row.original?.month,
            "paidAmount": row.original?.payingAmount,
            "dueAmount": row.original?.dueAmount,
            "paymentDueDate": row.original?.paymentDueDate,
            "isFullyPaid": row.original?.isFullyPaid
        }
        dispatch(PaymentUpdate(payload, function (response, success) {
            setIsLoading(false)
            if (success) {
                setCallback(1)
            } else {
                setCallback(2)
            }
            setTimeout(function () {
                setCallback(0)
            }, 3000)
        }));
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
                onClick={() => payPayment(rowRecord)}
                className="btn btn--primary"
                disabled={rowRecord.original?.isFullyPaid}
                type="submit"
            >
                Update
            </button>
            <div class={loaderClassName}></div>
            <div class={messageClassName}></div>
        </div>
    )
}


const Payments = props => {

    const COURSE_SELECTION = "COURSE_SELECTION";
    const LEVEL_SELECTION = "LEVEL_SELECTION";
    const SUBJECT_SELECTION = "SUBJECT_SELECTION";
    const TEACHER_SELECTION = "TEACHER_SELECTION";
    const PAYMENT_STATUS_SELECTION = "PAYMENT_STATUS_SELECTION";

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const hiddenColumns = ["id"];

    var today = new Date()

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedKeyValue, setSelectedKeyValue] = useState(null);
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());

    const [instituteId, setInstituteId] = useCookies(['institute_id']);

    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(false)
    const [tablePageIndex, setTablePageIndex] = React.useState(0)
    const [tablePageSize, setTablePageSize] = React.useState(10)
    const [pageCount, setPageCount] = React.useState(0)

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);
    const payment = useSelector((state) => state.payment);

    useEffect(() => {
        if (payment.FilteredPayments?.studentPaymentHistoryResults != null) {
            setData(payment.FilteredPayments?.studentPaymentHistoryResults)
            setPageCount(Math.ceil(payment.FilteredPayments?.totalNumberOfEntries / tablePageSize))
        }
    }, [payment.FilteredPayments])

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        var payload = {
            "instituteId": instituteId?.institute_id,
            "courseId": selectedCourse?.id,
            "subjectId": selectedSubject?.id,
            "teacherId": selectedTeacher?.id,
            "year": selectedYear,
            "month": selectedMonth,
            "paymentStatus": selectedPaymentStatus?.key,
            "keyWord": selectedKeyValue,
            "pageSize": pageSize,
            "pageNumber": pageIndex + 1
        }

        setLoading(true)
        setTablePageSize(pageSize);
        dispatch(StartLoading("Loading Payment Records..", "SearchPayments"))
        dispatch(SearchPayments(payload, function (response, success) {
            setLoading(false)
            dispatch(StopLoading("SearchPayments"))
        }));
    }, [])

    var formatDate = "yyyy-MM-dd HH:mm:ss";

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

    const columns = React.useMemo(
        () => [
            {
                // Make an expander cell
                Header: () => null, // No header
                id: 'expander', // It needs an ID
                width: "5%",
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
                width: "10%",
                disableFilters: false
            },
            {
                Header: 'Student Code',
                accessor: 'studentCode',
                width: "10%",
                disableFilters: false
            },
            {
                Header: 'Student Name',
                accessor: 'studentName',
                width: "10%",
                disableFilters: false
            },
            {
                Header: 'Class',
                accessor: 'classIdentifier',
                width: "15%",
                disableFilters: false
            },
            {
                Header: 'Month',
                accessor: 'month',
                width: "5%",
                accessor: data => {
                    return monthNames[data.month] + "(" + data.year + ")";
                },
                disableFilters: true
            },
            {
                Header: 'Due Date',
                accessor: 'paymentDueDate',
                width: "5%",
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputNumberCell initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData} disabled={row.original?.isFullyPaid}></EditableInputNumberCell>
                    )
                }
            },
            {
                Header: 'Due Amount',
                accessor: 'dueAmount',
                width: "10%",
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputCurrencyCell initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData} disabled={row.original?.isFullyPaid}></EditableInputCurrencyCell>
                    )
                },
                disableFilters: true
            },
            {
                Header: 'Paid Amount',
                id: 'paidAmount',
                width: "10%",
                accessor: data => {
                    return data.paidAmount.toFixed(2);
                },
                disableFilters: true
            },
            {
                Header: 'Pending Amount',
                id: 'pendingAmount',
                width: "10%",
                accessor: data => {
                    return data.pendingAmount.toFixed(2);
                },
                disableFilters: true
            },
            {
                Header: 'Paying Amount',
                accessor: 'payingAmount',
                disableFilters: true,
                width: "10%",
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <EditableInputCurrencyCell initialValue={""} placeholderText={row.original?.isFullyPaid ? "Already fully paid." : "Enter amount"} row={row} columnId={id} updateMyData={updateMyData} disabled={row.original?.isFullyPaid} ></EditableInputCurrencyCell>
                    )
                }
            },
            {
                Header: 'Is Fully Paid',
                accessor: 'isFullyPaid',
                disableFilters: true,
                width: "5%",
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <div className="payment--save">
                            <EditableCheckBoxCell initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData} disabled={row.original?.isFullyPaid}></EditableCheckBoxCell>
                        </div>
                    )
                }
            },
            {
                Header: 'Action',
                accessor: 'Update',
                disableFilters: true,
                width: "5%",
                Cell: ({ value: initialValue, row: row, column: { id } }) => {
                    return (
                        <PaymentSubmitComponent rowRecord={row}></PaymentSubmitComponent>
                    )
                }
            }
        ],
        []
    )


    /**
 * 
 * @param {Object} item selected item of the dropdown list
 * @param {String} key used to selected desired dropdown component
 */
    const handleItemChange = (item, selection) => {
        switch (selection) {
            case COURSE_SELECTION:
                var courseObj = null
                common.Courses?.forEach((course, index) => {
                    if (course.id == item?.id) {
                        courseObj = course;
                    }
                });
                setSelectedCourse(courseObj !== null ? courseObj : null);
                break;
            case LEVEL_SELECTION:
                var levelObj = null
                selectedCourse?.levels.forEach((level, index) => {
                    if (level.id == item?.id) {
                        levelObj = level;
                    }
                });
                setSelectedLevel(levelObj !== null ? levelObj : null)
                break;
            case SUBJECT_SELECTION:
                setSelectedSubject(item !== null ? item : null)
                break;
            case TEACHER_SELECTION:
                setSelectedTeacher(item !== null ? item : null)
                break;
            case PAYMENT_STATUS_SELECTION:
                setSelectedPaymentStatus(item !== null ? item : null)
                break;
            default:
                break;
        }
    };


    /**
    * Props event handler which is used in calender component
    * @param {Date} val selected date information
    * @param {String} selection used to selected desired calender component
    */
    const onDateTimeChange = (val) => {
        setSelectedMonth(val.getMonth());
        setSelectedYear(val.getFullYear())
    }

    /**
     * Event handling for apply filters and retrive class data.
     */
    const handleApplyOnClick = () => {
        var payload = {
            "instituteId": instituteId?.institute_id,
            "courseId": selectedCourse?.id,
            "subjectId": selectedSubject?.id,
            "teacherId": selectedTeacher?.id,
            "year": selectedYear,
            "month": selectedMonth,
            "paymentStatus": selectedPaymentStatus?.id,
            "keyWord": selectedKeyValue,
            "pageSize": tablePageSize,
            "pageNumber": tablePageIndex + 1
        }

        setLoading(true)
        dispatch(StartLoading("Loading Payment Records..", "SearchPayments"))
        dispatch(SearchPayments(payload, function (response, success) {
            if (success) {
                //success handle
            } else {
                //error handle
            }
            setLoading(false)
            dispatch(StopLoading("SearchPayments"))
        }));
    };

    // Create a function that will render our row sub components
    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <DetailComponent row={row}></DetailComponent>
        ),
        []
    )

    const DetailComponent = ({ row }) => {
        var details = row.original;
        return (
            <div className='detail-container container'>
                <div className='cont-row'>
                    <div className='cont-3-column col-1'>
                        {details?.payments.length > 0 ? details?.payments.map((logHistory, index) =>
                            <div>
                                <label>Payment Date : </label>
                                <span>{format(new Date(logHistory.paymentDate), formatDate)}</span>
                                <label>Amount: </label>
                                <span>{logHistory.amount}</span>
                            </div>

                        ) : <div>
                            <label>No payment history records.</label>
                        </div>}
                    </div>
                    <div className='cont-3-column col-2'>
                    </div>
                    <div className='cont-3-column col-3'>
                    </div>
                </div>
            </div>
        )
    }


    const getCoursesList = () => {
        let coursesList = [];
        common.Courses?.forEach((course, index) => {
            let obj = {
                id: course.id,
                value: course.name,
                code: course.id,
                selected: false
            };
            coursesList.push(obj);
        });
        return coursesList;
    }

    const getLevelsByCourse = () => {
        let levelList = [];
        selectedCourse?.levels.forEach((level, index) => {
            let obj = {
                id: level.id,
                value: level.desc,
                code: level.id,
                selected: false
            };
            levelList.push(obj);
        });
        return levelList;
    }

    const getSubjectByCourseAndLevels = () => {
        let subjectList = [];
        selectedLevel?.subjects.forEach((subject, index) => {
            let obj = {
                id: subject.id,
                value: subject.title,
                code: subject.id,
                selected: false
            };
            subjectList.push(obj);
        });
        return subjectList;
    }

    const getTeachersList = () => {
        let teachersList = [];
        common.Teachers?.teachers?.forEach((teacher, index) => {
            let obj = {
                id: teacher.id,
                value: teacher.firstName + " " + teacher.lastName,
                code: teacher.id,
                selected: false
            };
            teachersList.push(obj);
        });
        return teachersList;
    }

    const getPaymentStatuesList = () => {
        let statusList = [];
        common.PaymentStatus?.forEach((status, index) => {
            let obj = {
                id: status.key,
                value: status.name,
                code: status.id,
                selected: false
            };
            statusList.push(obj);
        });
        return statusList;
    }

    return (
        <div className="classes-container">
            <div className='page-header'>Monthly Settlement</div>
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
                                    border: '0', width: "100%", float: "left"
                                }}
                            />
                        </span>
                    </div>

                    <div className='filter-box-column'>
                        <MonthPicker
                            valid={true}
                            title={"Select Month"}
                            initDateTime={today}
                            onDateTimeChange={onDateTimeChange}
                        />
                    </div>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            title="Payment Status"
                            selection={PAYMENT_STATUS_SELECTION}
                            defaultList={getPaymentStatuesList()}
                            onItemChange={handleItemChange}
                            initValue={""}
                            editable={true}
                            autoComplete={false} />
                    </div>

                    <div className='filter-box-column'>
                        <FilterDropdown
                            title="Teacher"
                            selection={TEACHER_SELECTION}
                            defaultList={getTeachersList()}
                            onItemChange={handleItemChange}
                            initValue={""}
                            editable={true} />
                    </div>
                </div>
                <div className='filter-box-row'>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            title="Course"
                            selection={COURSE_SELECTION}
                            defaultList={getCoursesList()}
                            onItemChange={handleItemChange}
                            initValue={""}
                            editable={true} />
                    </div>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            title="Level"
                            selection={LEVEL_SELECTION}
                            defaultList={getLevelsByCourse()}
                            onItemChange={handleItemChange}
                            initValue={""}
                            editable={true} />
                    </div>
                    <div className='filter-box-column'>
                        <FilterDropdown
                            title="Subject"
                            selection={SUBJECT_SELECTION}
                            defaultList={getSubjectByCourseAndLevels()}
                            onItemChange={handleItemChange}
                            initValue={""}
                            editable={true} />
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
                <PaymentTable
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    updateMyData={updateMyData}
                    renderRowSubComponent={renderRowSubComponent}
                    numberOfRecords={payment.FilteredPayments?.totalNumberOfEntries}
                />
            </ReactEditableTableFullWidthStyles>
        </div>
    );
};

export default Payments;