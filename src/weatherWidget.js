import React from 'react'
import { Card } from 'antd'

const WeatherWidget = ({ id, name, weather = [], main = {}, sys = {} }) => {
  const { country } = sys
  const { temp } = main

  return weather.map(weather => {
    const { description, icon } = weather
    return (
      <Card
        key={id}
        title={name + ' - ' + country}
        cover={
          <img
            alt={icon}
            src={'http://openweathermap.org/img/wn/' + icon + '@2x.png'}
          />
        }
      >
        <Card.Meta description={temp + ' celsius'} title={description} />
      </Card>
    )
  })
}

export default WeatherWidget
