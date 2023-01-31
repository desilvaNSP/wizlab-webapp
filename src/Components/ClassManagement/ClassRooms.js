import React from "react";
import 'react-tabs/style/react-tabs.css';
import { CustomInput } from "../Custom/CustomInput";
import { ReactTableFullWidthStyles } from "../Custom/StyleComponents";
import { CommonTable } from "../CommonTable/CommonTable";

const ClassRooms = props => {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Auditorium No/Code',
        accessor: 'audno',
        disableFilters: true
      },
      {
        Header: 'Capacity',
        accessor: 'capacity',
        disableFilters: true
      },
      {
        Header: 'Physical/Virtual',
        id: 'virtual',
        disableFilters: true,
        accessor: data => {
          if (data.virtual) {
            return (<span className="celltag--invalid">VIRTUAL</span>)
          } else {
            return (<span className="celltag--valid">PHYSICAL</span>)
          }
        }
      },
      {
        Header: 'Address',
        accessor: 'address',
        disableFilters: true
      }
    ],
    []
  )

  const data = [
    {
      "audno": 'AUD01',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    },
    {
      "audno": 'VIRTUAL',
      "capacity": "100",
      "virtual": true,
      "address": "SKYA"
    },
    {
      "audno": 'AUD02',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    },
    {
      "audno": 'AUD03',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    },
    {
      "audno": 'AUD01',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    },
    {
      "audno": 'VIRTUAL',
      "capacity": "100",
      "virtual": true,
      "address": "SKYA"
    },
    {
      "audno": 'AUD02',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    },
    {
      "audno": 'AUD03',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    },
    {
      "audno": 'AUD01',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    },
    {
      "audno": 'VIRTUAL',
      "capacity": "100",
      "virtual": true,
      "address": "SKYA"
    },
    {
      "audno": 'AUD02',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    },
    {
      "audno": 'AUD03',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    },
    {
      "audno": 'AUD01',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    },
    {
      "audno": 'VIRTUAL',
      "capacity": "100",
      "virtual": true,
      "address": "SKYA"
    },
    {
      "audno": 'AUD02',
      "capacity": "100",
      "virtual": false,
      "address": "SKYA"
    }
  ]

  const hiddenColumns = ["selection"];

  return (
    <div className="classroom-container" style={{ display: "flex" }}>
      <div className='form-group' style={{ width: "50%" }}>
        <div className='form-row' style={{ fontSize: "18px", fontWeight: 500, marginTop: "10px", marginBottom: "20px", textAlign: "left" }}>
          <div className='form-column' style={{ width: "80%" }}>
            <label>Create Auditoriums</label>
          </div>
          <div className='form-column' style={{ width: "80%" }}>

          </div>
        </div>
        <div className='form-row'>
          <div className='form-column' style={{ width: "80%" }}>
            <div className='item-name'>Auditorium No</div>
            <div className='item-dropdown'>
              <CustomInput defaultList={[]} onItemChange={(item) => {
              }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
            </div>
          </div>
          <div className='form-column' style={{ width: "80%" }}>
            <div className='item-name'>Capacity</div>
            <div className='item-dropdown'>
              <CustomInput defaultList={[]} onItemChange={(item) => {
              }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
            </div>
          </div>
        </div>
        <div className='form-row'>
          <div className='form-column' style={{ width: "80%" }}>
            <div className='item-name'>Online/Virtual</div>
            <div className='item-dropdown'>
              <CustomInput defaultList={[]} onItemChange={(item) => {
              }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
            </div>
          </div>
          <div className='form-column' style={{ width: "80%" }}>
            <div className='item-name'>Address</div>
            <div className='item-dropdown'>
              <CustomInput defaultList={[]} onItemChange={(item) => {
              }} initValue={1} required={true} editable={true} warningMessage={"Updating course fee is not allowed"} />
            </div>
          </div>
        </div>
        <div className='form-row'>
          <div className='form-column' style={{ width: "80%" }}>
            <button className="btn btn--success" onClick={() => { }} disabled={() => { }}>
              Create Auditoriums
            </button>
          </div>
          <div className='form-column' style={{ width: "80%" }}>
          </div>
        </div>
      </div>
      <div className='auditorium-table'>
        <ReactTableFullWidthStyles>
          <CommonTable columns={columns} data={data} onRowSelect={(rows) => { }} rowSelection={true} hiddenColumns={hiddenColumns} pagination={false} settings={false} globalsearch={false} downloadcsv={false} />
        </ReactTableFullWidthStyles>
      </div>
    </div>
  );
};

export default ClassRooms;