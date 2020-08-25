'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var toolkit = require('@reduxjs/toolkit');
var reactCore = require('@frontegg/react-core');
var React = require('react');
var React__default = _interopDefault(React);
var reactRouter = require('react-router');
var reactRedux = require('react-redux');
var ReactDOM = _interopDefault(require('react-dom'));
var reactRouterDom = require('react-router-dom');
var semanticUiReact = require('semantic-ui-react');
var formik = require('formik');

// Login
var LoginStep;
(function (LoginStep) {
    LoginStep["preLogin"] = "preLogin";
    LoginStep["loginWithPassword"] = "loginWithPassword";
    LoginStep["loginWithTwoFactor"] = "loginWithTwoFactor";
    LoginStep["redirectToSSO"] = "redirectToSSO";
    LoginStep["success"] = "success";
})(LoginStep || (LoginStep = {}));
// Activate
var ActivateStep;
(function (ActivateStep) {
    ActivateStep["activating"] = "activating";
    ActivateStep["success"] = "success";
})(ActivateStep || (ActivateStep = {}));
// Forgot Password
var ForgotPasswordStep;
(function (ForgotPasswordStep) {
    ForgotPasswordStep["forgotPassword"] = "forgotPassword";
    ForgotPasswordStep["success"] = "success";
})(ForgotPasswordStep || (ForgotPasswordStep = {}));

const storeName = 'auth';
const preloadedState = {
    isAuthenticated: false,
    isLoading: true,
    isSSOAuth: false,
    loginState: {
        step: LoginStep.preLogin,
        loading: false,
    },
    activateState: {
        step: ActivateStep.activating,
        loading: false,
    },
    forgetPasswordState: {
        step: ForgotPasswordStep.forgotPassword,
        loading: false,
        email: '',
    },
    authenticatedUrl: '/',
    loginUrl: '/account/login',
    logoutUrl: '/account/logout',
    activateUrl: '/account/activate',
    forgetPasswordUrl: '/account/forget-password',
    resetPasswordUrl: '/account/reset-password',
    onRedirectTo: () => { },
};
const resetStateByKey = (key) => (state) => (Object.assign(Object.assign({}, state), { [key]: preloadedState[key] }));
const typeReducer = (key) => (state, { payload }) => (Object.assign(Object.assign({}, state), { [key]: payload }));
const typeReducerForKey = (key) => ({
    prepare: (payload) => ({ payload }),
    reducer: (state, { payload }) => (Object.assign(Object.assign({}, state), { [key]: Object.assign(Object.assign({}, state[key]), payload) })),
});
const { reducer, actions: SliceActions } = toolkit.createSlice({
    name: storeName,
    initialState: preloadedState,
    reducers: {
        setState: (state, { payload }) => (Object.assign(Object.assign({}, state), payload)),
        setIsLoading: typeReducer('isLoading'),
        setError: typeReducer('error'),
        setIsSSOAuth: typeReducer('isSSOAuth'),
        setIsAuthenticated: typeReducer('isAuthenticated'),
        setUser: typeReducer('user'),
        setLoginState: typeReducerForKey('loginState'),
        resetLoginState: resetStateByKey('loginState'),
        setActivateState: typeReducerForKey('activateState'),
        resetActivateState: resetStateByKey('activateState'),
        setForgotPasswordState: typeReducerForKey('forgetPasswordState'),
        resetForgotPasswordState: resetStateByKey('forgetPasswordState'),
    },
});
const actions = Object.assign(Object.assign({}, SliceActions), { requestAuthorize: toolkit.createAction(`${storeName}/requestAuthorize`, (payload) => ({ payload })), preLogin: toolkit.createAction(`${storeName}/preLogin`, (payload) => ({ payload })), login: toolkit.createAction(`${storeName}/login`, (payload) => ({ payload })), verifyMfa: toolkit.createAction(`${storeName}/verifyMfa`, (payload) => ({ payload })), activateAccount: toolkit.createAction(`${storeName}/activateAccount`, (payload) => ({ payload })), forgotPassword: toolkit.createAction(`${storeName}/forgotPassword`, (payload) => ({ payload })), resetPassword: toolkit.createAction(`${storeName}/resetPassword`, (payload) => ({ payload })), logout: toolkit.createAction(`${storeName}/logout`, (payload) => ({ payload })) });

