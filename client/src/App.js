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

const App = () => {

  const [appState, setAppState] = useState({})
  const [renderReady, setRenderReady] = useState(false)

  //use this to check for logged in user or if the user has an
  //active shopping cart.
  const setDefaultAppState = async () => {
    let defaultAppState = {
      user: { id: "611db6da37e7309c6800f6b6", name: "David OBrien", role: "Admin" },
      shoppingCart: { products: [], total: 300.00 },
      product: {name : '',
                price : 0.00, 
                is_active : true, 
                description : '',
                description_long : '',
                code :'',
                sku : '',
                category : '',
                sub_category : '',
                inventory : [{cnt : 0,
                              descriptor : 'default',
                              unit : 0,
                              unit_type : 'default'}],
                images : [{
                        url : 'default.jpb',
                        alt_text :'default'}]
      }
    }
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
            <div className="flex-column justify-center align-center min-100-vh bg-primary">
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
