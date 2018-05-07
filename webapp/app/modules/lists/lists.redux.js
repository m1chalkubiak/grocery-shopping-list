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
}, { prefix: 'LISTS_' });

const ListsRecord = Record({
  data: List(),
  single: Map(),
  isLoadingData: false,
  isLoadingSingle: false,
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

export const reducer = createReducer(INITIAL_STATE, {
  [ListsTypes.FETCH]: fetchHandler,
  [ListsTypes.FETCH_SUCCESS]: fetchSuccessHandler,
  [ListsTypes.FETCH_ERROR]: fetchErrorHandler,
  [ListsTypes.FETCH_SINGLE]: fetchSingleHandler,
  [ListsTypes.FETCH_SINGLE_SUCCESS]: fetchSingleSuccessHandler,
  [ListsTypes.FETCH_SINGLE_ERROR]: fetchSingleErrorHandler,
  [ListsTypes.TOGGLE_ITEM_ACTIVE_SUCCESS]: toggleItemActiveSuccessHandler,
});
