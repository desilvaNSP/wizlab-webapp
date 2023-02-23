import React, { useState, useRef, useEffect } from 'react'
import { InfoConfirmModal } from '../../Custom/Modals';
import { CustomTagInput } from '../../Custom/CustomTagInput';
import { CustomInput } from '../../Custom/CustomInput';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { NewSubjects } from './NewSubjects';
import { AddNewLevelAndSubjects, CreateCourse, CreateSubjectsForLevel, DeleteLevel, DeleteLevelById, StartLoading, StopLoading, UpdateSubjectBySubjectId } from '../../../Redux/Features/Common/CommonServicesSlice';
import { useDispatch } from 'react-redux';

export const NewCourse = props => {
    const { handleClose, show, selectedCourse } = props

    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

    const [course, setCourse] = useState(selectedCourse);
    const [levels, setLevels] = useState(selectedCourse?.levels == null ? [] : selectedCourse.levels);
    const [tags, setTags] = useState([])
    const [modalContents, setModalContents] = useState({
        "header": "Delete Level",
        "content": "Are you sure delete the level. when you delete level automatically associated subjects will be lost."
    });
    const [showInfoConfirmModal, setShowInfoConfirmModal] = useState(false);
    const [currentTagValue, setCurrentTagValue] = useState(null);

    // useDispatch() hook is equivalent of mapDispatchToProps.
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedCourse?.levels != null) {
            setTags(generateTagsByLevels(selectedCourse?.levels))
        }
    }, [selectedCourse?.levels])

    useEffect(() => {
        console.log("selectedCourse", selectedCourse)
        if (selectedCourse != null) {
            setCourse(selectedCourse)
            setLevels(selectedCourse?.levels == null ? [] : selectedCourse.levels)
        }
    }, [selectedCourse])

    /**
     * Event for close confirm modal
     */
    const closeConfirmModal = () => {
        setShowInfoConfirmModal(false)
    }

    const generateTagsByLevels = (levelsArray) => {
        var tags = []
        levelsArray.forEach((element) => {
            var tag = {
                "id": element.id,
                "value": element.desc
            }
            tags.push(tag);
        });
        return tags
    }

    /**
       * Event for continue confirm modal
       */
    const continueConfirmModal = () => {
        setShowInfoConfirmModal(false)
        if (currentTagValue?.id == null || currentTagValue.id == undefined) {
            var newLevels = levels.filter((v) => { return v.desc != currentTagValue.value });
            setLevels(newLevels)
            setTags(generateTagsByLevels(newLevels))
            dispatch(StopLoading())
        } else {
            dispatch(StartLoading("Deleting Level..", "DeleteLevelById"))
            var payload = {
                "id": currentTagValue.id,
                "courseId": course.id
            }
            var newLevels = levels.filter((v) => { return v.id != currentTagValue.id });
            dispatch(DeleteLevelById(payload, (response, success) => {
                if (success) {
                    setLevels(newLevels)
                    setTags(generateTagsByLevels(newLevels))
                }
                dispatch(StopLoading("DeleteLevelById"))
            }));
        }
    }

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    const useOutsideAlerter = (ref, thatProps) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    thatProps.handleClose();
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props);

    const courseFieldValidation = (value, callback) => {
        callback(true, "");
    }

    const levelFieldValidation = (value, callback) => {
        callback(true, "");
    }

    const levelTagDeletionValidation = (value) => {
        setCurrentTagValue(value);
        setShowInfoConfirmModal(true);
    }

    //Levels
    const checkLevelAlreadyExistsOnState = (key) => {
        let isOk = false;
        levels.forEach(function (item) {
            if (item.desc == key.value) {
                isOk = true;
            }
        });
        return isOk;
    }

    const handleNewLevels = (allLevels) => {
        allLevels.forEach(element => {
            // if key already exists no need create one.
            if (!checkLevelAlreadyExistsOnState(element)) {
                var levelObj = {
                    desc: element.value,
                    subjects: [
                    ]
                }
                levels.push(levelObj)
            }
        });
        setLevels(levels.slice());
    }

    const updateCorrectLevel = (levelObj, levelInex) => {
        levels[levelInex] = levelObj;
        setLevels(levels.slice());
    }

    //Course name
    const updateCourseName = (value) => {
        setCourse(value)
    }

    //Trigger create new course service
    const createNewCourse = () => {
        var payload = {
            "course": course,
            "levels": levels
        }
        dispatch(StartLoading("Creating New Course..", "CreateCourse"))
        dispatch(CreateCourse(payload, function (response, success) {
            if (success) {

            } else {
                //error handle
            }
            handleClose()
            dispatch(StopLoading("CreateCourse"))
        }));
        setTimeout(function () {
            setShowInfoConfirmModal(false)
            dispatch(StopLoading("CreateCourse"))
        }, 20000)
    }

    const updateExistingCourse = () => {
        var newLevels = {
            "courseId": selectedCourse.id,
            "levels": levels.filter((level) => { return level.id == undefined })
        }

        if (newLevels.levels?.length > 0) {
            // Add newly created levels
            dispatch(StartLoading("Adding new levels..", "AddNewLevelAndSubjects"))
            dispatch(AddNewLevelAndSubjects(newLevels, function (response, success) {
                if (success) {

                } else {
                    //error handle
                }
                handleClose()
                dispatch(StopLoading("AddNewLevelAndSubjects"))
            }));
        }

        //Loop existing levels
        levels.filter((level) => { return level.id != undefined }).forEach(levelObj => {
            // Assign new subject to existing levels.
            var newlyAddedSubjects = levelObj.subjects.filter((subject) => {
                return subject.new;
            });

            var newSubjectExstingLevel = {
                courseId: selectedCourse.id,
                levelId: levelObj.id,
                subjects: newlyAddedSubjects
            }

            if (newlyAddedSubjects.length > 0) {
                dispatch(StartLoading("Adding new subjects..", "CreateSubjectsForLevel"))
                dispatch(CreateSubjectsForLevel(newSubjectExstingLevel, function (response, success) {
                    if (success) {

                    } else {
                        //error handle
                    }
                    handleClose()
                    dispatch(StopLoading("CreateSubjectsForLevel"))
                }));
            }

            // Update existing subjects
            var updatedSubjects = levelObj.subjects.filter((subject) => {
                return subject.id != undefined && subject.updated;
            });
            if (updatedSubjects.length > 0) {
                dispatch(StartLoading("Updating Subjects", "UpdateSubjectBySubjectId"))
                dispatch(UpdateSubjectBySubjectId(updatedSubjects, function (response, success) {
                    if (success) {

                    } else {
                        //error handle
                    }
                    handleClose()
                    dispatch(StopLoading("UpdateSubjectBySubjectId"))
                }));
            }
        });
    }


    return (
        <div className={showHideClassName}>
            <section className="modal-detail" ref={wrapperRef} onClick={e => e.stopPropagation()}>
                {showInfoConfirmModal && <InfoConfirmModal continueTo={continueConfirmModal} handleClose={closeConfirmModal} show={true} children={modalContents.content} heading={modalContents.header}></InfoConfirmModal>}
                <span className="close-icon modal-detail__close" onClick={handleClose}></span>
                <div className="modal-detail__header modal-detail__header" style={{ fontSize: "24px", fontWeight: 600, marginBottom: '50px' }}>
                    {selectedCourse == null ? <span>Create New Course</span> : <span>Update Course</span>}
                </div>
                <div className="modal-detail__content">
                    <div className='form-group'>
                        <div className='form-group-col2' style={{ width: '40%' }}>
                            <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                                <div className='form-column'>
                                    <label>Basic Information</label>
                                </div>
                                <div className='form-column'>

                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Course Name</div>
                                    <div className='item-dropdown'>
                                        <CustomInput initialValue={course?.name} type="text" disable={false} updateInput={(value) => {
                                            updateCourseName(value)
                                        }} fieldValidation={courseFieldValidation} required={true} placeHolder="Course Name"></CustomInput>
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Levels/Grades</div>
                                    <div className='item-dropdown'>
                                        <CustomTagInput initialTags={tags} disable={false} fieldValidation={levelFieldValidation} tagDeletionValidation={levelTagDeletionValidation} required={true} updateTags={(value) => {
                                            handleNewLevels(value);
                                        }}></CustomTagInput>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='form-group-col2' style={{ width: '60%' }}>
                            <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                                <div className='form-column'>
                                    <label>Subjects/Modules</label>
                                </div>
                                <div className='form-column'>
                                </div>
                            </div>
                            <Tabs>
                                <TabList>
                                    {levels.map((level) =>
                                        <Tab>{level.desc}</Tab>
                                    )}
                                </TabList>
                                {levels.map((level, index) =>
                                    <TabPanel>
                                        <NewSubjects selectedLevel={level} selectedCourse={course} updateLevel={updateCorrectLevel} levelInex={index}></NewSubjects>
                                    </TabPanel>
                                )}
                            </Tabs>
                        </div>
                    </div>
                    {/* <div className='form-group'>
                        <div className='form-group-col'>

                        </div>
                    </div> */}
                </div>
                <div className="modal-detail__footer">
                    {selectedCourse == null ?
                        <button className="btn btn--success" onClick={() => createNewCourse()}>
                            Create New Course
                        </button> :
                        <button className="btn btn--success" disabled={false} onClick={updateExistingCourse} placeholder="Sorry! restricted update course for now">
                            Update Course
                        </button>
                    }
                </div>
            </section>
        </div>
    )
}