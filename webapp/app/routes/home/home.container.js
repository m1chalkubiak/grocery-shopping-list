import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';
import { withStyles } from 'material-ui/styles';
import styles from './home.styles';

import { Home } from './home.component';
import { ListsActions } from '../../modules/lists/lists.redux';
import { selectListsData, selectListsIsLoadingData } from '../../modules/lists/lists.selectors';


const mapStateToProps = createStructuredSelector({
  lists: selectListsData,
  isLoadingLists: selectListsIsLoadingData,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchLists: ListsActions.fetch,
  createList: ListsActions.create,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
  withRouter
)(Home);
