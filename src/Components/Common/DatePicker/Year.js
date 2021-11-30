import React, { useState } from 'react'
import DatePicker from "react-datepicker";

const Year = () => {
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
      <button className="example-custom-input" onClick={onClick} ref={ref}>
        Yearly
      </button>
    ));
    // console.log(startDate.getFullYear())
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showYearPicker
        dateFormat="yyyy"
        customInput={<ExampleCustomInput />}
      />
    )   
}

export default Year
