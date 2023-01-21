import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Classes from "./Classes/Classes";
import './Index.css'
import Courses from "./Courses/Courses";

const Index = props => {
  return (
    <div className="main-container">
            <Tabs>
                <TabList>
                    <Tab>Classes(පන්ති)</Tab>
                    <Tab>Cources(පාඨමාලා)</Tab>
                </TabList>
                <TabPanel>
                  <Classes></Classes>
                </TabPanel>
                <TabPanel>
                  <Courses></Courses>
                </TabPanel>
            </Tabs>
    </div>
  );
};

export default Index;