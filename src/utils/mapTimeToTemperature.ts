export const mapTimeToTemperature = (time: string, hourly: string[], temperatures: number[]) => {
    let hoursToTemperatureMap: Record<string, number> = {};

    hourly.map((hour, idx) => {
        const hourTime = hour.split('T')[1];
        if (hourTime > time) {
            hoursToTemperatureMap[hourTime] = Math.round(temperatures[idx]);
        }
    });

    return hoursToTemperatureMap;
} 