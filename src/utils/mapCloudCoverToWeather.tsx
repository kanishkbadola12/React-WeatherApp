import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faBan, faCloud, faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons/faCloudSun";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const mapCurrentCloudCoverToWeather = (cloudCover: number): { icon: JSX.Element, text: string } => {
    switch (true) {
        case (cloudCover >= 0 && cloudCover <= 10):
            return {
                icon: <FontAwesomeIcon style={{ color: '#ffb703', fontSize: '3rem' }} icon={faSun} />,
                text: 'Clear'
            }
        case (cloudCover >= 11 && cloudCover <= 50):
            return {
                icon: <FontAwesomeIcon style={{ color: '#00a6fb', fontSize: '3rem' }} icon={faCloudSun} />,
                text: 'Partly Cloudy'
            }
        case (cloudCover >= 51 && cloudCover <= 89):
            return {
                icon: <FontAwesomeIcon style={{ color: '#0077b6', fontSize: '3rem' }} icon={faCloudSunRain} />,
                text: 'Mostly Cloudy'
            }
        case (cloudCover >= 90 && cloudCover <= 100):
            return {
                icon: <FontAwesomeIcon style={{ color: '#023e8a', fontSize: '3rem' }} icon={faCloud} />,
                text: 'Overcast'
            }
        default:
            return {
                icon: <FontAwesomeIcon style={{ color: '#c1121f', fontSize: '3rem' }} icon={faBan} />,
                text: 'Not known'
            }
    }
}