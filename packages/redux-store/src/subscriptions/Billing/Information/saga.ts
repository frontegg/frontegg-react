import { call, put, takeEvery } from 'redux-saga/effects';
import { api, IPlanResponse, ISubscriptionResponse } from '@frontegg/rest-api';
import { informationActions } from './index';

export function* subscriptionBillingInformationSagas() {
  yield takeEvery(informationActions.loadSubscription, loadSubscription);
}

function* loadSubscription() {
  yield put(informationActions.setLoading(true));

  try {
    const subscriptions: ISubscriptionResponse[] = yield call(api.subscriptions.getSubscriptions);
    if (subscriptions.length > 0) {
      const subscriptionResponse = subscriptions[0];

      yield put(
        informationActions.setSubscription({
          id: subscriptionResponse.id,
          startDate: subscriptionResponse.startDate,
          endDate: subscriptionResponse.endDate,
          items: subscriptionResponse.items.map((subscriptionItem) => ({
            id: subscriptionItem.id,
            planId: subscriptionItem.planId,
          })),
        })
      );

      if (subscriptionResponse.items.length > 0) {
        yield loadPlan(subscriptionResponse.items[0].id);
      }
    }
    yield put(informationActions.setLoading(false));
  } catch (e) {
    yield put(informationActions.setError(e));
  }
}

function* loadPlan(planId: string) {
  yield put(informationActions.setLoading(true));

  try {
    const planResponse: IPlanResponse = yield call(api.subscriptions.getSubscriptionPlan, planId);

    yield put(
      informationActions.setPlan({
        id: planResponse.id,
        name: planResponse.name,
        description: planResponse.description,
        price: planResponse.price.amount / 100,
        currency: planResponse.price.currency,
        recurringInterval: 'month',
      })
    );
    yield put(informationActions.setLoading(false));
  } catch (e) {
    yield put(informationActions.setError(e));
  }
}
