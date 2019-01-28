import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  NavLink
} from "react-router-dom";
import classes from "./App.css";
import Presentational from "./Presentational";
import Container, { EXAMPLE_URL } from "./Container";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className={classes.app}>
          <header className={classes.header}>
            <h1 className={classes.title}>Imported Venia Components</h1>
            <nav className={classes.nav}>
              <NavLink
                className={classes.link}
                activeClassName={classes.active}
                to="/presentational"
              >
                Presentational
              </NavLink>
              <NavLink
                className={classes.link}
                activeClassName={classes.active}
                to={EXAMPLE_URL}
              >
                Root
              </NavLink>
            </nav>
          </header>

          <Route
            exact
            path="/"
            render={() => <Redirect to="/presentational" />}
          />
          <Route
            path="/presentational"
            render={() => (
              <Fragment>
                <p className={classes.heading}>
                  <code>ProductFullDetail</code> component displaying static
                  data
                </p>
                <Presentational />
              </Fragment>
            )}
          />
          <Route
            path={EXAMPLE_URL}
            render={() => (
              <Fragment>
                <p className={classes.heading}>
                  <code>Product</code> root component querying Magento data using `drivers` override
                </p>
                <Container />
              </Fragment>
            )}
          />
        </div>
      </Router>
    );
  }
}
