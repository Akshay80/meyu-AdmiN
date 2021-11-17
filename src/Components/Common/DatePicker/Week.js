import React, { useState } from 'react'
import DatePicker from "react-datepicker";

const Week = () => {
        const [startDate, setStartDate] = useState(new Date());
        const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
          <button className="example-custom-input" onClick={onClick} ref={ref}>
            Week
          </button>
        ));
        return (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput />}
          />
        );
      };

export default Week
