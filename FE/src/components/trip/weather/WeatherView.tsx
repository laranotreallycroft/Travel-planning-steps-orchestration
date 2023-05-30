import { Switch } from "antd";
import React from "react";

export interface IWeatherViewOwnProps {}

type IWeatherViewProps = IWeatherViewOwnProps;

const WeatherView: React.FC<IWeatherViewProps> = (props: IWeatherViewProps) => {
  return (
    <>
      <div>
        Packing list <Switch></Switch>
      </div>
      <div>
        Weather <Switch></Switch>
      </div>
      <div>
        Sightseeing <Switch></Switch>
      </div>
    </>
  );
};

export default WeatherView;
