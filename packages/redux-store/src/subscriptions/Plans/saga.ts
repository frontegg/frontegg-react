import { call, put, takeLeading } from 'redux-saga/effects';
import { plansActions } from './index';
import { api, IPlanResponse } from '@frontegg/rest-api';

export function* plansSagas() {
  yield takeLeading(plansActions.loadPlans, loadPlans);
}

function* loadPlans() {
  yield put(plansActions.setLoading(true));

  try {
    const products: IPlanResponse[] = yield call(api.subscriptions.getSubscriptionPlans);
    yield put(
      plansActions.setPlans(
        products.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: ((item.price && item.price.amount) || 0) / 100,
          currency: (item.price && item.price.currency) || 'usd',
          recurringInterval: 'month',
        }))
      )
    );
    yield put(plansActions.setLoading(false));
  } catch (e) {
    yield put(plansActions.setError(e.message));
  }
}
