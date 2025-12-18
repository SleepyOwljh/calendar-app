import React from 'react';
import { isSameDay, isToday, format } from '../../utils/dateUtils';
import { useEvents } from '../../context/EventContext';

const DayView = ({ currentDate, onDateClick, onEventClick }) => {
    const { events } = useEvents();
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getEventsForHour = (hour) => {
        return events.filter(event => {
            const eventDate = new Date(event.start);
            return isSameDay(eventDate, currentDate) && eventDate.getHours() === hour;
        });
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-1 border-b border-gray-200 flex-shrink-0">
                <div className="p-4 text-center bg-gray-50">
                    <div className={`text-sm font-medium ${isToday(currentDate) ? 'text-blue-600' : 'text-gray-500'}`}>
                        {format(currentDate, 'EEEE')}
                    </div>
                    <div className={`text-2xl font-semibold ${isToday(currentDate) ? 'text-blue-600' : 'text-gray-900'}`}>
                        {format(currentDate, 'MMMM d, yyyy')}
                    </div>
                </div>
            </div>

            {/* Time Grid */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-[80px_1fr]">
                    {/* Time Labels */}
                    <div className="border-r border-gray-200 bg-gray-50">
                        {hours.map(hour => (
                            <div key={hour} className="h-24 border-b border-gray-200 text-sm text-gray-500 p-2 text-right">
                                {format(new Date().setHours(hour, 0), 'h a')}
                            </div>
                        ))}
                    </div>

                    {/* Day Column */}
                    <div className="bg-white">
                        {hours.map(hour => {
                            const hourEvents = getEventsForHour(hour);
                            return (
                                <div
                                    key={hour}
                                    className="h-24 border-b border-gray-200 p-2 relative group hover:bg-gray-50"
                                    onClick={() => {
                                        const dateWithTime = new Date(currentDate);
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
                        p-2 rounded mb-1 cursor-pointer shadow-sm border-l-4
                        ${event.category === 'A' ? 'bg-blue-50 border-blue-500 text-blue-700' : ''}
                        ${event.category === 'B' ? 'bg-green-50 border-green-500 text-green-700' : ''}
                        ${event.category === 'C' ? 'bg-purple-50 border-purple-500 text-purple-700' : ''}
                      `}
                                        >
                                            <div className="font-semibold text-sm">{event.title || '(No Title)'}</div>
                                            <div className="text-xs opacity-75">
                                                {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DayView;
