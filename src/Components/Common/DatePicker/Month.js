import React, { useState } from 'react'
import DatePicker from "react-datepicker";

const Month = () => {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="MMMM"
      showMonthYearPicker
      customInput={<ExampleCustomInput />}
    />
  );
};

export default Month;
