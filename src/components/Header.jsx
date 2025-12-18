import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const Header = ({ currentDate, setCurrentDate, currentView, setCurrentView, onNavigate }) => {
    const views = ['day', 'week', 'month', 'quarter', 'year'];

    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-blue-600">
                    <Calendar className="w-8 h-8" />
                    <h1 className="text-xl font-bold hidden sm:block">Calendar</h1>
                </div>

                <div className="flex items-center gap-2 ml-8">
                    <button
                        onClick={() => onNavigate('today')}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Today
                    </button>
                    <div className="flex items-center rounded-md shadow-sm">
                        <button
                            onClick={() => onNavigate('prev')}
                            className="p-1.5 text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onNavigate('next')}
                            className="p-1.5 text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 min-w-[200px]">
                        {formatDate(currentDate, currentView === 'year' ? 'yyyy' : 'MMMM yyyy')}
                    </h2>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <select
                    value={currentView}
                    onChange={(e) => setCurrentView(e.target.value)}
                    className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    {views.map((view) => (
                        <option key={view} value={view}>
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
};

export default Header;
