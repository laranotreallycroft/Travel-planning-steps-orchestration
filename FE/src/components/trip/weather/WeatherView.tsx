import { Col, Row, Select, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { IWeather } from 'model/trip/weather/Weather';
import React from 'react';
import ReactWeather from 'react-open-weather';

export interface IWeatherViewOwnProps {
  currentWeather: IWeather;
  pastWeather: IWeather;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

type IWeatherViewProps = IWeatherViewOwnProps & IWithLocalizeOwnProps;

const WeatherView: React.FC<IWeatherViewProps> = (props: IWeatherViewProps) => {
  const lastYear = new Date().getFullYear() - 1;
  const yearArray = Array.from({ length: 5 }, (_, i) => {
    const year = lastYear - i;
    return { value: year, label: year.toString() };
  });
  return (
    <Row gutter={[16, 16]}>
      <Col md={24} lg={12} className="weatherView__col">
        <Title level={4}>{props.translate('WEATHER_VIEW.CURRENT_WEATHER')}</Title>
        {props.currentWeather ? (
          <ReactWeather data={props.currentWeather} lang="en" locationLabel={props.currentWeather?.name} unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }} showForecast />
        ) : (
          <Row justify={'center'} align={'middle'} className="fullHeight">
            <Spin />
          </Row>
        )}
      </Col>

      <Col md={24} lg={12} className="weatherView__col">
        <Row justify={'space-between'}>
          <Title level={4}>{props.translate('WEATHER_VIEW.PAST_WEATHER', { year: props.selectedYear })}</Title>
          <Select value={props.selectedYear} onChange={props.setSelectedYear} options={yearArray} className="weatherView__select" />
        </Row>
        {props.pastWeather ? (
          <ReactWeather data={props.pastWeather} lang="en" locationLabel={props.pastWeather?.name} unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }} showForecast />
        ) : (
          <Row justify={'center'} align={'middle'} className="fullHeight">
            <Spin />
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default withLocalize<IWeatherViewOwnProps>(WeatherView as any);
