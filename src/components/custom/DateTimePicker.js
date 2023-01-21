import React, { useEffect, useState, useRef} from 'react'
import TimePicker from 'react-time-picker';
import * as dateFns from "date-fns";
import calenderIcon from '../custom/icons/Path 79.svg'
import closeIcon from '../custom/icons/svg-close-icon.svg'
import backIcon from '../custom/icons/svg-back-icon.svg'
import nextIcon from '../custom/icons/svg-next-icon.svg'
import '../custom/custom.css'


export const DateTimePicker = ({ title, initDateTime, selection, onDateTimeChange, valid }) => {
    const [listOpen, setListOpen] = useState(false);
    const [dateTime, setDateTime] = useState(initDateTime);
    const [time, setTime] = useState(dateFns.format(initDateTime, "HH:mm"));
    const [currentMonth, setCurrentMonth] = useState(initDateTime);

    useEffect(() => {
        onDateTimeChange(dateTime, selection)
    }, [dateTime])

    const onDateChange = day => {
        var selectedDate = new Date(dateFns.format(day, "dd MMMM yyyy") + " " + time)
        setDateTime(selectedDate)
    };

    const onTimeChange = timeValue => {
        if(timeValue != null){
            var selectedDate = new Date(dateFns.format(dateTime, "dd MMMM yyyy") + " " + timeValue)
            setDateTime(selectedDate)
            setTime(timeValue)
        }

    }

    const nextMonth = () => {
        setCurrentMonth(dateFns.addMonths(currentMonth, 1))
    }

    const prevMonth = () => {
        setCurrentMonth(dateFns.subMonths(currentMonth, 1))
    };

    const toggleList = () => {
        setListOpen(!listOpen)
    }

    const hideCalender = () => {
        setListOpen(false)
    }

    const renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header cal-row flex-middle">
                <div className="header-left">
                    <div className="date-back" onClick={() => prevMonth()}>
                        <span><img className="cp-back-icon" src={backIcon} alt='back' ></img></span>
                    </div>
                    <div className="date-info">
                        <span>{dateFns.format(currentMonth, dateFormat)}</span>
                    </div>
                    <div className="date-next" onClick={() => nextMonth()}>
                        <span><img className="cp-next-icon" src={nextIcon} alt='next' ></img></span>
                    </div>
                </div>
                <div className="header-right">
                    <div className="time-info">
                        <TimePicker onChange={(time) => onTimeChange(time)} value={time} disableClock={true} clearIcon={null}  autoFocus={true}/>
                    </div>
                </div>
            </div>
        );
    }


    const renderDays = () => {
        const dateFormat = "dd";
        const days = [];

        let startDate = dateFns.startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days cal-row">{days}</div>;
    }

    const renderCells = () => {
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${!dateFns.isSameMonth(day, monthStart)
                            ? "disabled"
                            : dateFns.isSameDay(day, dateTime) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => onDateChange(cloneDay)}
                    >
                        <span className="number">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="cal-row" key={day}>
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
                    <span className='value'>{dateFns.format(dateTime, "dd MMMM yyyy HH:mm")}</span>
                </div>
            </div>
            {listOpen &&
                <div className="cp-content" ref={wrapperRef}>
                    <div className="cp-close cp-fa-thin" onClick={() => hideCalender()}><img className="cp-close-icon" src={closeIcon} alt='close'></img></div>
                    <div className="calender-content" onClick={e => e.stopPropagation()}>
                        <div className="calendar">
                            {renderHeader()}
                            {renderDays()}
                            {renderCells()}
                        </div>
                    </div>
                </div>}
        </div>
    )
}