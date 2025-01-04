import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";

import Footer from "./components/Footer"

import Landing from "./components/Landing";
import About from "./components/About";
import Resume from "./components/Resume";


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

          <Route exact path="/resume">
            <Resume/>
          </Route>

          <Route exact path="/about">
            <About/>
          </Route>

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
