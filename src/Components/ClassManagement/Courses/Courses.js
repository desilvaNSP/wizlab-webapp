import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { NewCourse } from "./NewCourse";
import { useDispatch, useSelector } from "react-redux";

const Courses = props => {

    const [showCourseCreationPopup, setShowCourseCreationPopup] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null);

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);

    const triggerStartNewCourse = () => {
        setShowCourseCreationPopup(true)
    }

    const closeCourseCreationPopup = () => {
        setShowCourseCreationPopup(false)
    }

    const triggerUpdateCourse = (course) => {
        setSelectedCourse(course)
        setShowCourseCreationPopup(true)
    }

    return (
        <div className="classes-container">
            {common.IsLoading &&
                <div className="main-loader"  >
                    <img src="/assets/images/loading.svg" alt="loader" />
                    <div className="main-loader__txt">{common.LoadingMessage}</div>
                </div>
            }
            <div className='page-header'>
                <div className="add-record" onClick={() => triggerStartNewCourse()}>
                    <img src="/assets/icons/icon-add.svg" alt="Start New Course" />
                    <span>Create New Course</span>
                </div>
            </div>
            <div className='widget-group'>
                {/* <div className='widget-row'>
                    <span className='global-filter'>
                        Search:{' '}
                        <input
                            value={1 || ""}
                            onChange={e => {
                                //setValue(e.target.value);
                                //onChange(e.target.value);
                            }}
                            placeholder={`${1} records...`}
                            style={{
                                border: '0',
                            }}
                        />
                    </span>
                </div> */}
                <div className='widget-row'>
                    {common.Courses.map((course) =>
                        <div className="tile-widget" placeholder="Class Informations" onClick={() => { triggerUpdateCourse(course) }}>
                            <label>{course.name}</label>
                            <span>{course?.levels?.length} Levels</span>
                            <span> 0 Subjects</span>
                        </div>
                    )}
                </div>
            </div>
            {showCourseCreationPopup &&
                <NewCourse show={showCourseCreationPopup} handleReload={() => { }} handleClose={closeCourseCreationPopup} selectedCourse={selectedCourse}></NewCourse>
            }
        </div>
    );
};

export default Courses;