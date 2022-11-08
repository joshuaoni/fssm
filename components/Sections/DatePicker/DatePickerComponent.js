import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import styles from "./DatePickerComponent.module.css";

const DatePickerComponent = ({ isStart }) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [previousDate, setPreviousDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [bold, setBold] = useState(false);
  return (
    <DatePicker
      className={`${bold ? styles.fontBold : ""} ${styles.userInputField}`}
      clearable={true}
      open={dateOpen}
      maxDate={new Date()}
      onClose={() => setDateOpen(false)}
      inputFormat="YYYY/MM/DD"
      value={isStart ? previousDate : currentDate}
      onChange={(newValue) => {
        isStart ? setPreviousDate(newValue) : setCurrentDate(newValue);
        setBold(true);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onClick={() => setDateOpen(true)}
        />
      )}
    />
    // </div>
  )
}

export default DatePickerComponent