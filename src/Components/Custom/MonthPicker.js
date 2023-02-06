import React, { useEffect, useState, useRef } from 'react'
import * as dateFns from "date-fns";
import closeIcon from '../Custom/icons/close-icon.svg'
import backIcon from '../Custom/icons/back-icon.svg'
import nextIcon from '../Custom/icons/next-icon.svg'
import '../Custom/custom.css'


export const MonthPicker = ({ initDateTime, onDateTimeChange }) => {
    const [currentMonth, setCurrentMonth] = useState(initDateTime);
    const [dateTime, setDateTime] = useState(initDateTime);

    useEffect(() => {
        onDateTimeChange(dateTime)
    }, [dateTime])

    const nextMonth = () => {
        setCurrentMonth(dateFns.addMonths(currentMonth, 1))
    }

    const prevMonth = () => {
        setCurrentMonth(dateFns.subMonths(currentMonth, 1))
    };

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
            </div>
        );
    }

    return (
        <div className="dd-wrapper" >
            <div className="dd-header">
                <div className="calendar--monthly">
                    {renderHeader()}
                </div>
            </div>
        </div>
    )
}