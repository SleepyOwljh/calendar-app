import React from 'react'
import { EventProvider } from './context/EventContext'
import CalendarLayout from './components/CalendarLayout'

function App() {
    return (
        <EventProvider>
            <CalendarLayout />
        </EventProvider>
    )
}

export default App