var createSymbol = function createSymbol(name) {
  return "@@redux-saga/" + name;
};

var CANCEL =
/*#__PURE__*/
createSymbol('CANCEL_PROMISE');
var IO =
/*#__PURE__*/
createSymbol('IO');
var MULTICAST =
/*#__PURE__*/
createSymbol('MULTICAST');

var undef = function undef(v) {
  return v === null || v === undefined;
};
var notUndef = function notUndef(v) {
  return v !== null && v !== undefined;
};
var func = function func(f) {
  return typeof f === 'function';
};
var string = function string(s) {
  return typeof s === 'string';
};
var array = Array.isArray;
var object = function object(obj) {
  return obj && !array(obj) && typeof obj === 'object';
};
var pattern = function pattern(pat) {
  return pat && (string(pat) || symbol(pat) || func(pat) || array(pat) && pat.every(pattern));
};
var channel = function channel(ch) {
  return ch && func(ch.take) && func(ch.close);
};
var stringableFunc = function stringableFunc(f) {
  return func(f) && f.hasOwnProperty('toString');
};
var symbol = function symbol(sym) {
  return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
};
var multicast = function multicast(ch) {
  return channel(ch) && ch[MULTICAST];
};
var effect = function effect(eff) {
  return eff && eff[IO];
};

function delayP(ms, val) {
  if (val === void 0) {
    val = true;
  }

  var timeoutId;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(resolve, ms, val);
  });

  promise[CANCEL] = function () {
    clearTimeout(timeoutId);
  };

  return promise;
}

function check(value, predicate, error) {
  if (!predicate(value)) {
    throw new Error(error);
  }
}

var kThrow = function kThrow(err) {
  throw err;
};

var kReturn = function kReturn(value) {
  return {
    value: value,
    done: true
  };
};

function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }

  if (name === void 0) {
    name = 'iterator';
  }

  var iterator = {
    meta: {
      name: name
    },
    next: next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };

  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}

var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var CALL = 'CALL';
var FORK = 'FORK';

var makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
};
function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if ( arguments.length) {
    check(arguments[0], notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }

  if (pattern(patternOrChannel)) {
    return makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if (multicast(patternOrChannel) && notUndef(multicastPattern) && pattern(multicastPattern)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }

  if (channel(patternOrChannel)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel
    });
  }

  {
    throw new Error("take(patternOrChannel): argument " + patternOrChannel + " is not valid channel or a valid pattern");
  }
}
function put(channel$1, action) {
  {
    if (arguments.length > 1) {
      check(channel$1, notUndef, 'put(channel, action): argument channel is undefined');
      check(channel$1, channel, "put(channel, action): argument " + channel$1 + " is not a valid channel");
      check(action, notUndef, 'put(channel, action): argument action is undefined');
    } else {
      check(channel$1, notUndef, 'put(action): argument action is undefined');
    }
  }

  if (undef(action)) {
    action = channel$1; // `undefined` instead of `null` to make default parameter work

    channel$1 = undefined;
  }

  return makeEffect(PUT, {
    channel: channel$1,
    action: action
  });
}
function all(effects) {
  var eff = makeEffect(ALL, effects);
  eff.combinator = true;
  return eff;
}

var validateFnDescriptor = function validateFnDescriptor(effectName, fnDescriptor) {
  check(fnDescriptor, notUndef, effectName + ": argument fn is undefined or null");

  if (func(fnDescriptor)) {
    return;
  }

  var context = null;
  var fn;

  if (array(fnDescriptor)) {
    context = fnDescriptor[0];
    fn = fnDescriptor[1];
    check(fn, notUndef, effectName + ": argument of type [context, fn] has undefined or null `fn`");
  } else if (object(fnDescriptor)) {
    context = fnDescriptor.context;
    fn = fnDescriptor.fn;
    check(fn, notUndef, effectName + ": argument of type {context, fn} has undefined or null `fn`");
  } else {
    check(fnDescriptor, func, effectName + ": argument fn is not function");
    return;
  }

  if (context && string(fn)) {
    check(context[fn], func, effectName + ": context arguments has no such method - \"" + fn + "\"");
    return;
  }

  check(fn, func, effectName + ": unpacked fn argument (from [context, fn] or {context, fn}) is not a function");
};

