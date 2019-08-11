import React from 'react'
import { Card } from 'antd'

const WeatherWidget = ({ id, name, weather = [], main = {}, sys = {} }) => {
  const { country = 'loading' } = sys
  const { temp } = main
  return (
    <Card key={id} title={`${name} - ${country}`}>
      <Card.Meta title={`${temp} celsius`} />
      {weather.map(weather => {
        const { id, main, description, icon } = weather
        return (
          <Card.Meta
            key={id}
            title={main}
            description={description}
            avatar={
              <img
                alt={icon}
                src={'http://openweathermap.org/img/wn/' + icon + '@2x.png'}
              />
            }
          />
        )
      })}
    </Card>
  )
}

export default WeatherWidget
