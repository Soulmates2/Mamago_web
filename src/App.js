import React, { Component, useEffect, Suspense, useContext } from 'react';
import { Router, Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { createBrowserHistory } from 'history';
import * as R from 'ramda';
import { API_ADDR } from './common';

import LoginPage from './pages/LoginPage';
import IntroPage from './pages/IntroPage';
import ChattingPage from './pages/ChattingPage';
import LogsPage from './pages/LogsPage';
import SignupPage from './pages/SignupPage';

const history = createBrowserHistory();

const ScrollToTop = withRouter(({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
});

const CookieAuthenticatedRoute = ({ component: Component, ...rest }) => {
  const h = useHistory();
  const cookie_access_token = Cookies.get('access_token');
  if (R.isNil(cookie_access_token)) {
    h.push('/login');
  }
  return <Route {...rest} component={Component} />;
};

const App = () => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <Suspense fallback="loading">
          <Switch>
            <CookieAuthenticatedRoute exact path="/chat" component={ChattingPage} />
            <CookieAuthenticatedRoute exact path="/logs" component={LogsPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/" component={IntroPage} />
          </Switch>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