function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn;

  if (func(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if (array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && string(fn) && func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context: context,
    fn: fn,
    args: args
  };
}

var isNotDelayEffect = function isNotDelayEffect(fn) {
  return fn !== delay;
};

function call(fnDescriptor) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  {
    var arg0 = typeof args[0] === 'number' ? args[0] : 'ms';
    check(fnDescriptor, isNotDelayEffect, "instead of writing `yield call(delay, " + arg0 + ")` where delay is an effect from `redux-saga/effects` you should write `yield delay(" + arg0 + ")`");
    validateFnDescriptor('call', fnDescriptor);
  }

  return makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
}
function fork(fnDescriptor) {
  {
    validateFnDescriptor('fork', fnDescriptor);
    check(fnDescriptor, function (arg) {
      return !effect(arg);
    }, 'fork: argument must not be an effect');
  }

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
}
var delay =
/*#__PURE__*/
call.bind(null, delayP);

var done = function done(value) {
  return {
    done: true,
    value: value
  };
};

var qEnd = {};
function safeName(patternOrChannel) {
  if (channel(patternOrChannel)) {
    return 'channel';
  }

  if (stringableFunc(patternOrChannel)) {
    return String(patternOrChannel);
  }

  if (func(patternOrChannel)) {
    return patternOrChannel.name;
  }

  return String(patternOrChannel);
}
function fsmIterator(fsm, startState, name) {
  var stateUpdater,
      errorState,
      effect,
      nextState = startState;

  function next(arg, error) {
    if (nextState === qEnd) {
      return done(arg);
    }

    if (error && !errorState) {
      nextState = qEnd;
      throw error;
    } else {
      stateUpdater && stateUpdater(arg);
      var currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect;
    }
  }

  return makeIterator(next, function (error) {
    return next(null, error);
  }, name);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yFork(action)
      };
    }
  }, 'q1', "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

var validateTakeEffect = function validateTakeEffect(fn, patternOrChannel, worker) {
  check(patternOrChannel, notUndef, fn.name + " requires a pattern or channel");
  check(worker, notUndef, fn.name + " requires a saga parameter");
};

function takeEvery$1(patternOrChannel, worker) {
  {
    validateTakeEffect(takeEvery$1, patternOrChannel, worker);
  }

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
}

