import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { compose } from 'ramda';

import { App } from './app.component';
import { selectLocalesLanguage } from '../modules/locales/locales.selectors';
import { LocalesActions } from '../modules/locales/locales.redux';
import { ListsActions } from '../modules/lists/lists.redux';


const mapStateToProps = createStructuredSelector({
  language: selectLocalesLanguage,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  setLanguage: LocalesActions.setLanguage,
  subscribeListItem: ListsActions.subscribeItem,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(App);
