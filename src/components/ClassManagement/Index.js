import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Classes from "./Classes/Classes";
import './Index.css'
import Courses from "./Courses/Courses";
import ClassRooms from "./ClassRooms";

const ClassesIndex = props => {
  return (
    <div className="main-container">
            <Tabs>
                <TabList>
                    <Tab>Classes(පන්ති)</Tab>
                    <Tab>Cources(පාඨමාලා)</Tab>
                    <Tab>Auditoriums(දේශන ශාලා)</Tab>
                </TabList>
                <TabPanel>
                  <Classes></Classes>
                </TabPanel>
                <TabPanel>
                  <Courses></Courses>
                </TabPanel>
                <TabPanel>
                  <ClassRooms></ClassRooms>
                </TabPanel>
            </Tabs>
    </div>
  );
};

export default ClassesIndex;