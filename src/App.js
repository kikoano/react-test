import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Cards from "./components/Cards";
import AddCard from "./components/AddCard";
import EditCard from "./components/EditCard";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <div>
        <Redirect exact from="/" to="/cards" />
          <Switch>
            <Route exact path="/cards">
              <Cards />
            </Route>
            <Route exact path="/cards/add">
              <AddCard />
            </Route>
            <Route exact path="/cards/:id/edit" >
              <EditCard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}