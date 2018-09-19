import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

import Navigation from "./Navigation";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import SurveyNew from "../pages/SurveyNew";
import ViewSurvey from "../pages/ViewSurvey";
import ThankYou from "../pages/ThankYou";
import "../pages/index.css";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

const LoginRegisterLayout = props => (
  <div>
    <Helmet>
      <style type="text/css">{`
          body {
              background-color: #0D47A1 !important;
          }
      `}</style>
    </Helmet>
    <Navigation />
    {props.children}
  </div>
);

const MainLayout = props => (
  <div>
    <Navigation />
    {props.children}
  </div>
);
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <AppRoute
            exact
            path="/"
            layout={LoginRegisterLayout}
            component={Landing}
          />
          <AppRoute
            exact
            path="/surveys"
            layout={MainLayout}
            component={Dashboard}
          />
          <AppRoute
            exact
            path="/surveys/new"
            layout={MainLayout}
            component={SurveyNew}
          />
          <AppRoute
            exact
            path="/view-survey/:id"
            layout={MainLayout}
            component={ViewSurvey}
          />
          <AppRoute
            exact
            path="/thanks"
            layout={MainLayout}
            component={ThankYou}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
