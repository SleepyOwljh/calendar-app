import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const EventContext = createContext();

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem('calendar-events');
        return savedEvents ? JSON.parse(savedEvents) : [];
    });

    useEffect(() => {
        localStorage.setItem('calendar-events', JSON.stringify(events));
    }, [events]);

    const addEvent = (event) => {
        setEvents((prev) => [...prev, { ...event, id: uuidv4() }]);
    };

    const updateEvent = (updatedEvent) => {
        setEvents((prev) =>
            prev.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
        );
    };

    const deleteEvent = (id) => {
        setEvents((prev) => prev.filter((evt) => evt.id !== id));
    };

    return (
        <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
};
