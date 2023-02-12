import React, { useEffect, useState, useRef} from 'react'
import calenderIcon from '../Custom/icons/Path 79.svg'
import closeIcon from '../Custom/icons/close-icon.svg'
import '../Custom/custom.css'


export const DateSelectionPicker = ({ title, selection, onDateSelect, valid = true}) => {
    const [listOpen, setListOpen] = useState(false);
    const [date, setDate] = useState(15);

    useEffect(() => {
        onDateSelect(date, selection)
    }, [date])

    const onDateChange = day => {
        setDate(day)
    };


    const toggleList = () => {
        setListOpen(!listOpen)
    }

    const hideCalender = () => {
        setListOpen(false)
    }


    const renderCells = () => {
        const rows = [];
        let days = [];

        var value = 0;
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 7; i++) {
                value++;
                const cloneValue = value;
                days.push(
                    <div
                        className={`col cell ${date == value ? "selected" : ""}`}
                        key={value}
                        onClick={() => onDateChange(cloneValue)}
                    >
                        <span className="number">{value}</span>
                    </div>
                );
            }
            rows.push(
                <div className="cal-row">
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    hideCalender();
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

    const wrapperClassName = valid ? "dd-wrapper" : "dd-wrapper filter-validation-error"
    return (
        <div className={wrapperClassName}>
            <div className="dd-header" onClick={() => toggleList()}>
                <img src={calenderIcon} alt='calender'></img>
                <div className='cp-selected-date'>
                    <span className='subject'>{title}</span>
                    <span className='value'>{date}</span>
                </div>
            </div>
            {listOpen &&
                <div className="cp-content" ref={wrapperRef}>
                    <div className="cp-close cp-fa-thin" onClick={() => hideCalender()}><img className="cp-close-icon" src={closeIcon} alt='close'></img></div>
                    <div className="calender-content" onClick={e => e.stopPropagation()}>
                        <div className="calendar">
                            {renderCells()}
                        </div>
                    </div>
                </div>}
        </div>
    )
}