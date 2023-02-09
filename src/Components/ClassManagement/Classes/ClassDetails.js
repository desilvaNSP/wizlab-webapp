import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Sessions from "./Sessions";
import Students from "./Students";


const ClassDetails = props => {
  let { classId } = useParams();
  const [selectedClass, setSelectedClass] = useState(null);

  const common = useSelector((state) => state.common);

  const SelectClassById = () => {
    var selectedClass = null;
    var filteredClass = common.Classes.filter(function (val) {
      return val.id == classId;
    });
    if (filteredClass.length > 0) {
      selectedClass = filteredClass[0]
    }
    return selectedClass;
  }

  useEffect(() => {
    let filteredClass = SelectClassById();
    if (filteredClass != null) {
      setSelectedClass(filteredClass)
    }
  }, [common.Classes])

  return (
    <div className="main-container">
      {selectedClass &&
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
        </Tabs>}
    </div>
  );
};

export default ClassDetails;