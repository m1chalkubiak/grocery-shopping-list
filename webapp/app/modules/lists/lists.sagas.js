import { put, takeLatest } from 'redux-saga/effects';
import gql from 'graphql-tag';
import reportError from 'report-error';

import api from '../../services/api';
import { ListsTypes, ListsActions } from './lists.redux';

export function* fetchLists() {
  try {
    const { data } = yield api.query({
      query: gql`{
        lists {
          id,
          name,
          items {
            id,
            name,
            active,
          }
        }
      }`,
    });

    yield put(ListsActions.fetchSuccess(data.lists));
  } catch (e) {
    if (e.response) {
      yield put(ListsActions.fetchError(e.response.data));
      return;
    }

    yield reportError(e);
  }
}

export function* fetchSingleList({ id }) {
  try {
    const { data } = yield api.query({
      query: gql`
        query list($id: Int!) {
          list(id: $id) {
            id,
            name,
            items {
              id,
              name,
              active,
            }
          }
        }
      `,
      variables: {
        id,
      },
    });

    yield put(ListsActions.fetchSingleSuccess(data.list));
  } catch (e) {
    if (e.response) {
      yield put(ListsActions.fetchSingleError(e.response.data));
      return;
    }

    yield reportError(e);
  }
}

export function* toggleItemActive({ id, value }) {
  try {
    const { data } = yield api.mutate({
      mutation: gql`
        mutation toggleItemActive($id: Int!, $value: Boolean!) {
          toggleItemActive(id: $id, value: $value) {
            id,
            name,
            active,
          }
        }
      `,
      variables: {
        id,
        value,
      },
    });

    yield put(ListsActions.toggleItemActiveSuccess(data.toggleItemActive));
  } catch (e) {
    if (e.response) {
      yield put(ListsActions.toggleItemActiveError(e.response.data));
      return;
    }

    yield reportError(e);
  }
}


export default function* listsSaga() {
  yield takeLatest(ListsTypes.FETCH, fetchLists);
  yield takeLatest(ListsTypes.FETCH_SINGLE, fetchSingleList);
  yield takeLatest(ListsTypes.TOGGLE_ITEM_ACTIVE, toggleItemActive);
}