const IDENTITY_SERVICE_URL = '/identity/resources/auth/v1';
function* refreshMetadata() {
    let isSSOAuth;
    try {
        const data = yield call(reactCore.api.metadata.getSamlMetadata);
        isSSOAuth = data && data.rows && !!data.rows.length;
    }
    catch (e) {
        isSSOAuth = false;
    }
    yield put(actions.setIsSSOAuth(!!isSSOAuth));
}
function* refreshToken() {
    try {
        yield call(reactCore.api.auth.refreshToken);
        yield put(actions.setIsAuthenticated(true));
    }
    catch (e) {
        yield put(actions.setIsAuthenticated(false));
    }
}
function* requestAuthorize({ payload: firstTime }) {
    const calls = [call(refreshToken)];
    if (firstTime) {
        yield put(actions.setIsLoading(true));
        calls.push(call(refreshMetadata));
    }
    yield all(calls);
    yield put(actions.setIsLoading(false));
}
function* preLogin({ payload: { email } }) {
    yield put(actions.setLoginState({ loading: true }));
    try {
        const address = yield call(reactCore.api.auth.preLogin, { email });
        if (address) {
            yield put(actions.setLoginState({ step: LoginStep.redirectToSSO, loading: false, ssoRedirectUrl: address }));
            setTimeout(() => { window.location.href = address; }, 2000);
        }
        else {
            yield put(actions.setLoginState({ step: LoginStep.loginWithPassword, loading: false }));
        }
    }
    catch (e) {
        yield put(actions.setLoginState({ step: LoginStep.loginWithPassword, loading: false }));
    }
}
function* login({ payload: { email, password } }) {
    yield put(actions.setLoginState({ loading: true }));
    try {
        const user = yield call(reactCore.api.auth.login, { email, password });
        yield put(actions.setState({
            user: !!user.accessToken ? undefined : user,
            isAuthenticated: !!user.accessToken,
            loginState: {
                loading: false,
                error: undefined,
                mfaToken: user.mfaToken,
                step: user.mfaToken ? LoginStep.loginWithTwoFactor : LoginStep.success,
            },
        }));
    }
    catch (e) {
        yield put(actions.setLoginState({ error: e.message, loading: false }));
    }
}
function* verifyMfa({ payload: { mfaToken, value } }) {
    yield put(actions.setLoginState({ loading: true }));
    try {
        const user = yield call(reactCore.api.auth.verifyMfa, { mfaToken, value });
        yield put(actions.setLoginState({ loading: false, error: undefined, step: LoginStep.success }));
        yield put(actions.setUser(user));
        yield put(actions.setIsAuthenticated(true));
    }
    catch (e) {
        yield put(actions.setLoginState({ error: e.message, loading: false }));
    }
}
function* activateAccount({ payload }) {
    yield put(actions.setActivateState({ loading: true }));
    try {
        yield call(reactCore.api.auth.activateAccount, payload);
        yield put(actions.setActivateState({ loading: false, error: undefined, step: ActivateStep.success }));
    }
    catch (e) {
        yield put(actions.setActivateState({ loading: false, error: e.message }));
    }
}
function* forgotPassword({ payload }) {
    yield put(actions.setForgotPasswordState({ loading: true }));
    const context = yield reactCore.getContext();
    try {
        yield call(reactCore.api.auth.forgotPassword, payload);
        yield put(actions.setForgotPasswordState({ loading: false, error: undefined, step: ForgotPasswordStep.success }));
    }
    catch (e) {
        yield put(actions.setForgotPasswordState({ loading: false, error: e.message }));
    }
}
function* resetPassword({ payload }) {
    yield put(actions.setForgotPasswordState({ loading: true }));
    const context = yield reactCore.getContext();
    try {
        yield call(reactCore.api.auth.resetPassword, payload);
        yield put(actions.setForgotPasswordState({ loading: false, error: undefined, step: ForgotPasswordStep.success }));
    }
    catch (e) {
        yield put(actions.setForgotPasswordState({ loading: false, error: e.message }));
    }
}
function* logout({ payload }) {
    yield put(actions.setIsLoading(true));
    const context = yield reactCore.getContext();
    try {
        yield reactCore.Post(context, `${IDENTITY_SERVICE_URL}/logout`);
    }
    catch (e) {
        console.error(e);
    }
    payload();
}
function* sagas() {
    yield takeEvery$1(actions.requestAuthorize, requestAuthorize);
    yield takeEvery$1(actions.preLogin, preLogin);
    yield takeEvery$1(actions.login, login);
    yield takeEvery$1(actions.logout, logout);
    yield takeEvery$1(actions.verifyMfa, verifyMfa);
    yield takeEvery$1(actions.activateAccount, activateAccount);
    yield takeEvery$1(actions.forgotPassword, forgotPassword);
    yield takeEvery$1(actions.resetPassword, resetPassword);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const FRONTEGG_AFTER_AUTH_REDIRECT_URL = 'FRONTEGG_AFTER_AUTH_REDIRECT_URL';

const defaultMapper = {
    state: (state) => state,
    actions: (actions) => actions,
};
const createMapper = (mapper) => {
    var _a, _b;
    return ({
        state: (_a = mapper.state) !== null && _a !== void 0 ? _a : defaultMapper.state,
        actions: (_b = mapper.actions) !== null && _b !== void 0 ? _b : defaultMapper.actions,
    });
};

const useAuth = (passedMapper = defaultMapper) => {
    const mapper = createMapper(passedMapper);
    const dispatch = reactRedux.useDispatch();
    const bindedActions = toolkit.bindActionCreators(mapper.actions(actions), dispatch);
    const state = reactRedux.useSelector(({ auth }) => mapper.state(auth), reactCore.memoEqual);
    return Object.assign(Object.assign({}, state), bindedActions);
};
/**
 * ```jsx
 * export const MyFunctionComponent = () => {
 *   const isAuthenticated  = useIsAuthenticated();
 *   return isAuthenticated ? <div>Hello User</div> : <Redirect to={'/login'}/>
 * }
 * ```
 *
 * use this frontegg hook function to get if user is "Authenticated"
 */
const useIsAuthenticated = () => reactRedux.useSelector(({ auth: { isAuthenticated } }) => isAuthenticated, reactCore.memoEqual);
/**
 * ```jsx
 * export const MyFunctionComponent = () => {
 *   const user = useAuthUser();
 *   return user ? <div>Hello {user.name}!</div> : <div>Hello Guest!</div>
 * }
 * ```
 *
 * use this frontegg hook function to get the authenticated user
 * the return user is null if not authenticated
 */
const useAuthUser = () => reactRedux.useSelector(({ auth: { user } }) => user, reactCore.memoEqual);

const pluginName = 'auth';
const pluginActions = actions;
const withAuth = (Component, mapper) => {
    const mapStateToProps = (state) => mapper.state(state[pluginName]);
    const mapDispatchToProps = (dispatch) => toolkit.bindActionCreators(mapper.actions(pluginActions) || {}, dispatch);
    return reactRedux.connect(mapStateToProps, mapDispatchToProps)(Component);
};
const onRedirecting = (loginUrl) => {
    window.localStorage.setItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL, window.location.pathname);
    return React__default.createElement(reactRouter.Redirect, { to: loginUrl });
};
const withProtectedRoute = (Component) => {
    const mapper = {
        state: ({ isAuthenticated, loginUrl, isLoading }) => ({ isAuthenticated, loginUrl, isLoading }),
        actions: () => { },
    };
    return withAuth(class ProtectedRoute extends React__default.Component {
        render() {
            const { isAuthenticated, loginUrl, isLoading } = this.props;
            return isLoading ? null : isAuthenticated ? React__default.createElement(Component, Object.assign({}, this.props)) : onRedirecting(loginUrl);
        }
    }, mapper);
};
const ProtectedComponent = ({ children }) => {
    const { isAuthenticated, loginUrl, isLoading } = useAuth({
        state: ({ isAuthenticated, loginUrl, isLoading }) => ({ isAuthenticated, loginUrl, isLoading }),
    });
    return isLoading ? null : isAuthenticated ? React__default.createElement(React__default.Fragment, null, children) : onRedirecting(loginUrl);
};
class ProtectedRoute extends React__default.Component {
    render() {
        const _a = this.props, { component, render, children } = _a, routeProps = __rest(_a, ["component", "render", "children"]);
        if (children != null) {
            return React__default.createElement(reactRouter.Route, Object.assign({}, routeProps),
                React__default.createElement(ProtectedComponent, null, children));
        }
        if (render != null) {
            return React__default.createElement(reactRouter.Route, Object.assign({}, routeProps, { render: (props) => React__default.createElement(ProtectedComponent, null, render(props)) }));
        }
        if (component != null) {
            return React__default.createElement(reactRouter.Route, Object.assign({}, routeProps, { component: withProtectedRoute(component) }));
        }
        return React__default.createElement(reactRouter.Route, Object.assign({}, routeProps));
    }
}
const ProtectedArea = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated ? React__default.createElement(React__default.Fragment, null, children) : null;
};

