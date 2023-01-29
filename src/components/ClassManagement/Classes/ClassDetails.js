import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Sessions from "./Sessions";
import Students from "./Students";


const ClassDetails = props => {
  return (
    <div className="main-container">
            <Tabs>
                <TabList>
                    <Tab>Sessions</Tab>
                    <Tab>Students</Tab>
                </TabList>
                <TabPanel>
                  <Sessions></Sessions>
                </TabPanel>
                <TabPanel>
                  <Students></Students>
                </TabPanel>
            </Tabs>
    </div>
  );
};

export default ClassDetails;