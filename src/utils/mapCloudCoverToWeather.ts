export const mapCurrentCloudCoverToWeather = (cloudCover: number) => {
    switch (true) {
        case (cloudCover >= 0 && cloudCover <= 10):
            return 'Clear';
        case (cloudCover >= 11 && cloudCover <= 50):
            return 'Partly Cloudy';
        case (cloudCover >= 51 && cloudCover <= 89):
            return 'Mostly Cloud';
        case (cloudCover >= 90 && cloudCover <= 100):
            return 'Overcast'
        default:
            return 'Not known'
    }
}