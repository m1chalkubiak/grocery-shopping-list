import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';
import { withStyles } from 'material-ui/styles';
import styles from './singleList.styles';

import { SingleList } from './singleList.component';
import { ListsActions } from '../../modules/lists/lists.redux';
import {
  selectListsSingle,
  selectListsIsLoadingSingle,
  selectIsCreateModalVisible,
  selectEditItemName,
  selectEditModalVisible,
} from '../../modules/lists/lists.selectors';


const mapStateToProps = createStructuredSelector({
  list: selectListsSingle,
  isLoadingList: selectListsIsLoadingSingle,
  isCreateModalVisible: selectIsCreateModalVisible,
  isEditModalVisible: selectEditModalVisible,
  editItemName: selectEditItemName,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchList: ListsActions.fetchSingle,
  toggleItemActive: ListsActions.toggleItemActive,
  removeItem: ListsActions.removeItem,
  changeModalVisibility: ListsActions.changeModalVisibility,
  createItem: ListsActions.createItem,
  changeEditModalVisibility: ListsActions.changeEditModalVisibility,
  updateItem: ListsActions.updateItem,
}, dispatch);

export default compose(
  hot(module),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
  withRouter
)(SingleList);
