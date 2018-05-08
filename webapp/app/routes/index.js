import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { DEFAULT_LOCALE } from '../modules/locales/locales.redux';

import App from './app.container';
import { Home } from './home';
import { SingleList } from './singleList';
import { NotFound } from './notFound';

export class RootContainer extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={DEFAULT_LOCALE} />} />


        <Route exact path="/404" component={NotFound} />

        <Route path="/:lang">
          <App>
            <Switch>
              <Route exact path="/:lang" component={Home} />

              <Route exact path="/:lang/:id" component={SingleList} />

              <Route component={NotFound} />
            </Switch>
          </App>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(RootContainer);
