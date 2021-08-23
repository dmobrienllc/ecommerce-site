import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AppContext } from "./utils/AppContext"
import Home from './pages/Home';
import ProductDetailView from './components/ProductDetailView';
import ProductCategoryView from './components/ProductCategoryView';
import ProductAdmin from './pages/ProductAdmin';
import About from './pages/About';
import Login from './pages/Login';
import NavigationBar from './components/NavigationBar';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { useState, useEffect } from "react"
import defaultAppState from './state/app-state-default';
import background from "./images/Rainier.jpeg";

const App = () => {

  const [appState, setAppState] = useState({})
  const [renderReady, setRenderReady] = useState(false)

  //use this to check for logged in user or if the user has an
  //active shopping cart.
  const setDefaultAppState = async () => {
    setAppState(defaultAppState)
    setRenderReady(true)
  }

  useEffect(() => {
    //checkForLoggedInUser()
    setDefaultAppState()
  }, [])

  return (
    <>
      {renderReady === true && (
        <AppContext.Provider value={{ appState, setAppState }}>
          <Router>
            <NavigationBar />
            <div className="flex-column justify-center align-center min-100-vh bg-light" style={{ backgroundImage: `url(${background})` }}>
              <Route exact path="/" component={Home} />
              <Route exact path="/category/:category" component={ProductCategoryView} />
              <Route exact path="/product/:productId" component={ProductDetailView} />
              <Route exact path="/admin" component={ProductAdmin} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
            </div>
          </Router>
        </AppContext.Provider>
      )}
    </>
  );
}
export default App;
