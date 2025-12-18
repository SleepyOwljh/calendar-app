import {
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    startOfQuarter,
    endOfQuarter,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    addDays,
    subDays,
    addYears,
    subYears,
    addQuarters,
    subQuarters,
    isSameMonth,
    isSameDay,
    isToday
} from 'date-fns';

export {
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    startOfQuarter,
    endOfQuarter,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    addDays,
    subDays,
    addYears,
    subYears,
    addQuarters,
    subQuarters,
    isSameMonth,
    isSameDay,
    isToday
};

export const getDaysInMonth = (date) => {
    const start = startOfWeek(startOfMonth(date));
    const end = endOfWeek(endOfMonth(date));
    return eachDayOfInterval({ start, end });
};

export const getDaysInWeek = (date) => {
    const start = startOfWeek(date);
    const end = endOfWeek(date);
    return eachDayOfInterval({ start, end });
};

export const getMonthsInYear = (date) => {
    const start = startOfYear(date);
    const end = endOfYear(date);
    // This is a bit different, we usually want 12 months.
    // Let's just return an array of 12 dates representing the start of each month.
    return Array.from({ length: 12 }, (_, i) => addMonths(start, i));
};

export const getQuartersInYear = (date) => {
    const start = startOfYear(date);
    return Array.from({ length: 4 }, (_, i) => addQuarters(start, i));
};

export const formatDate = (date, formatStr) => format(date, formatStr);

export const navigateDate = (date, view, direction) => {
    const amount = direction === 'next' ? 1 : -1;
    switch (view) {
        case 'day':
            return addDays(date, amount);
        case 'week':
            return addWeeks(date, amount);
        case 'month':
            return addMonths(date, amount);
        case 'quarter':
            return addQuarters(date, amount);
        case 'year':
            return addYears(date, amount);
        default:
            return date;
    }
};
