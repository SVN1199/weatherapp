import React from 'react'
import WeatherDetails from './WeatherDetails'
import './App.css'

const App = () => {

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <WeatherDetails />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  )
}

export default App