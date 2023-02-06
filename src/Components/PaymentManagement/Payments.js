import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { ReactEditableTableFullWidthStyles } from "../Custom/StyleComponents";
import { EditableCheckBoxCell, EditableInputCurrencyCell, EditableInputTextCell } from "../Custom/Editable";
import { RowDetailTable } from "./Table/RowDetailTable";
import upIcon from '../Custom/icons/up.svg'
import downIcon from '../Custom/icons/down.svg'
import './Payments.css'
import FilterDropdown from "../Custom/FilterDropdown";
import { useDispatch, useSelector } from "react-redux";
import { MonthPicker } from "../Custom/MonthPicker";
import { PaymentSubmit, SearchPayments } from "../../Redux/Features/Payment/PaymentServicesSlice";

const PaymentSubmitComponent = ({ rowRecord }) => {

    const [callback, setCallback] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

    const payPayment = (row) => {
        setIsLoading(true)
        var payload = {
            "enrollmentId": row.original?.enrollmentId,
            "year": 2023,
            "month": 1,
            "paidAmount": row.original?.payingAmount,
            "isFullyPaid": row.original?.isFullyPaid
        }
        dispatch(PaymentSubmit(payload, function (response, success) {
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
                type="submit"
            >
                Pay
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

    const [data, setData] = useState([]);

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);
    const auth = useSelector((state) => state.auth);
    const payment = useSelector((state) => state.payment);

    useEffect(() => {
        setData(payment.FilteredPayments)
    }, [payment.FilteredPayments])

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
                    return monthNames[data.month] + "(" + data.month + ")";
                },
                disableFilters: true
            },
            {
                Header: 'Due Date',
                accessor: 'paymentDueDate',
                width: "5%",
                disableFilters: true
            },
            {
                Header: 'Due Amount',
                id: 'dueAmount',
                width: "10%",
                accessor: data => {
                    return data.dueAmount.toFixed(2);
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
                        <EditableInputCurrencyCell initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData}></EditableInputCurrencyCell>
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
                            <EditableCheckBoxCell initialValue={initialValue} row={row} columnId={id} updateMyData={updateMyData}></EditableCheckBoxCell>
                        </div>
                    )
                }
            },

            {
                Header: '',
                accessor: 'pay',
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
                    if (course.id == item.id) {
                        courseObj = course;
                    }
                });
                setSelectedCourse(courseObj !== null ? courseObj : null);
                break;
            case LEVEL_SELECTION:
                var levelObj = null
                console.log("selectedCourse MM", selectedCourse)
                selectedCourse?.levels.forEach((level, index) => {
                    if (level.id == item.id) {
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
                selectedPaymentStatus(item !== null ? item : null)
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
        console.log(auth)
        var payload = {
            "instituteId": auth.InstituteId,
            //"courseId": selectedCourse?.id,
            //"subjectId": selectedSubject?.id,
            //"teacherId": selectedTeacher?.id,
            "year": selectedYear,
            "month": selectedMonth,
            "paymentStatus": selectedPaymentStatus?.key,
            "keyWord": selectedKeyValue,
            "pageSize": 10,
            "pageNumber": 1
        }

        dispatch(SearchPayments(payload, function (response, success) {
            if (success) {

            } else {
                //error handle
            }
        }));
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
        common.Teachers?.forEach((teacher, index) => {
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
                                    border: '0', width: "100%"
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
                            selection={SUBJECT_SELECTION}
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
                <RowDetailTable
                    columns={columns}
                    data={data}
                    hiddenColumns={hiddenColumns}
                    updateMyData={updateMyData}
                    renderRowSubComponent={renderRowSubComponent} />
            </ReactEditableTableFullWidthStyles>
        </div>
    );
};

export default Payments;