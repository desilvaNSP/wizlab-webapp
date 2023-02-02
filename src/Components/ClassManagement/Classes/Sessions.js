import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { NewSession } from "./NewSession";
import EventLayout from "./EventLayout";
import 'react-big-calendar/lib/css/react-big-calendar.css'



const Sessions = ({ selectedClass }) => {

    const [selectedSession, setSelectedSession] = useState(null)
    const [showSessionCreationPopup, setShowSessionCreationPopup] = useState(false)

    const hiddenColumns = ["id"];

    /**
     * 
     * @param {Object} item selected item of the dropdown list
     * @param {String} key used to selected desired dropdown component
     */
    const resetThenSet = (item, key) => {

    };

    const triggerStartSession = () => {
        setShowSessionCreationPopup(true)
    }

    const closeSessionCreationPopup = () => {
        setShowSessionCreationPopup(false)
    }

    /**
     * Event handling for apply filters and retrive class data.
     */
    const handleApplyOnClick = () => {
        alert("load classes data")
    };

    return (
        <div className="classes-container">
            <div className='page-header'>
                <div className="add-record" onClick={() => triggerStartSession()}>
                    <img src="/assets/icons/icon-add.svg" alt="Start New Class" />
                    <span>Create Session</span>
                </div>
            </div>
            <EventLayout></EventLayout>
            {showSessionCreationPopup &&
                <NewSession show={showSessionCreationPopup} handleReload={() => { }} handleClose={closeSessionCreationPopup} selectedClass={selectedClass}></NewSession>
            }
        </div>
    );
};

export default Sessions;