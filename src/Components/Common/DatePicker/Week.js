import React, { useState } from "react";
import DatePicker from "react-datepicker";

const Week = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(dates)
  };
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value.substring(0,value.length-2)}
    </button>
  ));
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      customInput={<CustomInput />}
    />
  );
};

export default Week;
