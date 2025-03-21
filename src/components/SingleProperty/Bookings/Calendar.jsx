
import {useState, useEffect, use} from 'react'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css'

import { DateRangePicker } from 'react-dates';
import DatePresets from './DatePresets';

export default function Calendar({property_id}) {
  const dateFormat = "DD/MM/YYYY"
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null) 
  const [dateInput, setDateInput] = useState(null)
  const [isSubmitted, setOnSubmitted] = useState(true)

  console.log(dateInput)
  console.log(startDate)

  function handleBooking(e) {
    e.preventDefault()
    const book_in_date = e.target[0].value.split("/").reverse().join("/");
    const book_out_date = e.target[1].value.split("/").reverse().join("/");

    setOnSubmitted(false)

    if(startDate === null || endDate === null) {
      setOnSubmitted(true)
      return
    }

    console.log(book_in_date, book_out_date)
    fetch(`https://pt-be-airbnc.onrender.com/api/properties/${property_id}/booking`, 
    {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(
        {
        guest_id: 1,
        check_in_date: book_in_date,
        check_out_date: book_out_date
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.msg === "Sorry, overlapping dates.") {
        alert(data.msg)
        setOnSubmitted(true)
        setStartDate(null)
        setEndDate(null)
      } else {
        alert(data.msg)
        // redirect to a successful booking page ^^
      }
      console.log(data)
    })
  }
  return (
    <form onSubmit={(e) => handleBooking(e)}>
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
        <p style={{padding: "10px"}}><span style={{fontWeight: "bold"}}>Start date:&nbsp;</span>{startDate && startDate.format(new Date(startDate).toLocaleDateString("gb-GB"))}</p>
        <p style={{padding: "10px"}}><span style={{fontWeight: "bold"}}>End date:&nbsp; </span>{endDate && endDate.format(new Date(endDate).toLocaleDateString("gb-GB"))}</p>
        <button 
        type="submit"
        className={isSubmitted ? "btn" : "btn-disabled"}
        disabled={!isSubmitted ? true : false} 

>Book</button>
      </div>
    </form>
  )
}