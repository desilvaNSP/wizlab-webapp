import React, { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { NewSession } from "./NewSession";
import EventLayout from "./EventLayout";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";
import { GetSessionByClassId, StartLoading, StopLoading } from "../../../Redux/Features/Common/CommonServicesSlice";
import { ClassesTable } from "./Table/ClassesTable";
import { ReactTableFullWidthStyles } from '../../Custom/StyleComponents'
import * as dateFns from "date-fns";

const Sessions = ({ selectedClass }) => {

    const [data, setData] = useState([])
    const [showSessionCreationPopup, setShowSessionCreationPopup] = useState(false)

    const dispatch = useDispatch();
    const common = useSelector((state) => state.common);

    useEffect(() => {
        if (selectedClass != null) {
            dispatch(StartLoading("Get Sessions for Class '" + selectedClass.classIdentifier +"'"))
            dispatch(GetSessionByClassId(selectedClass.id, function (data, success) {
                if (success) {
                    setData(data)
                }
                dispatch(StopLoading())
            }));
        }
    }, [selectedClass]);

    const triggerStartSession = () => {
        setShowSessionCreationPopup(true)
    }

    const closeSessionCreationPopup = () => {
        setShowSessionCreationPopup(false)
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
                    return dateFns.format(new Date(data.startTime), formatDate)
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
                            <ClassesTable columns={columns} data={data} onRowSelect={(rows) => { }} hiddenColumns={hiddenColumns} rowSelection={true} />
                        </ReactTableFullWidthStyles>
                    </div>
                </TabPanel>
                <TabPanel>
                    <EventLayout data={data}></EventLayout>
                </TabPanel>
            </Tabs>
            {showSessionCreationPopup &&
                <NewSession show={showSessionCreationPopup} handleReload={() => { }} handleClose={closeSessionCreationPopup} selectedClass={selectedClass}></NewSession>
            }
        </div>
    );
};

export default Sessions;