const mapper = {
    state: ({ isAuthenticated, user }) => ({ isAuthenticated, user }),
    actions: ({ requestAuthorize }) => ({ requestAuthorize }),
};
class Listener extends React__default.Component {
    constructor(props) {
        super(props);
        this.isAuthenticated = null;
        this.updateSessionTimer = (firstTime = false) => {
            const { isAuthenticated, user } = this.props;
            if (!isAuthenticated && !firstTime) {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            }
            else if (this.isAuthenticated !== isAuthenticated || firstTime) {
                this.isAuthenticated = isAuthenticated;
                this.requestAuthorize(((user === null || user === void 0 ? void 0 : user.expiresIn) || 20) * 1000, firstTime);
            }
        };
        this.requestAuthorize = (expired, firstTime = false) => {
            if (this.props.isAuthenticated || firstTime) {
                this.props.requestAuthorize(firstTime);
                this.timer = setTimeout(() => this.updateSessionTimer(), expired * 0.8);
            }
        };
        this.updateSessionTimer(true);
    }
    render() {
        return null;
    }
}
var Listener$1 = withAuth(Listener, mapper);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".frontegg .fe-login-page{position:absolute;top:0;left:0;background:#fff;z-index:1000;width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;min-height:500px;overflow:auto}.frontegg .fe-login-container{display:flex;flex-direction:column;width:400px;max-width:90%;min-height:300px;border-radius:.5rem;padding:2rem;box-shadow:0 1.4px 4.5px rgba(0,0,0,.016),0 4.3px 12.5px rgba(0,0,0,.032),0 10.3px 30.1px rgba(0,0,0,.055),0 29px 100px rgba(0,0,0,.14)}.frontegg .fe-login-header{display:flex;justify-content:center;margin:1rem 0 3rem;align-items:center;overflow-x:hidden}.frontegg .fe-login-header>*{max-width:100%}.frontegg .fe-auth-page{position:fixed;height:100vh;width:100vw;top:0;left:0;overflow:auto;z-index:100}.frontegg .fe-auth-header{display:flex;justify-content:center;margin:1rem 0 2rem;align-items:center;overflow-x:hidden}.frontegg .fe-auth-header>*{max-width:100%}";
styleInject(css_248z);

