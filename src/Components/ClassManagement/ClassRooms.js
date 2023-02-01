import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { CustomInput } from "../Custom/CustomInput";
import { ReactTableFullWidthStyles } from "../Custom/StyleComponents";
import { CommonTable } from "../CommonTable/CommonTable";
import { CreateClassRoom } from "../../Redux/Features/Common/CommonServicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { CustomCheckBox } from "../Custom/CustomCheckBox ";

const ClassRooms = props => {

  const [audNo, setAudNo] = useState(null);
  const [capacity, setCapacity] = useState(0);
  const [isVirtual, setIsVirtual] = useState(false);
  const [address, setAddress] = useState(null);

  const dispatch = useDispatch();
  const common = useSelector((state) => state.common);

  //Trigger create new class service
  const createNewClassRoom = () => {
    var payload = {
      "description": audNo,
      "capacity": capacity,
      "isVirtual": isVirtual,
      "auditoriumNo": audNo,
      "address": address
    }
    console.log(payload)
    dispatch(CreateClassRoom(payload, function (response, success) {
      if (success) {

      } else {
        //error handle
      }
    }));
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Auditorium No/Code',
        accessor: 'desc',
        disableFilters: true
      },
      {
        Header: 'Capacity',
        accessor: 'capacity',
        disableFilters: true
      },
      {
        Header: 'Physical/Virtual',
        id: 'isVirtual',
        disableFilters: true,
        accessor: data => {
          if (data.isVirtual) {
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

  const noNeedFieldValidation = (value, callback) => {
    callback(true, "");
  }

  const hiddenColumns = ["selection"];

  const updateAudNo = (value) => {
    setAudNo(value)
  }

  const updateCapacity = (value) => {
    setCapacity(value)
  }

  const updateAddress = (value) => {
    setAddress(value)
  }

  const updateVirtual = (value) => {
    console.log("updateVirtual", value)
    setIsVirtual(value)
  }

  return (
    <div className="classroom-container">
      <div className='form-group'>
        <div className='form-group-col2'>
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
                <CustomInput
                  initialValue={""} type="text" updateInput={(value) => {
                    updateAudNo(value);
                  }} fieldValidation={noNeedFieldValidation} required={true} placeHolder=""
                />
              </div>
            </div>
            <div className='form-column' style={{ width: "80%" }}>
              <div className='item-name'>Capacity</div>
              <div className='item-dropdown'>
                <CustomInput
                  initialValue={""} type="number" updateInput={(value) => {
                    updateCapacity(value);
                  }} fieldValidation={noNeedFieldValidation} required={true} placeHolder=""
                />
              </div>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-column' style={{ width: "80%" }}>
              <div className='item-name'>Address</div>
              <div className='item-dropdown'>
                <CustomInput
                  initialValue={""} type="text" updateInput={(value) => {
                    updateAddress(value);
                  }} fieldValidation={noNeedFieldValidation} required={true} placeHolder=""
                />
              </div>
            </div>
            <div className='form-column' style={{ width: "80%" }}>

            </div>
          </div>
          <div className='form-row'>
            <div className='form-column' style={{ width: "80%" }}>
            </div>
            <div className='form-column' style={{ width: "80%" }}>
              <div className='item-name'>Virtual Room</div>
              <div className='item-dropdown'>
                <CustomCheckBox
                  initialValue={""} updateInput={(value) => {
                    updateVirtual(value);
                  }} required={true}
                />
              </div>
            </div>
          </div>
          <div className='form-row' style={{ marginTop: "40px" }}>
            <div className='form-column' style={{ width: "80%" }}>
              <button className="btn btn--success" onClick={() => { createNewClassRoom() }}>
                Create Auditoriums
              </button>
            </div>
            <div className='form-column' style={{ width: "80%" }}>
            </div>
          </div>
        </div>
        <div className='form-group-col2'>
          <div className='auditorium-table'>
            <ReactTableFullWidthStyles>
              <CommonTable columns={columns} data={common.ClassRooms} onRowSelect={(rows) => { }} rowSelection={true} hiddenColumns={hiddenColumns} pagination={false} settings={false} globalsearch={false} downloadcsv={false} />
            </ReactTableFullWidthStyles>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRooms;