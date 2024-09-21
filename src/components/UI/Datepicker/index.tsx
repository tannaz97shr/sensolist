import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { UseFormRegister } from "react-hook-form";

type DateValuePiece = Date | null;

type DateValueType = DateValuePiece | [DateValuePiece, DateValuePiece];

interface DatepickerProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
}

export default function Datepicker({ register, name, label }: DatepickerProps) {
  const [dateValue, setDateValue] = useState<DateValueType>(new Date());

  return (
    <div className="flex items-center">
      <span className="w-1/4">{label}</span>
      <DateTimePicker
        className="dark:text-black"
        onChange={setDateValue}
        value={dateValue}
      />
      <input
        required
        {...register(name, { required: true })}
        className="hidden"
        value={dateValue?.toString()}
      />
    </div>
  );
}
