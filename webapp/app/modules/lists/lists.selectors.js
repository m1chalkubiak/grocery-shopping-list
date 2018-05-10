import { createSelector } from 'reselect';
import { List } from 'immutable';


const selectListsDomain = state => state.get('lists');

export const selectListsData = createSelector(
  selectListsDomain, state => state
    .get('data')
    .map((item) => item.update('items', List(), (items) => items.sortBy((item) => item.get('name'))))
);

export const selectListsSingle = createSelector(
  selectListsDomain, state => state
    .get('single')
    .update('items', List(), (items) => items.sortBy((item) => item.get('name')))
);

export const selectListsIsLoadingData = createSelector(
  selectListsDomain, state => state.get('isLoadingData')
);

export const selectListsIsLoadingSingle = createSelector(
  selectListsDomain, state => state.get('isLoadingSingle')
);

export const selectIsCreateModalVisible = createSelector(
  selectListsDomain, state => state.get('isCreateModalVisible')
);

export const selectEditModalVisible = createSelector(
  selectListsDomain, state => state.get('isEditModalVisible')
);

export const selectEditItemName = createSelector(
  selectEditModalVisible, selectListsSingle,
  (id, single) => {
    const item = single.get('items', List()).find(item => item.get('id') === id);

    if (item) {
      return item.get('name');
    }

    return null;
  }
);

export const selectListId = createSelector(
  selectListsDomain, state => state.getIn(['single', 'id'])
);
