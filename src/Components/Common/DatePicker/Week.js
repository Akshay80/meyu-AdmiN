import React, { useState } from 'react'
import DatePicker from "react-datepicker";

const Week = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <DatePicker
    placeholderText="select Week"
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
    />
  );
      };

export default Week
