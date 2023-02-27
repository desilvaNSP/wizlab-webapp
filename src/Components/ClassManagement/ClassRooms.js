import React, { useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { CustomInput } from "../Custom/CustomInput";
import { ReactTableFullWidthStyles } from "../Custom/StyleComponents";
import { CommonTable } from "../CommonTable/CommonTable";
import { CreateClassRoom, StartLoading, StopLoading } from "../../Redux/Features/Common/CommonServicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { CustomCheckBox } from "../Custom/CustomCheckBox ";

const ClassRooms = props => {

  const [audNo, setAudNo] = useState(null);
  const [capacity, setCapacity] = useState(0);
  const [isVirtual, setIsVirtual] = useState(true);
  const [address, setAddress] = useState(null);
  const [formValidation, setFormValidation] = useState([]);

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
    dispatch(StartLoading("Creating new Classroom", "CreateClassRoom"));
    dispatch(CreateClassRoom(payload, function (response, success) {
      if (success) {
        setAudNo("")
        setCapacity(0)
        setIsVirtual(false)
        setAddress("")
      } else {
        //error handle
      }
      dispatch(StopLoading("CreateClassRoom"));
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

  const audNoFieldValidation = (value, callback) => {
    var validity = false;
    if (value == "" || value == null) {
      validity = false
      callback(false, "cannot be empty");
    } else {
      validity = true
      callback(true, "");
    }
    var index = "audno"
    setFormValidation([...formValidation.filter((item) => { return item.name != index}), {
      name: index,
      validity: validity
    }])
  }

  const capacityFieldValidation = (value, callback) => {
    var validity = false;
    if (value > 0) {
      validity = true
      callback(true, "");
    } else {
      validity = false
      callback(false, "capacity should be greater than 0");
    }
    var index = "capacity"
    setFormValidation([...formValidation.filter((item) => { return item.name != index}), {
      name: index,
      validity: validity
    }])
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
              <div className='item-name'>
                Auditorium No
                <label className='required-text'>
                  {"*"}
                </label>
              </div>
              <div className='item-dropdown'>
                <CustomInput
                  initialValue={audNo} type="text" updateInput={(value) => {
                    updateAudNo(value);
                  }} fieldValidation={audNoFieldValidation} required={true} placeHolder=""
                />
              </div>
            </div>
            <div className='form-column' style={{ width: "80%" }}>
              <div className='item-name'>
                Capacity
                <label className='required-text'>
                  {"*"}
                </label></div>
              <div className='item-dropdown'>
                <CustomInput
                  initialValue={capacity} type="number" updateInput={(value) => {
                    updateCapacity(value);
                  }} fieldValidation={capacityFieldValidation} required={true} placeHolder=""
                />
              </div>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-column' style={{ width: "80%" }}>
              <div className='item-name'>Address</div>
              <div className='item-dropdown'>
                <CustomInput
                  initialValue={address} type="text" updateInput={(value) => {
                    updateAddress(value);
                  }} fieldValidation={(value, callback) => { callback(true, "")}} required={true} placeHolder=""
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
              <div className='item-name'>
                Virtual Room
              </div>
              <div className='item-dropdown'>
                <CustomCheckBox
                  initialValue={isVirtual} updateInput={(value) => {
                    updateVirtual(value);
                  }} required={true}
                />
              </div>
            </div>
          </div>
          <div className='form-row' style={{ marginTop: "40px" }}>
            <div className='form-column' style={{ width: "80%" }}>
              <button className="btn btn--success" onClick={() => { createNewClassRoom() }} disabled={formValidation.filter((item) => { return !item.validity}).length > 0 ? true: false}>
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