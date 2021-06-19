import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Welcome from "./Components/Welcome";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/confirm/:confirmationCode" component={Welcome} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
