import React, { useRef, useEffect, useState } from 'react'
import '../custom/custom.css'
import upIcon from '../custom/icons/up.svg'
import downIcon from '../custom/icons/down.svg'
import closeIcon from '../custom/icons/close-icon.svg'

const DropdownInputCell = ({ defaultList, initValue, onItemChange, isNullable, autoComplete = true }) => {
  // array of drop down list
  const [dropList, setDropList] = useState(defaultList);
  //select the initial item from the inital value on the cell.

  //item{id, value, code, selected}
  const [selectedItem, setSelectedItem] = useState(null)
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    let initItem = defaultList.filter((item) => {
      return item.code == initValue
    })
    if (initItem.length > 0) {
      setSelectedItem(initItem[0])
    } else {
      setSelectedItem(null)
    }
  }, [initValue])

  const toggleList = () => {
    setDropList(defaultList)
    setListOpen(!listOpen)
  }

  const closeCurrentList = () => {
    setListOpen(false)
  }


  const clearSelectedItem = (item) => {
    setSelectedItem(null)
  }

  const handleChange = (e) => {
    let filteredList = defaultList.filter((item, index, arr) => {
      return item.value.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setDropList(filteredList)
  }

  const selectItem = (item) => {
    setSelectedItem(item)
    setListOpen(false);
  }

  useEffect(() => {
    onItemChange(selectedItem)
  }, [selectedItem])


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
          closeCurrentList();
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
  useOutsideAlerter(wrapperRef);

  return (
    <div className="dd-wrapper cell" ref={wrapperRef}>
      <div className="dd-header cell" onClick={() => toggleList()}>
        {dropList.length > 0 ?
          <div className="dd-header-title">{selectedItem != null ? selectedItem.value : <span style={{ color: "red" }}>PLEASE SELECT ITEM</span>}</div> :
          <div className="dd-header-title" style={{ color: "red" }}>NO DATA FOR SELECTION</div>
        }
        {
          (selectedItem && isNullable) &&
          <img className="dd-input--clear" alt='clear input' src={closeIcon} onClick={(e) => {
            e.stopPropagation();
            clearSelectedItem(selectedItem)
          }
          }></img>
        }
        {listOpen
          ? <img src={upIcon} alt='up'></img>
          : <img src={downIcon} alt='down'></img>
        }
      </div>
      {listOpen && <ul className="dd-list-input" onClick={e => e.stopPropagation()}>
        {autoComplete && <input className="dd-input" type="text" placeholder="Search" name="Search" onChange={handleChange} ></input>}
        {dropList.map((listItem) => (
          <li className="dd-list-item" style={{ color: listItem.selected ? '#6F9C07' : '#383838' }} key={listItem.id} onClick={() => selectItem(listItem)}>{listItem.value}</li>
        ))}
      </ul>}
    </div>
  )
}

export default DropdownInputCell
