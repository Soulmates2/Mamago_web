import React, { Component, useEffect, Suspense, useContext } from 'react';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { createBrowserHistory } from 'history';
import * as R from 'ramda';
import { API_ADDR } from './common';

import Login from './pages/Login';

const history = createBrowserHistory();

const ScrollToTop = withRouter(({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
});

const CookieAuthenticatedRoute = ({ component: Component, ...rest }) => {
  const cookie_access_token = Cookies.get('access_token');
  if (R.isNil(cookie_access_token)) return <Login />;
  return <Route {...rest} component={Component} />;
};

const App = () => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <Suspense fallback="loading">
          <Switch>
            <CookieAuthenticatedRoute exact path="/" component={MainPage} />
          </Switch>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
