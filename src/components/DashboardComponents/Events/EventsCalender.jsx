import icons from "~/assets/js/icons";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EventsCalender = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="sticky top-0">
      <div className="bg-white rounded-xl p-4 h-80 shadow event-calender">
        <Calendar onChange={onChange} value={value} className="w-full h-full" />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Today, 8</h3>
        <ul className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="bg-white border rounded-xl p-4 space-y-4">
              <div>
                <p className="text-gray-dark text-xs mb-2 truncate flex items-center gap-2">
                  <span>{icons.clockCounter}</span> 10:00 AM - 10:30AM
                </p>
                <h4 className="text-sm font-bold truncate">Medical Problems in West Africa</h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventsCalender;
