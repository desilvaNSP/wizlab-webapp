import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Sessions from "./Sessions";
import Students from "./Students";


const ClassDetails = props => {
  let { classId } = useParams();

  return (
    <div className="main-container">
      {classId &&
        <Tabs>
          <TabList>
            <Tab>Sessions</Tab>
            <Tab>Students</Tab>
          </TabList>
          <TabPanel>
            <Sessions classId={classId}></Sessions>
          </TabPanel>
          <TabPanel>
            <Students classId={classId}></Students>
          </TabPanel>
        </Tabs>}
    </div>
  );
};

export default ClassDetails;