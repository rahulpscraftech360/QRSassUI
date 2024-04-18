import React from "react";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const TimePicker = (setTime, time) => {
  const [hour, setHour] = React.useState("");
  const [minute, setMinute] = React.useState("");
  const [period, setPeriod] = React.useState("");

  const handleHourChange = (value) => {
    setHour(value);
    updateTime(hour, value, period);
  };

  const handleMinuteChange = (value) => {
    setMinute(value);
    updateTime(minute, value, period);
  };

  const handlePeriodChange = (value) => {
    setPeriod(value);
    updateTime(period, minute, value);
  };
  console.log(time);
  const updateTime = (hour, minute, period) => {
    if (hour !== "" && minute !== "" && period !== "") {
      setTime(`${hour}:${minute} ${period.toUpperCase()}`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="w-full justify-start text-left font-normal"
          variant="outline"
        >
          <ClockIcon className="mr-1 h-4 w-4 -translate-x-1" />
          {"Pick a time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto p-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          {/* <SelectContent position="popper">
            <SelectItem value="01">01</SelectItem>
            <SelectItem value="02">02</SelectItem>
            <SelectItem value="03">03</SelectItem>
            <SelectItem value="04">04</SelectItem>
            <SelectItem value="05">05</SelectItem>
            <SelectItem value="06">06</SelectItem>
            <SelectItem value="07">07</SelectItem>
            <SelectItem value="08">08</SelectItem>
            <SelectItem value="09">09</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="11">11</SelectItem>
            <SelectItem value="12">12</SelectItem>
          </SelectContent> */}
          <SelectContent position="popper">
            {[...Array(12).keys()].map((i) => (
              <SelectItem
                key={i + 1}
                value={i < 9 ? `0${i + 1}` : `${i + 1}`}
                onSelect={() =>
                  handleHourChange(i < 9 ? `0${i + 1}` : `${i + 1}`)
                }
              >
                {i < 9 ? `0${i + 1}` : `${i + 1}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="h-px w-4 mx-2 bg-border-100" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          {/* <SelectContent position="popper">
            <SelectItem value="00">00</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="45">45</SelectItem>
          </SelectContent> */}
          <SelectContent position="popper">
            {["00", "15", "30", "45"].map((value) => (
              <SelectItem
                key={value}
                value={value}
                onSelect={() => handleMinuteChange(value)}
              >
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="am" onSelect={() => handlePeriodChange("am")}>
              AM
            </SelectItem>
            <SelectItem value="pm" onSelect={() => handlePeriodChange("pm")}>
              PM
            </SelectItem>
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
};

export default TimePicker;

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
