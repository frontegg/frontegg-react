import { call, put, select, takeEvery, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { billingActions } from './index';
import { api, ISubscriptionProductResponse, ISubscriptionResponse } from '@frontegg/rest-api';
import { SubscriptionsState } from '../interfaces';
import { Subscription } from './interfaces';

export function* billingSagas() {
  yield takeLeading(billingActions.loadProducts, loadProducts);
  yield takeLeading(billingActions.loadSubscriptions, loadSubscriptions);
  yield takeEvery(actions.setSubscriptions, normalizeSubscriptions);
}

function* loadProducts() {
  yield put(actions.loading(true));

  try {
    const products: ISubscriptionProductResponse[] = yield call(api.subscriptions.getSubscriptionProducts);
    yield put(
      actions.setProducts(
        products.map((item) => ({
          id: item.id,
        })),
      ),
    );
    yield put(billingActions.loadSubscriptions(true));
    yield put(actions.loading(false));
  } catch (e) {
    yield put(actions.error(e));
  }
}

function* loadSubscriptions() {
  yield put(actions.loading(true));

  try {
    const subscriptions: ISubscriptionResponse[] = yield call(api.subscriptions.getSubscriptionProducts);
    yield put(
      actions.setSubscriptions(
        subscriptions.map((item) => ({
          id: item.id,
        })),
      ),
    );
    yield put(actions.loading(false));
  } catch (e) {
    yield put(actions.error(e));
  }
}

function* normalizeSubscriptions() {
  const subscriptions: Subscription[] = yield select((state: SubscriptionsState) => state.billing.subscriptions);

  const subscriptionProductMap: { [key: string]: string } = subscriptions
    .reduce<{
      productId: string,
      subscriptionId: string,
    }[]>(
      (a, b) => [
        ...a,
        ...b.items.map((value) => ({
          productId: value.productId,
          subscriptionId: b.id,
        })),
      ],
      [],
    )
    .reduce(
      (a, b) => ({
        ...a,
        [b.productId]: [b.subscriptionId],
      }),
      {},
    );

  yield put(actions.setSubscriotionProductMap(subscriptionProductMap));
}
