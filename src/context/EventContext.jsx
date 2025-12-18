import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const EventContext = createContext();

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
            const eventsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Convert Firestore Timestamps to Dates if necessary, 
                // but our app stores dates as ISO strings or Date objects.
                // Let's ensure we handle them correctly.
                start: doc.data().start.toDate ? doc.data().start.toDate() : new Date(doc.data().start),
                end: doc.data().end.toDate ? doc.data().end.toDate() : new Date(doc.data().end)
            }));
            setEvents(eventsData);
        });

        return () => unsubscribe();
    }, []);

    const addEvent = async (event) => {
        // Firestore generates the ID automatically
        await addDoc(collection(db, 'events'), {
            ...event,
            start: event.start.toISOString(),
            end: event.end.toISOString()
        });
    };

    const updateEvent = async (updatedEvent) => {
        const eventRef = doc(db, 'events', updatedEvent.id);
        const { id, ...data } = updatedEvent;
        await updateDoc(eventRef, {
            ...data,
            start: data.start.toISOString(),
            end: data.end.toISOString()
        });
    };

    const deleteEvent = async (id) => {
        await deleteDoc(doc(db, 'events', id));
    };

    return (
        <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
};
