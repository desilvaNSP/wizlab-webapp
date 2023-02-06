import React, { useEffect, useState, useRef } from 'react'
import * as dateFns from "date-fns";
import closeIcon from '../Custom/icons/close-icon.svg'
import backIcon from '../Custom/icons/back-icon.svg'
import nextIcon from '../Custom/icons/next-icon.svg'
import upIcon from '../Custom/icons/up.svg'
import downIcon from '../Custom/icons/down.svg'
import '../Custom/custom.css'


export const MonthPicker = ({ initDateTime, onDateTimeChange }) => {
    const [currentMonth, setCurrentMonth] = useState(initDateTime);
    const [dateTime, setDateTime] = useState(initDateTime);

    useEffect(() => {
        onDateTimeChange(currentMonth)
    }, [currentMonth])

    const nextMonth = () => {
        setCurrentMonth(dateFns.addMonths(currentMonth, 1))
    }

    const prevMonth = () => {
        setCurrentMonth(dateFns.subMonths(currentMonth, 1))
    };
    
    const dateFormat = "MMMM yyyy";
    return (
        <div className="dd-wrapper month--picker" >
            <div className="dd-header" style={{flexDirection:'row'}}>
                <div className="date-info">
                    <span>{dateFns.format(currentMonth, dateFormat)}</span>
                </div>
                <div className="date-back" onClick={() => prevMonth()}>
                    <span><img className="cp-back-icon" src={upIcon} alt='back' ></img></span>
                </div>
                <div className="date-next" onClick={() => nextMonth()}>
                    <span><img className="cp-next-icon" src={downIcon} alt='next' ></img></span>
                </div>
            </div>
        </div>
    )
}