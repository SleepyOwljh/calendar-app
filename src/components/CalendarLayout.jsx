import React, { useState } from 'react';
import Header from './Header';
import MonthView from './views/MonthView';
import WeekView from './views/WeekView';
import DayView from './views/DayView';
import QuarterView from './views/QuarterView';
import YearView from './views/YearView';
import { navigateDate } from '../utils/dateUtils';
import { useEvents } from '../context/EventContext';
import EventModal from './EventModal';

const CalendarLayout = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const { events } = useEvents();

    const handleNavigate = (action) => {
        if (action === 'today') {
            setCurrentDate(new Date());
        } else {
            setCurrentDate(navigateDate(currentDate, currentView, action));
        }
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setSelectedDate(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
        setSelectedEvent(null);
    };

    const renderView = () => {
        switch (currentView) {
            case 'day':
                return <DayView currentDate={currentDate} onDateClick={handleDateClick} onEventClick={handleEventClick} />;
            case 'week':
                return <WeekView currentDate={currentDate} onDateClick={handleDateClick} onEventClick={handleEventClick} />;
            case 'month':
                return <MonthView currentDate={currentDate} onDateClick={handleDateClick} onEventClick={handleEventClick} />;
            case 'quarter':
                return <QuarterView currentDate={currentDate} onDateClick={handleDateClick} onEventClick={handleEventClick} />;
            case 'year':
                return <YearView currentDate={currentDate} onDateClick={handleDateClick} />;
            default:
                return <MonthView currentDate={currentDate} onDateClick={handleDateClick} onEventClick={handleEventClick} />;
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            <Header
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                currentView={currentView}
                setCurrentView={setCurrentView}
                onNavigate={handleNavigate}
            />
            <main className="flex-1 overflow-auto">
                {renderView()}
            </main>

            {isModalOpen && (
                <EventModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    selectedDate={selectedDate}
                    selectedEvent={selectedEvent}
                />
            )}
        </div>
    );
};

export default CalendarLayout;
