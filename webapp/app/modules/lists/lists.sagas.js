import { put, take, takeLatest, fork, all, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import gql from 'graphql-tag';
import reportError from 'report-error';

import api from '../../services/api';
import { ListsTypes, ListsActions } from './lists.redux';
import { selectListId, selectEditModalVisible } from './lists.selectors';

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

export function* createItem({ name }) {
  try {
    const listId = yield select(selectListId);
    const { data } = yield api.mutate({
      mutation: gql`
        mutation createItem($name: String!, $listId: Int!) {
          createItem(name: $name, listId: $listId) {
            id,
            name,
            active,
          }
        }
      `,
      variables: {
        name,
        listId,
      },
    });

    yield put(ListsActions.createItemSuccess(data.itemCreated));
    yield put(ListsActions.changeModalVisibility(false));
  } catch (e) {
    if (e.response) {
      yield put(ListsActions.createItemError(e.response.data));
      return;
    }

    yield reportError(e);
  }
}

export function* updateItem({ name }) {
  try {
    const id = yield select(selectEditModalVisible);
    const { data } = yield api.mutate({
      mutation: gql`
        mutation updateItem($name: String!, $id: Int!) {
          updateItem(name: $name, id: $id) {
            id,
            name,
            active,
          }
        }
      `,
      variables: {
        name,
        id,
      },
    });

    yield put(ListsActions.updateItemSuccess(data.itemUpdated));
    yield put(ListsActions.changeEditModalVisibility(false));
  } catch (e) {
    if (e.response) {
      yield put(ListsActions.createItemError(e.response.data));
      return;
    }

    yield reportError(e);
  }
}

export function* removeItem({ id }) {
  try {
    yield api.mutate({
      mutation: gql`
        mutation removeItem($id: Int!) {
          removeItem(id: $id)
        }
      `,
      variables: {
        id,
      },
    });

    yield put(ListsActions.removeItemSuccess(id));
  } catch (e) {
    if (e.response) {
      yield put(ListsActions.removeItemError(e.response.data));
      return;
    }

    yield reportError(e);
  }
}


function itemChannel(subscriptionName) {
  return eventChannel((emit) => {
    api.subscribe({
      query: gql`
        subscription on${subscriptionName} {
          ${subscriptionName} {
            id,
            name,
            active,
          }
        }
      `,
    }).subscribe({ next: emit });

    return () => {};
  });
}


function itemRemovedChannel() {
  return eventChannel((emit) => {
    api.subscribe({
      query: gql`
        subscription onItemRemoved {
          itemRemoved
        }
      `,
    }).subscribe({ next: emit });

    return () => {};
  });
}

export function* subscribeItem() {
  try {
    return yield all([
      fork(subscribeItemUpdate),
      fork(subscribeItemRemoved),
      fork(subscribeItemCreated),
    ]);
  } catch (e) {
    if (e.response) {
      return yield put(ListsActions.subscribeItemError(e.response.data));
    }

    return yield reportError(e);
  }
}

export function* subscribeItemUpdate() {
  try {
    const itemUpdatedChannel = itemChannel('itemUpdated');
    while (true) {
      const { data } = yield take(itemUpdatedChannel);
      yield put(ListsActions.onItemUpdated(data.itemUpdated));
    }
  } catch (e) {
    if (e.response) {
      return yield put(ListsActions.subscribeItemError(e.response.data));
    }

    return yield reportError(e);
  }
}

export function* subscribeItemRemoved() {
  try {
    while (true) {
      const { data } = yield take(itemRemovedChannel());
      yield put(ListsActions.onItemRemoved(data));
    }
  } catch (e) {
    if (e.response) {
      return yield put(ListsActions.subscribeItemError(e.response.data));
    }

    return yield reportError(e);
  }
}

export function* subscribeItemCreated() {
  try {
    while (true) {
      const { data } = yield take(itemChannel('itemCreated'));
      yield put(ListsActions.onItemCreated(data.itemCreated));
    }
  } catch (e) {
    if (e.response) {
      return yield put(ListsActions.subscribeItemError(e.response.data));
    }

    return yield reportError(e);
  }
}


export default function* listsSaga() {
  yield takeLatest(ListsTypes.FETCH, fetchLists);
  yield takeLatest(ListsTypes.FETCH_SINGLE, fetchSingleList);
  yield takeLatest(ListsTypes.TOGGLE_ITEM_ACTIVE, toggleItemActive);
  yield takeLatest(ListsTypes.CREATE_ITEM, createItem);
  yield takeLatest(ListsTypes.UPDATE_ITEM, updateItem);
  yield takeLatest(ListsTypes.REMOVE_ITEM, removeItem);
  yield takeLatest(ListsTypes.SUBSCRIBE_ITEM, subscribeItem);
}
