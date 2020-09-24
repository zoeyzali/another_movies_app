import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ProductsList } from './components/productsTask/ProductsList'
import { MoviesList } from './components/moviesTask/MoviesList'
import { Header } from './components/Globals/Header'
import './App.css'
import { MovieDetails } from './components/moviesTask/MovieDetails'


function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Route exact path="/">
          <h1 className="App__header">JUST ANOTHER MOVIES APP</h1>
        </Route>
        <Route exact path="/movies/" component={MoviesList} />
        <Route exact path="/movies/:id" component={MovieDetails} />
        <Route exact path="/products" component={ProductsList} />
      </div>
    </Router>
  )
}

export default App
