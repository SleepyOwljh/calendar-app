import React from 'react';
import { startOfYear, addMonths, format, isSameMonth, isSameDay, isToday } from 'date-fns';
import { getDaysInMonth } from '../../utils/dateUtils';
import { useEvents } from '../../context/EventContext';

const YearView = ({ currentDate, onDateClick }) => {
    const start = startOfYear(currentDate);
    const months = Array.from({ length: 12 }, (_, i) => addMonths(start, i));
    const { events } = useEvents();
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const getEventsForDay = (date) => {
        return events.filter(event => isSameDay(new Date(event.start), date));
    };

    return (
        <div className="h-full overflow-auto bg-gray-50 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {months.map(monthDate => {
                    const days = getDaysInMonth(monthDate);
                    return (
                        <div key={monthDate.toString()} className="bg-white rounded-lg shadow p-2">
                            <div className="mb-2 font-semibold text-sm text-center text-gray-900">
                                {format(monthDate, 'MMMM')}
                            </div>

                            <div className="grid grid-cols-7 mb-1">
                                {weekDays.map(day => (
                                    <div key={day} className="text-center text-[10px] font-medium text-gray-400">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-y-1">
                                {days.map((day) => {
                                    const isCurrentMonth = isSameMonth(day, monthDate);
                                    const dayEvents = getEventsForDay(day);
                                    const hasEvents = dayEvents.length > 0;

                                    if (!isCurrentMonth) return <div key={day.toString()} />;

                                    return (
                                        <div
                                            key={day.toString()}
                                            onClick={() => onDateClick(day)}
                                            className={`
                        aspect-square flex flex-col items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 relative
                        ${isToday(day) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                      `}
                                        >
                                            <span className="text-xs">{day.getDate()}</span>
                                            {hasEvents && !isToday(day) && (
                                                <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-blue-400" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default YearView;
