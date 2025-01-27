import {React} from "react";

import { Route, Switch } from "react-router-dom";

import Footer from "./components/Footer"

import Landing from "./components/Landing";
import About from "./components/About";
import Resume from "./components/Resume";


function App() {

  return (
    <>
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

      <Footer/>
    </>
  );
}

export default App;
