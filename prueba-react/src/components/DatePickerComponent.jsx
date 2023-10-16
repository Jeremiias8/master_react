import React, { useState, useEffect } from 'react'
import '../Index.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { VscAdd } from "react-icons/vsc";
import { VscArchive } from "react-icons/vsc";

export const DatePickerComponent = (props) => {

  const [selectedDate, setSelectedDate] = useState('');
  const [newDate,setNewDate] = useState({
    date: ''
  });

  const { date } = newDate;

  const handleDateChange = (date) => {

    setSelectedDate(date);
  }

  const añadirFecha = () => {
    const colocarDate = localStorage.setItem('dates', JSON.stringify(date));
    
    setNewDate(colocarDate);
  }

  const borrarFecha = (date) => {
    {/* if (!date === date) {
      setNewDate('');
    } */}

    localStorage.removeItem('dates', JSON.stringify(date));
  }

  useEffect(() => {
    // alert("Calendario de pagos en marcha !");

    handleDateChange();
  }, );

    return (
      <>
        <div className="pickers-container">
          {/* 
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={'06-12-2016'}
            maxDate={'12-12-2016'}
            placeholderText='Select a date'
          />
          */}

          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText='Select a date'
          />

          <input type="text" value={selectedDate} />
          <span className="validity"></span>

          <button onClick={añadirFecha}>
            <VscAdd />
          </button>

          &nbsp;
          <button onClick={borrarFecha}>
            <VscArchive />
          </button>

          &nbsp;
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />

          <button onClick={añadirFecha}>
            <VscAdd />
          </button>

          &nbsp;
          <button onClick={borrarFecha}>
            <VscArchive />
          </button>

          &nbsp;
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />

          <button onClick={añadirFecha}>
            <VscAdd />
          </button>
          &nbsp;
          <button onClick={borrarFecha}>
            <VscArchive />
          </button>
        </div>
      </>
    ); 

}
