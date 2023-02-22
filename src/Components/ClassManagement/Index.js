import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Classes from "./Classes/Classes";
import Courses from "./Courses/Courses";
import ClassRooms from "./ClassRooms";
import './Index.css'
import { useSelector } from "react-redux";

const ClassesIndex = props => {

  const common = useSelector((state) => state.common);

  return (
    <div className="main-container">
      <Tabs>
        <TabList>

          <Tab>Courses(පාඨමාලා)</Tab>
          <Tab>Classes(පන්ති)</Tab>
          <Tab>Auditoriums(දේශන ශාලා)</Tab>
        </TabList>
        <TabPanel>
          <Courses></Courses>
        </TabPanel>
        <TabPanel>
          <Classes></Classes>
        </TabPanel>
        <TabPanel>
          <ClassRooms></ClassRooms>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ClassesIndex;