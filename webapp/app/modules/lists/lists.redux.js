import { createActions, createReducer } from 'reduxsauce';
import { Record, List, Map, fromJS } from 'immutable';

export const { Types: ListsTypes, Creators: ListsActions } = createActions({
  fetch: [],
  fetchSuccess: ['data'],
  fetchError: ['payload'],
  fetchSingle: ['id'],
  fetchSingleSuccess: ['data'],
  fetchSingleError: ['payload'],
  toggleItemActive: ['id', 'value'],
  toggleItemActiveSuccess: ['data'],
  toggleItemActiveError: ['payload'],
  removeItem: ['id'],
  removeItemSuccess: ['data'],
  removeItemError: ['payload'],
  subscribeItem: [],
  subscribeItemRemoved: [],
  subscribeItemCreated: [],
  subscribeItemError: ['payload'],
  onItemUpdated: ['data'],
  onItemRemoved: ['data'],
  onItemCreated: ['data'],
  changeModalVisibility: ['value'],
  changeEditModalVisibility: ['value'],
  createItem: ['name'],
  updateItem: ['name'],
  createItemSuccess: ['data'],
  updateItemSuccess: ['data'],
  createItemError: ['payload'],
}, { prefix: 'LISTS_' });

const ListsRecord = Record({
  data: List(),
  single: Map(),
  isLoadingData: false,
  isLoadingSingle: false,
  isCreateModalVisible: false,
  isEditModalVisible: false,
});

export const INITIAL_STATE = new ListsRecord();

const fetchHandler = (state) => state.merge({ isLoadingData: true });

const fetchSuccessHandler = (state, { data }) => state.merge({ data, isLoadingData: false });

const fetchErrorHandler = (state) => state.merge({ isLoadingData: false });

const fetchSingleHandler = (state) => state.merge({ isLoadingSingle: true });

const fetchSingleSuccessHandler = (state, { data }) => state.merge({
  single: data,
  isLoadingSingle: false,
});

const fetchSingleErrorHandler = (state) => state.merge({ isLoadingSingle: false });

const toggleItemActiveSuccessHandler = (state, { data }) => state
  .updateIn(['single', 'items'], (items) => items.map((item) => item.get('id') === data.id ? fromJS(data) : item));

const onItemUpdatedHandler = (state = INITIAL_STATE, { data }) => state
  .updateIn(['single', 'items'], List(), (items) => items.map(
    (item) => item.get('id') === data.id ? fromJS(data) : item)
  )
  .update('data', (lists) => lists.map(
    (list) => list.update('items', (items) => items.map((item) => item.get('id') === data.id ? fromJS(data) : item))
  ));

const onItemRemovedHandler = (state = INITIAL_STATE, { data }) => state
  .updateIn(['single', 'items'], List(), (items) => items.filter(
    (item) => item.get('id') !== data.itemRemoved)
  );

const onItemCreatedHandler = (state = INITIAL_STATE, { data }) => state
  .updateIn(['single', 'items'], List(), (items) => items.push(fromJS(data)));

const changeModalVisibility = (state = INITIAL_STATE, { value }) => state
  .set('isCreateModalVisible', value);

const changeEditModalVisibility = (state = INITIAL_STATE, { value }) => state
  .set('isEditModalVisible', value);

export const reducer = createReducer(INITIAL_STATE, {
  [ListsTypes.FETCH]: fetchHandler,
  [ListsTypes.FETCH_SUCCESS]: fetchSuccessHandler,
  [ListsTypes.FETCH_ERROR]: fetchErrorHandler,
  [ListsTypes.FETCH_SINGLE]: fetchSingleHandler,
  [ListsTypes.FETCH_SINGLE_SUCCESS]: fetchSingleSuccessHandler,
  [ListsTypes.FETCH_SINGLE_ERROR]: fetchSingleErrorHandler,
  [ListsTypes.TOGGLE_ITEM_ACTIVE_SUCCESS]: toggleItemActiveSuccessHandler,
  [ListsTypes.ON_ITEM_UPDATED]: onItemUpdatedHandler,
  [ListsTypes.ON_ITEM_REMOVED]: onItemRemovedHandler,
  [ListsTypes.ON_ITEM_CREATED]: onItemCreatedHandler,
  [ListsTypes.CHANGE_MODAL_VISIBILITY]: changeModalVisibility,
  [ListsTypes.CHANGE_EDIT_MODAL_VISIBILITY]: changeEditModalVisibility,
});
