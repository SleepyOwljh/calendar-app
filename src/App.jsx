import React, { useState, useEffect } from 'react';
import { EventProvider } from './context/EventContext';
import CalendarLayout from './components/CalendarLayout';
import Login from './components/Login';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!user) {
        return <Login />;
    }

    return (
        <EventProvider>
            <CalendarLayout />
        </EventProvider>
    );
}

export default App;
