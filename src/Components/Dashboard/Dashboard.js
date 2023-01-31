import React from "react";
import { Chart } from "react-google-charts";
import './Index.css'

//pie chart
export const dataPie = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const optionsPie = {
  title: "My Daily Activities",
};

//bar chart
export const dataBar = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const optionsBar = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};

//area chart
export const dataArea = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const optionsArea = {
  title: "Company Performance",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

//column chart 
export const dataColumn = [
  ["Element", "Density", { role: "style" }],
  ["Copper", 8.94, "#b87333"], // RGB value
  ["Silver", 10.49, "silver"], // English color name
  ["Gold", 19.3, "gold"],
  ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];

//line charts
export const dataLine = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const optionsLine = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

const Dashboard = props => {
  return (
    <div className="dashboard-container">
      <div className='widget-group'>
        <div className='widget-row'>
          <div className='widget-column'>
            <div className="tile-widget">
              <label>Total Number of Students</label>
              <span>1000</span>
            </div>
            <div className="tile-widget">
              <label>Total Number of Teachers</label>
              <span>15</span>
            </div>
            <div className="tile-widget">
              <label>Total Sessions Per Week</label>
              <span>75</span>
            </div>
          </div>
          <div className='widget-column'>
            <div className="tile-widget">
              <label>Total Income</label>
              <span>Rs 1000000.00</span>
            </div>
            <div className="tile-widget">
              <label>Unpaid Students</label>
              <span style={{color:"#f90a0a"}}>48</span> 
            </div>
            <div className="tile-widget">
              <label>Pending Sessions</label>
              <span>5</span>
            </div>
          </div>
        </div>
        <div className='widget-row'>
          <div className='widget-column'>
            <Chart
              chartType="PieChart"
              data={dataPie}
              options={optionsPie}
              width={"100%"}
            />
          </div>
          <div className='widget-column'>
            <Chart
              chartType="AreaChart"
              width="100%"
              data={dataArea}
              options={optionsArea}
            />
          </div>
        </div>
        <div className='widget-row'>
          <div className='widget-column'>
            <Chart
              chartType="Bar"
              width="100%"
              data={dataBar}
              options={optionsBar}
            />
          </div>
          <div className='widget-column'>
            <Chart
              chartType="LineChart"
              width="100%"
              data={dataLine}
              options={optionsLine}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
