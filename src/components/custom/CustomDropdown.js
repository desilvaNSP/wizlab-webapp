import React, { useRef, useEffect, useState } from 'react'
import '../custom/custom.css'
import upIcon from '../custom/icons/up.svg'
import downIcon from '../custom/icons/down.svg'
import closeIcon from '../custom/icons/close-icon.svg'

const CustomDropdown = ({ defaultList, initValue, onItemChange, isNullable, required = false, autoComplete = true, editable = true, warningMessage = "" }) => {
  // array of drop down list
  const [dropList, setDropList] = useState(defaultList);

  console.log("initValue", initValue);
  console.log("defaultList", defaultList)

  //item{id, value, code, selected}
  const [item, setItem] = useState(null)
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    //select the initial item from the inital value on the cell.
    let initItem = defaultList.filter((item) => {
      return item.code == initValue
    });

    if (initItem.length > 0) {
      setItem(initItem[0]);
    }
    else {
      setItem(null)
    }
  }, [initValue])

  const toggleList = () => {
    setDropList(defaultList)
    setListOpen(!listOpen)
  }

  const handleClose = () => {
    setListOpen(false)
  }

  const clearSelectedItem = (item) => {
    setItem(null)
  }

  const handleChange = (e) => {
    let filteredList = defaultList.filter((item, index, arr) => {
      return item.value.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setDropList(filteredList)
  }

  const selectItem = (item) => {
    setItem(item)
    setListOpen(false);
    onItemChange(item)
  }

  /*
  useEffect(() => {
    if (item != null) {
      onItemChange(item)
    }
  }, [item])
  */

  /**
 * Hook that alerts clicks outside of the passed ref
 */
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleClose();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }


  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef)

  return (
    <div style={{ textAlign: 'left' }}>
      <div className="dd-wrapper" ref={wrapperRef}>
        <div className="dd-header" onClick={() => {
          if (editable) {
            toggleList()
          }
        }}>
          {
            <div className="dd-header-title">{item && item.value}</div>
          }
          {editable && <div className="dd-header-actions">
            {
              (item && isNullable) &&
              <img className="dd-input--clear" alt='clear input' src={closeIcon} onClick={(e) => {
                e.stopPropagation();
                clearSelectedItem(item)
              }
              }></img>
            }
            {listOpen
              ? <img src={upIcon} alt='up'></img>
              : <img src={downIcon} alt='down'></img>
            }
          </div>
          }
        </div>
        {listOpen && <ul className="dd-list-input" onClick={e => e.stopPropagation()}>
          {autoComplete && <input className="dd-input" type="text" placeholder="Search" name="Search" onChange={handleChange} ></input>}
          {dropList.map((listItem) => (
            <li className="dd-list-item" style={{ color: listItem.selected ? '#6F9C07' : '#383838' }} key={listItem.id} onClick={() => selectItem(listItem)}>{listItem.value}</li>
          ))}
        </ul>}
      </div>
      {required && item == null && <label className='required-text'>
        {"Required"}
      </label>}
      {!editable && <label className='warning-text'>
        {warningMessage}
      </label>}
    </div>

  )
}

export default CustomDropdown
