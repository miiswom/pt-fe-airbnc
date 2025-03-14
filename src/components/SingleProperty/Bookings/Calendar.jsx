
import {useState, useEffect, use} from 'react'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'

import { DateRangePicker } from 'react-dates';
import DatePresets from './DatePresets';

export default function Calendar() {
  const dateFormat = "DD/MM/YYYY"
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null) 
  const [dateInput, setDateInput] = useState(null)
  console.log(dateInput)
  console.log(startDate)

  return (
    <div>
      <DateRangePicker
      
      startDate={startDate}
      startDateId="start_id"
      endDate={endDate}
      enDateId="end_id"
      onDatesChange={({startDate, endDate})=> {
        setStartDate(startDate)
        setEndDate(endDate)
      }}
      displayFormat={dateFormat}
      focusedInput={dateInput}
      onFocusChange={(e)=> setDateInput(e)}
      // renderCalendarInfo={() => (
      //   <DatePresets 
      //   startDate={startDate}
      //   endDate={endDate}
      //   dateFormat={dateFormat}
      //   handlePresets={(start, end) => {
      //     setStartDate(start)
      //     setEndDate(end)
      //   }}
      //   />
      // )}
      />
      <div className='container'>
        <p><strong>Start date:</strong>{startDate && startDate.format(new Date(startDate).toLocaleDateString("gb-GB"))}</p>
        <p><strong>End date:</strong>{endDate && endDate.format(new Date(endDate).toLocaleDateString("gb-GB"))}</p>
      </div>
    </div>
  )
}