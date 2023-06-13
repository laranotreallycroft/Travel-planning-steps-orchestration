import ReactWeather from "react-open-weather";
import React from "react";
import { IWeather } from "../../../model/trip/weather/Weather";
import Title from "antd/es/typography/Title";
import { Col, Row, Select, Spin } from "antd";

export interface IWeatherViewOwnProps {
  currentWeather: IWeather;
  predictedWeather: IWeather;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
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
        <Row justify={"space-between"}>
          <Title level={4}>Past year's weather on your travel dates</Title>
          <Select
            value={props.selectedYear}
            onChange={props.setSelectedYear}
            options={[
              { value: 2022, label: "2022" },
              { value: 2021, label: "2021" },
              { value: 2020, label: "2020" },
              { value: 2019, label: "2019" },
            ]}
            className="weatherView__select"
          />
        </Row>
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
