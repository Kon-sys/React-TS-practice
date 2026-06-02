import type { EventDetails } from '@/entities/testing/types';

export function downloadCalendarFile(event: EventDetails) {
    const calendarContent = buildCalendarContent(event);
    const blob = new Blob([calendarContent], {
        type: 'text/calendar;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${createFileSafeName(event.title)}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

function buildCalendarContent(event: EventDetails) {
    const createdAt = formatDateForCalendar(new Date());
    const startDate = formatDateForCalendar(new Date(event.calendarStart));
    const endDate = formatDateForCalendar(new Date(event.calendarEnd));

    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Testing Dashboard//Clinical Process//EN',
        'BEGIN:VEVENT',
        `UID:${createCalendarUid(event)}`,
        `DTSTAMP:${createdAt}`,
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `SUMMARY:${escapeCalendarText(event.title)}`,
        `LOCATION:${escapeCalendarText(event.address)}`,
        `DESCRIPTION:${escapeCalendarText(event.description)}`,
        'END:VEVENT',
        'END:VCALENDAR',
    ].join('\r\n');
}

function formatDateForCalendar(date: Date) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function escapeCalendarText(value: string) {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n');
}

function createCalendarUid(event: EventDetails) {
    return `${createFileSafeName(event.title)}-${event.calendarStart}@testing-dashboard`;
}

function createFileSafeName(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}