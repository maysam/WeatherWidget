import React, { Component } from 'react'
import { Table, Layout, Divider, Form, Input, Button, Modal } from 'antd'
import WeatherWidget from './weatherWidget'
import './App.css'

const { Content, Header } = Layout

const key = '19c460e76527a267ee3fd93fa6ae9ccc'
const url =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&APPID=' + key

class App extends Component {
  state = {
    settingsVisible: false,
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
      },
      {
        id: 2643743,
        name: 'London',
        coord: {
          lat: 51.5085,
          lon: -0.1258
        },
        main: {
          temp: 7,
          pressure: 1012,
          humidity: 81,
          temp_min: 5,
          temp_max: 8
        },
        dt: 1485791400,
        wind: {
          speed: 4.6,
          deg: 90
        },
        sys: {
          country: 'GB'
        },
        rain: null,
        snow: null,
        clouds: {
          all: 90
        },
        weather: [
          {
            id: 701,
            main: 'Mist',
            description: 'mist',
            icon: '50d'
          },
          {
            id: 300,
            main: 'Drizzle',
            description: 'light intensity drizzle',
            icon: '09d'
          }
        ]
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

  add = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { cities } = this.state
        cities.push(values)
        this.setState({ cities }, () => this.props.form.resetFields())
      }
    })
  }

  remove = id => {
    const { cities } = this.state
    this.setState({ cities: cities.filter(city => city.id !== id) })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { cities, settingsVisible } = this.state
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, city) => (
          <Button onClick={() => this.remove(city.id)} type="link">
            delete
          </Button>
        )
      }
    ]

    const checkForDuplicates = (rule, value, callback) => {
      const id = parseInt(value)
      if (cities.findIndex(city => city.id === id) !== -1) {
        callback(true)
      } else {
        callback()
      }
    }

    this.updateWeather() // not ideal, but this is not a bad place

    return (
      <Layout className="App">
        <Header className="App-header">
          <span>Weather Widget</span>
          <Button
            type="primary"
            onClick={() => this.setState({ settingsVisible: true })}
          >
            Settings
          </Button>
        </Header>
        <Content>
          {cities.map(city => (
            <WeatherWidget key={city.id} {...city} />
          ))}
        </Content>
        <Modal
          visible={settingsVisible}
          title="Settings"
          footer=""
          onCancel={() => this.setState({ settingsVisible: false })}
        >
          <Table
            bordered
            size="small"
            pagination={{ defaultPageSize: 5, hideOnSinglePage: true }}
            dataSource={cities}
            columns={columns}
          />
          <Divider />
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
            onSubmit={this.add}
          >
            <Form.Item label="ID">
              {getFieldDecorator('id', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter openweathermap id!'
                  },
                  {
                    message: 'ID is already in the list!',
                    validator: checkForDuplicates
                  }
                ]
              })(<Input placeholder='2988507' />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Add city
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    )
  }
}

export default Form.create({ name: 'coordinated' })(App)
