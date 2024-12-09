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
          <Select
            value={props.selectedYear}
            onChange={props.setSelectedYear}
            options={[
              { value: 2022, label: '2022' },
              { value: 2021, label: '2021' },
              { value: 2020, label: '2020' },
              { value: 2019, label: '2019' },
              { value: 2018, label: '2018' },
            ]}
            className="weatherView__select"
          />
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
