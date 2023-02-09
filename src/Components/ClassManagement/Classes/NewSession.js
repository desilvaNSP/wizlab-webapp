import React, { useState, useRef, useEffect } from 'react'

import { InfoConfirmModal } from '../../Custom/Modals';
import CustomDropdown from '../../Custom/CustomDropdown';
import { CustomInput } from '../../Custom/CustomInput';
import { ReactTableFullWidthStyles } from '../../Custom/StyleComponents';
import { CommonTable } from '../../CommonTable/CommonTable';
import { format } from 'date-fns'
import { DateTimePicker } from '../../Custom/DateTimePicker';
import FilterDropdown from '../../Custom/FilterDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { CreateSession, StartLoading, StopLoading } from '../../../Redux/Features/Common/CommonServicesSlice';

export const NewSession = props => {
    const { handleReload, handleClose, show, selectedClass } = props

    const [showInfoConfirmModal, setShowInfoConfirmModal] = useState(false);
    const [modalContents, setModalContents] = useState({
        "header": "",
        "content": ""
    });

    //var defaultTo = new Date(format(today, formatDateString) + "T" + "23:59:00")
    // var defaultFrom = new Date(format(today.setDate(today.getDate() - 7), formatDateString) + "T" + "00:00:00")
    var today = new Date();

    const [startTime, setStartTime] = useState(today);
    const [duration, setDuration] = useState(null);
    const [virtualLink, setVirtualLink] = useState(null);
    const [classRoom, setClassRoom] = useState(null);

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);

    const hiddenColumns = ["selection"];
    const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";
        
    /**
     * Event for close confirm modal
     */
    const closeConfirmModal = () => {
        setShowInfoConfirmModal(false)
    }

    /**
       * Event for continue confirm modal
       */
    const continueConfirmModal = () => {
        setShowInfoConfirmModal(false)
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

    /**
    * Props event handler which is used in calender component
    * @param {Date} val selected date information
    * @param {String} selection used to selected desired calender component
    */
    const onDateTimeChange = (val, selection) => {
        setStartTime(val)
    }


    const selectClassRoom = (rows) => {
        // if any transaction is not set, then set null to selectedTransaction state.
        if (rows.length > 0) {
            var selectedClassRoom = rows[0].original;
            console.log("selectedClassRoom", selectedClassRoom)
            //setSelectedClassRoom(selectedClassRoom)
        }
    }

    //Trigger create new class service
    const createNewSession = () => {
        var payload = {
            "classId": selectedClass.id,
            "startTime": startTime,
            "duration": duration,
            "classRoomId": 1,
            "link": virtualLink
        }
        dispatch(StartLoading("Creating New Session.."))
        dispatch(CreateSession(payload, function (response, success) {
            if (success) {

            } else {
                //error handle
            }
            dispatch(StopLoading());
        }));
    }

    const columns = React.useMemo(
        () => [
          {
            Header: 'Auditorium No/Code',
            accessor: 'desc',
            disableFilters: true
          },
          {
            Header: 'Capacity',
            accessor: 'capacity',
            disableFilters: true
          },
          {
            Header: 'Physical/Virtual',
            id: 'isVirtual',
            disableFilters: true,
            accessor: data => {
              if (data.isVirtual) {
                return (<span className="celltag--invalid">VIRTUAL</span>)
              } else {
                return (<span className="celltag--valid">PHYSICAL</span>)
              }
            }
          },
          {
            Header: 'Address',
            accessor: 'address',
            disableFilters: true
          }
        ],
        []
      )
    
    const noNeedFieldValidation = (value, callback) => {
        callback(true, "");
    }

    const updateVirtualLink = (value) => {
        setVirtualLink(value);
    }

    const updateDuration = (value) => {
        setDuration(value)
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-detail" ref={wrapperRef} onClick={e => e.stopPropagation()}>
                {showInfoConfirmModal && <InfoConfirmModal continueTo={continueConfirmModal} handleClose={closeConfirmModal} show={true} children={modalContents.content} heading={modalContents.header}></InfoConfirmModal>}
                <span className="close-icon modal-detail__close" onClick={handleClose}></span>
                <div className="modal-detail__header modal-detail__header" style={{ fontSize: "24px", fontWeight: 600 }}>
                    {selectedClass == null ? <span>Create Session</span> : <span>Update Session</span>}
                </div>
                <div className="modal-detail__content">
                    <div className='form-group'>
                        <div className='form-group-col2'>
                            <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
                                <div className='form-column'>
                                    <label>Basic Information</label>
                                </div>
                                <div className='form-column'>

                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Start Time</div>
                                    <div className='item-dropdown'>
                                        <DateTimePicker
                                            title={""}
                                            initDateTime={today}
                                            onDateTimeChange={(dateTime, selection) => onDateTimeChange(dateTime, selection)}
                                        />
                                    </div>
                                </div>
                                <div className='form-column'>
                                    <div className='item-name'>Duration (Minitues)</div>
                                    <div className='item-dropdown'>
                                        <CustomInput
                                            initialValue={""} type="number" updateInput={(value) => {
                                                updateDuration(value);
                                            }} fieldValidation={noNeedFieldValidation} required={true} placeHolder="Please enter class duration"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column'>
                                    <div className='item-name'>Virtual Link</div>
                                    <div className='item-dropdown'>
                                        <CustomInput
                                            initialValue={""} type="text" updateInput={(value) => {
                                                updateVirtualLink(value);
                                            }} fieldValidation={noNeedFieldValidation} required={true} placeHolder="Please paste online session link here"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='form-group-col2'>
                            <ReactTableFullWidthStyles>
                                <CommonTable columns={columns} data={common.ClassRooms} onRowSelect={selectClassRoom} rowSelection={true} hiddenColumns={hiddenColumns} pagination={false} settings={false} globalsearch={false} downloadcsv={false} />
                            </ReactTableFullWidthStyles>
                        </div>
                    </div>
                </div>
                <div className="modal-detail__footer">
                    <button className="btn btn--success" onClick={() => { createNewSession() }}>
                        Create New Session
                    </button>
                </div>
            </section>
        </div>
    )
}