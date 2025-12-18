import React from 'react';
import { getDaysInMonth, isSameMonth, isSameDay, isToday } from '../../utils/dateUtils';
import { useEvents } from '../../context/EventContext';

const MonthView = ({ currentDate, onDateClick, onEventClick }) => {
    const days = getDaysInMonth(currentDate);
    const { events } = useEvents();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getEventsForDay = (date) => {
        return events.filter(event => isSameDay(new Date(event.start), date));
    };

    return (
        <div className="flex flex-col h-full">
            <div className="grid grid-cols-7 border-b border-gray-200">
                {weekDays.map(day => (
                    <div key={day} className="py-2 text-center text-sm font-semibold text-gray-700 bg-gray-50 border-r border-gray-200 last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                {days.map((day, dayIdx) => {
                    const dayEvents = getEventsForDay(day);
                    const isCurrentMonth = isSameMonth(day, currentDate);

                    return (
                        <div
                            key={day.toString()}
                            onClick={() => onDateClick(day)}
                            className={`
                min-h-[100px] p-2 border-b border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors
                ${!isCurrentMonth ? 'bg-gray-50/50 text-gray-400' : 'bg-white'}
                ${dayIdx % 7 === 6 ? 'border-r-0' : ''}
              `}
                        >
                            <div className="flex justify-between items-start">
                                <span className={`
                  text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                  ${isToday(day) ? 'bg-blue-600 text-white' : ''}
                `}>
                                    {day.getDate()}
                                </span>
                            </div>

                            <div className="mt-1 space-y-1">
                                {dayEvents.map(event => (
                                    <div
                                        key={event.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEventClick(event);
                                        }}
                                        className={`
                      px-2 py-1 text-xs rounded-md truncate font-medium
                      ${event.category === 'A' ? 'bg-blue-100 text-blue-700 border border-blue-200' : ''}
                      ${event.category === 'B' ? 'bg-green-100 text-green-700 border border-green-200' : ''}
                      ${event.category === 'C' ? 'bg-purple-100 text-purple-700 border border-purple-200' : ''}
                    `}
                                    >
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthView;
