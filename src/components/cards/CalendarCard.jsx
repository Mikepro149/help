"use client"

import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default function CalendarCard() {
  return (
    <div className="bg-orange-100 rounded shadow p-4">
      <h2 className="font-bold mb-2">📅 Calendario</h2>
      <Calendar locale="es-ES" />
    </div>
  )
}