const authPageWrapper = (Component, displayName) => { var _a; return _a = class extends React__default.Component {
        render() {
            const component = React__default.createElement("div", { className: 'frontegg' },
                React__default.createElement("div", { className: 'fe-login-page' },
                    React__default.createElement("div", { className: 'fe-login-container' },
                        React__default.createElement("div", { className: 'fe-login-header' }, this.props.header),
                        React__default.createElement(Component, null))));
            return ReactDOM.createPortal(component, document.body);
        }
    },
    _a.displayName = displayName,
    _a.defaultProps = {
        header: React__default.createElement("img", { src: 'http://acmelogos.com/images/logo-1.svg', alt: 'logo' }),
    },
    _a; };

const mapper$1 = {
    state: ({ loginUrl }) => ({ loginUrl }),
    actions: ({ logout }) => ({ logout }),
};
class LogoutComponent extends React__default.Component {
    componentDidMount() {
        const { logout, loginUrl } = this.props;
        setTimeout(() => {
            logout(() => window.location.href = loginUrl);
        }, 2000);
    }
    render() {
        return React__default.createElement("div", { className: 'fe-login-component' },
            React__default.createElement(semanticUiReact.Loader, { active: true }),
            ";");
    }
}
const Logout = withAuth(LogoutComponent, mapper$1);
const LogoutPage = authPageWrapper(Logout, 'LogoutPage');

const RedirectToSSO = () => {
    return React__default.createElement("div", { className: 'fe-login-sso-redirect' },
        "Being redirected to your SSO provider...",
        React__default.createElement(semanticUiReact.Loader, { active: true, inline: true }));
};

