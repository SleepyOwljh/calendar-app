import React from 'react';
import { startOfQuarter, addMonths, format, isSameMonth, isSameDay, isToday } from 'date-fns';
import { getDaysInMonth } from '../../utils/dateUtils';
import { useEvents } from '../../context/EventContext';

const QuarterView = ({ currentDate, onDateClick, onEventClick }) => {
    const start = startOfQuarter(currentDate);
    const months = [start, addMonths(start, 1), addMonths(start, 2)];
    const { events } = useEvents();
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const getEventsForDay = (date) => {
        return events.filter(event => isSameDay(new Date(event.start), date));
    };

    return (
        <div className="h-full overflow-auto bg-gray-50 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                {months.map(monthDate => {
                    const days = getDaysInMonth(monthDate);
                    return (
                        <div key={monthDate.toString()} className="bg-white rounded-lg shadow flex flex-col h-full">
                            <div className="p-3 border-b border-gray-200 font-semibold text-lg text-center">
                                {format(monthDate, 'MMMM yyyy')}
                            </div>

                            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                                {weekDays.map(day => (
                                    <div key={day} className="py-1 text-center text-xs font-medium text-gray-500">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                                {days.map((day, idx) => {
                                    const isCurrentMonth = isSameMonth(day, monthDate);
                                    const dayEvents = getEventsForDay(day);

                                    return (
                                        <div
                                            key={day.toString()}
                                            onClick={() => onDateClick(day)}
                                            className={`
                        border-b border-r border-gray-100 p-1 cursor-pointer hover:bg-gray-50 relative
                        ${!isCurrentMonth ? 'bg-gray-50/30 text-gray-300' : 'bg-white'}
                        ${idx % 7 === 6 ? 'border-r-0' : ''}
                      `}
                                        >
                                            <div className={`
                        text-xs w-5 h-5 flex items-center justify-center rounded-full mb-1
                        ${isToday(day) ? 'bg-blue-600 text-white' : ''}
                      `}>
                                                {day.getDate()}
                                            </div>

                                            <div className="space-y-0.5 overflow-hidden max-h-[60px]">
                                                {dayEvents.map(event => (
                                                    <div
                                                        key={event.id}
                                                        className={`
                              h-1.5 rounded-full w-full
                              ${event.category === 'A' ? 'bg-blue-400' : ''}
                              ${event.category === 'B' ? 'bg-green-400' : ''}
                              ${event.category === 'C' ? 'bg-purple-400' : ''}
                            `}
                                                        title={event.title}
                                                    />
                                                ))}
                                            </div>
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

export default QuarterView;
