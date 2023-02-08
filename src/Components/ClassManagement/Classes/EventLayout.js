import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import * as dateFns from "date-fns";

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function EventLayout({ data = [] }) {

  const [events, setEvents] = useState([])

  useEffect(() => {
    var eventsArray = [];
    if (data != null) {
      data.forEach(element => {
        var startTime = new Date(element.startTime);
        var item = {
          id: element.id,
          title: element.classRoom.desc,
          start: startTime,
          end: dateFns.addMinutes(startTime, element.duration)
        }
        eventsArray.push(item);
      });
      setEvents(eventsArray);
    }
  }, [data])

  return (
    <Fragment>
      <div className="height600">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </Fragment>
  )
}