const mapper$2 = {
    state: ({ loginState, isSSOAuth, onRedirectTo, forgetPasswordUrl }) => ({ loginState, isSSOAuth, onRedirectTo, forgetPasswordUrl }),
    actions: ({ preLogin, login, setLoginState, resetLoginState, setForgotPasswordState }) => ({
        preLogin,
        login,
        setLoginState,
        resetLoginState,
        setForgotPasswordState,
    }),
};
class LoginWithPasswordComponent extends React__default.Component {
    constructor() {
        super(...arguments);
        this.passwordField = React.createRef();
        this.lastLoginStep = LoginStep.preLogin;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { loginState, isSSOAuth } = this.props;
        if (this.lastLoginStep !== loginState.step && isSSOAuth && this.passwordField.current) {
            this.lastLoginStep = this.context.loginState.step;
            this.passwordField.current.focus();
        }
    }
    render() {
        const { loginState: { loading, step, error }, isSSOAuth, preLogin, login, setLoginState, resetLoginState, setForgotPasswordState, onRedirectTo, forgetPasswordUrl, } = this.props;
        const displayPassword = !isSSOAuth || step == LoginStep.loginWithPassword;
        const passwordLabel = React__default.createElement(React__default.Fragment, null,
            "Password",
            React__default.createElement(formik.Field, null, ({ form: { values } }) => (React__default.createElement(semanticUiReact.Button, { disabled: loading, type: 'button', className: 'fe-field-button', onClick: () => {
                    setForgotPasswordState({ email: values['email'] });
                    resetLoginState();
                    onRedirectTo(forgetPasswordUrl);
                } }, "Forgot Password?"))));
        return React__default.createElement(formik.Formik, { initialValues: { email: '', password: '' }, validationSchema: reactCore.validateSchema(displayPassword ? {
                email: reactCore.validateEmail,
                password: reactCore.validatePassword,
            } : {
                email: reactCore.validateEmail,
            }), onSubmit: ({ email, password }) => displayPassword ? login({ email, password }) : preLogin({ email }) },
            React__default.createElement(formik.Form, null,
                React__default.createElement(reactCore.FieldInput, { name: 'email', placeholder: 'name@example.com', label: 'Email', focus: isSSOAuth && displayPassword ? false : undefined, onChange: isSSOAuth && displayPassword ? () => { setLoginState({ step: LoginStep.preLogin }); } : undefined }),
                displayPassword && React__default.createElement(reactCore.FieldInput, { label: passwordLabel, type: 'password', wrapperClassName: 'fe-hidden-element', forwardRef: this.passwordField, name: 'password', placeholder: 'Enter your password', disabled: !displayPassword }),
                React__default.createElement(reactCore.FieldButton, { fluid: true, primary: !loading, loading: loading },
                    displayPassword ? 'Login' : 'Continue',
                    " "),
                error && React__default.createElement("div", { className: 'fe-login-error-message' }, error)));
    }
}
const LoginWithPassword = withAuth(LoginWithPasswordComponent, mapper$2);

const mapper$3 = {
    state: (state) => ({ loginState: state.loginState }),
    actions: (actions) => ({ verifyMfa: actions.verifyMfa }),
};
class LoginWithTwoFactorComponent extends React__default.Component {
    render() {
        const { loginState: { loading, error, mfaToken }, verifyMfa } = this.context;
        return React__default.createElement(formik.Formik, { initialValues: { code: '' }, validationSchema: reactCore.validateSchema({
                code: reactCore.validateTwoFactorCode,
            }), onSubmit: ({ code }) => verifyMfa({ mfaToken: mfaToken || '', value: code }) },
            React__default.createElement(formik.Form, { className: 'fe-login-two-factor' },
                React__default.createElement(reactCore.FieldInput, { label: 'Please enter the 6 digit code', name: 'code', focus: true }),
                React__default.createElement(reactCore.FieldButton, { fluid: true, primary: !loading, loading: loading }, "Login"),
                error && React__default.createElement("div", { className: 'fe-login-error-message' }, error)));
    }
}
const LoginWithTwoFactor = withAuth(LoginWithTwoFactorComponent, mapper$3);

const mapper$4 = {
    state: ({ authenticatedUrl }) => ({ authenticatedUrl }),
    actions: ({ resetLoginState }) => ({ resetLoginState }),
};
class LoginSuccessRedirect extends React__default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            redirect: '',
        };
    }
    componentDidMount() {
        const { resetLoginState } = this.props;
        let { authenticatedUrl } = this.props;
        const afterAuthRedirect = window.localStorage.getItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
        if (afterAuthRedirect) {
            authenticatedUrl = afterAuthRedirect;
            window.localStorage.removeItem(FRONTEGG_AFTER_AUTH_REDIRECT_URL);
        }
        setTimeout(() => {
            resetLoginState();
            this.setState({ redirect: authenticatedUrl });
        }, 500);
    }
    render() {
        const { redirect } = this.state;
        return React__default.createElement("div", { className: 'fe-login-success' },
            "Authentication Succeeded",
            React__default.createElement(semanticUiReact.Loader, { active: true, inline: true }),
            redirect && React__default.createElement(reactRouter.Redirect, { to: redirect }));
    }
}
var LoginSuccessRedirect$1 = withAuth(LoginSuccessRedirect, mapper$4);

