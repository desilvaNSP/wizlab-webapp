import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { NewSession } from "./NewSession";
import EventLayout from "./EventLayout";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";
import { StartLoading, StopLoading } from "../../../Redux/Features/Common/CommonServicesSlice";
import { ReactTableFullWidthStyles } from '../../Custom/StyleComponents'
import * as dateFns from "date-fns";
import { ClassTable } from "./Table/ClassTable";
import { GetSessionByClassId } from "../../../Redux/Features/Sessions/SessionServicesSlice";

const Sessions = ({ classId }) => {

    const [data, setData] = useState([])
    const [showSessionCreationPopup, setShowSessionCreationPopup] = useState(false)
    const [selectedSession, setSelectedSession] = useState([])
    const [selectedRowOnTable, setSelectedRowOnTable] = useState(null)

    const [loading, setLoading] = React.useState(false)
    const [tablePageSize, setTablePageSize] = React.useState(10)
    const [pageCount, setPageCount] = React.useState(0)

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);
    const sessions = useSelector((state) => state.sessions);

    useEffect(() => {
        if(sessions.Sessions?.sessions != null){
            console.log("sessions.Sessions?.sessions", sessions.Sessions?.sessions)
            setData(sessions.Sessions?.sessions)
            setPageCount(Math.ceil(sessions.Sessions?.totalNumberOfEntries / tablePageSize))
        }
    }, [sessions.Sessions?.sessions])


    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        var payload = {
            "classId": classId,
            "pageSize": pageSize,
            "pageNumber": pageIndex + 1
        }
        setLoading(true)
        setTablePageSize(pageSize)
        dispatch(StartLoading("Get Sessions for Class", "GetSessionByClassId"))
        dispatch(GetSessionByClassId(payload, function (data, success) {
            setLoading(false)
            dispatch(StopLoading("GetSessionByClassId"))
        }));
    }, [])


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
        } else {
            setSelectedRowOnTable(null)
        }
    }

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

    const hiddenColumns = ["id"];

    var formatDate = "yyyy-MM-dd HH:mm:ss";

    const columns = React.useMemo(
        () => [
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
                    return dateFns.format(new Date(data.startTime), formatDate) //  // need to update this as startTime
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
                            <ClassTable
                                columns={columns}
                                data={data}
                                onRowSelect={selectSession}
                                hiddenColumns={hiddenColumns}
                                rowSelection={true}
                                fetchData={fetchData}
                                loading={loading}
                                pageCount={pageCount}
                                updateMyData={updateMyData}
                                numberOfRecords={pageCount} />
                        </ReactTableFullWidthStyles>
                    </div>
                </TabPanel>
                <TabPanel>
                    <EventLayout data={data}></EventLayout>
                </TabPanel>
            </Tabs>
            {showSessionCreationPopup &&
                <NewSession show={showSessionCreationPopup} handleReload={() => { }} handleClose={closeSessionCreationPopup} classId={classId} selectedSession={selectedSession}></NewSession>
            }
        </div>
    );
};

export default Sessions;