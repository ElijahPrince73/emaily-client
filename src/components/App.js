/* eslint-disable */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Navigation from './Navigation';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import SurveyCreate from '../pages/SurveyCreate';
import SurveyDraft from '../pages/SurveyDraft';
import ViewSurvey from '../pages/ViewSurvey';
import ThankYou from '../pages/ThankYou';
import '../pages/index.css';

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

const LoginRegisterLayout = (props) => {
  const header = localStorage.getItem('header');
  if (header) {
    window.location.href = '/surveys';
  }

  return (
    <div>
      <Helmet>
        <style type="text/css">
          {`
            body {
                  background: linear-gradient(#0069ff,#1633ff);
                  background-repeat: no-repeat;
                  background-size: cover;
                  background-position: center;
                  height: 100vh;
            }
            nav {
              background-color: transparent !important;
            }
        `}

        </style>
      </Helmet>
      <Navigation />
      {props.children}
    </div>
  );
};
const MainLayout = (props) => {
  const header = localStorage.getItem('header');
  if (!header) {
    window.location.href = '/';
  }

  return (
    <div>
      <Navigation />
      {props.children}
    </div>
  );
};

const App = () => (
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
          path="/create-survey"
          layout={MainLayout}
          component={SurveyCreate}
        />
        <AppRoute
          exact
          path="/draft"
          layout={MainLayout}
          component={SurveyDraft}
        />
        <AppRoute
          exact
          path="/draft/:id"
          layout={MainLayout}
          component={SurveyDraft}
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

export default App;