const mapper$5 = {
    state: ({ isLoading, isAuthenticated, loginState: { step } }) => ({ isLoading, isAuthenticated, step }),
    actions: () => { },
};
class LoginComponent extends React__default.Component {
    render() {
        const { isLoading, isAuthenticated, step } = this.props;
        if (isLoading) {
            return React__default.createElement(semanticUiReact.Loader, { active: true });
        }
        if (isAuthenticated || step === LoginStep.success) {
            return React__default.createElement(LoginSuccessRedirect$1, null);
        }
        let components = null;
        if (step === LoginStep.preLogin || step === LoginStep.loginWithPassword) {
            components = React__default.createElement(LoginWithPassword, null);
        }
        if (step === LoginStep.loginWithTwoFactor) {
            components = React__default.createElement(LoginWithTwoFactor, null);
        }
        if (step === LoginStep.redirectToSSO) {
            components = React__default.createElement(RedirectToSSO, null);
        }
        return React__default.createElement("div", { className: 'fe-login-component' }, components);
    }
}
const Login = withAuth(LoginComponent, mapper$5);
const LoginPage = authPageWrapper(Login, 'LoginPage');

const mapper$6 = {
    state: ({ loginUrl, logoutUrl, isLoading, header, loaderComponent }) => ({
        loginUrl,
        logoutUrl,
        isLoading,
        defaultComps: { header, loaderComponent },
    }),
    actions: () => { },
};
class DefaultAuthRoutes extends React__default.Component {
    render() {
        const _a = this.props, { loginUrl, logoutUrl, isLoading, header, loaderComponent, defaultComps, children } = _a, rest = __rest(_a, ["loginUrl", "logoutUrl", "isLoading", "header", "loaderComponent", "defaultComps", "children"]);
        const pageProps = Object.assign(Object.assign(Object.assign(Object.assign({}, rest), defaultComps), (header !== undefined ? { header } : {})), (loaderComponent !== undefined ? { loaderComponent } : {}));
        return React__default.createElement(reactRouterDom.Switch, null,
            React__default.createElement(reactRouterDom.Route, { exact: true, path: loginUrl, render: () => React__default.createElement(LoginPage, Object.assign({}, pageProps)) }),
            React__default.createElement(reactRouterDom.Route, { exact: true, path: logoutUrl, render: () => React__default.createElement(LogoutPage, Object.assign({}, pageProps)) }),
            React__default.createElement(reactRouterDom.Route, { path: '*', children: () => pageProps.loaderComponent && isLoading ? pageProps.loaderComponent : children }));
    }
}
var DefaultAuthRoutes$1 = withAuth(DefaultAuthRoutes, mapper$6);

const AuthPlugin = (options) => ({
    storeName,
    preloadedState: Object.assign(Object.assign({}, preloadedState), options),
    reducer,
    sagas,
    Listener: Listener$1,
});

exports.AuthPlugin = AuthPlugin;
exports.DefaultAuthRoutes = DefaultAuthRoutes$1;
exports.Login = Login;
exports.LoginPage = LoginPage;
exports.Logout = Logout;
exports.LogoutPage = LogoutPage;
exports.ProtectedArea = ProtectedArea;
exports.ProtectedComponent = ProtectedComponent;
exports.ProtectedRoute = ProtectedRoute;
exports.authPageWrapper = authPageWrapper;
exports.useAuth = useAuth;
exports.useAuthUser = useAuthUser;
exports.useIsAuthenticated = useIsAuthenticated;
exports.withAuth = withAuth;
exports.withProtectedRoute = withProtectedRoute;
//# sourceMappingURL=index.js.map
