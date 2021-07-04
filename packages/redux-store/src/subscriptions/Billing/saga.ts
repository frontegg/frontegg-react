import { call, put, takeLeading } from 'redux-saga/effects';
import { actions } from '../reducer';
import { billingActions } from './index';
import { api, ISubscriptionPlansResponse, ISubscriptionResponse } from '@frontegg/rest-api';

export function* billingSagas() {
  yield takeLeading(billingActions.loadPlans, loadPlans);
  yield takeLeading(billingActions.loadSubscriptions, loadSubscriptions);
}

function* loadPlans() {
  yield put(actions.loading(true));

  try {
    const products: ISubscriptionPlansResponse[] = yield call(api.subscriptions.getSubscriptionPlans);
    yield put(
      actions.setPlans(
        products.map((item, index) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: (index + 1) * 10,
          currency: 'Usd',
          recurringInterval: 'month',
        }))
      )
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
    const subscriptions: ISubscriptionResponse[] = yield call(api.subscriptions.getTenantSubscriptions);
    yield put(
      actions.setSubscriptions(
        subscriptions.map((subscription) => ({
          id: subscription.id,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
          items: subscription.items.map((subscriptionItem) => ({
            id: subscriptionItem.id,
            planId: subscriptionItem.planId,
          })),
        }))
      )
    );
    yield put(actions.loading(false));
  } catch (e) {
    yield put(actions.error(e));
  }
}
