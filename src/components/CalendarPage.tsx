import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreHorizontal,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";

type Event = {
  id: number;
  day: number;
  title: string;
  time: string;
  type: "meeting" | "deadline" | "focus";
  color: "purple" | "orange" | "green" | "blue";
};

const initialEvents: Event[] = [
  {
    id: 1,
    day: 9,
    title: "Design review",
    time: "10:00 AM",
    type: "meeting",
    color: "purple",
  },
  {
    id: 2,
    day: 12,
    title: "Onboarding flow due",
    time: "All day",
    type: "deadline",
    color: "orange",
  },
  {
    id: 3,
    day: 17,
    title: "Team planning",
    time: "2:30 PM",
    type: "meeting",
    color: "blue",
  },
  {
    id: 4,
    day: 20,
    title: "Q3 launch checkpoint",
    time: "11:00 AM",
    type: "meeting",
    color: "purple",
  },
  {
    id: 5,
    day: 24,
    title: "Focus: Website redesign",
    time: "All day",
    type: "focus",
    color: "green",
  },
  {
    id: 6,
    day: 27,
    title: "Brand direction review",
    time: "4:00 PM",
    type: "deadline",
    color: "orange",
  },
];

const calendarDays = [
  { day: 26, muted: true },
  { day: 27, muted: true },
  { day: 28, muted: true },
  { day: 29, muted: true },
  { day: 30, muted: true },
  { day: 31, muted: true },
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15 },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 1, muted: true },
  { day: 2, muted: true },
  { day: 3, muted: true },
  { day: 4, muted: true },
  { day: 5, muted: true },
];

export function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(24);
  const [events, setEvents] = useState(initialEvents);

  const selectedEvents = events.filter((event) => event.day === selectedDay);

  function addEvent() {
    const title = window.prompt("What would you like to add to your calendar?");

    if (!title?.trim()) return;

    setEvents((current) => [
      ...current,
      {
        id: Date.now(),
        day: selectedDay,
        title,
        time: "All day",
        type: "focus",
        color: "purple",
      },
    ]);
  }

  return (
    <section className="calendar-page">
      <div className="calendar-heading">
        <div>
          <p>WORKSPACE / CALENDAR</p>
          <h1>Make time for what matters.</h1>
          <span>Your projects, priorities, and people in one clear view.</span>
        </div>

        <button className="calendar-create" onClick={addEvent}>
          <Plus size={17} />
          Create event
        </button>
      </div>

      <div className="calendar-layout">
        <article className="calendar-card">
          <div className="calendar-controls">
            <div className="month-switcher">
              <button><ChevronLeft size={18} /></button>
              <h2>June 2026</h2>
              <button><ChevronRight size={18} /></button>
            </div>

            <div className="calendar-view-toggle">
              <button className="selected">Month</button>
              <button>Week</button>
              <button>Today</button>
            </div>
          </div>

          <div className="weekdays">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="calendar-grid">
            {calendarDays.map((date, index) => {
              const dayEvents = date.muted
                ? []
                : events.filter((event) => event.day === date.day);

              return (
                <button
                  className={`calendar-date ${date.muted ? "muted" : ""} ${
                    selectedDay === date.day && !date.muted ? "selected-day" : ""
                  }`}
                  key={`${date.day}-${index}`}
                  onClick={() => !date.muted && setSelectedDay(date.day)}
                >
                  <span className={date.day === 24 && !date.muted ? "today" : ""}>
                    {date.day}
                  </span>

                  <div className="calendar-event-dots">
                    {dayEvents.slice(0, 3).map((event) => (
                      <i className={event.color} key={event.id} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="calendar-legend">
            <span><i className="purple" /> Meetings</span>
            <span><i className="orange" /> Deadlines</span>
            <span><i className="green" /> Focus time</span>
          </div>
        </article>

        <aside className="agenda-panel">
          <div className="agenda-heading">
            <div>
              <p>YOUR AGENDA</p>
              <h2>June {selectedDay}</h2>
            </div>

            <button><MoreHorizontal size={18} /></button>
          </div>

          {selectedEvents.length ? (
            <div className="agenda-events">
              {selectedEvents.map((event) => (
                <article className="agenda-event" key={event.id}>
                  <span className={`agenda-color ${event.color}`} />

                  <div>
                    <b>{event.title}</b>
                    <small>
                      {event.type === "meeting" ? <Users size={12} /> : <CalendarDays size={12} />}
                      {event.time}
                    </small>
                  </div>

                  <button><MoreHorizontal size={16} /></button>
                </article>
              ))}
            </div>
          ) : (
            <div className="calendar-empty">
              <span><Sparkles size={18} /></span>
              <b>A little breathing room.</b>
              <p>No events are scheduled for this day.</p>
              <button onClick={addEvent}>Add something meaningful</button>
            </div>
          )}

          <div className="agenda-divider" />

          <div className="upcoming-title">
            <p>COMING UP</p>
            <b>Next few days</b>
          </div>

          <div className="upcoming-event">
            <span className="upcoming-icon"><Clock size={15} /></span>
            <div>
              <b>Design review</b>
              <small>Tuesday, Jun 9 · 10:00 AM</small>
            </div>
          </div>

          <div className="upcoming-event">
            <span className="upcoming-icon orange"><CalendarDays size={15} /></span>
            <div>
              <b>Onboarding flow due</b>
              <small>Friday, Jun 12 · All day</small>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}