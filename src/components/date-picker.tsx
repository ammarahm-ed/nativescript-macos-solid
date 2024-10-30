import { createSignal } from "npm:solid-js";

function DatePicker() {
  const [date, setDate] = createSignal<Date>();
  return (
    <view
      style={{
        gap: 10,
      }}
    >
      <date-picker
        onDateChange={(event) => {
          setDate(event.date);
        }}
      />
      <text>{date()?.toLocaleString()}</text>
    </view>
  );
}

DatePicker.code = `function DatePicker() {
  const [date, setDate] = createSignal();
  return (
    <view
      style={{
        gap: 10,
      }}
    >
      <date-picker
        onDateChange={(event) => {
          setDate(event.date);
        }}
      />
      <text>{date}</text>
    </view>
  );
}`;

export default DatePicker;
