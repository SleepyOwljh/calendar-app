import React from 'react';
import { getDaysInWeek, isSameDay, isToday, format } from '../../utils/dateUtils';
import { useEvents } from '../../context/EventContext';

const WeekView = ({ currentDate, onDateClick, onEventClick }) => {
    const days = getDaysInWeek(currentDate);
    const { events } = useEvents();
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getEventsForDayAndHour = (date, hour) => {
        return events.filter(event => {
            const eventDate = new Date(event.start);
            return isSameDay(eventDate, date) && eventDate.getHours() === hour;
        });
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-8 border-b border-gray-200 flex-shrink-0">
                <div className="p-2 border-r border-gray-200 bg-gray-50"></div>
                {days.map(day => (
                    <div
                        key={day.toString()}
                        className={`
              p-2 text-center border-r border-gray-200 last:border-r-0 bg-gray-50
              ${isToday(day) ? 'bg-blue-50' : ''}
            `}
                    >
                        <div className={`text-xs font-medium ${isToday(day) ? 'text-blue-600' : 'text-gray-500'}`}>
                            {format(day, 'EEE')}
                        </div>
                        <div className={`text-lg font-semibold ${isToday(day) ? 'text-blue-600' : 'text-gray-900'}`}>
                            {format(day, 'd')}
                        </div>
                    </div>
                ))}
            </div>

            {/* Time Grid */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-8">
                    {/* Time Labels */}
                    <div className="border-r border-gray-200 bg-gray-50">
                        {hours.map(hour => (
                            <div key={hour} className="h-20 border-b border-gray-200 text-xs text-gray-500 p-1 text-right">
                                {format(new Date().setHours(hour, 0), 'h a')}
                            </div>
                        ))}
                    </div>

                    {/* Days Columns */}
                    {days.map(day => (
                        <div key={day.toString()} className="border-r border-gray-200 last:border-r-0">
                            {hours.map(hour => {
                                const hourEvents = getEventsForDayAndHour(day, hour);
                                return (
                                    <div
                                        key={hour}
                                        className="h-20 border-b border-gray-200 p-1 relative group hover:bg-gray-50"
                                        onClick={() => {
                                            const dateWithTime = new Date(day);
                                            dateWithTime.setHours(hour);
                                            onDateClick(dateWithTime);
                                        }}
                                    >
                                        {hourEvents.map(event => (
                                            <div
                                                key={event.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEventClick(event);
                                                }}
                                                className={`
                          text-xs p-1 rounded mb-1 cursor-pointer truncate shadow-sm
                          ${event.category === 'A' ? 'bg-blue-100 text-blue-700 border border-blue-200' : ''}
                          ${event.category === 'B' ? 'bg-green-100 text-green-700 border border-green-200' : ''}
                          ${event.category === 'C' ? 'bg-purple-100 text-purple-700 border border-purple-200' : ''}
                        `}
                                            >
                                                {event.title || '(No Title)'}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeekView;
