import ReactWeather from "react-open-weather";
import React from "react";
import { IWeather } from "../../../model/trip/weather/Weather";
import Title from "antd/es/typography/Title";
import { Col, Row, Spin } from "antd";

export interface IWeatherViewOwnProps {
  currentWeather: IWeather;
  predictedWeather: IWeather;
}

type IWeatherViewProps = IWeatherViewOwnProps;

const WeatherView: React.FC<IWeatherViewProps> = (props: IWeatherViewProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Title level={4}>Current weather</Title>

        {props.currentWeather == null ? (
          <Spin size="large" className="weatherView__spin" />
        ) : (
          <ReactWeather
            data={props.currentWeather}
            lang="en"
            locationLabel={props.currentWeather?.name}
            unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
            showForecast
          />
        )}
      </Col>

      <Col span={12}>
        <Title level={4}>Last year's weather on your travel dates</Title>

        {props.predictedWeather == null ? (
          <Spin size="large" className="weatherView__spin" />
        ) : (
          <ReactWeather
            data={props.predictedWeather}
            lang="en"
            locationLabel={props.predictedWeather?.name}
            unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
            showForecast
          />
        )}
      </Col>
    </Row>
  );
};

export default WeatherView;
