import React, { Component } from 'react'
import { Layout, Button } from 'antd'
import WeatherWidget from './weatherWidget'
import './App.css'

const { Content, Header } = Layout

const key = '19c460e76527a267ee3fd93fa6ae9ccc'
const url =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&APPID=' + key

class App extends Component {
  state = {
    cities: [
      {
        country_code: 'fr',
        name: 'Montpellier',
        id: 2992166
      },
      {
        country_code: 'nl',
        name: 'rotterdom',
        id: 2747891
      },
      {
        id: 112931,
        name: 'Tehran'
      }
    ]
  }

  updateWeather = () => {
    const { cities } = this.state
    cities.forEach(city => {
      if (city.weather === undefined) {
        fetch(url + '&id=' + city.id)
          .then(response => response.json())
          .then(data => {
            const { cities } = this.state
            const index = cities.findIndex(_city => _city.id === city.id)
            cities[index] = data
            this.setState({ cities })
          })
          .catch(error => console.error(error))
      }
    })
  }

  render() {
    const { cities } = this.state
    this.updateWeather()
    return (
      <Layout className="App">
        <Header className="App-header">
          <span>Weather Widget</span>
          <Button type="primary">Settings</Button>
        </Header>
        <Content>
          {cities.map(city => (
            <WeatherWidget key={city.id} {...city} />
          ))}
        </Content>
      </Layout>
    )
  }
}

export default App
