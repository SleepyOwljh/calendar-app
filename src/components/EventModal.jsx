import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { format } from 'date-fns';

const EventModal = ({ isOpen, onClose, selectedDate, selectedEvent }) => {
    const { addEvent, updateEvent, deleteEvent } = useEvents();

    const [formData, setFormData] = useState({
        title: '',
        start: '',
        end: '',
        category: 'A',
        description: ''
    });

    useEffect(() => {
        if (selectedEvent) {
            setFormData({
                title: selectedEvent.title,
                start: format(new Date(selectedEvent.start), "yyyy-MM-dd'T'HH:mm"),
                end: format(new Date(selectedEvent.end), "yyyy-MM-dd'T'HH:mm"),
                category: selectedEvent.category,
                description: selectedEvent.description || ''
            });
        } else if (selectedDate) {
            // Default to selected date at 9 AM and 10 AM
            const start = new Date(selectedDate);
            start.setHours(9, 0, 0, 0);
            const end = new Date(selectedDate);
            end.setHours(10, 0, 0, 0);

            setFormData({
                title: '',
                start: format(start, "yyyy-MM-dd'T'HH:mm"),
                end: format(end, "yyyy-MM-dd'T'HH:mm"),
                category: 'A',
                description: ''
            });
        }
    }, [selectedEvent, selectedDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = {
            ...formData,
            start: new Date(formData.start),
            end: new Date(formData.end)
        };

        if (selectedEvent) {
            updateEvent({ ...selectedEvent, ...eventData });
        } else {
            addEvent(eventData);
        }
        onClose();
    };

    const handleDelete = () => {
        if (selectedEvent && window.confirm('Are you sure you want to delete this event?')) {
            deleteEvent(selectedEvent.id);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {selectedEvent ? 'Edit Event' : 'Create Event'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            placeholder="Event title"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start</label>
                            <input
                                type="datetime-local"
                                required
                                value={formData.start}
                                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">End</label>
                            <input
                                type="datetime-local"
                                required
                                value={formData.end}
                                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        >
                            <option value="A">Category A (Blue)</option>
                            <option value="B">Category B (Green)</option>
                            <option value="C">Category C (Purple)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            placeholder="Optional description"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        {selectedEvent ? (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        ) : (
                            <div></div>
                        )}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
