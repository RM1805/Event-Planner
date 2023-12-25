import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import styled from "styled-components";
import { Link } from "react-router-dom";

const localizer = momentLocalizer(moment);

const EventsContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #e0e8ff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c3e50;
  padding: 15px;
  border-radius: 10px 10px 0 0;
`;

const Logo = styled.h1`
  color: #ecf0f1;
  margin: 0;
  font-size: 24px;
`;

const NavigationLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    color: #ecf0f1;
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #34495e;
    }
  }
`;

const CalendarWrapper = styled.div`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;

  li {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #f0f0f0;
    }

    strong {
      display: block;
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      margin: 0;
      color: #6c757d;
    }
  }
`;

const RSVPButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const EventForm = styled.div`
  margin-top: 20px;

  h3 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #343a40;
  }

  input {
    width: 90%;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease-in-out;
  }

  input:focus {
    border-color: #007bff;
    outline: none;
  }

  button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 15px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #218838;
    }
  }
`;

const IconButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  margin: 0 5px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const ToolbarLabel = styled.span`
  margin: 0 10px;
  font-size: 18px;
  font-weight: bold;
  color: #343a40;
`;

const ToolbarButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #218838;
  }
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #c82333;
  }
`;

const AttendeesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

const AttendeesLabel = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
  color: #343a40;
`;

const Attendee = styled.li`
  background-color: #eee;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "" });
  const [attendees, setAttendees] = useState({});
  const [showAttendees, setShowAttendees] = useState(false);
  const [currentAttendees, setCurrentAttendees] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const CustomToolbar = ({
    label,
    onNavigate,
    onView,
    onShowAttendees,
    events,
  }) => {
    const handleShowAttendees = () => {
      // For simplicity, let's assume the first event in the list
      const event = events[0];

      if (event) {
        const eventAttendees = event.attendees || [];
        setCurrentAttendees(eventAttendees);
        setShowAttendees(true);
        setSelectedEvent(event);
      }
    };

    const handleCloseAttendees = () => {
      setShowAttendees(false);
    };

    const handleViewChange = (view) => {
      handleCloseAttendees();
      onView(view);
    };

    return (
      <div>
        <IconButton onClick={() => onNavigate("PREV")}>{"<"}</IconButton>
        <ToolbarLabel>{label}</ToolbarLabel>
        <IconButton onClick={() => onNavigate("NEXT")}>{">"}</IconButton>
        <ToolbarButton onClick={() => handleViewChange("month")}>
          Month
        </ToolbarButton>
        <ToolbarButton onClick={() => handleViewChange("week")}>
          Week
        </ToolbarButton>
        <ToolbarButton onClick={() => handleViewChange("day")}>
          Day
        </ToolbarButton>
        <ToolbarButton onClick={handleShowAttendees} active={showAttendees}>
          Attendees
        </ToolbarButton>
        {showAttendees && selectedEvent && (
          <AttendeesList>
            <AttendeesLabel>Attendees:</AttendeesLabel>
            {currentAttendees.map((attendee, index) => (
              <Attendee key={index}>
                <span>{attendee}</span>
              </Attendee>
            ))}
          </AttendeesList>
        )}
      </div>
    );
  };

  // Fetch events and attendees
  const fetchEvents = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://event-planner-backend-ctos.onrender.com/events",
        {
          headers: { Authorization: accessToken },
        }
      );
      setEvents(response.data);

      // Initialize attendees state
      const attendeesObj = {};
      response.data.forEach((event) => {
        attendeesObj[event._id] = event.attendees;
      });
      setAttendees(attendeesObj);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle RSVP and update attendees
  const handleRSVP = async (eventId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `https://event-planner-backend-ctos.onrender.com/events/${eventId}/rsvp`,
        {},
        {
          headers: { Authorization: accessToken },
        }
      );

      // Update attendees state after successful RSVP
      const updatedAttendees = { ...attendees };
      updatedAttendees[eventId] = response.data.attendees;
      setAttendees(updatedAttendees);

      // Refresh events after RSVP
      fetchEvents();
    } catch (error) {
      console.error("RSVP failed:", error);
    }
  };

  const handleShowAttendees = (events) => {
    // For simplicity, let's assume the first event in the list
    const event = events[0];

    if (event) {
      const eventAttendees = attendees[event.id] || [];
      setCurrentAttendees(eventAttendees);
      setShowAttendees(true);
      setSelectedEvent(event);
    }
  };

  const handleEventCreate = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        "https://event-planner-backend-ctos.onrender.com/events",
        newEvent,
        {
          headers: { Authorization: accessToken },
        }
      );
      // Refresh events after creating a new event
      fetchEvents();
    } catch (error) {
      console.error("Event creation failed:", error);
    }
  };

  const eventList = events.map((event) => ({
    id: event._id,
    title: event.title,
    start: new Date(event.date),
    end: new Date(event.date),
    organizer: event.organizer,
    attendees: event.attendees, // Include attendees in the eventList
  }));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  const CustomEvent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <p>{event.organizer}</p>
      <p>{moment(event.date).format("MMMM D, YYYY h:mm A")}</p>
      <RSVPButton onClick={() => handleRSVP(event.id)}>RSVP</RSVPButton>
      <AttendeesList>
        {event.attendees && event.attendees.length > 0 && (
          <>
            <AttendeesLabel>Attendees:</AttendeesLabel>
            {event.attendees.map((attendee, index) => (
              <Attendee key={index}>{attendee}</Attendee>
            ))}
          </>
        )}
      </AttendeesList>
    </div>
  );

  return (
    <EventsContainer>
      <Navbar>
        <Logo>Event Planner</Logo>
        <NavigationLinks>
          <Link to="/">Home</Link>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavigationLinks>
      </Navbar>

      {showAttendees && selectedEvent ? (
        <CalendarWrapper>
          <AttendeesList>
            <AttendeesLabel>Attendees:</AttendeesLabel>
            {currentAttendees.map((attendee, index) => (
              <Attendee key={index}>
                <span>{attendee}</span>
              </Attendee>
            ))}
          </AttendeesList>
        </CalendarWrapper>
      ) : (
        <>
          <h2 style={{ color: "#343a40" }}>Events</h2>
          <CalendarWrapper>
            <Calendar
              localizer={localizer}
              events={eventList}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              components={{
                toolbar: (props) => (
                  <CustomToolbar
                    {...props}
                    onShowAttendees={handleShowAttendees}
                    events={eventList}
                  />
                ),
                event: CustomEvent,
              }}
            />
          </CalendarWrapper>
          <EventList>
            {events.map((event) => (
              <li key={event._id}>
                <strong>{event.title}</strong>
                <p>{event.organizer}</p>
                <p>{moment(event.date).format("MMMM D, YYYY h:mm A")}</p>
                <RSVPButton onClick={() => handleRSVP(event._id)}>
                  RSVP
                </RSVPButton>
              </li>
            ))}
          </EventList>
          <EventForm>
            <h3>Create New Event</h3>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <input
              type="datetime-local"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
            <button onClick={handleEventCreate}>Create Event</button>
          </EventForm>
        </>
      )}
    </EventsContainer>
  );
};

export default Events;
