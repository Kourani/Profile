import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";

import ProtectedRoute from "./components/auth/ProtectedRoute"

import Footer from "./components/Footer"

import Landing from "./components/Landing";

import Address from "./components/Other/Address";
import Payment from "./components/Other/Payment";
import Review from "./components/Other/Review";

import Contact from "./components/Other/Contact";
import GetOrder from "./components/Order/GetOrder";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    
      {isLoaded && (
        <Switch>

          <Route path="/contact">
            <Contact/>
          </Route>

          <ProtectedRoute path="/orders">
            <GetOrder/>
          </ProtectedRoute>

          <ProtectedRoute path ="/order/review">
            <Review/>
          </ProtectedRoute>

          <Route path="/order/payment">
            <Payment/>
          </Route>

          <ProtectedRoute path ="/order/address">
            <Address/>
          </ProtectedRoute>


          <Route exact path="/">
            <Landing/>
          </Route>

        </Switch>

      )}
      <Footer isLoaded={isLoaded} />
    </>
  );
}

export default App;
