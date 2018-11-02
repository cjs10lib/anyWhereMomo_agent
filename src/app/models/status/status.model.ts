import { GeolocationPosition } from '@capacitor/core';

export interface Status {
    uid?: string;
    account?: string;
    position?: Position;
    created?: any;
    lastUpdate?: any;
}

interface Position {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude?: number;
    speed?: number;
    heading?: number;
}

