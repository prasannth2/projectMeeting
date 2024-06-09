/* eslint-disable react/prop-types */
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useEffect, useState } from "react";

function CalendarDate({ setDate, setDay }) {
  const [calDate, setCalDate] = useState();

  useEffect(() => {
    const formattedWeek = moment(calDate).format("YYYY-DD"); // "2024-13"
    const formattedDay = moment(calDate).format("dddd"); // "Thu"
    setDate(formattedWeek);
    setDay(formattedDay);
  }, [calDate]);

  return (
    <Card className={cn("rounded")}>
      <CardContent>
        <Calendar mode="single" selected={calDate} onSelect={setCalDate} />
      </CardContent>
    </Card>
  );
}

export default CalendarDate;
