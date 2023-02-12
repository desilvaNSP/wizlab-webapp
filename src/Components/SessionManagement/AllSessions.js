import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";
import { GetSessionByClassId, StartLoading, StopLoading } from "../../Redux/Features/Common/CommonServicesSlice";
import { ReactTableFullWidthStyles } from '../Custom/StyleComponents'
import * as dateFns from "date-fns";
import { NewSession } from "../ClassManagement/Classes/NewSession";
import { ClassesTable } from "../ClassManagement/Classes/Table/ClassesTable";
import EventLayout from "../ClassManagement/Classes/EventLayout";

const AllSessions = ({ }) => {

    const [data, setData] = useState([])
    const [showSessionCreationPopup, setShowSessionCreationPopup] = useState(false)
    const [selectedSession, setSelectedSession] = useState([])
    const [selectedRowOnTable, setSelectedRowOnTable] = useState(null)

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);

    useEffect(() => {
        dispatch(StartLoading("Get All Sessions"))
        dispatch(GetSessionByClassId(1, function (data, success) {
            if (success) {
                setData(data)
            }
            dispatch(StopLoading())
        }));
    }, []);

    const triggerStartSession = () => {
        setSelectedSession(null)
        setShowSessionCreationPopup(true)
    }
   
    const triggerUpdateClass = () => {
        setSelectedSession(selectedRowOnTable);
        setShowSessionCreationPopup(true)
    }

    const closeSessionCreationPopup = () => {
        setShowSessionCreationPopup(false)
    }

    const selectSession = (rows) => {
        // if any transaction is not set, then set null to selectedTransaction state.
        if (rows.length > 0) {
            setSelectedRowOnTable(rows[0].original)
        }else {
            setSelectedRowOnTable(null)
        }
    }

    const hiddenColumns = ["id"];

    var formatDate = "yyyy-MM-dd HH:mm:ss";


    const columns = React.useMemo(
        () => [
            {
                Header: 'Class Room',
                id: 'classIdentifier',
                accessor: data => {
                    return data.classRoom?.desc
                },
                disableFilters: true
            },
            {
                Header: 'Class Room',
                id: 'classRoomId',
                accessor: data => {
                    return data.classRoom?.desc
                },
                disableFilters: true
            },
            {
                Header: 'Room Capacity',
                id: 'capacity',
                accessor: data => {
                    return data.classRoom?.capacity
                },
                disableFilters: true
            },
            {
                Header: 'Start Time',
                id: 'startTime',
                accessor: data => {
                    return dateFns.format(new Date(data.time), formatDate)
                },
                disableFilters: true
            },
            {
                Header: 'Duration',
                accessor: 'duration',
                disableFilters: true
            },
            {
                Header: 'Link',
                accessor: 'link',
                disableFilters: false
            }
        ],
        []
    )

    return (
        <div className="classes-container">
            {common.IsLoading &&
                <div className="main-loader"  >
                    <img src="/assets/images/loading.svg" alt="loader" />
                    <div className="main-loader__txt">{common.LoadingMessage}</div>
                </div>
            }
            <div className='page-header'>
                <div className="add-record" onClick={() => triggerStartSession()}>
                    <img src="/assets/icons/icon-add.svg" alt="Start New Class" />
                    <span>Create Session</span>
                </div>
                <div className={selectedRowOnTable != null ? "add-record" : "add-record--disabled"} onClick={() => triggerUpdateClass()} >
                    <img src="/assets/icons/update.png" alt="Update Class" style={{ width: "20px", height: "20px", marginRight: "8px" }} />
                    <span>Update Session</span>
                </div>
            </div>
            <Tabs>
                <TabList>
                    <Tab>Table View</Tab>
                    <Tab>Grid View</Tab>
                </TabList>
                <TabPanel>
                    <div className="classes-container">
                        <div className='page-header'>
                            Sessions
                        </div>
                        <ReactTableFullWidthStyles>
                            <ClassesTable columns={columns} data={data} onRowSelect={selectSession} hiddenColumns={hiddenColumns} rowSelection={true} />
                        </ReactTableFullWidthStyles>
                    </div>
                </TabPanel>
                <TabPanel>
                    <EventLayout data={data}></EventLayout>
                </TabPanel>
            </Tabs>
            {showSessionCreationPopup &&
                <NewSession show={showSessionCreationPopup} handleReload={() => { }} handleClose={closeSessionCreationPopup} selectedSession={selectedSession}></NewSession>
            }
        </div>
    );
};

export default AllSessions;