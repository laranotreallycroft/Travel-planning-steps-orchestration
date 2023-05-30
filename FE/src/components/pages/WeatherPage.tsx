import WeatherContainer from "../trip/weather/WeatherContainer";

export interface IWeatherPageOwnProps {}

type IWeatherPageProps = IWeatherPageOwnProps;

const WeatherPage: React.FC<IWeatherPageProps> = (props: IWeatherPageProps) => {
  return <WeatherContainer />;
};

export default WeatherPage;
