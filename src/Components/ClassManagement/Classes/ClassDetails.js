import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Sessions from "./Sessions";
import Students from "./Students";


const ClassDetails = props => {
  let { classId } = useParams();

  const [selectedClass, setSelectedClass] = useState(null);

  const dispatch = useDispatch();
  const common = useSelector((state) => state.common);

  const selectClassById = () => {
    var filteredClass = common.Classes.filter(function (val) {
      return val.id == classId;
    });
    if(filteredClass.length > 0){
      console.log("filteredClass", filteredClass[0])
      setSelectedClass(filteredClass[0])
    }
  }

  useEffect(() => {
    selectClassById();
  }, [common.Classes])

  return (
    <div className="main-container">
      <Tabs>
        <TabList>
          <Tab>Sessions</Tab>
          <Tab>Students</Tab>
        </TabList>
        <TabPanel>
          <Sessions selectedClass={selectedClass}></Sessions>
        </TabPanel>
        <TabPanel>
          <Students selectedClass={selectedClass}></Students>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ClassDetails;