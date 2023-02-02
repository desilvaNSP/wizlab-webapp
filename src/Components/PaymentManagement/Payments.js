import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { ReactEditableTableFullWidthStyles } from "../Custom/StyleComponents";
import { EditableInputTextCell } from "../Custom/Editable";
import { RowDetailTable } from "./Table/RowDetailTable";
import upIcon from '../Custom/icons/up.svg'
import downIcon from '../Custom/icons/down.svg'
import './Payments.css'
import FilterDropdown from "../Custom/FilterDropdown";
import { useDispatch, useSelector } from "react-redux";

const Payments = props => {

    const COURSE_SELECTION = "COURSE_SELECTION";
    const LEVEL_SELECTION = "LEVEL_SELECTION";
    const SUBJECT_SELECTION = "SUBJECT_SELECTION";
    const TEACHER_SELECTION = "TEACHER_SELECTION";

    const hiddenColumns = ["id"];

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);

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
                disableFilters: false
            },
            {
                Header: 'Student Code',
                accessor: 'studentCode',
                disableFilters: false
            },
            {
                Header: 'Student Name',
                accessor: 'studentName',
                disableFilters: false
            },
            {
                Header: 'Class',
                accessor: 'classIdentifier',
                disableFilters: false
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
                Header: 'Due Amount',
                accessor: 'dueAmount',
                disableFilters: true
            },
            {
                Header: 'Pending Amount',
                accessor: 'pendingAmount',
                disableFilters: true
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
                        </div>
                    )
                }
            },

            {
                Header: '',
                accessor: 'pay',
                disableFilters: true,
                Cell: ({ value: initialValue, row: row, column: { id }, updateMyData }) => {
                    return (
                        <button
                            onClick={() => handleApplyOnClick()}
                            className="btn btn--primary"
                            type="submit"
                        >
                            Pay
                        </button>
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
            default:
                break;
        }
    };

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


    return (
        <div className="classes-container">
            <div className='page-header'>Monthly Settlement</div>
            <div className='classes-filter-box'>
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
                    <div className='filter-box-column'>
                        <FilterDropdown
                            title="Teacher"
                            selection={TEACHER_SELECTION}
                            defaultList={getTeachersList()}
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
                    renderRowSubComponent={renderRowSubComponent} />
            </ReactEditableTableFullWidthStyles>
        </div>
    );
};

export default Payments;