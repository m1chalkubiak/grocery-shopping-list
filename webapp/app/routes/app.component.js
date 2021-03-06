import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { appLocales, translationMessages } from '../i18n';
import { theme } from '../theme/global';
import { Header } from '../components/header/header.component';
import { DEFAULT_LOCALE } from '../modules/locales/locales.redux';


export class App extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    setLanguage: PropTypes.func.isRequired,
    subscribeListItem: PropTypes.func.isRequired,
    children: PropTypes.node,
    match: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.subscribeListItem();

    const language = this.props.match.params.lang || DEFAULT_LOCALE;
    if (appLocales.indexOf(language) === -1) {
      this.props.setLanguage(DEFAULT_LOCALE);
      this.props.history.push('/404');
    } else if (this.props.language !== language) {
      this.props.setLanguage(language);
    }
  }

  render() {
    if (!this.props.language) {
      return null;
    }

    return (
      <Fragment>
        <Helmet
          titleTemplate="%s - Apptension React Boilerplate"
          defaultTitle="Apptension React Boilerplate"
          meta={[
            { name: 'description', content: 'Apptension\'s React Boilerplate application' },
          ]}
        />

        <IntlProvider
          locale={this.props.language}
          messages={translationMessages[this.props.language]}
          location={this.props.location}
        >
          <MuiThemeProvider theme={theme}>
            <Fragment>
              <Header />
              {React.Children.only(this.props.children)}
            </Fragment>
          </MuiThemeProvider>
        </IntlProvider>
      </Fragment>
    );
  }
}
