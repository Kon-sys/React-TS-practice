import type { EventDetails } from '@/entities/testing/types';

export function getMapEmbedUrl(event: EventDetails) {
    const latitudeOffset = 0.005;
    const longitudeOffset = 0.0074;

    const minLongitude = event.longitude - longitudeOffset;
    const minLatitude = event.latitude - latitudeOffset;
    const maxLongitude = event.longitude + longitudeOffset;
    const maxLatitude = event.latitude + latitudeOffset;

    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLongitude}%2C${minLatitude}%2C${maxLongitude}%2C${maxLatitude}&layer=mapnik&marker=${event.latitude}%2C${event.longitude}`;
}

export function getDirectionsUrl(event: EventDetails) {
    return `https://www.openstreetmap.org/?mlat=${event.latitude}&mlon=${event.longitude}#map=15/${event.latitude}/${event.longitude}`;
}