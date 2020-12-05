namespace srv;

using {db} from '../db/Weather';

service WeatherService {
  @readonly
  entity CurrentWeather as projection on db.Weather;
}
